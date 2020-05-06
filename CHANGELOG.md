# Change Log
All notable changes to the "VSCode SystemVerilog - Language Support" extension will be documented in this file.


## [Unreleased]
- Tree view of module hierarchy, given a top module
- IntelliSense support
- Back-end Language server for Systemverilog
- Complete syntax highlighting

## [0.10.6]
- Fixes to definitionProvider to allow package content lookup

## [0.10.3]
- Added includeIndexing setting to configure indexed files

## [0.10.0]
- Preserve state of indexed database in-between runs

## [0.9.5]
- Added setting to decrease precision of the documentSymbolProvider

## [0.9.4]
- Rewrote hover to use built-in caching

## [0.9.2]
- Adds package expansion on provideDefinition
- Includes experimental ANTLR parser (disabled by default)

## [0.9.0]
- Reworked parsing of variables
- And added appropriate types to them
- Added parsing of ports
- Added parsing of assertions

## [0.8.10]
- Added setting to force the fast indexing algorithm

## [0.8.6 - 0.8.9]
- Bugfixes

## [0.8.5] - 2019.09.06
- Added parsing and indexation of macros in smaller workspaces
- Added parsing of labels, so they show in the outline

## [0.8.4] - 2019.08.15
- Added diagnostic support for `VCS` compiler
- Fixed #60

## [0.8.3] - 2019.08.09
- Reactive indexation now chooses regexes based on number of files
- `typedef` is now indexed

## [0.8.2] - 2019.08.01
- Keep track of the recently used modules in the indexer

## [0.8.1] - 2019.07.31
- Implemented the LSP structure: client/server functionality to communicate with the server from the extension.
- Migrated the compiling feature from the extension to the server.
- Added compile `onSave` event to trigger compiling documents if `systemverilog.verilator.compileOnSave` is set to true in the VSCode's settings

## [0.8.0] - 2019.07.16
- Compile an opened document using `Verilator` simulator, display errors/warnings as `Diagnostics` in documents: `oehaddouchi`
- Add output channel `SystemVerilog` : `oehaddouchi`

## [0.7.1] - 2019.07.05
- Back-end update to separate indexation and parsing from the providers
- Work-in-Progress shell for CompletionProvider thanks to `Eivindfy`

## [0.7.0]
- Instantiate module from already indexed module, big thanks to `oehaddouchi`
- Back-end update with more dynamic data structures

## [0.6.0]
- PCRE Regexes
- WorkspaceSymbolProvider now using DocumentSymbolProvider
- Indexing is faster because it's now matching the entire file.
- Stability upgrade with better promise handling

## [0.5.3]
- Bugfix to syntax highlighting
- Bugfix to regex matching, thanks to `patstew`
- Added parallelProcessing, the number of files processed in parallel

## [0.5.0]
- HoverProvider added, big thanks to `toastedcornflakes`
- Improvements to DocumentSymbolProvider to better support Hover
- Improvement to findFiles for better indexing

## [0.4.0] - 2018.09.14
- Added setting to exclude folders from indexing
- `.svh/.vh` files added to indexing, thanks to `Kelly Mills`
- virtual classes indexed, thanks to `Kelly Mills`

## [0.3.4] - 2018.05.29
- DefinitionProvider is now able to trace ports and parameters of instantiated modules

## [0.3.3] - 2018.05.29
- Added setting to turn off indexing
- DefinitionProver now finds multiple results
- Added option to cancel ongoing indexing

## [0.3.0] - 2018.05.09
- WorkspaceSymbolProvider now only opens 100 files at once
- Outline for definitionProvider created, lookup in the indexed symbols

## [0.2.4] - 2018.02.06
- DocumentSymbolProvider now provides instatiated modules
- Adjusted TM of module instantiation

## [0.2.3] - 2018.02.03
- Added extension icon
- Updated description

## [0.2.0] - 2018.02.02
- Added snippets and Alpha 2 published

## [0.1.5] - 2018.02.02
- Syntax highlighting covers every keyword and module instantiation

## [0.1.4] - 2018.01.30
- Make sure that uppercase objects do not get colorized as parameter, eg. intf.GPIO
- Added additional bracket entries, thanks goes to n-badri for input
- Added filetype associations `vh` and `svh`, thanks goes to n-badri for input

## [0.1.0] - 2018.01.25
- Elaborate syntax highlighting
- Go to symbol covers entire workspace (max 50 results)

## [0.0.3] - 2018.01.23
- Added examples to a test folder
- Many additions to the textmate grammar

## [0.0.2] - 2018.01.23
- Go to symbol/module in workspace (root folder)
- Go to symbol in document

## [0.0.1] - 2018.01.15
- Initial release
- Initial Syntax highlighting (Not complete)
