grammar InterfaceDeclarations;
import AssertionDeclarations;

modport_declaration : 'modport' modport_item ( ',' modport_item )* ';' ;
modport_item : modport_identifier '(' modport_ports_declaration
    ( ',' modport_ports_declaration )* ')' ;
modport_ports_declaration : ( attribute_instance )* modport_simple_ports_declaration
  | ( attribute_instance )* modport_tf_ports_declaration
  | ( attribute_instance )* modport_clocking_declaration ;
modport_clocking_declaration : 'clocking' clocking_identifier ;
modport_simple_ports_declaration : port_direction modport_simple_port ( ',' modport_simple_port )* ;
modport_simple_port : port_identifier | '.' port_identifier '(' ( expression )? ')' ;
modport_tf_ports_declaration : import_export modport_tf_port ( ',' modport_tf_port )* ;
modport_tf_port : method_prototype | tf_identifier ;
import_export : 'import' | 'export' ;
