class Packet;
   int addr;
 
   function new (int addr);
      this.addr = addr;
   endfunction
 
  function display ();
    $display ("[Base] addr=0x%0h", addr);
  endfunction
endclass
 
// A subclass called 'ExtPacket' is derived from the base class 'Packet' using
// 'extends' keyword which makes 'EthPacket' a child of the parent class 'Packet'
// The child class inherits all variables and methods from the parent class
class ExtPacket extends Packet;
 
  // This is a new variable only available in child class
  int data;     
 
   function new (int addr, data);
      super.new (addr);   // Calls 'new' method of parent class
      this.data = data;
   endfunction
 
  function display ();
    $display ("[Child] addr=0x%0h data=0x%0h", addr, data);
  endfunction
endclass
 
module tb;
  Packet      bc;   // bc stands for BaseClass
  ExtPacket   sc;   // sc stands for SubClass
 
  initial begin
    bc = new (32'hface_cafe);
    bc.display ();
 
        sc = new (32'hfeed_feed, 32'h1234_5678);  
    sc.display ();
  end
endmodule