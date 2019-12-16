grammar DeclarationDataTypes;
import DeclarationLists;

data_type : integer_vector_type ( signing )? ( packed_dimension )*
  | integer_atom_type ( signing )?
  | non_integer_type
  | struct_union ( 'packed' ( signing )? )? '{' struct_union_member ( struct_union_member )* '}'
    ( packed_dimension )*
  | 'enum' ( enum_base_type )? '{' enum_name_declaration ( ',' enum_name_declaration )* '}'
    ( packed_dimension )*
  | 'string'
  | 'chandle'
  | 'virtual' ( 'interface' )? interface_identifier ( parameter_value_assignment )?
    ( '.' modport_identifier )?
  | ( class_scope | package_scope )? type_identifier ( packed_dimension )*
  | class_type
  | 'event'
  | ps_covergroup_identifier
  | type_reference ;
data_type_or_implicit : data_type | implicit_data_type ;
implicit_data_type : ( signing )? ( packed_dimension )* ;
enum_base_type : integer_atom_type ( signing )?
  | integer_vector_type ( signing )? ( packed_dimension )?
  | type_identifier ( packed_dimension )? ;
enum_name_declaration : enum_identifier ( '[' integral_number ( ':' integral_number )? ']' )?
    ( '=' constant_expression )? ;
class_scope : class_type '::' ;
class_type : ps_class_identifier ( parameter_value_assignment )?
    ( '::' class_identifier ( parameter_value_assignment )? )* ;
integer_type : integer_vector_type | integer_atom_type ;
integer_atom_type : 'byte' | 'shortint' | 'int' | 'longint' | 'integer' | 'time' ;
integer_vector_type : 'bit' | 'logic' | 'reg' ;
non_integer_type : 'shortreal' | 'real' | 'realtime' ;
net_type : 'supply0' | 'supply1' | 'tri' | 'triand' | 'trior' | 'trireg' | 'tri0' | 'tri1' | 'uwire'
  | 'wire' | 'wand' | 'wor' ;
net_port_type : ( net_type )? data_type_or_implicit
  | net_type_identifier
  | 'interconnect' implicit_data_type ;
variable_port_type : var_data_type ;
var_data_type : data_type | 'var' data_type_or_implicit ;
signing : 'signed' | 'unsigned' ;
simple_type : integer_type | non_integer_type | ps_type_identifier | ps_parameter_identifier ;
struct_union_member : ( attribute_instance )* ( random_qualifier )? data_type_or_void
    list_of_variable_decl_assignments ';' ;
data_type_or_void : data_type | 'void' ;
struct_union : 'struct' | 'union' ( 'tagged' )? ;
type_reference : 'type' '(' expression ')' | 'type' '(' data_type ')' ;
drive_strength : '(' strength0 ',' strength1 ')'
  | '(' strength1 ',' strength0 ')'
  | '(' strength0 ',' 'highz1' ')'
  | '(' strength1 ',' 'highz0' ')'
  | '(' 'highz0' ',' strength1 ')'
  | '(' 'highz1' ',' strength0 ')' ;
strength0 : 'supply0' | 'strong0' | 'pull0' | 'weak0' ;
strength1 : 'supply1' | 'strong1' | 'pull1' | 'weak1' ;
charge_strength : '(' 'small' ')' | '(' 'medium' ')' | '(' 'large' ')' ;
delay3 : '#' delay_value | '#' '(' mintypmax_expression ( ',' mintypmax_expression
    ( ',' mintypmax_expression )? )? ')' ;
delay2 : '#' delay_value | '#' '(' mintypmax_expression ( ',' mintypmax_expression )? ')' ;
delay_value : unsigned_number | real_number | ps_identifier | time_literal | '1step' ;
