grammar SystemTimingChecks;
import Concatenations;

system_timing_check : setup_timing_check
  | hold_timing_check
  | setuphold_timing_check
  | recovery_timing_check
  | removal_timing_check
  | recrem_timing_check
  | skew_timing_check
  | timeskew_timing_check
  | fullskew_timing_check
  | period_timing_check
  | width_timing_check
  | nochange_timing_check ;
setup_timing_check : '$setup' '(' data_event ',' reference_event ',' timing_check_limit ( ','
    ( notifier )? )? ')' ';' ;
hold_timing_check : '$hold' '(' reference_event ',' data_event ',' timing_check_limit ( ','
    ( notifier )? )? ')' ';' ;
setuphold_timing_check : '$setuphold' '(' reference_event ',' data_event ',' timing_check_limit ','
    timing_check_limit ( ',' ( notifier )? ( ',' ( timestamp_condition )? ( ',' ( timecheck_condition )?
    ( ',' ( delayed_reference )? ( ',' ( delayed_data )? )? )? )? )? )? ')' ';' ;
recovery_timing_check : '$recovery' '(' reference_event ',' data_event ',' timing_check_limit
    ( ',' ( notifier )? )? ')' ';' ;
removal_timing_check : '$removal' '(' reference_event ',' data_event ',' timing_check_limit
    ( ',' ( notifier )? )? ')' ';' ;
recrem_timing_check : '$recrem' '(' reference_event ',' data_event ',' timing_check_limit ','
    timing_check_limit ( ',' ( notifier )? ( ',' ( timestamp_condition )? ( ',' ( timecheck_condition )?
    ( ',' ( delayed_reference )? ( ',' ( delayed_data )? )? )? )? )? )? ')' ';' ;
skew_timing_check : '$skew' '(' reference_event ',' data_event ',' timing_check_limit
    ( ',' ( notifier )? )? ')' ';' ;
timeskew_timing_check : '$timeskew' '(' reference_event ',' data_event ',' timing_check_limit
    ( ',' ( notifier )? ( ',' ( event_based_flag )? ( ',' ( remain_active_flag )? )? )? )? ')' ';' ;
fullskew_timing_check : '$fullskew' '(' reference_event ',' data_event ',' timing_check_limit ','
    timing_check_limit ( ',' ( notifier )? ( ',' ( event_based_flag )? ( ',' ( remain_active_flag )? )? )? )? ')'
    ';' ;
period_timing_check : '$period' '(' controlled_reference_event ',' timing_check_limit ( ','
    ( notifier )? )? ')' ';' ;
width_timing_check : '$width' '(' controlled_reference_event ',' timing_check_limit ',' threshold
    ( ',' ( notifier )? )? ')' ';' ;
nochange_timing_check : '$nochange' '(' reference_event ',' data_event ',' start_edge_offset ','
    end_edge_offset ( ',' ( notifier )? )? ')' ';' ;
timecheck_condition : mintypmax_expression ;
controlled_reference_event : controlled_timing_check_event ;
data_event : timing_check_event ;
delayed_data : terminal_identifier | terminal_identifier '[' constant_mintypmax_expression ']' ;
delayed_reference : terminal_identifier | terminal_identifier '[' constant_mintypmax_expression ']' ;
end_edge_offset : mintypmax_expression ;
event_based_flag : constant_expression ;
notifier : variable_identifier ;
reference_event : timing_check_event ;
remain_active_flag : constant_mintypmax_expression ;
timestamp_condition : mintypmax_expression ;
start_edge_offset : mintypmax_expression ;
threshold : constant_expression ;
timing_check_limit : expression ;
timing_check_event : ( timing_check_event_control )? specify_terminal_descriptor
    ( '&&&' timing_check_condition )? ;
controlled_timing_check_event : timing_check_event_control specify_terminal_descriptor
    ( '&&&' timing_check_condition )? ;
timing_check_event_control : 'posedge' | 'negedge' | 'edge' | edge_control_specifier ;
specify_terminal_descriptor : specify_input_terminal_descriptor | specify_output_terminal_descriptor ;
edge_control_specifier : 'edge' '[' edge_descriptor ( ',' edge_descriptor )* ']' ;
edge_descriptor : ZERO ONE | ONE ZERO | z_or_x zero_or_one | zero_or_one z_or_x ;
zero_or_one : ZERO | ONE ;
z_or_x : X_DIGIT | Z_DIGIT ;
timing_check_condition : scalar_timing_check_condition | '(' scalar_timing_check_condition ')' ;
scalar_timing_check_condition : expression
  | '~' expression
  | expression '==' scalar_constant
  | expression '===' scalar_constant
  | expression '!=' scalar_constant
  | expression '!==' scalar_constant ;
scalar_constant : ONE? APOSTROPHE B ( ZERO | ONE ) | ONE | ZERO ;
