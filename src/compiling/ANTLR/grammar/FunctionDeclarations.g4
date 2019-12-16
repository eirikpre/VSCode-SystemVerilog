grammar FunctionDeclarations;
import TaskDeclarations;

function_data_type_or_implicit : data_type_or_void
  | implicit_data_type ;
function_declaration : 'function' ( lifetime )? function_body_declaration ;
function_body_declaration : function_data_type_or_implicit
    ( interface_identifier '.' | class_scope )? function_identifier ';'
    ( tf_item_declaration )*
    ( function_statement_or_null )*
    'endfunction' ( ':' function_identifier )?
  | function_data_type_or_implicit
    ( interface_identifier '.' | class_scope )? function_identifier '(' ( tf_port_list )? ')' ';'
    ( block_item_declaration )*
    ( function_statement_or_null )*
    'endfunction' ( ':' function_identifier )? ;
function_prototype : 'function' data_type_or_void function_identifier ( '(' ( tf_port_list )? ')' )? ;
dpi_import_export : 'import' dpi_spec_string ( dpi_function_import_property )? ( c_identifier '=' )?
    dpi_function_proto ';'
  | 'import' dpi_spec_string ( dpi_task_import_property )? ( c_identifier '=' )? dpi_task_proto ';'
  | 'export' dpi_spec_string ( c_identifier '=' )? 'function' function_identifier ';'
  | 'export' dpi_spec_string ( c_identifier '=' )? 'task' task_identifier ';' ;
dpi_spec_string : '"DPI-C"' | '"DPI"' ;
dpi_function_import_property : 'context' | 'pure' ;
dpi_task_import_property : 'context' ;
dpi_function_proto : function_prototype ;
dpi_task_proto : task_prototype ;
