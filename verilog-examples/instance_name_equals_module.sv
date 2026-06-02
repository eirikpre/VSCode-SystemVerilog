// Regression example for issue #242: an instance given the same name as its
// module type. Ctrl+click on the module type (first token) of the
// instantiation should jump to the module definition below, not the instance.
module my_test_module (
  input  clk,
  output q
);
endmodule

module top;
  my_test_module my_test_module (
    .clk (clk),
    .q   (q)
  );
endmodule
