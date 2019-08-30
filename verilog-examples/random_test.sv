//-------------------------------------------------------------------------
//						www.verificationguide.com
//-------------------------------------------------------------------------
`include "environment.sv"
program test(intf i_intf);
  
  //declaring environment instance
  environment env;
  
  initial begin
    //creating environment
    env = new(i_intf);
    
    //setting the repeat count of generator as 4, means to generate 4 packets
    env.gen.repeat_count = 4;
    
    //calling run of env, it interns calls generator and driver main tasks.
    env.run();
  end
endprogram

typedef int my_int;

class foo;

  int x;

endclass;

 

class bar extends foo;

  int y;

endclass;


foo z;
z = new bar();

z.//it should suggest both x and y as field inputs to autocomplete with

 

int y; //it should recognize that the scope of y here is outside of bar

 

y = 0; /*if `go to definition` is used on y in the line

it should go to the line above it, instead of inside the class bar*/
