[![Build Status](https://dev.azure.com/CPS-External/VSCode-SystemVerilog/_apis/build/status/VSCode-SystemVerilog%20Github?branchName=master)](https://dev.azure.com/CPS-External/VSCode-SystemVerilog/_build/latest?definitionId=5&branchName=master)

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
- If you have netlists in your workspace you can exclude them in the settings, e.g.: `**/syn/**`
- _Disclaimer_: This is not a functional tool that will compile and simulate HDL, but it will make it easier and more user-friendly to write and navigate SystemVerilog and Verilog.

## Settings
- `systemverilog.includeIndexing`: _Array_, Globs defining files to be indexed
- `systemverilog.disableIndexing`: _Boolean_, Disable indexing
- `systemverilog.excludeIndexing`: _String_, Exclude files from indexing based on glob
- `systemverilog.parallelProcessing`: _Integer_, Number of files to process in parallel during indexing
- `systemverilog.antlrVerification`: _Boolean_, Use ANTLR parser to verify code in real-time
- `systemverilog.launchConfigurationVerilator`: _String_, Command to run when launching verilator
  * Default: _verilator --sv --lint-only --language 1800-2012 --Wall_
  * If not in path, replace _verilator_ with the appropriate command
- `systemverilog.launchConfigurationVCS`: _String_, Command to run when launching VCS
  * Default: _vcs_
  * If not in path, replace _vcs_ with the appropriate command
- `systemverilog.launchConfigurationVerible`: _String_, Command to run when launching Verible
  * Default: _verible-verilog-lint_
  * If not in path, replace _verible-verilog-lint_ with the appropriate command
- `systemverilog.excludeCompiling`: _String_, Files excluded from compiling when saved based on glob
- `systemverilog.compileOnSave`: _Boolean_, Compile files when saved
  * Default: *true*
- `systemverilog.compilerType`: _String_, Dropdown list to select a compiler type
  * Default: *Verilator*
- `systemverilog.trace.server`: _String_, Dropdown to select verbosity of LSP message tracing

## Known Issues
- Initial indexation might hog CPU/RAM when looking through files in very large workspaces

## Future
- Tree view of module hierarchy
- References document
- IntelliSense support (CompletionProvider)
- Back-end Language server for Systemverilog
- Update workspace state to save to [storagePath](https://code.visualstudio.com/api/advanced-topics/remote-extensions#persisting-extension-data-or-state)

## Contributing
- If you want to contribute with the project please fork this repository, clone it, make changes (preferably in a branch other than master) and finally create a Pull Request (more details [here](https://guides.github.com/activities/forking/)).
- To debug the extension locally first install the required dependencies (in the repository's root directory):
```
npm install
```
- Then compile the project at least once (this will generate the SystemVerilog lexer and parser in `src\compiling\ANTLR\grammar\build`):
```
npm run compile
```

- Finally, run the "Client + Server" run configuration:
![Debug configuration](resources/client_server_configuration.png)

## Release Notes
See the [changelog](CHANGELOG.md) for more details

### 0.11
- Syntax Highlighting Overhaul, thanks to `jecassis`
- Smaller extension footprint, thanks to `jecassis`
- Support for external formatter, thanks to `jecassis`
- Documentation upgrade, thanks to `jecassis`
- Dev update with ESLint, Prettier and tests update, thanks to `jecassis`

### 0.10
- Folders outside the workspace can now be included with `systemverilog.includeIndexing`
- It now saves the indexed database between runs, allowing quickstart on previous workspaces

### 0.9
- Increased the number of symbols the parser understands.
- Extensive bug squashing

### 0.8
- Compile an opened document using `Verilator` simulator, display errors/warnings as `Diagnostics` in documents, thanks to `oehaddouchi`
- Compile documents on save feature using `Verilator` simulator
- Added output channel `SystemVerilog`
- Added an `LSP`, set it to communicate with the extension's client
- Keep track of the recently used modules in the indexer
- Added diagnostic support for `VCS` compiler

### 0.7
- Instantiate module from already indexed module, thanks to `oehaddouchi`
- Update to documentSymbolProvider

### 0.6
- Stability and performance upgrade
- PCRE Regexes

### 0.5
- HoverProvider added, thanks to `toastedcornflakes`
- Improvements to DocumentSymbolProvider to better support Hover

### 0.4
- Added setting to exclude folders from indexing

### 0.3
- DefinitionProvider fetching from indexed modules implemented
- Indexing is now more safe, and will work for large workspaces

### 0.2
- Alpha 2 release with expanded syntax highlighting and snippets
- Indexing of every module/interface/program/class in workspace

### 0.1
- Alpha 1 release with syntax highlighting, and go to symbols
