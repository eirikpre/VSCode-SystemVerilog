grammar ConditionalStatements;
import CaseStatements;

conditional_statement : ( unique_priority )? 'if' '(' cond_predicate ')' statement_or_null
    ( 'else' 'if' '(' cond_predicate ')' statement_or_null )* ( 'else' statement_or_null )? ;
unique_priority : 'unique' | 'unique0' | 'priority' ;
cond_predicate : ( expression | expression 'matches' pattern ) ( '&&&' ( expression | expression 'matches' pattern ) )* ; 
