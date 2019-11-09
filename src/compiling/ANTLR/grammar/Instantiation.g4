grammar Instantiation;
import GeneratedInstantiation;

module_instantiation : module_identifier ( parameter_value_assignment )? hierarchical_instance
    ( ',' hierarchical_instance )* ';' ;
parameter_value_assignment : '#' '(' ( list_of_parameter_assignments )? ')' ;
list_of_parameter_assignments : ordered_parameter_assignment ( ',' ordered_parameter_assignment )*
  | named_parameter_assignment ( ',' named_parameter_assignment )* ;
ordered_parameter_assignment : param_expression ;
named_parameter_assignment : '.' parameter_identifier '(' ( param_expression )? ')' ;
hierarchical_instance : name_of_instance '(' ( list_of_port_connections )? ')' ;
name_of_instance : instance_identifier ( unpacked_dimension )* ;
list_of_port_connections : ordered_port_connection ( ',' ordered_port_connection )*
  | named_port_connection ( ',' named_port_connection )* ;
ordered_port_connection : ( attribute_instance )* ( expression )? ;
named_port_connection : ( attribute_instance )* '.' port_identifier ( '(' ( expression )? ')' )?
  | ( attribute_instance )* '.*' ;
interface_instantiation : interface_identifier ( parameter_value_assignment )? hierarchical_instance
    ( ',' hierarchical_instance )* ';' ;
program_instantiation : program_identifier ( parameter_value_assignment )? hierarchical_instance
    ( ',' hierarchical_instance )* ';' ;
checker_instantiation : ps_checker_identifier name_of_instance
    '(' ( list_of_checker_port_connections )? ')' ';' ;
list_of_checker_port_connections : ordered_checker_port_connection
    ( ',' ordered_checker_port_connection )*
  | named_checker_port_connection ( ',' named_checker_port_connection )* ;
ordered_checker_port_connection : ( attribute_instance )* ( property_actual_arg )? ;
named_checker_port_connection : ( attribute_instance )* '.' formal_port_identifier
    ( '(' ( property_actual_arg )? ')' )?
  | ( attribute_instance )* '.*' ;
