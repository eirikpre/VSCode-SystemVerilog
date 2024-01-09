[![](https://img.shields.io/visual-studio-marketplace/v/eirikpre.systemverilog?color=%2346bd19)](https://marketplace.visualstudio.com/items?itemName=eirikpre.systemverilog)
[![](https://img.shields.io/visual-studio-marketplace/i/eirikpre.systemverilog)](https://marketplace.visualstudio.com/items?itemName=eirikpre.systemverilog)
![](https://img.shields.io/visual-studio-marketplace/stars/eirikpre.systemverilog)
[![](https://img.shields.io/github/actions/workflow/status/eirikpre/VSCode-SystemVerilog/test.yaml)](https://github.com/eirikpre/VSCode-SystemVerilog/actions?query=workflow%3ATest+branch%3Amaster)

# SystemVerilog - Language Support

This VS Code extension provides features to read, navigate and write SystemVerilog code much faster.

## Features

- Elaborate [syntax highlighting](#examples)
- Go to symbol in document (`Ctrl+Shift+O`)
- Go to symbol in workspace folder (indexed modules/interfaces/programs/classes/packages) (`Ctrl+T`)
- Go to definition (_works for module/interface/program/class/package names and for ports too!_) (`Ctrl+LeftClick`)
- Find references (_works for module/interface/program/class/package names and for ports too!_) (`Ctrl+LeftClick`)
- Quick-start on already indexed workspaces
- Code snippets for many common blocks
- Instantiate module from already indexed module
- Linter capabilites with simulators ([more info on the wiki](https://github.com/eirikpre/VSCode-SystemVerilog/wiki))
- Fast real-time error identification through an integrated SystemVerilog parser and IntelliSense (fully accurate to IEEE Standard 1800-2017)
- If you find a bug or would like a feature, request it as an [Issue](https://github.com/eirikpre/VSCode-SystemVerilog/issues) or submit a [Pull Request](https://github.com/eirikpre/VSCode-SystemVerilog/pulls)

## Examples

### Syntax Highlighting

![Syntax Highlighting Example](resources/syntax_example_adder.png)

### Go To Definition

![Go To Definition Example](resources/goToDef_demo.gif)

### Find References

![Find References Example](resources/find_references.gif)

### Module Instantiation

![Module Instantiation Example](resources/moduleInit_demo.gif)

## Recommendations

- If you have netlists in your workspace you can exclude them in the settings with `systemverilog.excludeIndexing`, e.g.: `**/syn/**`
- When running in workspaces with a large number of files, the `systemverilog.documentSymbolsPrecision` setting may need to be reduced down to 'full_no_references'. Doing this will turn off the 'find references' feature which will dramatically speedup the parsing.
- When you have large files, the `systemverilog.maxLineCountIndexing` setting can be tuned to prevent full parsing of these files, which will improve extension performance.
- _Disclaimer_: This is not a functional tool that will compile and simulate HDL, but it will make it easier and more user-friendly to write and navigate SystemVerilog and Verilog.

## Settings

- `systemverilog.includeIndexing`: _Array_, Files included for indexing \([glob pattern](https://code.visualstudio.com/docs/editor/glob-patterns)\). Examples:
  - Include files within the workspace's rtl folder (`*` at front of pattern denotes path is relative to workspace root): `**/rtl/**/*.{sv,v,svh,vh}`
  - Add all files with a '.svp' extension: `**/*.svp`
  - Add files only when in a specific workspace: `/abs/path/to/workspace/rtl/**/*.{sv,v,svh,vh}`
- `systemverilog.disableIndexing`: _Boolean_, Disable indexing
- `systemverilog.excludeIndexing`: _String_, Exclude files from indexing based on a [glob pattern](https://code.visualstudio.com/docs/editor/glob-patterns). Examples:
  - Exclude all files in the 'synth' folder: `**/synth/*`
  - Exclude more than one folder: `**/{synth,pnr}/**`
  - Exclude .v files in the 'compile' folder: `**/compile/*.v`
  - Exclude .v files in the 'compile' dir and exclude all files in the 'synth' folder: `{**/synth/**,**/compile/*.v}`
- `systemverilog.forceFastIndexing`: _Boolean_, Use fast regular expression parsing
- `systemverilog.enableIncrementalIndexing`: _Boolean_, Enable incremental indexation as files are opened
- `systemverilog.parallelProcessing`: _Integer_, Number of files to process in parallel during indexing
- `systemverilog.forceFastIndexing`: _Boolean_, force indexer to bo basic parsing. Good for when the extension takes too long to initialize.
- `systemverilog.enableIncrementalIndexing`: _Boolean_, Enable incremental indexation as you open files.
- `systemverilog.maxLineCountIndexing`: _Boolean_, When indexing a file, if the line count is larger than this number, _fast_ indexing will be used to improve symbol lookup performance, as fewer symbols will be parsed.
- `systemverilog.documentSymbolsPrecision`: _String_, The level of detail the parser should use when looking for symbols:
  - _full_: detect blocks, ports, parameters, classes, methods, typedefs, defines, labels, instantiations, assertions, and _references across files_.
  - _full_no_references_: detect blocks, ports, parameters, classes, methods, typedefs, defines, labels, instantiations, and assertions.
  - _declarations_: detect blocks, ports, parameters, classes, methods, typedefs, and defines.
  - _fast_: detect only common blocks (module, class, interface, package, program) without hierarchy.
- `systemverilog.antlrVerification`: _Boolean_, Use ANTLR parser to verify code in real-time
- `systemverilog.verifyOnOpen`: _Boolean_, Run ANTLR verification on all files when opened.
- `systemverilog.launchConfigurationVerilator`: _String_, Command to run when launching verilator
  - Default: _verilator --sv --lint-only --language 1800-2012 --Wall_
  - If not in path, replace _verilator_ with the appropriate command
- `systemverilog.launchConfigurationVCS`: _String_, Command to run when launching VCS
  - Default: _vcs_
  - If not in path, replace _vcs_ with the appropriate command
- `systemverilog.launchConfigurationVerible`: _String_, Command to run when launching Verible
  - Default: _verible-verilog-lint_
  - If not in path, replace _verible-verilog-lint_ with the appropriate command
- `systemverilog.excludeCompiling`: _String_, Files excluded from compiling when saved based on a [glob pattern](https://code.visualstudio.com/docs/editor/glob-patterns)
- `systemverilog.compileOnSave`: _Boolean_, Compile files when saved
  - Default: `true`
- `systemverilog.compilerType`: _String_, Dropdown list to select a compiler type
  - Default: `Verilator`
- `systemverilog.trace.server`: _String_, Dropdown to select verbosity of LSP message tracing
- `systemverilog.compileOnOpen`: _Boolean_, Compile all files when opened
  - Default: `false`

### Customizations

Use the provided settings in a user or workspace `settings.json` as appropriate. Here are a few examples:

```json
{
  "editor.bracketPairColorization.enabled": true, // turn on bracket pair coloring
  "editor.guides.bracketPairs": "active", // turn on bracket pair guides
  // Change theme default colors for specific tokens
  // To find tokens use: https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#scope-inspector
  "editor.tokenColorCustomizations": {
    // Customize per theme or globally
    "[Theme Name]": {
      "textMateRules": [
        {
          // Workaround: Extension marks escaped identifiers as regular expressions to prevent bracket matching,
          //             so recoloring it back to identifier color
          "scope": ["string.regexp.identifier.systemverilog"],
          "settings": {
            "foreground": "#e06c75"
          }
        }
      ]
    }
  },
  // Customize formatting command to suite preferences
  "systemverilog.formatCommand": "verible-verilog-format --assignment_statement_alignment=preserve --case_items_alignment=infer --class_member_variables_alignment=infer --formal_parameters_alignment=preserve --formal_parameters_indentation=indent --named_parameter_alignment=flush-left --named_parameter_indentation=indent --named_port_alignment=flush-left --named_port_indentation=indent --net_variable_alignment=preserve --port_declarations_alignment=preserve --port_declarations_indentation=indent",
  // Add additional file extensions to associate with SystemVerilog and include them in the indexing
  "files.associations": {
    "*.svi": "systemverilog",
    "*.svp": "systemverilog",
    "*.pkg": "systemverilog"
  },
  "systemverilog.includeIndexing": ["**/*.{sv,v,svh,vh,svi,svp,pkg}"]
}
```

### Handling Spaces In Executable Paths

Please exercise caution when setting an executable path in the settings, such as the case with  `systemverilog.formatCommand`, `systemverilog.launchConfigurationVerilator`, `systemverilog.launchConfigurationVCS`, and `systemverilog.launchConfigurationVerible`. Any spaces will be assumed to be arguments and not the executable itself. In Windows, for example, you might have an executable configured as follows:

```json
"systemverilog.formatCommand" : "C:\\Program Files\\verible\\bin\\verible-verilog-format --case_items_alignment=infer"
```

Because of the space in 'Program Files', the extension will infer that the executable is `C:\\Program` with two arguments: `Files\\verible\\bin\\verible-verilog-format` and `--case_items_alignment=infer`. This breaks the executable path. There are a couple solutions for tihs:

1. (Prefered) Add the executable to your PATH and call it directly.
  - [Windows instructions](https://www.computerhope.com/issues/ch000549.htm)
  - [Linux Instructions](https://phoenixnap.com/kb/linux-add-to-path)
  - [Mac Instructions](https://www.architectryan.com/2012/10/02/add-to-the-path-on-mac-os-x-mountain-lion/#.Uydjga1dXDg)

```json
"systemverilog.formatCommand" : "verible-verilog-format --case_items_alignment=infer"
```

2. If you can't edit your path (maybe because of privileges), then don't use spaces in paths. Either move the executable to a different location with no spaces, or (in the case of windows) you can use [DOS short names](https://superuser.com/questions/348079/how-can-i-find-the-short-path-of-a-windows-directory-file) as follows:

```json
"systemverilog.formatCommand" : "C:\\PROGRA~1\\verible\\bin\\verible-verilog-format --case_items_alignment=infer"
```





## Known Issues

- Initial indexing might hog CPU/RAM when looking through files in very large workspaces

## Future

- Tree view of module hierarchy
- References document
- Back-end Language server for SystemVerilog
- Update workspace state to save to [storagePath](https://code.visualstudio.com/api/advanced-topics/remote-extensions#persisting-extension-data-or-state)

## Contributing

- If you want to contribute with the project please fork this repository, clone it, make changes (preferably in a branch other than master) and finally create a Pull Request (more details [here](https://guides.github.com/activities/forking/)).
- To debug the extension locally first install the required dependencies (in the repository's root directory):

```bash
npm install
```

- Then compile the project at least once (this will generate the SystemVerilog lexer and parser in `src\compiling\ANTLR\grammar\build`):

```bash
npm run compile
```

- Finally, run the "Client + Server" run configuration:

![Debug configuration](resources/client_server_configuration.png)

## Release Notes

See the [changelog](CHANGELOG.md)
