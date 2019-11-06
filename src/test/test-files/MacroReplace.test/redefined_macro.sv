`define MYMACRO 0
module mymodule();
    reg a = `MYMACRO;
    `define MYMACRO 1
    reg b = `MYMACRO;
endmodule;
