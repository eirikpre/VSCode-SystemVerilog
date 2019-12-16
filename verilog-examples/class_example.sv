//--------------------------------------------------
// Copyright (c) 2019 ChipVerify. All Rights Reserved.
// Author   : Admin
// Article  : SystemVerilog Class
// Category : SystemVerilog
//--------------------------------------------------
 
 
 
//testing
//----------------------------------
//             Testbench
//----------------------------------
// Create a new class with a single member called
// count that stores integer values
class Packet;
	int count;
endclass
 
module tb;
  	// Create a "handle" for the class Packet that can point to an
  	// object of the class type Packet
  	// Note: This "handle" now points to NULL
	Packet pkt;
 
  	initial begin
      if (pkt == null)
        $display("Packet handle 'pkt' is null");
 
      // Display the class member using the "handle"
      // Expect a run-time error because pkt is not an object
      // yet, and is still pointing to NULL. So pkt is not
      // aware that it should hold a member
      $display ("count = %0d", pkt.count);
  	end
endmodule
