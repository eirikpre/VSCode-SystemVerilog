grammar UDPInstantiation;
import ContinuousAssignmentAndNetAliasStatements;

udp_instantiation : udp_identifier ( drive_strength )? ( delay2 )? udp_instance ( ',' udp_instance )*
    ';' ;
udp_instance : ( name_of_instance )? '(' output_terminal ',' input_terminal ( ',' input_terminal )*
    ')' ;
