grammar SpecifyPathDeclarations;
import SpecifyBlockTerminals;

path_declaration : simple_path_declaration ';'
  | edge_sensitive_path_declaration ';'
  | state_dependent_path_declaration ';' ;
simple_path_declaration : parallel_path_description '=' path_delay_value
  | full_path_description '=' path_delay_value ;
parallel_path_description : '(' specify_input_terminal_descriptor ( polarity_operator )? '=>'
    specify_output_terminal_descriptor ')' ;
full_path_description : '(' list_of_path_inputs ( polarity_operator )? '*>' list_of_path_outputs ')' ;
list_of_path_inputs : specify_input_terminal_descriptor ( ',' specify_input_terminal_descriptor )* ;
list_of_path_outputs : specify_output_terminal_descriptor ( ',' specify_output_terminal_descriptor )* ;
