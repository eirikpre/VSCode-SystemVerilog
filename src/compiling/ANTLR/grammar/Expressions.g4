grammar Expressions;
import Primaries;

inc_or_dec_expression : inc_or_dec_operator ( attribute_instance )* variable_lvalue
  | variable_lvalue ( attribute_instance )* inc_or_dec_operator ;
constant_expression : constant_primary
  | unary_operator ( attribute_instance )* constant_primary
  | constant_expression binary_operator ( attribute_instance )* constant_expression
  | constant_expression '?' ( attribute_instance )* constant_expression ':' constant_expression ;
constant_mintypmax_expression : constant_expression
  | constant_expression ':' constant_expression ':' constant_expression ;
constant_param_expression : constant_mintypmax_expression | data_type | '$' ;
param_expression : mintypmax_expression | data_type | '$' ;
constant_range_expression : constant_expression | constant_part_select_range ;
constant_part_select_range : constant_range | constant_indexed_range ;
constant_range : constant_expression ':' constant_expression ;
constant_indexed_range : constant_expression '+:' constant_expression
  | constant_expression '-:' constant_expression ;
string_or_expression : string_literal | expression ;
expression : primary
  | unary_operator ( attribute_instance )* primary
  | inc_or_dec_expression
  | '(' operator_assignment ')'
  | expression binary_operator ( attribute_instance )* expression
  | expression ( '&&&' expression )* '?' ( attribute_instance )* expression ':' expression
  | expression ( '&&&' expression 'matches' pattern )* '?' ( attribute_instance )* expression ':' expression
  | expression 'matches' pattern ( '&&&' expression )* '?' ( attribute_instance )* expression ':' expression
  | expression 'matches' pattern ( '&&&' expression 'matches' pattern )* '?' ( attribute_instance )* expression ':' expression
  | expression 'inside' '{' open_range_list '}'
  | tagged_union_expression ;
tagged_union_expression : 'tagged' member_identifier ( expression )? ;
value_range : expression | '[' expression ':' expression ']' ;
mintypmax_expression : expression | expression ':' expression ':' expression ;
module_path_conditional_expression : module_path_expression '?' ( attribute_instance )*
    module_path_expression ':' module_path_expression ;
module_path_expression : module_path_primary
  | unary_module_path_operator ( attribute_instance )* module_path_primary
  | module_path_expression binary_module_path_operator ( attribute_instance )* module_path_expression
  | module_path_expression '?' ( attribute_instance )* module_path_expression ':' module_path_expression ;
module_path_mintypmax_expression : module_path_expression
  | module_path_expression ':' module_path_expression ':' module_path_expression ;
part_select_range : constant_range | indexed_range ;
indexed_range : expression '+:' constant_expression
  | expression '-:' constant_expression ;
genvar_expression : constant_expression ;
