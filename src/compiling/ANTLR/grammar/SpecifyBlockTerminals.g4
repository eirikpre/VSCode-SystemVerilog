grammar SpecifyBlockTerminals;
import SpecifyPathDelays;

specify_input_terminal_descriptor : input_identifier ( '[' constant_range_expression ']' )? ;
specify_output_terminal_descriptor : output_identifier ( '[' constant_range_expression ']' )? ; input_identifier : input_port_identifier
  | inout_port_identifier
  | interface_identifier '.' port_identifier ;
output_identifier : output_port_identifier
  | inout_port_identifier
  | interface_identifier '.' port_identifier ;
