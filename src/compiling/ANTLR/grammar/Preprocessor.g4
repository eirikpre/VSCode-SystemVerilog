grammar Preprocessor;
import MacroHandling;
/* Code from the Rockdoor project on github: https://github.com/Rockdoor/systemverilog */

pp_text: 
  pp_directive*
;

pp_directive:
| pp_define_only
| pp_define_noarg
| pp_define_arg
| pp_call_noarg
| pp_call_arg
;


pp_define_only:
  PP_DEFINE DF_IDENT
;

pp_define_noarg:
  PP_DEFINE DF_MACRO_NAME_NOARG DFTX_MACRO_TEXT
;

pp_define_arg:
  PP_DEFINE DF_MACRO_NAME_ARG DFAG_IDENT (DFAG_COM DFAG_IDENT)* DFAG_CL_PRN DFTX_MACRO_TEXT
;

pp_call_noarg:
  PP_CALL_NOARG
;

pp_call_arg:
  PP_CALL_ARG PPCL_IDENT (PPCL_COM PPCL_IDENT)* PPCL_CL_PRN
;
