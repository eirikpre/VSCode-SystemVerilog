import * as assert from 'assert';
import { applyIconPreference, FILE_ICON_MAP, LanguageIcon } from '../file-icons';

type Lang = { id: string; icon?: LanguageIcon };
type Manifest = { contributes: { languages: Lang[] } };

function manifestWithIcons(): Manifest {
    return {
        contributes: {
            languages: [
                { id: 'systemverilog', icon: { ...FILE_ICON_MAP.systemverilog } },
                { id: 'verilog', icon: { ...FILE_ICON_MAP.verilog } },
                { id: 'vhdl' } // never carries a custom icon
            ]
        }
    };
}

suite('file-icons Tests', () => {
    test('test #1: disabling removes icons and reports a change', () => {
        const manifest = manifestWithIcons();
        const changed = applyIconPreference(manifest, false);
        assert.strictEqual(changed, true);
        assert.strictEqual(manifest.contributes.languages[0].icon, undefined);
        assert.strictEqual(manifest.contributes.languages[1].icon, undefined);
    });

    test('test #2: re-enabling restores icons from the map', () => {
        const manifest: Manifest = {
            contributes: { languages: [{ id: 'systemverilog' }, { id: 'verilog' }, { id: 'vhdl' }] }
        };
        const changed = applyIconPreference(manifest, true);
        assert.strictEqual(changed, true);
        assert.deepStrictEqual(manifest.contributes.languages[0].icon, FILE_ICON_MAP.systemverilog);
        assert.deepStrictEqual(manifest.contributes.languages[1].icon, FILE_ICON_MAP.verilog);
        // A language with no mapping stays icon-less.
        assert.strictEqual(manifest.contributes.languages[2].icon, undefined);
    });

    test('test #3: idempotent — no change when already in the desired state', () => {
        assert.strictEqual(applyIconPreference(manifestWithIcons(), true), false);
        const stripped = manifestWithIcons();
        applyIconPreference(stripped, false);
        assert.strictEqual(applyIconPreference(stripped, false), false);
    });

    test('test #4: tolerates a manifest without contributed languages', () => {
        assert.strictEqual(applyIconPreference({}, true), false);
        assert.strictEqual(applyIconPreference({ contributes: {} }, false), false);
    });
});
