grammar UDPBody;
import UDPInstantiation;

udp_body : combinational_body | sequential_body ;
combinational_body : 'table' combinational_entry ( combinational_entry )* 'endtable' ;
combinational_entry : level_input_list ':' output_symbol ';' ;
sequential_body : ( udp_initial_statement )? 'table' sequential_entry ( sequential_entry )* 'endtable' ;
udp_initial_statement : 'initial' output_port_identifier '=' init_val ';' ;
init_val : '1\'b0' | '1\'b1' | '1\'bx' | '1\'bX' | '1\'B0' | '1\'B1' | '1\'Bx' | '1\'BX' | '1' | '0' ;
sequential_entry : seq_input_list ':' current_state ':' next_state ';' ;
seq_input_list : level_input_list | edge_input_list ;
level_input_list : level_symbol ( level_symbol )* ;
edge_input_list : ( level_symbol )* edge_indicator ( level_symbol )* ;
edge_indicator : '(' level_symbol level_symbol ')' | edge_symbol ;
current_state : level_symbol ;
next_state : output_symbol | '-' ;
output_symbol : '0' | '1' | 'x' | 'X' ;
level_symbol : '0' | '1' | 'x' | 'X' | '?' | 'b' | 'B' ;
edge_symbol : 'r' | 'R' | 'f' | 'F' | 'p' | 'P' | 'n' | 'N' | '*' ;
