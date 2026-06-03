`ifndef COMP_GUARD
`define COMP_GUARD
  class x
    function z
      `ifdef A
        behavior_1
        `ifdef B
          behavior_1b
        `elsif C
          behavior_1c
        `else // B
          behavior_1d
        `endif // B
      `elsif D
        behavior_2
      `else // A
        behavior_3
      `endif // A
    endfunction
  endclass
`endif // COMP_GUARD
