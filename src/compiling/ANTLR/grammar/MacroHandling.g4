lexer grammar MacroHandling;
/* Heavily based on code from the Rockdoor project on github: https://github.com/Rockdoor/systemverilog */

channels { CH_PP }

PP_DEFINE : '`define' -> channel(CH_PP), pushMode(MODE_PPDF) ;

PP_CALL_NOARG : '`' (C_IDENTIFIER | LOWER_S | LOWER_MS | LOWER_US | LOWER_NS | LOWER_PS | LOWER_FS | B | F | R | P | N | HEX_DIGIT | X_DIGIT | Z_DIGIT | UNDERSCORE | SIMPLE_IDENTIFIER) -> channel(CH_PP) ;
PP_CAL_ARG : '`' (C_IDENTIFIER | LOWER_S | LOWER_MS | LOWER_US | LOWER_NS | LOWER_PS | LOWER_FS | B | F | R | P | N | HEX_DIGIT | X_DIGIT | Z_DIGIT | UNDERSCORE | SIMPLE_IDENTIFIER) '(' -> channel(CH_PP), mode(MODE_PPCL) ;

mode MODE_PPCL; // -------------------------------------------------------------

PPCL_WS: [ \t]+                                 -> channel(HIDDEN); 

PPCL_CL_PRN: ')'                                -> channel(CH_PP), popMode;
PPCL_COM: ','                                   -> channel(CH_PP);

PPCL_IDENT: C_IDENTIFIER | LOWER_S | LOWER_MS | LOWER_US | LOWER_NS | LOWER_PS | LOWER_FS | B | F | R | P | N | HEX_DIGIT | X_DIGIT | Z_DIGIT | UNDERSCORE | SIMPLE_IDENTIFIER    -> channel(CH_PP);

mode MODE_PPDF; // ---------------------------------------------------------------

DF_WS: [ \t]+                         -> channel(HIDDEN); 
DF_NL: '\r'? '\n'                     -> channel(HIDDEN), popMode;

DF_MACRO_NAME_NOARG: DF_IDENT DF_WS   -> channel(CH_PP), pushMode(MODE_DFTX);
DF_MACRO_NAME_ARG: DF_IDENT '('       -> channel(CH_PP), pushMode(MODE_DFAG);

DF_IDENT: C_IDENTIFIER | LOWER_S | LOWER_MS | LOWER_US | LOWER_NS | LOWER_PS | LOWER_FS | B | F | R | P | N | HEX_DIGIT | X_DIGIT | Z_DIGIT | UNDERSCORE | SIMPLE_IDENTIFIER       -> channel(CH_PP);

mode MODE_DFAG; // -------------------------------------------------------------

DFAG_WS: [ \t]+                       -> channel(HIDDEN); 
DFAG_NL: '\r'? '\n'                   -> channel(HIDDEN), popMode;

DFAG_CL_PRN: ')' DF_WS             -> channel(CH_PP), mode(MODE_DFTX);
DFAG_COM: ','                         -> channel(CH_PP);
DFAG_EQ: '='                           -> channel(CH_PP);

DFAG_IDENT: C_IDENTIFIER | LOWER_S | LOWER_MS | LOWER_US | LOWER_NS | LOWER_PS | LOWER_FS | B | F | R | P | N | HEX_DIGIT | X_DIGIT | Z_DIGIT | UNDERSCORE | SIMPLE_IDENTIFIER      -> channel(CH_PP);

mode MODE_DFTX; // -------------------------------------------------------------

DFTX_MACRO_TEXT:
  ('\\' '\r'? '\n' | ~('\n' | '\r'))+ -> channel(CH_PP), popMode;