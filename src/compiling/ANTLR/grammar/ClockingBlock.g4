grammar ClockingBlock;
import Randsequence;

clocking_declaration : ( 'default' )? 'clocking' ( clocking_identifier )? clocking_event ';'
    ( clocking_item )* 'endclocking' ( ':' clocking_identifier )?
  | 'global' 'clocking' ( clocking_identifier )? clocking_event ';' 'endclocking'
    ( ':' clocking_identifier )? ;
clocking_event : '@' identifier | '@' '(' event_expression ')' ;
clocking_item : 'default' default_skew ';'
  | clocking_direction list_of_clocking_decl_assign ';'
  | ( attribute_instance )* assertion_item_declaration ;
default_skew : 'input' clocking_skew
  | 'output' clocking_skew
  | 'input' clocking_skew 'output' clocking_skew ;
clocking_direction : 'input' ( clocking_skew )?
  | 'output' ( clocking_skew )?
  | 'input' ( clocking_skew )? 'output' ( clocking_skew )?
  | 'inout' ;
list_of_clocking_decl_assign : clocking_decl_assign ( ',' clocking_decl_assign )* ;
clocking_decl_assign : signal_identifier ( '=' expression )? ;
clocking_skew : edge_identifier ( delay_control )? | delay_control ;
clocking_drive : clockvar_expression '<=' ( cycle_delay )? expression ;
cycle_delay : '##' integral_number | '##' identifier | '##' '(' expression ')' ;
clockvar : hierarchical_identifier ;
clockvar_expression : clockvar select ;
