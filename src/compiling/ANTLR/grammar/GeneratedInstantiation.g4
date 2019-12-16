grammar GeneratedInstantiation;
import UDPDeclaration;

generate_region : 'generate' ( generate_item )* 'endgenerate';
loop_generate_construct :
    'for' '(' genvar_initialization ';' genvar_expression ';' genvar_iteration ')' generate_block ;
genvar_initialization : ( 'genvar' )? genvar_identifier '=' constant_expression ;
genvar_iteration : genvar_identifier assignment_operator genvar_expression
  | inc_or_dec_operator genvar_identifier
  | genvar_identifier inc_or_dec_operator ;
conditional_generate_construct : if_generate_construct | case_generate_construct ;
if_generate_construct : 'if' '(' constant_expression ')' generate_block ( 'else' generate_block )? ;
case_generate_construct : 'case' '(' constant_expression ')' case_generate_item ( case_generate_item )*
    'endcase' ;
case_generate_item : constant_expression ( ',' constant_expression )* ':' generate_block
  | 'default' ( ':' )? generate_block ;
generate_block : generate_item | ( generate_block_identifier ':' )? 'begin'
    ( ':' generate_block_identifier )? ( generate_item )* 'end' ( ':' generate_block_identifier )? ;
generate_item : module_or_generate_item | interface_or_generate_item | checker_or_generate_item ;
