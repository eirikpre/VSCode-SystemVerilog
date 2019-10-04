// hello
module segdetect( CLOCK, RESET, C, Z );
  input CLOCK, RESET, C;
  output Z;
  reg Z;
  reg [2:0] Sreg, Snext;        // State register and next state
  parameter [2:0] S0 = 3'b000,  // Define the states
                  S1  = 3'b001,
                  S2  = 3'b010,
                  S3  = 3'b011,
                  S4  = 3'b100,
            		  S5  = 3'b101,   
                  S6  = 3'b111;

  always @ (posedge CLOCK or posedge RESET) // Create state memory
    if (RESET==1) Sreg <= S0; else Sreg <= Snext;

  always @ (C, Sreg) begin  // Next-state logic
    case (Sreg)
      S0:     if (C==0)  Snext = S0;
              else       Snext = S1;
      S1:     if (C==0)  Snext = S1;
              else       Snext = S2;
      S2:     if (C==0)  Snext = S2;
              else       Snext = S3;
      S3:    if (C==0)  Snext = S3;
              else  Snext = S4;
      S4:    if (C==0)  Snext = S4;
                else  Snext = S5;
      S5:    if (C==0)  Snext = S5;
                else  Snext = S6;
      S6:    if (C==0) Snext = S6;
              else  Snext = S0;
      default Snext = S0;
    endcase
  end

  always @ (Sreg)        // Output logic
    case (Sreg)
      S0, S1, S2, S3, S4: Z = 0;
      S5:     if (C==0) Z = 1;
                  else Z=0;
      default       Z = 0;
    endcase
endmodule

module correct(my_input, my_output);
    input my_input;
	output my_output;
	wire my_output;
	always @ (my_input) begin
	    my_output <= !my_input;
    end
endmodule

module correct2(my_input, my_output);
    input my_input;
	output my_output;
	wire my_output;
	always @ (my_input) begin
	    my_output <= !my_input;
    end
endmodule
