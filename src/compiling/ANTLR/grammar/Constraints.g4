grammar Constraints;
import PackageItems;

constraint_declaration : ( 'static' )? 'constraint' constraint_identifier constraint_block ;
constraint_block : '{' ( constraint_block_item )* '}' ;
constraint_block_item : 'solve' solve_before_list 'before' solve_before_list ';'
  | constraint_expression ;
solve_before_list : constraint_primary ( ',' constraint_primary )* ;
constraint_primary : ( implicit_class_handle '.' | class_scope )? hierarchical_identifier select ;
constraint_expression : ( 'soft' )? expression_or_dist ';'
  | uniqueness_constraint ';'
  | expression '–>' constraint_set
  | 'if' '(' expression ')' constraint_set ( 'else' constraint_set )?
  | 'foreach' '(' ps_or_hierarchical_array_identifier '[' loop_variables ']' ')' constraint_set
  | 'disable' 'soft' constraint_primary ';' ;
uniqueness_constraint : 'unique' '{' open_range_list '}' ;
constraint_set : constraint_expression
  | '{' ( constraint_expression )* '}' ;
dist_list : dist_item ( ',' dist_item )* ;
dist_item : value_range ( dist_weight )? ;
dist_weight : ':=' expression | ':/' expression ;
constraint_prototype : ( constraint_prototype_qualifier )? ( 'static' )? 'constraint'
    constraint_identifier ';' ;
constraint_prototype_qualifier : 'extern' | 'pure' ;
extern_constraint_declaration : ( 'static' )? 'constraint' class_scope constraint_identifier
    constraint_block ;
identifier_list : identifier ( ',' identifier )* ;
