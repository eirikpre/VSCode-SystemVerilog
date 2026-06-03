// =============================================================================
// Member / port / package / enum auto-completion demo (issue #82)
//
// Open this file and try the positions marked "TRY:". Suggestions pop up
// automatically after `.` and `::`; otherwise press Ctrl+Space. Everything is
// self-contained in this file so the completions resolve locally.
//
// For the cross-file SCOPE handling, see scope_a.sv / scope_b.sv (same type
// name in different files) and pkg_x.sv / pkg_y.sv + scope_explicit.sv
// (explicit `pkg::Type` references).
// =============================================================================

package demo_pkg;
    parameter WIDTH = 8;

    typedef enum logic [1:0] {
        IDLE,
        BUSY,
        DONE
    } state_e;

    typedef struct packed {
        logic       valid;
        logic [7:0] data;
        state_e     state;
    } packet_t;

    function automatic int double_it(int v);
        return v * 2;
    endfunction
endpackage

// A class, to exercise object-member completion.
class Transaction;
    int            id;
    string         name;
    rand bit [7:0] payload;

    function void show();
    endfunction
endclass

// A submodule whose ports are completed at instantiation.
module fifo #(
    parameter int DEPTH = 16
) (
    input  logic       clk,
    input  logic       rst_n,
    input  logic [7:0] wr_data,
    output logic [7:0] rd_data,
    output logic       empty
);
endmodule

module demo_top
    import demo_pkg::*;
(
    input logic clk,
    input logic rst_n
);

    packet_t    pkt;        // struct variable
    state_e     cur_state;  // enum variable (imported from demo_pkg)
    Transaction tr;         // class handle

    logic [7:0] data_bus;
    logic       fifo_empty;

    // ----- 1) STRUCT MEMBERS -------------------------------------------------
    // TRY: type `pkt.`  ->  valid, data, state
    assign data_bus = pkt.data;

    // ----- 2) PACKAGE MEMBERS ------------------------------------------------
    // TRY: type `demo_pkg::`  ->  WIDTH, state_e, packet_t, double_it
    localparam int W = demo_pkg::WIDTH;

    // ----- 3) CLASS MEMBERS --------------------------------------------------
    initial begin
        tr = new();
        // TRY: type `tr.`  ->  id, name, payload, show
        tr.id = 1;
    end

    // ----- 4) MODULE PORTS (at instantiation) --------------------------------
    // TRY: on a new line inside the port list below, type `.`  ->  clk, rst_n,
    //      wr_data, rd_data, empty
    fifo #(.DEPTH(8)) u_fifo (
        .clk     (clk),
        .rst_n   (rst_n),
        .wr_data (data_bus),
        .rd_data (data_bus),
        .empty   (fifo_empty)
    );

    // ----- 5) ENUM VALUES in comparisons and case ----------------------------
    always_comb begin
        // TRY: type `cur_state == `  ->  IDLE, BUSY, DONE
        if (cur_state == DONE) begin
        end

        // TRY: on a new label line inside this case, type a letter  ->  IDLE, BUSY, DONE
        case (cur_state)
            IDLE: data_bus = 8'h00;
            BUSY: data_bus = 8'hAA;
            DONE: data_bus = 8'hFF;
        endcase
    end

endmodule
