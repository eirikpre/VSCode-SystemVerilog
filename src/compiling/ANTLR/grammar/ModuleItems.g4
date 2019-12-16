grammar	ModuleItems;
import ConfigurationSourceText;

elaboration_system_task : '$fatal' ( '(' finish_number ( ',' list_of_arguments )? ')' )? ';'
  | '$error' ( '(' ( list_of_arguments )? ')' )? ';'
  | '$warning' ( '(' ( list_of_arguments )? ')' )? ';'
  | '$info' ( '(' ( list_of_arguments )? ')' )? ';' ;
finish_number : ZERO | ONE | TWO ;
module_common_item : module_or_generate_item_declaration
  | interface_instantiation
  | program_instantiation
  | assertion_item
  | bind_directive
  | continuous_assign
  | net_alias
  | initial_construct
  | final_construct
  | always_construct
  | loop_generate_construct
  | conditional_generate_construct
  | elaboration_system_task
  | simulation_control_task ;
simulation_control_task : '$stop' ( '(' finish_number ')' )? ';'
  | '$finish' ( '(' finish_number ')' )? ';'
  | '$exit' ( '(' finish_number ')' )? ';' ;
module_item : port_declaration ';'
  | non_port_module_item ;
module_or_generate_item : ( attribute_instance )* parameter_override
  | ( attribute_instance )* gate_instantiation
  | ( attribute_instance )* udp_instantiation
  | ( attribute_instance )* module_instantiation
  | ( attribute_instance )* module_common_item ;
module_or_generate_item_declaration : package_or_generate_item_declaration
  | genvar_declaration
  | clocking_declaration
  | 'default' 'clocking' clocking_identifier ';'
  | 'default' 'disable' 'iff' expression_or_dist ';' ;
non_port_module_item : generate_region
  | module_or_generate_item
  | specify_block
  | ( attribute_instance )* specparam_declaration
  | program_declaration
  | module_declaration
  | interface_declaration
  | timeunits_declaration ;
parameter_override : 'defparam' list_of_defparam_assignments ';' ;
bind_directive : 'bind' bind_target_scope ( ':' bind_target_instance_list )? bind_instantiation ';'
  | 'bind' bind_target_instance bind_instantiation ';' ;
bind_target_scope : module_identifier
  | interface_identifier ;
bind_target_instance : hierarchical_identifier constant_bit_select ;
bind_target_instance_list : bind_target_instance ( ',' bind_target_instance )* ;
bind_instantiation : program_instantiation
  | module_instantiation
  | interface_instantiation
  | checker_instantiation ;
