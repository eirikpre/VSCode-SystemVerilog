grammar UDPBody;
import UDPInstantiation;

udp_body : combinational_body | sequential_body ;
combinational_body : 'table' combinational_entry ( combinational_entry )* 'endtable' ;
combinational_entry : level_input_list ':' output_symbol ';' ;
sequential_body : ( udp_initial_statement )? 'table' sequential_entry ( sequential_entry )* 'endtable' ;
udp_initial_statement : 'initial' output_port_identifier '=' init_val ';' ;
init_val : ONE APOSTROPHE B ( ZERO | ONE | X_DIGIT ) | ONE | ZERO ;
sequential_entry : seq_input_list ':' current_state ':' next_state ';' ;
seq_input_list : level_input_list | edge_input_list ;
level_input_list : level_symbol ( level_symbol )* ;
edge_input_list : ( level_symbol )* edge_indicator ( level_symbol )* ;
edge_indicator : '(' level_symbol level_symbol ')' | edge_symbol ;
current_state : level_symbol ;
next_state : output_symbol | '-' ;
output_symbol : ZERO | ONE | X_DIGIT ;
level_symbol : ZERO | ONE | X_DIGIT | QUESTION | B ;
edge_symbol : R | F | P | N | '*' ;
