//-------------------------------------------------------------------------
//						www.verificationguide.com
//-------------------------------------------------------------------------
//gets the packet from generator and drive the transaction paket items into interface (interface is connected to DUT, so the items driven into interface signal will get driven in to DUT)

`define MY_MACRO HELP! :-)

class driver;
  localparam P1 = pa_Package::PARAMETER;
  localparam P2 = pa_Package::PARAMETER2;

  cat u_cat();
  123 u_123();
  abc u_abc();

  //used to count the number of transactions
  int no_transactions;

  //creating virtual interface handle
  virtual intf vif;

  //creating mailbox handle
  mailbox gen2driv;

  //constructor
  function new(virtual intf vif,mailbox gen2driv);
    //getting the interface
    this.vif = vif;
    //getting the mailbox handles from  environment
    this.gen2driv = gen2driv;
  endfunction

  //Reset task, Reset the Interface signals to default/initial values
  task reset;
    wait(vif.reset);
    $display("[ DRIVER ] ----- Reset Started -----");
    vif.a <= 0;
    vif.b <= 0;
    vif.valid <= 0;
    wait(!vif.reset);
    $display("[ DRIVER ] ----- Reset Ended   -----");
  endtask

  //drivers the transaction items to interface signals
  task main;
    forever begin
      transaction trans;
      gen2driv.get(trans);
      @(posedge vif.clk);
      vif.valid <= 1;
      vif.a     <= trans.a;
      vif.b     <= trans.b;
      @(posedge vif.clk);
      vif.valid <= 0;
      trans.c   = vif.c;
      @(posedge vif.clk);
      trans.display("[ Driver ]");
      no_transactions++;
    end
  endtask

endclass

class typedef_test;
    typedef int unsigned uint_t;
    typedef logic [0:15] packed_array_t;

    typedef int unsigned uint_array[10];
    typedef int unsigned uint_queue[$];
    typedef int unsigned uint_dynamic_array[];
    typedef int unsigned uint_associative_array[uint_t];
    typedef int unsigned uint_array_2d[10][10];
    typedef logic unpacked_array_t [10];
    typedef logic [0:15] packed_unpacked_array_t [10];

    // Working:
    uint_t number;
    packed_array_t packed_array;

    // Not working:
    uint_array array;
    uint_queue queue;
    uint_dynamic_array dynamic_array;
    uint_associative_array associative_array;
    uint_array_2d array_2d;
    unpacked_array_t unpacked_array;
    packed_unpacked_array_t packed_unpacked_array;
endclass
