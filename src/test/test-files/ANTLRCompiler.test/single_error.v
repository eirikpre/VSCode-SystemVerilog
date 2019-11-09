module baz (
  clk
); 
    input logic clk;
    /* verilator lint_off UNDRIVEN */
  wire A_in, B_in, C_in; 
    /* verilator lint_off UNUSED */
  reg  A_out, B_out, C_out; 
  
  always @( posedge clk ) 
  begin   
      A_out <= A_in  
      B_out <= B_in;   
      C_out <= C_in;
  end
endmodule