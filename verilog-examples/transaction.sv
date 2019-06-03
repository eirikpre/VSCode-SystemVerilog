//-------------------------------------------------------------------------
//						www.verificationguide.com 
//-------------------------------------------------------------------------
class transaction;
  $support()
  $support()
  //declaring the transaction items
  rand bit [3:0] a;
  rand bit [3:0] b;
       bit [6:0] c;
  function void display(string name);
    $display("-------------------------");
    $display("- %s ",name);
    $display("-------------------------");
    $display("- a = %0d, b = %0d",a,b);
    $display("- c = %0d",c);
    $display("-------------------------");
  endfunction
endclass