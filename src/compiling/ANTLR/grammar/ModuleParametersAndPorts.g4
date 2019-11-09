grammar ModuleParametersAndPorts;
import ModuleItems;

parameter_port_list : '#' '(' list_of_param_assignments ( ',' parameter_port_declaration )* ')'
  | '#' '(' parameter_port_declaration ( ',' parameter_port_declaration )* ')'
  | '#' '(' ')' ;
parameter_port_declaration : parameter_declaration
  | local_parameter_declaration
  | data_type list_of_param_assignments
  | 'type' list_of_type_assignments ;
list_of_ports : '(' port ( ',' port )* ')' ;
list_of_port_declarations : '(' ( ( attribute_instance )* ansi_port_declaration
    ( ',' ( attribute_instance )* ansi_port_declaration )* )? ')' ;
port_declaration : ( attribute_instance )* inout_declaration
  | ( attribute_instance )* input_declaration
  | ( attribute_instance )* output_declaration
  | ( attribute_instance )* ref_declaration
  | ( attribute_instance )* interface_port_declaration ;
port : ( port_expression )?
  | '.' port_identifier '(' ( port_expression )? ')' ;
port_expression : port_reference
  | '{' port_reference ( ',' port_reference )* '}' ;
port_reference : port_identifier constant_select ;
port_direction : 'input' | 'output' | 'inout' | 'ref' ;
net_port_header : ( port_direction )? net_port_type ;
variable_port_header : ( port_direction )? variable_port_type ;
interface_port_header : interface_identifier ( '.' modport_identifier )?
  | 'interface' ( '.' modport_identifier )? ;
ansi_port_declaration : ( net_port_header | interface_port_header )? port_identifier ( unpacked_dimension )*
    ( '=' constant_expression )?
  | ( variable_port_header )? port_identifier ( variable_dimension )* ( '=' constant_expression )?
  | ( port_direction )? '.' port_identifier '(' ( expression )? ')' ;
