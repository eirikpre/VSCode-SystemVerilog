grammar Numbers;
import Strings;

number : integral_number | real_number ;
integral_number : decimal_number | octal_number | binary_number | hex_number ;
decimal_number : unsigned_number
  | ( size )? decimal_base unsigned_number
  | ( size )? decimal_base x_digit ( UNDERSCORE )*
  | ( size )? decimal_base z_digit ( UNDERSCORE )* ;
binary_number : ( size )? binary_base binary_value ;
octal_number : ( size )? octal_base octal_value ;
hex_number : ( size )? hex_base hex_value ;
sign : '+' | '-' ;
size : non_zero_unsigned_number ;
non_zero_unsigned_number : non_zero_decimal_digit ( UNDERSCORE | decimal_digit )* ;
real_number : fixed_point_number
  | unsigned_number ( '.' unsigned_number )? exp ( sign )? unsigned_number ;
fixed_point_number : unsigned_number '.' unsigned_number ;
exp : EXP ;
unsigned_number : decimal_digit ( UNDERSCORE | decimal_digit )* ;
binary_value : binary_digit ( UNDERSCORE | binary_digit )* ;
octal_value : octal_digit ( UNDERSCORE | octal_digit )* ;
hex_value : hex_digit ( UNDERSCORE | hex_digit )* ;
decimal_base : DECIMAL_BASE ;
binary_base : BINARY_BASE ;
octal_base : OCTAL_BASE ;
hex_base : HEX_BASE ;
non_zero_decimal_digit : ONE | TWO | OCTAL_DIGIT | DECIMAL_DIGIT ;
decimal_digit : ZERO | non_zero_decimal_digit ;
binary_digit : x_digit | z_digit | ZERO | ONE ;
octal_digit : binary_digit | TWO | OCTAL_DIGIT ;
hex_digit : octal_digit | DECIMAL_DIGIT | HEX_DIGIT | B | F ;
x_digit : X_DIGIT ;
z_digit : Z_DIGIT | QUESTION ;
unbased_unsized_literal : APOSTROPHE_ZERO | APOSTROPHE_ONE | APOSTROPHE_Z_OR_X ;
