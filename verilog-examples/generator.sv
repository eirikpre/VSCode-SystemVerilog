//-------------------------------------------------
//  www.verificationguide.com
//-------------------------------------------------
class generator;
  
  //declaring transaction class 
  rand transaction trans;
  
  //repeat count, to specify number of items to generate
  int  repeat_count;
  
  //mailbox, to generate and send the packet to driver
  mailbox gen2driv;
  
  //event, to indicate the end of transaction generation
  event ended;
  
  //constructor
  function new(mailbox gen2driv);
    //getting the mailbox handle from env, in order to share the transaction packet between the generator and driver, the same mailbox is shared between both.
    this.gen2driv = gen2driv;
  endfunction
  
  //main task, generates(create and randomizes) the repeat_count number of transaction packets and puts into mailbox
  task main();
    repeat(repeat_count) begin
    trans = new();
    if( !trans.randomize() ) $fatal("Gen:: trans randomization failed");
      trans.display("[ Generator ]");
      gen2driv.put(trans);
    end
    -> ended; //triggering indicatesthe end of generation
  endtask
  
endclass