// Sample file exercising DPI-C import/export highlighting (issue #125 corner cases).
module dpi_examples;

    // Legacy spelling
    import "DPI" function void legacy_func(input int a);

    // Standard "DPI-C" spelling (hyphen was the corner case that failed before)
    import "DPI-C" function void simple_void(input int a);
    import "DPI-C" function int  with_return(input int a, output int b);

    // context / pure qualifiers
    import "DPI-C" context function int ctx_func(input int handle);
    import "DPI-C" pure    function int pure_func(input int a);

    // Optional C linkage name (c_identifier = ...)
    import "DPI-C" c_side_name = function int renamed_func(input int a);
    import "DPI-C" context c_ctx = function void renamed_ctx(input int h);

    // DPI tasks
    import "DPI-C" task simple_task(input int a);
    import "DPI-C" context task ctx_task(input int h);

    // Exports
    export "DPI-C" function exported_func;
    export "DPI-C" task     exported_task;
    export "DPI-C" c_export_name = function exported_renamed;

endmodule
