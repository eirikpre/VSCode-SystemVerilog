grammar PrimitiveInstantiationAndInstances;
import PrimitiveStrengths;

gate_instantiation : cmos_switchtype ( delay3 )? cmos_switch_instance ( ',' cmos_switch_instance )* ';'
  | enable_gatetype ( drive_strength )? ( delay3 )? enable_gate_instance ( ',' enable_gate_instance )* ';'
  | mos_switchtype ( delay3 )? mos_switch_instance ( ',' mos_switch_instance )* ';'
  | n_input_gatetype ( drive_strength )? ( delay2 )? n_input_gate_instance
    ( ',' n_input_gate_instance )* ';'
  | n_output_gatetype ( drive_strength )? ( delay2 )? n_output_gate_instance
    ( ',' n_output_gate_instance )* ';'
  | pass_en_switchtype ( delay2 )? pass_enable_switch_instance ( ',' pass_enable_switch_instance )* ';'
  | pass_switchtype pass_switch_instance ( ',' pass_switch_instance )* ';'
  | 'pulldown' ( pulldown_strength )? pull_gate_instance ( ',' pull_gate_instance )* ';'
  | 'pullup' ( pullup_strength )? pull_gate_instance ( ',' pull_gate_instance )* ';' ;
cmos_switch_instance : ( name_of_instance )?
    '(' output_terminal ',' input_terminal ',' ncontrol_terminal ',' pcontrol_terminal ')' ;
enable_gate_instance : ( name_of_instance )?
    '(' output_terminal ',' input_terminal ',' enable_terminal ')' ;
mos_switch_instance : ( name_of_instance )?
    '(' output_terminal ',' input_terminal ',' enable_terminal ')' ;
n_input_gate_instance : ( name_of_instance )?
    '(' output_terminal ',' input_terminal ( ',' input_terminal )* ')' ;
n_output_gate_instance : ( name_of_instance )?
    '(' output_terminal ( ',' output_terminal )* ',' input_terminal ')' ;
pass_switch_instance : ( name_of_instance )? '(' inout_terminal ',' inout_terminal ')' ; pass_enable_switch_instance : ( name_of_instance )?
    '(' inout_terminal ',' inout_terminal ',' enable_terminal ')' ;
pull_gate_instance : ( name_of_instance )? '(' output_terminal ')' ;
