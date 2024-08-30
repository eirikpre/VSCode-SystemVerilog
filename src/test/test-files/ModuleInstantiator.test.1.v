//----------------------------------------------
//	www.verificationguide.com   design.sv
//----------------------------------------------
/*
            --------------
 valid ---->|            |
            |			 |
    a -/--->|       	 |
            | adder/bar  |---/-> c
    b -/--->|            |
            |            |
            --------------
               ^      ^
               |      |
              clk   reset

*/

// -------------------------------------------------------
// -- Example without parameters
// -------------------------------------------------------

module adder(
  input 	     clk,
  input 	     reset,
  input  [3:0] a,
  // keep this single comment
  input  [3:0] b,
  /* multiline comment should
  be kept*/
  input        valid,
  output [6:0] c
  );

  reg [6:0] tmp_c;

  //Reset
  always_ff @(posedge reset)
    tmp_c <= pa_adder::RV_C;

  `ifdef VERBOSE_RESET
    always @(posedge reset) begin
      wait(posedge reset);
      $display("Reset asserted!")
    end
  `endif

  // Waddition operation
  always @(posedge clk)
    if(valid) tmp_c <= a + b;

  assign c = tmp_c;

endmodule

// -------------------------------------------------------
// -- Example with parameters
// -------------------------------------------------------

module bar #(
  parameter     SIZE,
  parameter     SIZE_TWO
)(
  input 	     clk,
  input 	     reset,
  input  [3:0] a,
  // keep this single comment
  input  [3:0] b,
  /* multiline comment should
  be kept*/
  input        valid,
  output [6:0] c
  );

  reg [6:0] tmp_c;

  //Reset
  always_ff @(posedge reset)
    tmp_c <= pa_adder::RV_C;

  `ifdef VERBOSE_RESET
    always @(posedge reset) begin
      wait(posedge reset);
      $display("Reset asserted!")
    end
  `endif

  // Waddition operation
  always @(posedge clk)
    if(valid) tmp_c <= a + b;

  assign c = tmp_c;

endmodule

// -------------------------------------------------------
// -- Example without parameters, ports in header
// -------------------------------------------------------

module akker (clk, reset, a, b, valid, c);

  input 	     clk;
  input 	     reset;
  input  [3:0] a;
  // keep this single comment
  input  [3:0] b;
  /* multiline comment should
  be kept*/
  input        valid;
  output [6:0] c;

  reg [6:0] tmp_c;

  //Reset
  always_ff @(posedge reset)
    tmp_c <= pa_adder::RV_C;

  `ifdef VERBOSE_RESET
    always @(posedge reset) begin
      wait(posedge reset);
      $display("Reset asserted!")
    end
  `endif

  // Waddition operation
  always @(posedge clk)
    if(valid) tmp_c <= a + b;

  assign c = tmp_c;

endmodule

// -------------------------------------------------------
// -- Example with parameters, ports in header
// -------------------------------------------------------

module accer #(
  parameter     SIZE,
  parameter     SIZE_TWO
)(clk, reset, a, b, valid, c);

  input 	     clk;
  input 	     reset;
  input  [3:0] a;
  // keep this single comment
  input  [3:0] b;
  /* multiline comment should
  be kept*/
  input        valid;
  output [6:0] c;

  reg [6:0] tmp_c;

  //Reset
  always_ff @(posedge reset)
    tmp_c <= pa_adder::RV_C;

  `ifdef VERBOSE_RESET
    always @(posedge reset) begin
      wait(posedge reset);
      $display("Reset asserted!")
    end
  `endif

  // Waddition operation
  always @(posedge clk)
    if(valid) tmp_c <= a + b;

  assign c = tmp_c;

endmodule

// ---------------------------------------------------------------
// -- Example with parameters (default values), ports in header
// ---------------------------------------------------------------

module anner #(
  parameter     SIZE = 1,
  parameter logic SIZE_TWO = 4
)(clk, reset, a, b, valid, c);

  input 	     clk;
  input 	     reset;
  input  [3:0] a;
  // keep this single comment
  input  [3:0] b;
  /* multiline comment should
  be kept*/
  input        valid;
  output [6:0] c;

  reg [6:0] tmp_c;
  assign c = tmp_c;

endmodule

// ---------------------------------------------------------------
// -- Example with ports in header and comments
// ---------------------------------------------------------------

module atter (
  clk,
  reset,
  //keep
  a,
  //also this comment 1
  b,
  // also this comment 2
  valid,
  c
);

  input 	     clk;
  input 	     reset;
  input  [3:0] a;
  // keep this single comment
  input  [3:0] b;
  /* multiline comment should
  be kept*/
  input        valid;
  output [6:0] c;

  reg [6:0] tmp_c;
  assign c = tmp_c;

endmodule

// ---------------------------------------------------------------
// -- Example without ports in header and comments
// ---------------------------------------------------------------

module apper (
  input 	     clk,
  //keep
  input 	     reset,
  input  [3:0] a,
  //keep this single comment 2
  input  [3:0] b,
  /* multiline comment should
  be kept*/
  input        valid,
  output [6:0] c
  );

  input 	     clk;
  input 	     reset;
  input  [3:0] a;
  // keep this single comment
  input  [3:0] b;
  /* multiline comment should
  be kept*/
  input        valid;
  output [6:0] c;

  reg [6:0] tmp_c;
  assign c = tmp_c;

endmodule

// -------------------------------------------------------
// -- Golden output test
// -------------------------------------------------------

module golden(
  input 	     clk,
  input 	     reset,
  input  [3:0] a,
  // keep this single comment
  input  [3:0] b,
  /* multiline comment should
  be kept*/
  input        valid,
  output [6:0] c
  );

  reg [6:0] tmp_c;

  //Reset
  always_ff @(posedge reset)
    tmp_c <= pa_adder::RV_C;

  `ifdef VERBOSE_RESET
    always @(posedge reset) begin
      wait(posedge reset);
      $display("Reset asserted!")
    end
  `endif

  // Waddition operation
  always @(posedge clk)
    if(valid) tmp_c <= a + b;

  assign c = tmp_c;

endmodule


// ---------------------------------------------------------------
// -- Example of ports with unpacked dimensions and brackets
// ---------------------------------------------------------------

module arrer (
  input 	     clk,
  input 	     reset,
  input  [(2+2)-1:0] a [2:0],
  input  [3:0] b [(3-1):0] ,
  input        valid,
  output [6:0] c
  );

  input 	     clk;
  input 	     reset;
  input  [3:0] a;
  // keep this single comment
  input  [3:0] b;
  /* multiline comment should
  be kept*/
  input        valid;
  output [6:0] c;

  reg [6:0] tmp_c;
  assign c = tmp_c;

endmodule

// ---------------------------------------------------------------
// -- Example of parameters with brackets
// ---------------------------------------------------------------

module azzer #(parameter SIZE = (2*1)+1,
               parameter SIZE_TWO = 2*(1+1)) (
  input 	     clk,
  input 	     reset,
  input  [3:0] a,
  input  [3:0] b,
  input        valid,
  output [6:0] c
  );

  input 	     clk;
  input 	     reset;
  input  [3:0] a;
  // keep this single comment
  input  [3:0] b;
  /* multiline comment should
  be kept*/
  input        valid;
  output [6:0] c;

  reg [6:0] tmp_c;
  assign c = tmp_c;

endmodule

// -------------------------------------------------------
// -- Example without parameters and with import
// -------------------------------------------------------

module abber import pa_Package::*; (
  input 	     clk,
  input 	     reset,
  input  [3:0] a,
  // keep this single comment
  input  [3:0] b,
  /* multiline comment should
  be kept*/
  input        valid,
  output [6:0] c
  );

  reg [6:0] tmp_c;

  //Reset
  always_ff @(posedge reset)
    tmp_c <= pa_adder::RV_C;

  `ifdef VERBOSE_RESET
    always @(posedge reset) begin
      wait(posedge reset);
      $display("Reset asserted!")
    end
  `endif

  // Waddition operation
  always @(posedge clk)
    if(valid) tmp_c <= a + b;

  assign c = tmp_c;

endmodule

// -------------------------------------------------------
// -- Example with parameters and specific import
// -------------------------------------------------------

module affer import pa_Package::PARAMETER1; #(
  parameter     SIZE = PARAMETER1,
  parameter     SIZE_TWO
)(
  input 	     clk,
  input 	     reset,
  input  [3:0] a,
  // keep this single comment
  input  [3:0] b,
  /* multiline comment should
  be kept*/
  input        valid,
  output [6:0] c
  );

  reg [6:0] tmp_c;

  //Reset
  always_ff @(posedge reset)
    tmp_c <= pa_adder::RV_C;

  `ifdef VERBOSE_RESET
    always @(posedge reset) begin
      wait(posedge reset);
      $display("Reset asserted!")
    end
  `endif

  // Waddition operation
  always @(posedge clk)
    if(valid) tmp_c <= a + b;

  assign c = tmp_c;

endmodule
