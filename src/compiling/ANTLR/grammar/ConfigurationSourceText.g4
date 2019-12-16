grammar ConfigurationSourceText;
import InterfaceItems;

config_declaration : 'config' config_identifier ';' ( local_parameter_declaration ';' )* design_statement
    ( config_rule_statement )* 'endconfig' ( ':' config_identifier )? ;
design_statement : 'design' ( ( library_identifier '.' )? cell_identifier )* ';' ;
config_rule_statement : default_clause liblist_clause ';'
  | inst_clause liblist_clause ';'
  | inst_clause use_clause ';'
  | cell_clause liblist_clause ';'
  | cell_clause use_clause ';' ;
default_clause : 'default' ;
inst_clause : 'instance' inst_name ;
inst_name : topmodule_identifier ( '.' instance_identifier )* ;
cell_clause : 'cell' ( library_identifier '.' )? cell_identifier ;
liblist_clause : 'liblist' ( library_identifier )* ;
use_clause : 'use' ( library_identifier '.' )? cell_identifier ( ':' 'config' )?
  | 'use' named_parameter_assignment ( ',' named_parameter_assignment )* ( ':' 'config' )?
  | 'use' ( library_identifier '.' )? cell_identifier named_parameter_assignment
    ( ',' named_parameter_assignment )* ( ':' 'config' )? ;
