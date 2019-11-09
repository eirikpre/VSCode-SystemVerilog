grammar Primaries;
import ExpressionLeftsideValues;

constant_primary : primary_literal
  | ps_parameter_identifier constant_select
  | specparam_identifier ( '[' constant_range_expression ']' )?
  | genvar_identifier
  | formal_port_identifier constant_select
  | ( package_scope | class_scope )? enum_identifier
  | constant_concatenation ( '[' constant_range_expression ']' )?
  | constant_multiple_concatenation ( '[' constant_range_expression ']' )?
  | subroutine_call
  | constant_let_expression
  | '(' constant_mintypmax_expression ')'
  | ( simple_type | signing | 'string' | 'const' ) APOSTROPHE '(' constant_expression ')'
  | constant_primary APOSTROPHE '(' constant_expression ')'
  | constant_assignment_pattern_expression
  | type_reference
  | 'null' ;
primary : primary_literal
  | ( class_qualifier | package_scope )? hierarchical_identifier select
  | empty_unpacked_array_concatenation
  | concatenation ( '[' range_expression ']' )?
  | multiple_concatenation ( '[' range_expression ']' )?
  | function_subroutine_call
  | let_expression
  | '(' mintypmax_expression ')'
  | ( simple_type | constant_primary | signing | 'string' | 'const' ) APOSTROPHE '(' expression ')'
  | assignment_pattern_expression
  | streaming_concatenation
  | sequence_method_call
  | 'this'
  | '$'
  | 'null' ;
module_path_primary : number
  | identifier
  | module_path_concatenation
  | module_path_multiple_concatenation
  | function_subroutine_call
  | '(' module_path_mintypmax_expression ')' ;
class_qualifier : ( 'local' '::' )? ( implicit_class_handle '.' | class_scope )? ;
range_expression : expression | part_select_range ;
primary_literal : number | time_literal | unbased_unsized_literal | string_literal ;
time_literal : unsigned_number time_unit | fixed_point_number time_unit ;
time_unit : LOWER_S | LOWER_MS | LOWER_US | LOWER_NS | LOWER_PS | LOWER_FS ;
implicit_class_handle : 'this' | 'super' | 'this' '.' 'super' ;
bit_select : ( '[' expression ']' )* ;
select : ( ( '.' member_identifier bit_select )* '.' member_identifier )? bit_select
    ( '[' part_select_range ']' )? ;
nonrange_select : ( ( '.' member_identifier bit_select )* '.' member_identifier )? bit_select ;
constant_bit_select : ( '[' constant_expression ']' )* ;
constant_select : ( ( '.' member_identifier constant_bit_select )* '.' member_identifier )?
    constant_bit_select ( '[' constant_part_select_range ']' )? ;
constant_let_expression : let_expression ;
