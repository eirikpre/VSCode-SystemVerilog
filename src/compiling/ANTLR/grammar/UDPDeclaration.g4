grammar UDPDeclaration;
import UDPPorts;

udp_nonansi_declaration : ( attribute_instance )* 'primitive' udp_identifier '(' udp_port_list ')'
    ';' ;
udp_ansi_declaration : ( attribute_instance )* 'primitive' udp_identifier
    '(' udp_declaration_port_list ')' ';' ;
udp_declaration : udp_nonansi_declaration udp_port_declaration ( udp_port_declaration )* udp_body
    'endprimitive' ( ':' udp_identifier )?
  | udp_ansi_declaration udp_body 'endprimitive' ( ':' udp_identifier )?
  | 'extern' udp_nonansi_declaration | 'extern' udp_ansi_declaration
  | ( attribute_instance )* 'primitive' udp_identifier '(' '.*' ')' ';' ( udp_port_declaration )*
    udp_body 'endprimitive' ( ':' udp_identifier )? ;
