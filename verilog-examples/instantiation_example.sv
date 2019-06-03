// -------------------------------------------------------
// -- Example without parameters
// -------------------------------------------------------
module adder(
  input        clk,
  input        reset,
  // Some comment here
  input  [3:0] a,
  input  [3:0] b,
  input        valid,
  output [6:0] c
); 

// -------------------------------------------------------

adder u_adder (
  .clk      (clk),
  .reset    (reset),
  // Some comment here
  .a        (a),
  .b        (b),
  .valid    (valid),
  .c        (c)
);




// -------------------------------------------------------
// -- Example with parameters
// -------------------------------------------------------

module adder #(
  parameter     SIZE,
  parameter     SIZE_TWO,
)(
  input        clk,
  input        reset,
  // Some comment here
  input  [3:0] a,
  input  [3:0] b,
  input        valid,
  output [6:0] c
); 

// -------------------------------------------------------

adder #(
  .SIZE     (SIZE),
  .SIZE_TWO (SIZE_TWO),
) u_adder (
  .clk      (clk),
  .reset    (reset),
  // Some comment here
  .a        (a),
  .b        (b),
  .valid    (valid),
  .c        (c)
);



