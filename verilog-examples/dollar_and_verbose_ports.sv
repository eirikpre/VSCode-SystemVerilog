// Examples for issues #257 (net names containing '$') and #254 (verbose
// "input wire logic" port syntax). Open this file to visually verify that the
// names highlight as single identifiers and the verbose ports are recognised.

`default_nettype none

module dollar_and_verbose_ports (
    // Issue #254: explicit nettype + data type ports (needed under
    // `default_nettype none). direction + net type + data type + name.
    input  wire logic        clock,
    input  wire logic        Rst_b,
    input  wire logic [7:0]  InData,
    input  wire logic signed [7:0] SData,
    output wire logic        OutData
);

    // Issue #257: '$' is a legal identifier character (since Verilog-1995).
    // Tool-generated net names frequently contain it.
    wire        n$411;          // '$' followed by digits
    logic       n$abc;          // '$' followed by letters
    logic       foo$;           // trailing '$'
    logic       n$1, n$2, n$3;  // multiple declarations on one line

    assign n$411 = InData[0];
    assign n$abc = InData[1];
    assign foo$  = n$411 & n$abc;

    always_ff @(posedge clock) begin
        if (Rst_b == 1'b0) OutData <= 1'b0;
        else               OutData <= foo$;
    end

endmodule

`default_nettype wire
