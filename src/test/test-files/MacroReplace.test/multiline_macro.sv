`define REG_A_REG_B_DEF reg a = 0;\
    reg b = 0;
module mymodule();
    `REG_A_REG_B_DEF
    reg c = 1;
    reg d = 1;
endmodule;
