grammar PrimitiveGateAndSwitchTypes;
import Instantiation;

cmos_switchtype : 'cmos' | 'rcmos' ;
enable_gatetype : 'bufif0' | 'bufif1' | 'notif0' | 'notif1' ;
mos_switchtype : 'nmos' | 'pmos' | 'rnmos' | 'rpmos' ;
n_input_gatetype : 'and' | 'nand' | 'or' | 'nor' | 'xor' | 'xnor' ;
n_output_gatetype : 'buf' | 'not' ;
pass_en_switchtype : 'tranif0' | 'tranif1' | 'rtranif1' | 'rtranif0' ;
pass_switchtype : 'tran' | 'rtran' ;
