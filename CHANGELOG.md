# Change Log
All notable changes to the "VSCode SystemVerilog - Language Support" extension will be documented in this file.


## [Unreleased]
- Tree view of module hierarchy
- IntelliSense support
- Back-end Language server for Systemverilog
- Complete syntax highlighting

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

## [0.4.0] - 2018-09-14
- Added setting to exclude folders from indexing
- `.svh/.vh` files added to indexing, thanks to `Kelly Mills`
- virtual classes indexed, thanks to `Kelly Mills`

## [0.3.4] - 2018-05-29
- DefinitionProvider is now able to trace ports and parameters of instantiated modules

## [0.3.3] - 2018-05-29
- Added setting to turn off indexing
- DefinitionProver now finds multiple results
- Added option to cancel ongoing indexing

## [0.3.0] - 2018-05-09
- WorkspaceSymbolProvider now only opens 100 files at once
- Outline for definitionProvider created, lookup in the indexed symbols

## [0.2.4] - 2018-02-06
- DocumentSymbolProvider now provides instatiated modules
- Adjusted TM of module instantiation 

## [0.2.3] - 2018-02-03
- Added extension icon
- Updated description

## [0.2.0] - 2018-02-02
- Added snippets and Alpha 2 published

## [0.1.5] - 2018-02-02
- Syntax highlighting covers every keyword and module instantiation

## [0.1.4] - 2018-01-30
- Make sure that uppercase objects do not get colorized as parameter, eg. intf.GPIO
- Added additional bracket entries, thanks goes to n-badri for input
- Added filetype associations `vh` and `svh`, thanks goes to n-badri for input

## [0.1.0] - 2018-01-25
- Elaborate syntax highlighting
- Go to symbol covers entire workspace (max 50 results)

## [0.0.3] - 2018-01-23
- Added examples to a test folder
- Many additions to the textmate grammar

## [0.0.2] - 2018-01-23
- Go to symbol/module in workspace (root folder)
- Go to symbol in document

## [0.0.1] - 2018-01-15
- Initial release
- Initial Syntax highlighting (Not complete)
