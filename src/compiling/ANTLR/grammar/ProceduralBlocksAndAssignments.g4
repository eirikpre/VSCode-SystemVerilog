grammar ProceduralBlocksAndAssignments;
import ParallelAndSequentialBlocks;

initial_construct : 'initial' statement_or_null ;
always_construct : always_keyword statement ;
always_keyword : 'always' | 'always_comb' | 'always_latch' | 'always_ff' ;
final_construct : 'final' function_statement ;
blocking_assignment : variable_lvalue '=' delay_or_event_control expression
  | nonrange_variable_lvalue '=' dynamic_array_new
  | ( implicit_class_handle '.' | class_scope | package_scope )? hierarchical_variable_identifier
    select '=' class_new
  | operator_assignment ;
operator_assignment : variable_lvalue assignment_operator expression ;
assignment_operator : '=' | '+=' | '-=' | '*=' | '/=' | '%=' | '&=' | '|=' | '^=' | '<<=' | '>>='
  | '<<<=' | '>>>=' ;
nonblocking_assignment : variable_lvalue '<=' ( delay_or_event_control )? expression ;
procedural_continuous_assignment : 'assign' variable_assignment
  | 'deassign' variable_lvalue
  | 'force' variable_assignment
  | 'force' net_assignment
  | 'release' variable_lvalue
  | 'release' net_lvalue ;
variable_assignment : variable_lvalue '=' expression ;
