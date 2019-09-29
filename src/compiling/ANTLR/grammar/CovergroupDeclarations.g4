grammar CovergroupDeclarations;
import LetDeclarations;

covergroup_declaration : 'covergroup' covergroup_identifier ( '(' ( tf_port_list )? ')' )?
    ( coverage_event )? ';' ( coverage_spec_or_option )* 'endgroup' ( ':' covergroup_identifier )? ;
coverage_spec_or_option : ( attribute_instance )* coverage_spec
  | ( attribute_instance )* coverage_option ';' ;
coverage_option : 'option.' member_identifier '=' expression
  | 'type_option.' member_identifier '=' constant_expression ;
coverage_spec : cover_point | cover_cross ;
coverage_event : clocking_event
  | 'with' 'function' 'sample' '(' ( tf_port_list )? ')'
  | '@@' '(' block_event_expression ')' ;
block_event_expression : block_event_expression 'or' block_event_expression
  | 'begin' hierarchical_btf_identifier
  | 'end' hierarchical_btf_identifier ;
hierarchical_btf_identifier : hierarchical_tf_identifier
  | hierarchical_block_identifier
  | ( hierarchical_identifier '.' | class_scope )? method_identifier ;
cover_point : ( ( data_type_or_implicit )? cover_point_identifier ':' )? 'coverpoint' expression
    ( 'iff' '(' expression ')' )? bins_or_empty ;
bins_or_empty : '{' ( attribute_instance )* ( bins_or_options ';' )* '}' | ';' ;
bins_or_options : coverage_option 
  | ( 'wildcard' )? bins_keyword bin_identifier ( '[' ( covergroup_expression )? ']' )?  '='
    '{' covergroup_range_list '}' ( 'with' '(' with_covergroup_expression ')' )?
    ( 'iff' '(' expression ')' )?
  | ( 'wildcard' )? bins_keyword bin_identifier ( '[' ( covergroup_expression )? ']' )? '='
    cover_point_identifier 'with' '(' with_covergroup_expression ')' ( 'iff' '(' expression ')' )?
  | ( 'wildcard' )? bins_keyword bin_identifier ( '[' ( covergroup_expression )? ']' )? '='
    set_covergroup_expression ( 'iff' '(' expression ')' )?
  | ( 'wildcard' )? bins_keyword bin_identifier ( '[' ']' )? '=' trans_list ( 'iff' '(' expression ')' )?
  | bins_keyword bin_identifier ( '[' ( covergroup_expression )? ']' )? '=' 'default'
    ( 'iff' '(' expression ')' )?
  | bins_keyword bin_identifier '=' 'default' 'sequence' ( 'iff' '(' expression ')' )? ;
bins_keyword : 'bins' | 'illegal_bins' | 'ignore_bins' ;
trans_list : '(' trans_set ')' ( ',' '(' trans_set ')' )* ;
trans_set : trans_range_list ( '=>' trans_range_list )* ;
trans_range_list : trans_item
  | trans_item '[*' repeat_range ']'
  | trans_item '[–>' repeat_range ']'
  | trans_item '[=' repeat_range ']' ;
trans_item : covergroup_range_list ;
repeat_range : covergroup_expression | covergroup_expression ':' covergroup_expression ;
cover_cross : ( cross_identifier ':' )? 'cross' list_of_cross_items ( 'iff' '(' expression ')' )?
    cross_body ;
list_of_cross_items : cross_item ',' cross_item ( ',' cross_item )* ;
cross_item : cover_point_identifier | variable_identifier ;
cross_body : '{' ( cross_body_item ';' )* '}' | ';' ;
cross_body_item : function_declaration | bins_selection_or_option ';' ;
bins_selection_or_option : ( attribute_instance )* coverage_option | ( attribute_instance )*
    bins_selection ;
bins_selection : bins_keyword bin_identifier '=' select_expression ( 'iff' '(' expression ')' )? ;
select_expression : select_condition
  | '!' select_condition
  | select_expression '&&' select_expression
  | select_expression '||' select_expression
  | '(' select_expression ')'
  | select_expression 'with' '(' with_covergroup_expression ')'
    ( 'matches' integer_covergroup_expression )?
  | cross_identifier
  | cross_set_expression ( 'matches' integer_covergroup_expression )? ;
select_condition : 'binsof' '(' bins_expression ')' ( 'intersect' '{' covergroup_range_list '}' )? ;
bins_expression : variable_identifier | cover_point_identifier ( '.' bin_identifier )? ;
covergroup_range_list : covergroup_value_range ( ',' covergroup_value_range )* ;
covergroup_value_range : covergroup_expression
  | '[' covergroup_expression ':' covergroup_expression ']' ;
with_covergroup_expression : covergroup_expression ;
set_covergroup_expression : covergroup_expression ;
integer_covergroup_expression : covergroup_expression ;
cross_set_expression : covergroup_expression ;
covergroup_expression : expression ;
