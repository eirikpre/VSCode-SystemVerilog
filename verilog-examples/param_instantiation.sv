// Regression example: parameterized module instantiations must highlight the
// module name, instance name and port connections the same as a parameterless
// instantiation. (A `class-instance-parameters` rule had been shadowing
// `module-parameters`, dropping the port-binding highlighting.)
module param_instantiation_demo;

    // Parameterless (the reference for correct highlighting).
    mod_basic u_basic (
        .clk_i  (clk_i),
        .rst_ni (rst_ni)
    );

    // Parameter list containing `ifdef directives.
    mod_cfg #(
        .WIDTH (32),
`ifdef ENABLE_FEATURE
        .MODE  (1)
`else
        .MODE  (0)
`endif
    ) u_cfg (
        .clk_i  (clk_i),
        .addr_i (bus_addr[CH0][9:0]),
        .err_o  (bus_err[CH0])
    );

    // Parameter list with comments and sized literals.
    mod_mem #(
        .BASE_ADDR (20'h0_1000),  // base address
        .MEM_SIZE  (20'h0_0040)   // 64 bytes
    ) u_mem (
        .clk_i   (clk_i),
        .valid_o (mem_valid)
    );

endmodule
