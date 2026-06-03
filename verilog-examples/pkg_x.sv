// Two packages in separate files define an enum with the SAME type name.
package pkg_x;
    typedef enum logic [1:0] { X_ONE, X_TWO } kind_e;
endpackage
