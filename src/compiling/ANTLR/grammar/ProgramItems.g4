grammar ProgramItems;
import CheckerItems;

program_item : port_declaration ';'
  | non_port_program_item ;
non_port_program_item : ( attribute_instance )* continuous_assign
  | ( attribute_instance )* module_or_generate_item_declaration
  | ( attribute_instance )* initial_construct
  | ( attribute_instance )* final_construct
  | ( attribute_instance )* concurrent_assertion_item
  | timeunits_declaration
  | program_generate_item ;
program_generate_item : loop_generate_construct
  | conditional_generate_construct
  | generate_region
  | elaboration_system_task
  | simulation_control_task ;
