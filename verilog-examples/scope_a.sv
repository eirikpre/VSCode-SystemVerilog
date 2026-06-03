// Scope test (A): a locally-defined enum sharing a name with scope_b.sv.
module scope_a;
    typedef enum logic [1:0] { A_RED, A_GREEN } scope_color_e;
    scope_color_e a_state;
    always_comb begin
        if (a_state == A_RED) begin end
    end
endmodule
