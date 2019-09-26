grammar DeclarationLists;
import DeclarationAssignments;

list_of_defparam_assignments : defparam_assignment ( ',' defparam_assignment )* ;
list_of_genvar_identifiers : genvar_identifier ( ',' genvar_identifier )* ;
list_of_interface_identifiers : interface_identifier ( unpacked_dimension )*
    ( ',' interface_identifier ( unpacked_dimension )* )* ;
list_of_net_decl_assignments : net_decl_assignment ( ',' net_decl_assignment )* ;
list_of_param_assignments : param_assignment ( ',' param_assignment )* ;
list_of_port_identifiers : port_identifier ( unpacked_dimension )*
    ( ',' port_identifier ( unpacked_dimension )* )* ;
list_of_udp_port_identifiers : port_identifier ( ',' port_identifier )* ;
list_of_specparam_assignments : specparam_assignment ( ',' specparam_assignment )* ;
list_of_tf_variable_identifiers : port_identifier ( variable_dimension )* ( '=' expression )?
    ( ',' port_identifier ( variable_dimension )* ( '=' expression )? )* ;
list_of_type_assignments : type_assignment ( ',' type_assignment )* ;
list_of_variable_decl_assignments : variable_decl_assignment ( ',' variable_decl_assignment )* ;
list_of_variable_identifiers : variable_identifier ( variable_dimension )*
    ( ',' variable_identifier ( variable_dimension )* )* ;
list_of_variable_port_identifiers : port_identifier ( variable_dimension )* ( '=' constant_expression )?
    ( ',' port_identifier ( variable_dimension )* ( '=' constant_expression )? )* ;
