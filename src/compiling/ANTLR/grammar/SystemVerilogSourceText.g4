grammar SystemVerilogSourceText;
import ModuleParametersAndPorts;

source_text : ( timeunits_declaration )? ( description )* ;
description : module_declaration
             | udp_declaration
             | interface_declaration
             | program_declaration
             | package_declaration
             | ( attribute_instance )* package_item
             | ( attribute_instance )* bind_directive
             | config_declaration
             | timescale_compiler_directive
             | include_compiler_directive ;
module_nonansi_header :  ( attribute_instance )*  module_keyword
     ( lifetime )?  module_identifier  ( package_import_declaration )*
     ( parameter_port_list )?  list_of_ports  ';'  ;
module_ansi_header :  ( attribute_instance )* module_keyword
    ( lifetime )? module_identifier ( package_import_declaration )*
    ( parameter_port_list )? ( list_of_port_declarations )? ';' ;
module_declaration : module_nonansi_header ( timeunits_declaration )?
    ( module_item )* 'endmodule' ( ':' module_identifier )?
  | module_ansi_header ( timeunits_declaration )?
    ( non_port_module_item )* 'endmodule' ( ':' module_identifier )?
  | ( attribute_instance )* module_keyword ( lifetime )?
    module_identifier '(' '.*' ')' ';' ( timeunits_declaration )?
    ( module_item )* 'endmodule' ( ':' module_identifier )?
  | 'extern' module_nonansi_header
  | 'extern' module_ansi_header ;
module_keyword : (MODULE | MACROMODULE)  ;
interface_declaration : interface_nonansi_header ( timeunits_declaration )? ( interface_item )*
    'endinterface' ( ':' interface_identifier )?
  | interface_ansi_header ( timeunits_declaration )? ( non_port_interface_item )* 'endinterface'
    ( ':' interface_identifier )?
  | ( attribute_instance )* 'interface' interface_identifier '(' '.*' ')' ';' ( timeunits_declaration )?
    ( interface_item )* 'endinterface' ( ':' interface_identifier )?
  | 'extern' interface_nonansi_header
  | 'extern' interface_ansi_header ;
interface_nonansi_header : ( attribute_instance )* 'interface' ( lifetime )? interface_identifier
    ( package_import_declaration )* ( parameter_port_list )? list_of_ports ';' ;
interface_ansi_header : ( attribute_instance )* 'interface' ( lifetime )? interface_identifier
    ( package_import_declaration )* ( parameter_port_list )? ( list_of_port_declarations )? ';' ;
program_declaration : program_nonansi_header ( timeunits_declaration )? ( program_item )* 'endprogram'
    ( ':' program_identifier )?
  | program_ansi_header ( timeunits_declaration )? ( non_port_program_item )* 'endprogram'
    ( ':' program_identifier )?
  | ( attribute_instance )* 'program' program_identifier '(' '.*' ')' ';' ( timeunits_declaration )?
    ( program_item )* 'endprogram' ( ':' program_identifier )?
  | 'extern' program_nonansi_header
  | 'extern' program_ansi_header ;
program_nonansi_header : ( attribute_instance )* 'program' ( lifetime )? program_identifier 
    ( package_import_declaration )* ( parameter_port_list )? list_of_ports ';' ;
program_ansi_header : (attribute_instance )* 'program' ( lifetime )? program_identifier
    ( package_import_declaration )* ( parameter_port_list )? ( list_of_port_declarations )? ';' ;
checker_declaration : 'checker' checker_identifier ( '(' ( checker_port_list )? ')' )? ';'
    ( ( attribute_instance )* checker_or_generate_item )* 'endchecker' ( ':' checker_identifier )? ;
class_declaration : ( 'virtual' )? 'class' ( lifetime )? class_identifier ( parameter_port_list )?
    ( 'extends' class_type ( '(' list_of_arguments ')' )? )?
    ( 'implements' interface_class_type ( ',' interface_class_type )* )? ';' ( class_item )* 'endclass'
    ( ':' class_identifier)? ;
interface_class_type : ps_class_identifier ( parameter_value_assignment )? ;
interface_class_declaration : 'interface' 'class' class_identifier ( parameter_port_list )?
    ( 'extends' interface_class_type ( ',' interface_class_type )* )? ';' ( interface_class_item )*
    'endclass' ( ':' class_identifier)? ;
interface_class_item : type_declaration
  | ( attribute_instance )* interface_class_method
  | local_parameter_declaration ';'
  | parameter_declaration ';'
  | ';' ;
interface_class_method : 'pure' 'virtual' method_prototype ';' ;
package_declaration : ( attribute_instance )* 'package' ( lifetime )? package_identifier ';'
    ( timeunits_declaration )? ( ( attribute_instance )* package_item )*
    'endpackage' ( ':' package_identifier )? ;
timeunits_declaration : 'timeunit' time_literal ( '/' time_literal )? ';'
  | 'timeprecision' time_literal ';'
  | 'timeunit' time_literal ';' 'timeprecision' time_literal ';'
  | 'timeprecision time_literal' ';' 'timeunit' time_literal ';' ;
timescale_compiler_directive : '`timescale' time_literal '/' time_precision ;
time_precision : time_literal ;
include_compiler_directive : '`include' FILENAME ;

MODULE : 'module';
MACROMODULE : 'macromodule' ;
