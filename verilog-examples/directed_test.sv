//-------------------------------------------------------------------------
//						www.verificationguide.com
//-------------------------------------------------------------------------
`include "environment.sv"
program automatic test(intf i_intf);

  class my_trans extends transaction;

    bit [1:0] count, test;

    function void pre_randomize();
      a.rand_mode(0);
      b.rand_mode(0);

      a = 10;
      b = 12;
    endfunction

  endclass

  //declaring environment instance
  environment env;
  my_trans my_tr;

  initial begin
    //creating environment
    env = new(i_intf);

    my_tr = new();

    //setting the repeat count of generator as 4, means to generate 4 packets
    env.gen.repeat_count = 10;

    env.gen.trans = my_tr;

    //calling run of env, it interns calls generator and driver main tasks.
    env.run();

    // Unique case colorization test
    typedef enum [2:0] {A,B,C,D,e,f} state_e;

    begin a();

    always_ff @(posedge ck, posedge arst) begin
      if (arst)
        cal_counter <= '0;
      else begin
        unique case(current_state_r)
          A: // ...
          B: // ...
        endcase
      end
    end


  end
endprogram