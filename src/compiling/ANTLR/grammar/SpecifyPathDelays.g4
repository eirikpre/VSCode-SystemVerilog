grammar SpecifyPathDelays;
import SystemTimingChecks;

path_delay_value : list_of_path_delay_expressions | '(' list_of_path_delay_expressions ')' ;
list_of_path_delay_expressions : t_path_delay_expression
  | trise_path_delay_expression ',' tfall_path_delay_expression
  | trise_path_delay_expression ',' tfall_path_delay_expression ',' tz_path_delay_expression
  | t01_path_delay_expression ',' t10_path_delay_expression ',' t0z_path_delay_expression ','
    tz1_path_delay_expression ',' t1z_path_delay_expression ',' tz0_path_delay_expression
  | t01_path_delay_expression ',' t10_path_delay_expression ',' t0z_path_delay_expression ','
    tz1_path_delay_expression ',' t1z_path_delay_expression ',' tz0_path_delay_expression ','
    t0x_path_delay_expression ',' tx1_path_delay_expression ',' t1x_path_delay_expression ','
    tx0_path_delay_expression ',' txz_path_delay_expression ',' tzx_path_delay_expression ;
t_path_delay_expression : path_delay_expression ;
trise_path_delay_expression : path_delay_expression ;
tfall_path_delay_expression : path_delay_expression ;
tz_path_delay_expression : path_delay_expression ;
t01_path_delay_expression : path_delay_expression ;
t10_path_delay_expression : path_delay_expression ;
t0z_path_delay_expression : path_delay_expression ;
tz1_path_delay_expression : path_delay_expression ;
t1z_path_delay_expression : path_delay_expression ;
tz0_path_delay_expression : path_delay_expression ;
t0x_path_delay_expression : path_delay_expression ;
tx1_path_delay_expression : path_delay_expression ;
t1x_path_delay_expression : path_delay_expression ;
tx0_path_delay_expression : path_delay_expression ;
txz_path_delay_expression : path_delay_expression ;
tzx_path_delay_expression : path_delay_expression ;
path_delay_expression : constant_mintypmax_expression ;
edge_sensitive_path_declaration : parallel_edge_sensitive_path_description '=' path_delay_value
  | full_edge_sensitive_path_description '=' path_delay_value ;
parallel_edge_sensitive_path_description :
    '(' ( edge_identifier )? specify_input_terminal_descriptor ( polarity_operator )? '=>'
    '(' specify_output_terminal_descriptor ( polarity_operator )? ':' data_source_expression ')' ')' ;
full_edge_sensitive_path_description : '(' ( edge_identifier )? list_of_path_inputs
    ( polarity_operator )? '*>' '(' list_of_path_outputs ( polarity_operator )? ':'
    data_source_expression ')' ')' ;
data_source_expression : expression ;
edge_identifier : 'posedge' | 'negedge' | 'edge' ;
state_dependent_path_declaration : 'if' '(' module_path_expression ')' simple_path_declaration
  | 'if' '(' module_path_expression ')' edge_sensitive_path_declaration
  | 'ifnone' simple_path_declaration ;
polarity_operator : '+' | '-' ;
