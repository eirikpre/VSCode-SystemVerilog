`define MYMACRO0 0
`define MYMACRO1 1
module mymodule();
    reg a = `MYMACRO0;
    reg b = `MYMACRO0;
    reg c = `MYMACRO1;
    reg d = `MYMACRO1;
endmodule;
