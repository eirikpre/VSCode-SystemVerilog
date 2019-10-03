grammar CaseStatements;
import LoopingStatements;

case_statement : ( unique_priority )? case_keyword '(' case_expression ')' case_item ( case_item )*
    'endcase'
  | ( unique_priority )? case_keyword '(' case_expression ')' 'matches' case_pattern_item
    ( case_pattern_item )* 'endcase'
  | ( unique_priority )? 'case' '(' case_expression ')' 'inside' case_inside_item ( case_inside_item )*
    'endcase' ;
case_keyword : 'case' | 'casez' | 'casex' ;
case_expression : expression ;
case_item : case_item_expression ( ',' case_item_expression )* ':' statement_or_null
  | 'default' ( ':' )? statement_or_null ;
case_pattern_item : pattern ( '&&&' expression )? ':' statement_or_null
  | 'default' ( ':' )? statement_or_null ;
case_inside_item : open_range_list ':' statement_or_null | 'default' ( ':' )? statement_or_null ;
case_item_expression : expression ;
randcase_statement : 'randcase' randcase_item ( randcase_item )* 'endcase' ;
randcase_item : expression ':' statement_or_null ;
open_range_list : open_value_range ( ',' open_value_range )* ;
open_value_range : value_range ;
pattern : '.' variable_identifier
  | '.*'
  | constant_expression
  | 'tagged' member_identifier ( pattern )?
  | APOSTROPHE '{' pattern ( ',' pattern )* '}'
  | APOSTROPHE '{' member_identifier ':' pattern ( ',' member_identifier ':' pattern )* '}' ;
assignment_pattern : APOSTROPHE '{' expression ( ',' expression )* '}'
  | APOSTROPHE '{' structure_pattern_key ':' expression ( ',' structure_pattern_key ':' expression )* '}'
  | APOSTROPHE '{' array_pattern_key ':' expression ( ',' array_pattern_key ':' expression )* '}'
  | APOSTROPHE '{' constant_expression '{' expression ( ',' expression )* '}' '}' ;
structure_pattern_key : member_identifier | assignment_pattern_key ;
array_pattern_key : constant_expression | assignment_pattern_key ;
assignment_pattern_key : simple_type | 'default' ;
assignment_pattern_expression : ( assignment_pattern_expression_type )? assignment_pattern ;
assignment_pattern_expression_type : ps_type_identifier
  | ps_parameter_identifier
  | integer_atom_type
  | type_reference ;
constant_assignment_pattern_expression : assignment_pattern_expression ;
assignment_pattern_net_lvalue : APOSTROPHE '{' net_lvalue ( ',' net_lvalue )* '}' ; assignment_pattern_variable_lvalue : APOSTROPHE '{' variable_lvalue ( ',' variable_lvalue )* '}' ;
