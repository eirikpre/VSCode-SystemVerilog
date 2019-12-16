grammar LoopingStatements;
import SubroutineCallStatements;

loop_statement : 'forever' statement_or_null
  | 'repeat' '(' expression ')' statement_or_null
  | 'while' '(' expression ')' statement_or_null
  | 'for' '(' ( for_initialization )? ';' ( expression )? ';' ( for_step )? ')' statement_or_null
  | 'do' statement_or_null 'while' '(' expression ')' ';'
  | 'foreach' '(' ps_or_hierarchical_array_identifier '[' loop_variables ']' ')' statement ;
for_initialization : list_of_variable_assignments
  | for_variable_declaration ( ',' for_variable_declaration )* ;
for_variable_declaration : ( 'var' )? data_type variable_identifier '=' expression
    ( ',' variable_identifier '=' expression )* ;
for_step : for_step_assignment ( ',' for_step_assignment )* ;
for_step_assignment : operator_assignment | inc_or_dec_expression | function_subroutine_call ;
loop_variables : ( index_variable_identifier )? ( ',' ( index_variable_identifier )? )* ;
