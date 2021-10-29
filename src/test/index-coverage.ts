import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';
import * as Nyc from 'nyc';
import * as baseConfig from '@istanbuljs/nyc-config-typescript';

// Recommended modules, loading them here to speed up NYC initialization
// and minimize risk of race conditions.
import 'ts-node/register';
import 'source-map-support/register';

// In Linux, prevent a weird NPE when Mocha on Linux requires the window size from the TTY.
// Since not running in a TTY environment, implementt the method statically.
const tty = require('tty');
if (!tty.getWindowSize) {
    tty.getWindowSize = (): number[] => {
        return [80, 75];
    };
}

export async function run(): Promise<void> {
    // Create the Mocha test
    const mocha = new Mocha({
        ui: 'tdd',
        color: true,
        reporter: 'mocha-multi-reporters',
        reporterOptions: {
            reporterEnabled: 'spec, xunit',
            xunitReporterOptions: {
                output: path.join(__dirname, '..', '..', 'results.xml')
            }
        }
    });

    // Setup coverage pre-test, including post-test hook to report
    const nyc = new Nyc({
        ...baseConfig,
        cwd: path.join(__dirname, '..', '..'),
        reporter: ['text-summary', 'html'],
        all: true,
        silent: false,
        instrument: true,
        hookRequire: true,
        hookRunInContext: true,
        hookRunInThisContext: true,
        include: ['out/**/*.js'],
        exclude: ['out/test/**'],
        // require: ['ts-node/register', 'source-map-support/register'],
        sourceMap: true
    });
    await nyc.reset();
    await nyc.wrap();

    // Check the modules already loaded and warn in case of a race condition
    // (ideally, at this point the require cache should only contain one file - this module).
    const filesRegex = /vscode-systemverilog\/out/;
    const filterFn = filesRegex.test.bind(filesRegex);
    if (Object.keys(require.cache).filter(filterFn).length > 1) {
        console.warn('NYC initialized after modules were loaded', Object.keys(require.cache).filter(filterFn));
    }

    // Debug which files will be included/excluded
    // console.log('Glob verification', await nyc.exclude.glob(nyc.cwd));

    const testsRoot = path.resolve(__dirname, '.');

    const fails: number = await new Promise((c, e) => {
        glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
            if (err) {
                return e(err);
            }

            // Add files to the test suite
            files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

            try {
                // Run the mocha test
                mocha.run((failures) => {
                    if (failures > 0) {
                        e(new Error(`${failures} tests failed.`));
                    } else {
                        c(failures);
                    }
                });
            } catch (err) {
                e(err);
            }
        });
    });

    await nyc.writeCoverageFile();
    console.log(await captureStdout(nyc.report.bind(nyc))); // Capture `text-summary` reporter's output and log it to the console

    if (fails > 0) {
        throw new Error(`${fails} tests failed.`);
    }
}

async function captureStdout(fn) {
    let w = process.stdout.write,
        buffer = '';
    process.stdout.write = (s) => {
        buffer = buffer + s;
        return true;
    };
    await fn();
    process.stdout.write = w;
    return buffer;
}
