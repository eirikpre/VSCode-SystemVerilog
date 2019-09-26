grammar	InterfaceItems;
import ProgramItems;

interface_or_generate_item : ( attribute_instance )* module_common_item
  | ( attribute_instance )* extern_tf_declaration ;
extern_tf_declaration : 'extern' method_prototype ';'
  | 'extern' 'forkjoin' task_prototype ';' ;
interface_item : port_declaration ';'
  | non_port_interface_item ;
non_port_interface_item : generate_region
  | interface_or_generate_item
  | program_declaration
  | modport_declaration
  | interface_declaration
  | timeunits_declaration ;
