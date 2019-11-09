grammar BlockItemDeclarations;
import InterfaceDeclarations;

block_item_declaration : ( attribute_instance )* data_declaration
  | ( attribute_instance )* local_parameter_declaration ';'
  | ( attribute_instance )* parameter_declaration ';'
  | ( attribute_instance )* let_declaration ;
