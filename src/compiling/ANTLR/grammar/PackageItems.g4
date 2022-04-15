grammar PackageItems;
import DeclarationTypes;

package_item : package_or_generate_item_declaration
  | anonymous_program
  | include_compiler_directive
  | package_export_declaration
  | timeunits_declaration ;
package_or_generate_item_declaration : net_declaration
  | data_declaration
  | task_declaration
  | function_declaration
  | checker_declaration
  | dpi_import_export
  | extern_constraint_declaration
  | class_declaration
  | class_constructor_declaration
  | local_parameter_declaration ';'
  | parameter_declaration ';'
  | covergroup_declaration
  | assertion_item_declaration
  | ';' ;
anonymous_program : 'program' ';' ( anonymous_program_item )* 'endprogram' ;
anonymous_program_item : task_declaration
  | function_declaration
  | class_declaration
  | covergroup_declaration
  | class_constructor_declaration
  | ';' ;
