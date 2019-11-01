grammar SubroutineCalls;
import Expressions;

tf_call : ps_or_hierarchical_tf_identifier ( attribute_instance )* ( '(' list_of_arguments ')' )? ;
system_tf_call : SYSTEM_TF_IDENTIFIER ( '(' list_of_arguments ')' )?
  | SYSTEM_TF_IDENTIFIER '(' data_type ( ',' expression )? ')'
  | SYSTEM_TF_IDENTIFIER '(' expression ( ',' ( expression )? )* ( ',' ( clocking_event )? )? ')' ;
subroutine_call : tf_call | system_tf_call | ( ( primary_literal
  | ( class_qualifier | package_scope )? hierarchical_identifier select
  | empty_unpacked_array_concatenation
  | concatenation ( '[' range_expression ']' )?
  | multiple_concatenation ( '[' range_expression ']' )?
  | let_expression
  | '(' mintypmax_expression ')'
  | ( ( simple_type | signing | 'string' | 'const' ) APOSTROPHE '(' expression ')' )
  | ( primary_literal
    | ps_parameter_identifier constant_select
    | specparam_identifier ( '[' constant_range_expression ']' )?
    | genvar_identifier
    | formal_port_identifier constant_select
    | ( package_scope | class_scope )? enum_identifier
    | constant_concatenation ( '[' constant_range_expression ']' )?
    | constant_multiple_concatenation ( '[' constant_range_expression ']' )?
    | constant_let_expression
    | '(' constant_mintypmax_expression ')'
    | ( ( simple_type | signing | 'string' | 'const' ) APOSTROPHE '(' constant_expression ')' )
    | ( primary_literal
      | ps_parameter_identifier constant_select
      | specparam_identifier ( '[' constant_range_expression ']' )?
      | genvar_identifier
      | formal_port_identifier constant_select
      | ( package_scope | class_scope )? enum_identifier
      | constant_concatenation ( '[' constant_range_expression ']' )?
      | constant_multiple_concatenation ( '[' constant_range_expression ']' )?
      | constant_let_expression
      | '(' constant_mintypmax_expression ')'
      | constant_assignment_pattern_expression
      | type_reference
      | 'null' ) APOSTROPHE '(' constant_expression ')'
    | constant_assignment_pattern_expression
    | type_reference
    | 'null' ) APOSTROPHE '(' expression ')'
  | assignment_pattern_expression
  | streaming_concatenation
  | sequence_method_call
  | 'this'
  | '$'
  | 'null'
  | implicit_class_handle ) '.' method_call_body )
  | subroutine_call ( ( APOSTROPHE '(' constant_expression ')' )? APOSTROPHE '(' expression ')' )? '.' method_call_body
  | ( 'std' '::' )? randomize_call ;
function_subroutine_call : subroutine_call ;
list_of_arguments : ( expression )? ( ',' ( expression )? )* ( ',' '.' identifier '(' ( expression )? ')' )*
  | '.' identifier '(' ( expression )? ')' ( ',' '.' identifier '(' ( expression )? ')' )* ;
list_of_arguments_with_strings : ( string_or_expression )? ( ',' ( string_or_expression )? )* ( ',' '.' identifier '(' ( expression )? ')' )*
  | '.' identifier '(' ( expression )? ')' ( ',' '.' identifier '(' ( expression )? ')' )* ;
method_call_body : method_identifier ( attribute_instance )* ( '(' list_of_arguments ')' )?
  | built_in_method_call ;
built_in_method_call : array_manipulation_call | randomize_call ;
array_manipulation_call : array_method_name ( attribute_instance )* ( '(' list_of_arguments ')' )?
    ( 'with' '(' expression ')' )?
  | array_method_call ;
array_method_call : expression '.' array_method_name ( attribute_instance )* ( ( '(' iterator_argument ')' )? 'with' '(' expression ')' )? ;
iterator_argument : identifier ;
randomize_call : 'randomize' ( attribute_instance )* ( '(' ( variable_identifier_list | 'null' )? ')' )?
    ( 'with' ( '(' ( identifier_list )? ')' )? constraint_block )? ;
array_method_name : method_identifier | 'unique' | 'and' | 'or' | 'xor' ;
