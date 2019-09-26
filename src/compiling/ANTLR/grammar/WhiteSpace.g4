grammar WhiteSpace;

white_space : SPACE | TAB | NEWLINE | EOF ;

SPACE : ' ' ;
TAB : '\t' ;
NEWLINE : '\r'? '\n' ;
