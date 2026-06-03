// Fixtures for member/port/package/value auto-completion tests (issue #82).
// Self-contained: the container types are defined and instantiated here so the
// completion provider can resolve them within this one file.
package mc_pkg;
    parameter MC_PARAM = 1;
    typedef struct packed {
        logic alpha;
        logic beta;
    } mc_struct_t;
    typedef enum logic [1:0] {
        RED,
        GREEN,
        BLUE
    } mc_color_e;
endpackage

class mc_class;
    int gamma;
endclass

module mc_sub (
    input  logic clk_in,
    output logic data_out
);
endmodule

module mc_top;
    import mc_pkg::*;
    mc_struct_t s;
    mc_class    c;
    mc_color_e  fsm_state;

    logic       alias_a;
    int         alias_g;
    localparam  X = mc_pkg::MC_PARAM;

    assign alias_a = s.alpha;
    assign alias_g = c.gamma;

    mc_sub u_sub (.clk_in(alias_a), .data_out(alias_a));

    always_comb begin
        int i = 0;
        // case-item labels are enum values of fsm_state's type
        case (fsm_state)
            RED:   i = 1;
            GREEN: i = 2;
            default: i = 0;
        endcase

        // comparison against an enum value
        if (fsm_state == BLUE) i = 3;
    end
endmodule
