primitive MyUDP (x, a, b, c);
  output x;
  input a, b, c;
  table
   // a  b   c   :  x
      0  n   P   :  0;
      1  ?  (10) :  1;
      *  0   x   :  -;
      ?  1   1   :  1;
  endtable
endprimitive