grammar LetDeclarations;
import PrimitiveInstantiationAndInstances;

let_declaration : 'let' let_identifier ( '(' ( let_port_list )? ')' )? '=' expression ';' ;
let_identifier : identifier ;
let_port_list : let_port_item ( ',' let_port_item )* ;
let_port_item : ( attribute_instance )* let_formal_type formal_port_identifier ( variable_dimension )*
    ( '=' expression )? ;
let_formal_type : data_type_or_implicit | 'untyped' ;
let_expression : ( package_scope )? let_identifier ( '(' ( let_list_of_arguments )? ')' )? ;
let_list_of_arguments : ( let_actual_arg )? ( ',' ( let_actual_arg )? )*
    ( ',' '.' identifier '(' ( let_actual_arg )? ')' )*
  | '.' identifier '(' ( let_actual_arg )? ')' ( ',' '.' identifier '(' ( let_actual_arg )? ')' )* ;
let_actual_arg : expression ;
