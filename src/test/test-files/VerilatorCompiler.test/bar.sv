module bar (
  clk, 
  reset,
  //keep
  a, 
  //also this comment 1
  b, 
  // also this comment 2
  valid, 
  c
); 

  input 	     clk;
  input 	     reset;
  input  [3:0] a;
  // keep this single comment
  input  [3:0] b;
  /* multiline comment should
  be kept*/
  input        valid;
  output [6:0] c;

  reg [6:0] tmp_c;
  assign c = tmp_c;
  

endmodule