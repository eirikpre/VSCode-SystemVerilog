grammar ClassItems;
import Constraints;

class_item : ( attribute_instance )* class_property
  | ( attribute_instance )* class_method
  | ( attribute_instance )* class_constraint
  | ( attribute_instance )* class_declaration
  | ( attribute_instance )* covergroup_declaration
  | local_parameter_declaration ';'
  | parameter_declaration ';'
  | ';' ;
class_property : ( property_qualifier )* data_declaration
  | 'const' ( class_item_qualifier )* data_type const_identifier ( '=' constant_expression )? ';' ;
class_method : ( method_qualifier )* task_declaration
  | ( method_qualifier )* function_declaration
  | 'pure' 'virtual' ( class_item_qualifier )* method_prototype ';'
  | 'extern' ( method_qualifier )* method_prototype ';'
  | ( method_qualifier )* class_constructor_declaration
  | 'extern' ( method_qualifier )* class_constructor_prototype ;
class_constructor_prototype : 'function' 'new' ( '(' ( tf_port_list )? ')' )? ';' ;
class_constraint : constraint_prototype | constraint_declaration ;
class_item_qualifier : 'static' | 'protected' | 'local' ;
property_qualifier : random_qualifier | class_item_qualifier ;
random_qualifier : 'rand' | 'randc' ;
method_qualifier : ( 'pure' )? 'virtual' | class_item_qualifier ;
method_prototype : task_prototype | function_prototype ;
class_constructor_declaration : 'function' ( class_scope )? 'new' ( '(' ( tf_port_list )? ')' )? ';'
    ( block_item_declaration )* ( 'super' '.' 'new' ( '(' list_of_arguments ')' )? ';' )?
    ( function_statement_or_null )* 'endfunction' ( ':' 'new' )? ;
