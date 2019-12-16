grammar SubroutineCallStatements;
import AssertionStatements;

subroutine_call_statement : subroutine_call ';' | 'void' APOSTROPHE '(' function_subroutine_call ')' ';' ;
