grammar TaskDeclarations;
import BlockItemDeclarations;

task_declaration : 'task' ( lifetime )? task_body_declaration ;
task_body_declaration : ( interface_identifier '.' | class_scope )? task_identifier ';'
    ( tf_item_declaration )* ( statement_or_null )* 'endtask' ( ':' task_identifier )?
  | ( interface_identifier '.' | class_scope )? task_identifier '(' ( tf_port_list )? ')' ';'
    ( block_item_declaration )* ( statement_or_null )* 'endtask' ( ':' task_identifier )? ;
tf_item_declaration : block_item_declaration | tf_port_declaration ;
tf_port_list : tf_port_item ( ',' tf_port_item )* ;
tf_port_item : ( attribute_instance )* ( tf_port_direction )? ( 'var' )? data_type_or_implicit
    ( port_identifier ( variable_dimension )* ( '=' expression )? )? ;
tf_port_direction : port_direction | 'const' 'ref' ;
tf_port_declaration : ( attribute_instance )* tf_port_direction ( 'var' )? data_type_or_implicit
    list_of_tf_variable_identifiers ';' ;
task_prototype : 'task' task_identifier ( '(' ( tf_port_list )? ')' )? ;
