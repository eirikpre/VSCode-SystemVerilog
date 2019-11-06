`define MYMACRO0_0 0
module mymodule();
    reg a = `MYMACRO0_0;
    `define MYMACRO0_1 0
    reg b = `MYMACRO0_1;
    `define MYMACRO1 1
    reg c = `MYMACRO1;
    reg d = `MYMACRO1;
endmodule;
