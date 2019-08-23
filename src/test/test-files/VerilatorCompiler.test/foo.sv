`include "environment.sv"

class my_trans extends transaction;
    
    bit [1:0] count, test;
    
    function void pre_randomize();
      a.rand_mode(0);
      b.rand_mode(0);          

      a = 10;
      b = 12;
    endfunction
    
endclass

module foo (
  clk, 
  c
); 

  input 	     clk;
  output [6:0] c;

  reg [6:0] tmp_c;
  assign c = tmp_c;
  
  if(valid) tmp_c <= a + b;

  apper u_apper (
  .a    (1)
  );
  
endmodule