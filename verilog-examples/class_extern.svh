`ifndef CLASS_EXTERN_SVI
`define CLASS_EXTERN_SVI

class class_extern;
  int address; 
  bit [63:0] data;
  shortint crc;
  
  extern function new();
  extern task print();
endclass


`endif