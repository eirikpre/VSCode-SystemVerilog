grammar UDPPorts;
import UDPBody;

udp_port_list : output_port_identifier ',' input_port_identifier ( ',' input_port_identifier )* ;
udp_declaration_port_list : udp_output_declaration ',' udp_input_declaration
    ( ',' udp_input_declaration )* ;
udp_port_declaration : udp_output_declaration ';'
  | udp_input_declaration ';'
  | udp_reg_declaration ';' ;
udp_output_declaration : ( attribute_instance )* 'output' port_identifier
  | ( attribute_instance )* 'output' 'reg' port_identifier ( '=' constant_expression )? ;
udp_input_declaration : ( attribute_instance )* 'input' list_of_udp_port_identifiers ;
udp_reg_declaration : ( attribute_instance )* 'reg' variable_identifier ;
