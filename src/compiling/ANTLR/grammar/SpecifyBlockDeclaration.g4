grammar SpecifyBlockDeclaration;
import SpecifyPathDeclarations;

specify_block : 'specify' ( specify_item )* 'endspecify' ;
specify_item : specparam_declaration
  | pulsestyle_declaration
  | showcancelled_declaration
  | path_declaration
  | system_timing_check ;
pulsestyle_declaration : 'pulsestyle_onevent' list_of_path_outputs ';'
  | 'pulsestyle_ondetect' list_of_path_outputs ';' ;
showcancelled_declaration : 'showcancelled' list_of_path_outputs ';'
  | 'noshowcancelled' list_of_path_outputs ';' ;
