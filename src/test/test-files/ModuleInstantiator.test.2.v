// -------------------------------------------------------
// -- Example without parameters
// -------------------------------------------------------

adder u_adder (
  .clk      (clk),
  .reset    (reset),
  .a        (a),
  // keep this single comment
  .b        (b),
  /* multiline comment should
  be kept*/
  .valid    (valid),
  .c        (c)
);




// -------------------------------------------------------
// -- Example with parameters
// -------------------------------------------------------

bar #(
  .SIZE        (SIZE),
  .SIZE_TWO    (SIZE_TWO)
) u_bar (
  .clk         (clk),
  .reset       (reset),
  .a           (a),
  // keep this single comment
  .b           (b),
  /* multiline comment should
  be kept*/
  .valid       (valid),
  .c           (c)
);

// -------------------------------------------------------
// -- Example without parameters, ports in header
// -------------------------------------------------------

akker u_akker (
  .clk      (clk),
  .reset    (reset),
  .a        (a),
  .b        (b),
  .valid    (valid),
  .c        (c)
);

// -------------------------------------------------------
// -- Example without parameters, ports in header
// -------------------------------------------------------

accer #(
  .SIZE        (SIZE),
  .SIZE_TWO    (SIZE_TWO)
) u_accer (
  .clk         (clk),
  .reset       (reset),
  .a           (a),
  .b           (b),
  .valid       (valid),
  .c           (c)
);

// -------------------------------------------------------
// -- Example with parameters (default values), ports in header
// -------------------------------------------------------

anner #(
  .SIZE        (1),
  .SIZE_TWO    (4)
) u_anner (
  .clk         (clk),
  .reset       (reset),
  .a           (a),
  .b           (b),
  .valid       (valid),
  .c           (c)
);


// ---------------------------------------------------------------
// -- Example with ports in header and comments
// ---------------------------------------------------------------

atter u_atter (
  .clk         (clk),
  .reset       (reset),
  //keep
  .a           (a),
  //also this comment 1
  .b           (b),
  // also this comment 2
  .valid       (valid),
  .c           (c)
);

// ---------------------------------------------------------------
// -- Example without ports in header and comments
// ---------------------------------------------------------------

apper u_apper (
  .clk      (clk),
  //keep
  .reset    (reset),
  .a        (a),
  //keep this single comment 2
  .b        (b),
  /* multiline comment should
  be kept*/
  .valid    (valid),
  .c        (c)
);


// -------------------------------------------------------
// -- Golden output test
// -------------------------------------------------------

golden u_golden (
  .clk      (clk),
  .reset    (reset),
  .a        (a),
  // keep this single comment
  .b        (b),
  /* multiline comment should
  be kept*/
  .valid    (valid),
  .c        (c)
);

// -------------------------------------------------------
// -- End file
// -------------------------------------------------------