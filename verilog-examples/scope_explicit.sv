// Explicit `pkg_x::kind_e` reference must resolve to pkg_x's definition,
// not pkg_y's same-named enum (and without a wildcard import).
module scope_explicit;
    pkg_x::kind_e v;
    always_comb begin
        if (v == X_ONE) begin end
    end
endmodule
