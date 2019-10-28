grammar CheckerItems;
import ClassItems;

checker_port_list : checker_port_item ( ',' checker_port_item )* ;
checker_port_item : ( attribute_instance )* ( checker_port_direction )? property_formal_type
    formal_port_identifier ( variable_dimension )* ( '=' property_actual_arg )? ;
checker_port_direction : 'input' | 'output' ;
checker_or_generate_item : checker_or_generate_item_declaration
  | initial_construct
  | always_construct
  | final_construct
  | assertion_item
  | continuous_assign
  | checker_generate_item ;
checker_or_generate_item_declaration : ( 'rand' )? data_declaration
  | function_declaration
  | checker_declaration
  | assertion_item_declaration
  | covergroup_declaration
  | genvar_declaration
  | clocking_declaration
  | 'default' 'clocking' clocking_identifier ';'
  | 'default' 'disable' 'iff' expression_or_dist ';'
  | ';' ;
checker_generate_item : loop_generate_construct
  | conditional_generate_construct
  | generate_region
  | elaboration_system_task
  | simulation_control_task ;
