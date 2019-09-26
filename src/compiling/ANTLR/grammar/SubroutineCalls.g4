grammar SubroutineCalls;
import Expressions;

constant_function_call : function_subroutine_call ;
tf_call : ps_or_hierarchical_tf_identifier ( attribute_instance )* ( '(' list_of_arguments ')' )? ;
system_tf_call : SYSTEM_TF_IDENTIFIER ( '(' list_of_arguments ')' )?
  | SYSTEM_TF_IDENTIFIER '(' data_type ( ',' expression )? ')'
  | SYSTEM_TF_IDENTIFIER '(' expression ( ',' ( expression )? )* ( ',' ( clocking_event )? )? ')' ;
subroutine_call : tf_call | system_tf_call | method_call | ( 'std' '::' )? randomize_call ;
function_subroutine_call : subroutine_call ;
list_of_arguments : ( expression )? ( ',' ( expression )? )* ( ',' '.' identifier '(' ( expression )? ')' )*
  | '.' identifier '(' ( expression )? ')' ( ',' '.' identifier '(' ( expression )? ')' )* ;
method_call : method_call_root '.' method_call_body ;
method_call_body : method_identifier ( attribute_instance )* ( '(' list_of_arguments ')' )?
  | built_in_method_call ;
built_in_method_call : array_manipulation_call | randomize_call ;
array_manipulation_call : array_method_name ( attribute_instance )* ( '(' list_of_arguments ')' )?
    ( 'with' '(' expression ')' )? ;
randomize_call : 'randomize' ( attribute_instance )* ( '(' ( variable_identifier_list | 'null' )? ')' )?
    ( 'with' ( '(' ( identifier_list )? ')' )? constraint_block )? ;
method_call_root : primary | implicit_class_handle ;
array_method_name : method_identifier | 'unique' | 'and' | 'or' | 'xor' ;
