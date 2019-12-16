grammar ExpressionLeftsideValues;
import Operators;

net_lvalue : ps_or_hierarchical_net_identifier constant_select
  | '{' net_lvalue ( ',' net_lvalue )* '}'
  | ( assignment_pattern_expression_type )? assignment_pattern_net_lvalue ;
variable_lvalue : ( implicit_class_handle '.' | package_scope )? hierarchical_variable_identifier select
  | '{' variable_lvalue ( ',' variable_lvalue )* '}'
  | ( assignment_pattern_expression_type )? assignment_pattern_variable_lvalue
  | streaming_concatenation ;
nonrange_variable_lvalue : ( implicit_class_handle '.' | package_scope )?
    hierarchical_variable_identifier nonrange_select ;
