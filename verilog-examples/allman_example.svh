
// Simple memory model
module ram16(
  input wire port
);
  // This module colors correctly
  ram8 subH(
    .write (),
    .addr  (),
    .wdata (),
    .rdata ()
  );


  // This module does not color correctly (allman style)
  ram8 subL
  (
    .clk    (),
    .write  (),
    .addr   (),
    .wdata  (),
    .rdata  ()
  );

endmodule

module ram8 (
  input  wire clk,
  input  wire write,
  input  wire addr,
  output wire wdata,
);
  // something here
  reg [1:0]  rdata [1:0];

endmodule
