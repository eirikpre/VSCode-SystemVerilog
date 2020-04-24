
import {SystemVerilogListener} from './grammar/build/SystemVerilogListener';
import {Recognizer, RecognitionException, ANTLRErrorListener} from 'antlr4ts'

/**
* Stores errors in ANTLR parsing in a list for later access
*/
export class SyntaxErrorListener implements ANTLRErrorListener<any> {
    public error_list = []

    public syntaxError<T>(recognizer: Recognizer<T, any>, offendingSymbol: T, line: number, charPositionInLine: number,
                          msg: string, e: RecognitionException | undefined): void {
        line = line - 1;
        this.error_list.push({offendingSymbol,line,charPositionInLine,msg});
    }
}