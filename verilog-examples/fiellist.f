// A great comment
-f ./${dirname}/my_files.f
-F $(MY_PATH)/my_relative_files.f
-v a_verilog_file.v
-define SYNTHESIS
# another comment
-incdir ./rtl
+incdir+ ./include
+define+NO_PORTS
