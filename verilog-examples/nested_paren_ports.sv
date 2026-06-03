// Regression example for issue #188: nested parentheses inside a port
// connection used to make the highlighter end the binding at the first ')',
// which corrupted the highlighting of the following lines. Every port name
// below should highlight as a port, and the lines after a nested-paren
// connection should be unaffected.
module nested_paren_ports;

    my_mod u_mod (
        .clk    (clk),
        .data   (func(a, b)),              // nested call
        .enable (sel ? foo(x) : bar(y)),   // multiple nested calls
        .bus    ({a, b[3:0], c}),          // concatenation
        .deep   (f(g(h(x)))),              // deeply nested
        .calc   ((a + b) * (c - d)),       // grouped sub-expressions
        .out    (result)                   // must still be a port
    );

endmodule
