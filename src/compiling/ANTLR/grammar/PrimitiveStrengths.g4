grammar PrimitiveStrengths;
import PrimitiveTerminals;

pulldown_strength : '(' strength0 ',' strength1 ')'
  | '(' strength1 ',' strength0 ')'
  | '(' strength0 ')' ;
pullup_strength : '(' strength0 ',' strength1 ')'
  | '(' strength1 ',' strength0 ')'
  | '(' strength1 ')' ;
