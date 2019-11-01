grammar Statements;
import TimingControlStatements;

statement_or_null : statement | ( attribute_instance )* ';' ;
statement : ( block_identifier ':' )? ( attribute_instance )* statement_item ;
statement_item : blocking_assignment ';'
  | nonblocking_assignment ';'
  | procedural_continuous_assignment ';'
  | case_statement
  | conditional_statement
  | inc_or_dec_expression ';'
  | subroutine_call_statement
  | disable_statement
  | event_trigger
  | loop_statement
  | jump_statement
  | par_block
  | procedural_timing_control_statement
  | seq_block
  | wait_statement
  | procedural_assertion_statement
  | clocking_drive ';'
  | randsequence_statement
  | randcase_statement
  | expect_property_statement
  | display_tasks
  | monitor_tasks
  | timescale_compiler_directive
  | include_compiler_directive
  | simulation_control_task ;
display_tasks : display_task_name ( '(' list_of_arguments_with_strings ')' )? ';' ;
display_task_name : '$display' | '$displayb' | '$displayo' | '$displayh'
  | '$write' | '$writeb' | '$writeo' | '$writeh' ;
monitor_tasks : monitor_task_name ( '(' list_of_arguments_with_strings ')' )? ';'
  | '$monitoron' ';'
  | '$monitoroff' ';' ;
monitor_task_name : '$monitor' | '$monitorb' | '$monitoro' | '$monitorh' ;
function_statement : statement ;
function_statement_or_null : function_statement | ( attribute_instance )* ';' ;
variable_identifier_list : variable_identifier ( ',' variable_identifier )* ;
