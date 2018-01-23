//----------------------------------------------
//	www.verificationguide.com   design.sv
//----------------------------------------------
/*
            --------------
 valid ---->|            |
            |			 |
    a -/--->|       	 |
            |   adder    |---/-> c
    b -/--->|            |
            |            |
            --------------
               ^      ^ 
               |      |
              clk   reset

*/
module adder(
  input 	   clk	,
  input 	   reset,
  input  [3:0] a	,
  input  [3:0] b	,
  input        valid,
  output [6:0] c  		); 
  
  reg [6:0] tmp_c;
  
  //Reset 
  always @(posedge reset) 
    tmp_c <= 0;
   
  // Waddition operation
  always @(posedge clk) 
    if (valid)    tmp_c <= a + b;
  
  assign c = tmp_c;

endmodule