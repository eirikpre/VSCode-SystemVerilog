grammar DeclarationRanges;
import FunctionDeclarations;

unpacked_dimension : '[' constant_range ']'
  | '[' constant_expression ']' ;
packed_dimension : '[' constant_range ']'
  | unsized_dimension ;
associative_dimension : '[' data_type ']'
  | '[' '*' ']' ;
variable_dimension : unsized_dimension
  | unpacked_dimension
  | associative_dimension
  | queue_dimension ;
queue_dimension : '[' '$' ( ':' constant_expression )? ']' ;
unsized_dimension : '[' ']' ;
