grammar ParallelAndSequentialBlocks;
import Statements;

action_block : statement_or_null | ( statement )? 'else' statement_or_null ;
seq_block : 'begin' ( ':' block_identifier )? ( block_item_declaration )* ( statement_or_null )* 'end'
    ( ':' block_identifier )? ;
par_block : 'fork' ( ':' block_identifier )? ( block_item_declaration )* ( statement_or_null )*
    join_keyword ( ':' block_identifier )? ;
join_keyword : 'join' | 'join_any' | 'join_none' ;
