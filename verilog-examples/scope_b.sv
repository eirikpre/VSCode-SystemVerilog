// Scope test (B): a different enum with the SAME type name as scope_a.sv.
module scope_b;
    typedef enum logic [1:0] { B_BLUE, B_YELLOW } scope_color_e;
    scope_color_e b_state;
endmodule
