# SystemVerilog - Language Support

This package adds language support for Verilog/SystemVerilog. It supports systemverilog syntax, with planned support for signal intelliSense.

- If you find a bug, or would like a feature; Add it as an [Issue](https://github.com/eirikpre/VSCode-SystemVerilog/issues) or a [Pull-Request](https://github.com/eirikpre/VSCode-SystemVerilog/pulls)

## Features
- Elaborate Syntax Highlighting \
![syntax_example](docs/syntax_example_adder.PNG)
- Go to symbol in document
- Go to symbol in workspace folder (indexed modules/interfaces/programs/classes/packages)
- Code snippets for many common blocks

## Recommendations
- For `.sv`/`.v` icons are now included in [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons) thanks to mrvkino
- This is not a functional HDL tool that will compile and simulate your code, but this extension will make it easier and more user-friendly to write/navigate SystemVerilog

## Known Issues
- Starting up may be a little bit slow if it's a large workspace with many `.sv` files because of indexing
- Go to symbol does regex search instead of fuzzy matching.

## Future
- Instantiate module from already indexed module/class/interface/program
- Go to / peak implementation of indexed module/class/interface/program
- Tree view of module hierarchy
- References document
- IntelliSense support
- Back-end Language server for Systemverilog

## Release Notes
### 0.2
- Alpha 2 release with expanded syntax highlighting and snippets
- Indexing of every module/interface/program/class in workspace
### 0.1
- Alpha 1 release with syntax highlighting, and go to symbols
- See changelog for more details

