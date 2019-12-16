grammar Concatenations;
import SubroutineCalls;

concatenation : '{' expression ( ',' expression )* '}' ;
constant_concatenation : '{' constant_expression ( ',' constant_expression )* '}' ;
constant_multiple_concatenation : '{' constant_expression constant_concatenation '}' ;
module_path_concatenation : '{' module_path_expression ( ',' module_path_expression )* '}' ;
module_path_multiple_concatenation : '{' constant_expression module_path_concatenation '}' ;
multiple_concatenation : '{' expression concatenation '}' ;
streaming_concatenation : '{' stream_operator ( slice_size )? stream_concatenation '}' ;
stream_operator : '>>' | '<<' ;
slice_size : simple_type | constant_expression ;
stream_concatenation : '{' stream_expression ( ',' stream_expression )* '}' ;
stream_expression : expression ( 'with' '[' array_range_expression ']' )? ;
array_range_expression : expression
  | expression ':' expression
  | expression '+:' expression
  | expression '-:' expression ;
empty_unpacked_array_concatenation : '{' '}' ;
