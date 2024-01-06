module portTest (
    input dataIn,
    output dataOut
);

assign dataOut = dataIn + 1;

endmodule

module parameterTest #(
    parameter EMPTY_PARAMETER,
    parameter DEFINED_PARAMETER = 1,
    parameter bit BIT_PARAMETER = 1,
    parameter bit [31:0] BIT_ARRAY_PARAMETER = 32'b1,
    parameter int INT_PARAMETER = 10,
    parameter int unsigned INT_UNSIGNED_PARAMETER = 10,
    parameter PACKAGE_PARAMETER = pa_Package::PARAMETER
)(
    input logic ck,
    input logic arst,
    output logic [31:0] data
);

localparam LPARAM_0 = EMPTY_PARAMETER;
localparam LPARAM_1 = DEFINED_PARAMETER;
localparam LPARAM_2 = BIT_PARAMETER;
localparam LPARAM_3 = BIT_ARRAY_PARAMETER;
localparam LPARAM_4 = INT_PARAMETER;
localparam LPARAM_5 = INT_UNSIGNED_PARAMETER;
localparam LPARAM_6 = PACKAGE_PARAMETER;

logic [31:0] currentData;
logic [31:0] nextData;

assign data = currentData;

always_ff @(posedge ck or arst) begin
    if(arst) begin
        currentData <= '0;
    end else begin
        currentData <= nextData;
    end
end

portTest u_test (
    .dataIn     (currentData),
    .dataOut    (nextData)
);

endmodule

