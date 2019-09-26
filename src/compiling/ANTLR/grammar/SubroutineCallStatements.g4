grammar SubroutineCallStatements;
import AssertionStatements;

subroutine_call_statement : subroutine_call ';' | 'void' '\'' '(' function_subroutine_call ')' ';' ;
