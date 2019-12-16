grammar Randsequence;
import SpecifyBlockDeclaration;

randsequence_statement : 'randsequence' '(' ( production_identifier )? ')' production ( production )*
    'endsequence' ;
production : ( data_type_or_void )? production_identifier ( '(' tf_port_list ')' )? ':' rs_rule
    ( '|' rs_rule )* ';' ;
rs_rule : rs_production_list ( ':=' weight_specification ( rs_code_block )? )? ;
rs_production_list : rs_prod ( rs_prod )*
  | 'rand' 'join' ( '(' expression ')' )? production_item production_item ( production_item )* ;
weight_specification : integral_number | ps_identifier | '(' expression ')' ;
rs_code_block : '{' ( data_declaration )* ( statement_or_null )* '}' ;
rs_prod : production_item | rs_code_block | rs_if_else | rs_repeat | rs_case ;
production_item : production_identifier ( '(' list_of_arguments ')' )? ;
rs_if_else : 'if' '(' expression ')' production_item ( 'else' production_item )? ;
rs_repeat : 'repeat' '(' expression ')' production_item ;
rs_case : 'case' '(' case_expression ')' rs_case_item ( rs_case_item )* 'endcase' ;
rs_case_item : case_item_expression ( ',' case_item_expression )* ':' production_item ';'
  | 'default' ( ':' )? production_item ';' ;
