// Custom file-type icons are contributed declaratively via
// `contributes.languages[].icon` in package.json. VS Code has no runtime/`when`
// switch for those, so to let users turn them off (issue #226) the extension
// rewrites its own manifest to add or remove the `icon` entries and asks for a
// window reload. This module holds the canonical icon map and the pure manifest
// transform; the IO + reload prompt live in extension.ts.

export interface LanguageIcon {
    light: string;
    dark: string;
}

// language id -> icon resources, mirroring the entries originally shipped in
// package.json. Languages absent here (e.g. vhdl) never get a custom icon.
export const FILE_ICON_MAP: Record<string, LanguageIcon> = {
    systemverilog: { light: './resources/sv_light.svg', dark: './resources/sv_dark.svg' },
    systemverilogheader: { light: './resources/svh_light.svg', dark: './resources/svh_dark.svg' },
    verilog: { light: './resources/v_light.svg', dark: './resources/v_dark.svg' },
    verilogheader: { light: './resources/vh_light.svg', dark: './resources/vh_dark.svg' },
    verilogams: { light: './resources/vams.svg', dark: './resources/vams.svg' },
    veriloga: { light: './resources/va.svg', dark: './resources/va.svg' },
    'verilog-filelist': { light: './resources/f_light.svg', dark: './resources/f_dark.svg' },
    sdc: { light: './resources/sdc_light.svg', dark: './resources/sdc_dark.svg' },
    xdc: { light: './resources/sdc_light.svg', dark: './resources/sdc_dark.svg' }
};

/**
    Add (`enabled`) or remove (`!enabled`) the custom `icon` entry on each
    contributed language so the manifest matches the user's preference.
    Pure and idempotent — no IO.
    @param manifest a parsed package.json object (mutated in place)
    @param enabled whether the custom file icons should be present
    @return true if the manifest was changed, false if it already matched
*/
export function applyIconPreference(
    manifest: { contributes?: { languages?: Array<{ id: string; icon?: LanguageIcon }> } },
    enabled: boolean
): boolean {
    const langs = manifest?.contributes?.languages;
    if (!Array.isArray(langs)) {
        return false;
    }
    let changed = false;
    for (const lang of langs) {
        const wanted = enabled ? FILE_ICON_MAP[lang.id] : undefined;
        if (wanted) {
            if (!lang.icon || lang.icon.light !== wanted.light || lang.icon.dark !== wanted.dark) {
                lang.icon = { light: wanted.light, dark: wanted.dark };
                changed = true;
            }
        } else if (lang.icon !== undefined) {
            delete lang.icon;
            changed = true;
        }
    }
    return changed;
}
