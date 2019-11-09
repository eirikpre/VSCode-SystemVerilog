//-----------------------------------------------------------------------------
// Copyright (c) 2015, ChipVerify
//-----------------------------------------------------------------------------
// Author         :  Admin
// Email          :  info@chipverify.com
// Description    :  A basic class based functional coverage using sample () 
//-----------------------------------------------------------------------------
 
class packet;
 
   rand bit [7:0]  data;
   constraint c_data {data > 8'h30; data <8'h40; }
 
   covergroup cg;
      coverpoint data {
         bins low_th    = {8'h30};
         bins high_th   = {8'h40};
         bins low []    = {[8'h31:8'h39]}; 
      }
   endgroup
 
   function display ();
      $display ("%0t, data = 0x%0h", $time, data);
   endfunction
endclass
 
module cov_101;
 
   bit clk;
 
   always #10 clk <= ~clk;
 
   packet pkt = new ();
 
   initial begin
      $display ("------------Start Test-------------");
      repeat (10) @ (posedge clk) begin
         pkt.randomize ();
         pkt.display ();
         pkt.cg.sample ();
      end
      $display ("------------End Test-------------");
 
      // Because of the clock that runs forever, we need to explicitly call $finish;
      $finish;
   end
 
endmodule
