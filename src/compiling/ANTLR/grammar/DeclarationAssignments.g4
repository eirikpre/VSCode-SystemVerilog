grammar DeclarationAssignments;
import DeclarationRanges;

defparam_assignment : hierarchical_parameter_identifier '=' constant_mintypmax_expression ;
net_decl_assignment : net_identifier ( unpacked_dimension )* ( '=' expression )? ;
param_assignment : parameter_identifier ( unpacked_dimension )* ( '=' constant_param_expression )? ;
specparam_assignment : specparam_identifier '=' constant_mintypmax_expression
  | pulse_control_specparam ;
type_assignment : type_identifier ( '=' data_type )? ;
pulse_control_specparam : 'PATHPULSE$' '=' '(' reject_limit_value ( ',' error_limit_value )? ')'
  | 'PATHPULSE$' specify_input_terminal_descriptor '$' specify_output_terminal_descriptor '='
    '(' reject_limit_value ( ',' error_limit_value )? ')' ;
error_limit_value : limit_value ;
reject_limit_value : limit_value ;
limit_value : constant_mintypmax_expression ;
variable_decl_assignment : variable_identifier ( variable_dimension )* ( '=' expression )?
  | dynamic_array_variable_identifier unsized_dimension ( variable_dimension )* ( '=' dynamic_array_new )?
  | class_variable_identifier ( '=' class_new )? ;
class_new : ( class_scope )? 'new' ( '(' list_of_arguments ')' )?
  | 'new' expression ;
dynamic_array_new : 'new' '[' expression ']' ( '(' expression ')' )? ;
