package pa_Package;

  parameter PARAMETER   = 1;
  localparam PARAMETER2 = 2;

  typedef struct packed
  {
    logic foo;
    logic bar;
  } my_dumb_struct;


  struct packed
  {
    logic foo;
    logic bar;
  } my_struct;



  my_dumb_struct a_dumb_struct;

  typedef int [7:0] int_8;

endpackage