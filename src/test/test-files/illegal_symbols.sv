// This module contains wire name definitions that begin with illegal symbols.
// The parser should allow these names
module illegal_adder(
  input        clk,
  input        reset,
  // Some comment here
  input  [3:0] a,
  input  [3:0] b,
  input        valid,
  output [6:0] c
);

  wire begin_state;
  wire return_true;

  assign return_true = begin_state | a;

endmodule
