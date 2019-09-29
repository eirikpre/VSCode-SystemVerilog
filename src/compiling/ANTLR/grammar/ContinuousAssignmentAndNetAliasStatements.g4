grammar ContinuousAssignmentAndNetAliasStatements;
import ProceduralBlocksAndAssignments;

continuous_assign : 'assign' ( drive_strength )? ( delay3 )? list_of_net_assignments ';'
  | 'assign' ( delay_control )? list_of_variable_assignments ';' ;
list_of_net_assignments : net_assignment ( ',' net_assignment )* ;
list_of_variable_assignments : variable_assignment ( ',' variable_assignment )* ;
net_alias : 'alias' net_lvalue '=' net_lvalue ( '=' net_lvalue )* ';' ;
net_assignment : net_lvalue '=' expression ;
