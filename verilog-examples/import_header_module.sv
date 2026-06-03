// Example for issue #189: a module whose ANSI header carries a package import
// (and a comment) before the parameter/port lists. The module must still be
// indexed so go-to-definition and hover work on its instantiation below.
package foo_pkg;
    parameter int WIDTH = 8;
endpackage

module myfoo
    import foo_pkg::*;          // import in the header used to break the parser
#(
    parameter z = 1
) (
    input  logic x,
    output logic y
);
endmodule

module top;
    myfoo #(.z(3)) u_foo (
        .x (x),
        .y (y)
    );
endmodule
