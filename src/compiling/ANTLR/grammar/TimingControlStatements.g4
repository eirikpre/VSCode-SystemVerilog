grammar TimingControlStatements;
import ConditionalStatements;

procedural_timing_control_statement : procedural_timing_control statement_or_null ;
delay_or_event_control : delay_control | event_control | 'repeat' '(' expression ')' event_control ;
delay_control : '#' delay_value | '#' '(' mintypmax_expression ')' ;
event_control : '@' hierarchical_event_identifier
  | '@' '(' event_expression ')'
  | '@*'
  | '@' '(*)'
  | '@' ps_or_hierarchical_sequence_identifier ;
event_expression : ( edge_identifier )? expression ( 'iff' expression )?
  | sequence_instance ( 'iff' expression )?
  | event_expression 'or' event_expression
  | event_expression ',' event_expression
  | '(' event_expression ')' ;
procedural_timing_control : delay_control | event_control | cycle_delay ;
jump_statement : 'return' ( expression )? ';'
  | 'break' ';'
  | 'continue' ';' ;
wait_statement : 'wait' '(' expression ')' statement_or_null
  | 'wait' 'fork' ';'
  | 'wait_order' '(' hierarchical_identifier ( ',' hierarchical_identifier )* ')' action_block ;
event_trigger : '->' hierarchical_event_identifier ';'
  | '->>' ( delay_or_event_control )? hierarchical_event_identifier ';' ;
disable_statement : 'disable' hierarchical_task_identifier ';'
  | 'disable' hierarchical_block_identifier ';'
  | 'disable' 'fork' ';' ;
