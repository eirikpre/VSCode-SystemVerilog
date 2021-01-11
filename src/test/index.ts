// This file is providing the test runner to use when running extension tests.
// By default the test runner in use is Mocha-based.

import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(): Promise<void> {
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

    const testsRoot = path.resolve(__dirname, '.');

    return new Promise((c, e) => {
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
                        c();
                    }
                });
            } catch (err) {
                e(err);
            }
        });
    });
}
