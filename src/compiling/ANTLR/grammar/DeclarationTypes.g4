grammar DeclarationTypes;
import DeclarationDataTypes;

local_parameter_declaration : 'localparam' data_type_or_implicit list_of_param_assignments
  | 'localparam' 'type' list_of_type_assignments ;
parameter_declaration : 'parameter' data_type_or_implicit list_of_param_assignments
  | 'parameter' 'type' list_of_type_assignments ;
specparam_declaration : 'specparam' ( packed_dimension )? list_of_specparam_assignments ';' ;
inout_declaration : 'inout' net_port_type list_of_port_identifiers ;
input_declaration : 'input' net_port_type list_of_port_identifiers
  | 'input' variable_port_type list_of_variable_identifiers ;
output_declaration : 'output' net_port_type list_of_port_identifiers
  | 'output' variable_port_type list_of_variable_port_identifiers ;
interface_port_declaration : interface_identifier list_of_interface_identifiers
  | interface_identifier '.' modport_identifier list_of_interface_identifiers ;
ref_declaration : 'ref' variable_port_type list_of_variable_identifiers ;
data_declaration : ( 'const' )? ( 'var' )? ( lifetime )? data_type_or_implicit
    list_of_variable_decl_assignments ';'
  | type_declaration
  | package_import_declaration
  | net_type_declaration ;
package_import_declaration : 'import' package_import_item ( ',' package_import_item )* ';' ;
package_import_item : package_identifier '::' identifier
  | package_identifier '::' '*' ;
package_export_declaration : 'export' '*::*' ';'
  | 'export' package_import_item ( ',' package_import_item )* ';' ;
genvar_declaration : 'genvar' list_of_genvar_identifiers ';' ;
net_declaration : net_type ( drive_strength | charge_strength )? ( 'vectored' | 'scalared' )?
    data_type_or_implicit ( delay3 )? list_of_net_decl_assignments ';'
  | net_type_identifier ( delay_control )? list_of_net_decl_assignments ';'
  | 'interconnect' implicit_data_type ( '#' delay_value )? net_identifier ( unpacked_dimension )*
    ( ',' net_identifier ( unpacked_dimension )* )? ';' ;
type_declaration : 'typedef' data_type type_identifier ( variable_dimension )* ';'
  | 'typedef' interface_instance_identifier constant_bit_select '.' type_identifier type_identifier ';'
  | 'typedef' ( 'enum' | 'struct' | 'union' | 'class' | 'interface' 'class' )? type_identifier ';' ;
net_type_declaration : 'nettype' data_type net_type_identifier ( 'with'
    ( package_scope | class_scope )? tf_identifier )? ';'
  | 'nettype' ( package_scope | class_scope )? net_type_identifier net_type_identifier ';' ;
lifetime : 'static' | 'automatic' ;
