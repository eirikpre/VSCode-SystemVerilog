grammar Comments;
import Identifiers;

comment : one_line_comment | block_comment ;
one_line_comment : '//' comment_text '\n' ;
block_comment : '/*' comment_text '*/' ;
comment_text : ( ANY_ASCII_CHARACTER )* ;
