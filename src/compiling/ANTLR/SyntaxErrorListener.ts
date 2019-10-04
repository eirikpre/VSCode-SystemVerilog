
import {SystemVerilogListener} from './grammar/build/SystemVerilogListener';
import {Recognizer, RecognitionException, ANTLRErrorListener} from 'antlr4ts'

export class SyntaxErrorListener implements ANTLRErrorListener<any> {
  error_list = []
    public syntaxError<T>(
      recognizer: Recognizer<T, any>,
      offendingSymbol: T,
      line: number,
      charPositionInLine: number,
      msg: string,
      e: RecognitionException | undefined): void {
        line = line-1;
        this.error_list.push({offendingSymbol,line,charPositionInLine,msg});
    }
}