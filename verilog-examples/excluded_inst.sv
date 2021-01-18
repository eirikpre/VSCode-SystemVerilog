// Folding example that should work
`ifdef A
  A_TEST_ONE;
  A_TEST_TWO;

`ifdef B
  B_TEST_ONE;
  B_TEST_TWO;
  `endif

`ifdef  C
  C_TEST_ONE;
  C_TEST_TWO;
  `endif

A_TEST_ONE;
A_TEST_TWO;
`endif

// Folding example that does not work
`ifdef A
  A_TEST_ONE;
  A_TEST_TWO;

`elsif B
  B_TEST_ONE;
  B_TEST_TWO;

`else  C
  C_TEST_ONE;
  C_TEST_TWO;

`endif


// Excluded from indexing example
module excluded #(
  parameter A
)(
  input a
);

endmodule