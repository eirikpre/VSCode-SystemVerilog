// Generated from ./src/compiling/ANTLR/grammar/SystemVerilog.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { System_verilog_textContext } from "./SystemVerilogParser";
import { Source_textContext } from "./SystemVerilogParser";
import { DescriptionContext } from "./SystemVerilogParser";
import { Module_nonansi_headerContext } from "./SystemVerilogParser";
import { Module_ansi_headerContext } from "./SystemVerilogParser";
import { Module_declarationContext } from "./SystemVerilogParser";
import { Module_keywordContext } from "./SystemVerilogParser";
import { Interface_declarationContext } from "./SystemVerilogParser";
import { Interface_nonansi_headerContext } from "./SystemVerilogParser";
import { Interface_ansi_headerContext } from "./SystemVerilogParser";
import { Program_declarationContext } from "./SystemVerilogParser";
import { Program_nonansi_headerContext } from "./SystemVerilogParser";
import { Program_ansi_headerContext } from "./SystemVerilogParser";
import { Checker_declarationContext } from "./SystemVerilogParser";
import { Class_declarationContext } from "./SystemVerilogParser";
import { Interface_class_typeContext } from "./SystemVerilogParser";
import { Interface_class_declarationContext } from "./SystemVerilogParser";
import { Interface_class_itemContext } from "./SystemVerilogParser";
import { Interface_class_methodContext } from "./SystemVerilogParser";
import { Package_declarationContext } from "./SystemVerilogParser";
import { Timeunits_declarationContext } from "./SystemVerilogParser";
import { Timescale_compiler_directiveContext } from "./SystemVerilogParser";
import { Time_precisionContext } from "./SystemVerilogParser";
import { Include_compiler_directiveContext } from "./SystemVerilogParser";
import { Parameter_port_listContext } from "./SystemVerilogParser";
import { Parameter_port_declarationContext } from "./SystemVerilogParser";
import { List_of_portsContext } from "./SystemVerilogParser";
import { List_of_port_declarationsContext } from "./SystemVerilogParser";
import { Port_declarationContext } from "./SystemVerilogParser";
import { PortContext } from "./SystemVerilogParser";
import { Port_expressionContext } from "./SystemVerilogParser";
import { Port_referenceContext } from "./SystemVerilogParser";
import { Port_directionContext } from "./SystemVerilogParser";
import { Net_port_headerContext } from "./SystemVerilogParser";
import { Variable_port_headerContext } from "./SystemVerilogParser";
import { Interface_port_headerContext } from "./SystemVerilogParser";
import { Ansi_port_declarationContext } from "./SystemVerilogParser";
import { Elaboration_system_taskContext } from "./SystemVerilogParser";
import { Finish_numberContext } from "./SystemVerilogParser";
import { Module_common_itemContext } from "./SystemVerilogParser";
import { Simulation_control_taskContext } from "./SystemVerilogParser";
import { Module_itemContext } from "./SystemVerilogParser";
import { Module_or_generate_itemContext } from "./SystemVerilogParser";
import { Module_or_generate_item_declarationContext } from "./SystemVerilogParser";
import { Non_port_module_itemContext } from "./SystemVerilogParser";
import { Parameter_overrideContext } from "./SystemVerilogParser";
import { Bind_directiveContext } from "./SystemVerilogParser";
import { Bind_target_scopeContext } from "./SystemVerilogParser";
import { Bind_target_instanceContext } from "./SystemVerilogParser";
import { Bind_target_instance_listContext } from "./SystemVerilogParser";
import { Bind_instantiationContext } from "./SystemVerilogParser";
import { Config_declarationContext } from "./SystemVerilogParser";
import { Design_statementContext } from "./SystemVerilogParser";
import { Config_rule_statementContext } from "./SystemVerilogParser";
import { Default_clauseContext } from "./SystemVerilogParser";
import { Inst_clauseContext } from "./SystemVerilogParser";
import { Inst_nameContext } from "./SystemVerilogParser";
import { Cell_clauseContext } from "./SystemVerilogParser";
import { Liblist_clauseContext } from "./SystemVerilogParser";
import { Use_clauseContext } from "./SystemVerilogParser";
import { Interface_or_generate_itemContext } from "./SystemVerilogParser";
import { Extern_tf_declarationContext } from "./SystemVerilogParser";
import { Interface_itemContext } from "./SystemVerilogParser";
import { Non_port_interface_itemContext } from "./SystemVerilogParser";
import { Program_itemContext } from "./SystemVerilogParser";
import { Non_port_program_itemContext } from "./SystemVerilogParser";
import { Program_generate_itemContext } from "./SystemVerilogParser";
import { Checker_port_listContext } from "./SystemVerilogParser";
import { Checker_port_itemContext } from "./SystemVerilogParser";
import { Checker_port_directionContext } from "./SystemVerilogParser";
import { Checker_or_generate_itemContext } from "./SystemVerilogParser";
import { Checker_or_generate_item_declarationContext } from "./SystemVerilogParser";
import { Checker_generate_itemContext } from "./SystemVerilogParser";
import { Class_itemContext } from "./SystemVerilogParser";
import { Class_propertyContext } from "./SystemVerilogParser";
import { Class_methodContext } from "./SystemVerilogParser";
import { Class_constructor_prototypeContext } from "./SystemVerilogParser";
import { Class_constraintContext } from "./SystemVerilogParser";
import { Class_item_qualifierContext } from "./SystemVerilogParser";
import { Property_qualifierContext } from "./SystemVerilogParser";
import { Random_qualifierContext } from "./SystemVerilogParser";
import { Method_qualifierContext } from "./SystemVerilogParser";
import { Method_prototypeContext } from "./SystemVerilogParser";
import { Class_constructor_declarationContext } from "./SystemVerilogParser";
import { Constraint_declarationContext } from "./SystemVerilogParser";
import { Constraint_blockContext } from "./SystemVerilogParser";
import { Constraint_block_itemContext } from "./SystemVerilogParser";
import { Solve_before_listContext } from "./SystemVerilogParser";
import { Constraint_primaryContext } from "./SystemVerilogParser";
import { Constraint_expressionContext } from "./SystemVerilogParser";
import { Uniqueness_constraintContext } from "./SystemVerilogParser";
import { Constraint_setContext } from "./SystemVerilogParser";
import { Dist_listContext } from "./SystemVerilogParser";
import { Dist_itemContext } from "./SystemVerilogParser";
import { Dist_weightContext } from "./SystemVerilogParser";
import { Constraint_prototypeContext } from "./SystemVerilogParser";
import { Constraint_prototype_qualifierContext } from "./SystemVerilogParser";
import { Extern_constraint_declarationContext } from "./SystemVerilogParser";
import { Identifier_listContext } from "./SystemVerilogParser";
import { Package_itemContext } from "./SystemVerilogParser";
import { Package_or_generate_item_declarationContext } from "./SystemVerilogParser";
import { Anonymous_programContext } from "./SystemVerilogParser";
import { Anonymous_program_itemContext } from "./SystemVerilogParser";
import { Local_parameter_declarationContext } from "./SystemVerilogParser";
import { Parameter_declarationContext } from "./SystemVerilogParser";
import { Specparam_declarationContext } from "./SystemVerilogParser";
import { Inout_declarationContext } from "./SystemVerilogParser";
import { Input_declarationContext } from "./SystemVerilogParser";
import { Output_declarationContext } from "./SystemVerilogParser";
import { Interface_port_declarationContext } from "./SystemVerilogParser";
import { Ref_declarationContext } from "./SystemVerilogParser";
import { Data_declarationContext } from "./SystemVerilogParser";
import { Package_import_declarationContext } from "./SystemVerilogParser";
import { Package_import_itemContext } from "./SystemVerilogParser";
import { Package_export_declarationContext } from "./SystemVerilogParser";
import { Genvar_declarationContext } from "./SystemVerilogParser";
import { Net_declarationContext } from "./SystemVerilogParser";
import { Type_declarationContext } from "./SystemVerilogParser";
import { Net_type_declarationContext } from "./SystemVerilogParser";
import { LifetimeContext } from "./SystemVerilogParser";
import { Data_typeContext } from "./SystemVerilogParser";
import { Data_type_or_implicitContext } from "./SystemVerilogParser";
import { Implicit_data_typeContext } from "./SystemVerilogParser";
import { Enum_base_typeContext } from "./SystemVerilogParser";
import { Enum_name_declarationContext } from "./SystemVerilogParser";
import { Class_scopeContext } from "./SystemVerilogParser";
import { Class_typeContext } from "./SystemVerilogParser";
import { Integer_typeContext } from "./SystemVerilogParser";
import { Integer_atom_typeContext } from "./SystemVerilogParser";
import { Integer_vector_typeContext } from "./SystemVerilogParser";
import { Non_integer_typeContext } from "./SystemVerilogParser";
import { Net_typeContext } from "./SystemVerilogParser";
import { Net_port_typeContext } from "./SystemVerilogParser";
import { Variable_port_typeContext } from "./SystemVerilogParser";
import { Var_data_typeContext } from "./SystemVerilogParser";
import { SigningContext } from "./SystemVerilogParser";
import { Simple_typeContext } from "./SystemVerilogParser";
import { Struct_union_memberContext } from "./SystemVerilogParser";
import { Data_type_or_voidContext } from "./SystemVerilogParser";
import { Struct_unionContext } from "./SystemVerilogParser";
import { Type_referenceContext } from "./SystemVerilogParser";
import { Drive_strengthContext } from "./SystemVerilogParser";
import { Strength0Context } from "./SystemVerilogParser";
import { Strength1Context } from "./SystemVerilogParser";
import { Charge_strengthContext } from "./SystemVerilogParser";
import { Delay3Context } from "./SystemVerilogParser";
import { Delay2Context } from "./SystemVerilogParser";
import { Delay_valueContext } from "./SystemVerilogParser";
import { List_of_defparam_assignmentsContext } from "./SystemVerilogParser";
import { List_of_genvar_identifiersContext } from "./SystemVerilogParser";
import { List_of_interface_identifiersContext } from "./SystemVerilogParser";
import { List_of_net_decl_assignmentsContext } from "./SystemVerilogParser";
import { List_of_param_assignmentsContext } from "./SystemVerilogParser";
import { List_of_port_identifiersContext } from "./SystemVerilogParser";
import { List_of_udp_port_identifiersContext } from "./SystemVerilogParser";
import { List_of_specparam_assignmentsContext } from "./SystemVerilogParser";
import { List_of_tf_variable_identifiersContext } from "./SystemVerilogParser";
import { List_of_type_assignmentsContext } from "./SystemVerilogParser";
import { List_of_variable_decl_assignmentsContext } from "./SystemVerilogParser";
import { List_of_variable_identifiersContext } from "./SystemVerilogParser";
import { List_of_variable_port_identifiersContext } from "./SystemVerilogParser";
import { Defparam_assignmentContext } from "./SystemVerilogParser";
import { Net_decl_assignmentContext } from "./SystemVerilogParser";
import { Param_assignmentContext } from "./SystemVerilogParser";
import { Specparam_assignmentContext } from "./SystemVerilogParser";
import { Type_assignmentContext } from "./SystemVerilogParser";
import { Pulse_control_specparamContext } from "./SystemVerilogParser";
import { Error_limit_valueContext } from "./SystemVerilogParser";
import { Reject_limit_valueContext } from "./SystemVerilogParser";
import { Limit_valueContext } from "./SystemVerilogParser";
import { Variable_decl_assignmentContext } from "./SystemVerilogParser";
import { Class_newContext } from "./SystemVerilogParser";
import { Dynamic_array_newContext } from "./SystemVerilogParser";
import { Unpacked_dimensionContext } from "./SystemVerilogParser";
import { Packed_dimensionContext } from "./SystemVerilogParser";
import { Associative_dimensionContext } from "./SystemVerilogParser";
import { Variable_dimensionContext } from "./SystemVerilogParser";
import { Queue_dimensionContext } from "./SystemVerilogParser";
import { Unsized_dimensionContext } from "./SystemVerilogParser";
import { Function_data_type_or_implicitContext } from "./SystemVerilogParser";
import { Function_declarationContext } from "./SystemVerilogParser";
import { Function_body_declarationContext } from "./SystemVerilogParser";
import { Function_prototypeContext } from "./SystemVerilogParser";
import { Dpi_import_exportContext } from "./SystemVerilogParser";
import { Dpi_spec_stringContext } from "./SystemVerilogParser";
import { Dpi_function_import_propertyContext } from "./SystemVerilogParser";
import { Dpi_task_import_propertyContext } from "./SystemVerilogParser";
import { Dpi_function_protoContext } from "./SystemVerilogParser";
import { Dpi_task_protoContext } from "./SystemVerilogParser";
import { Task_declarationContext } from "./SystemVerilogParser";
import { Task_body_declarationContext } from "./SystemVerilogParser";
import { Tf_item_declarationContext } from "./SystemVerilogParser";
import { Tf_port_listContext } from "./SystemVerilogParser";
import { Tf_port_itemContext } from "./SystemVerilogParser";
import { Tf_port_directionContext } from "./SystemVerilogParser";
import { Tf_port_declarationContext } from "./SystemVerilogParser";
import { Task_prototypeContext } from "./SystemVerilogParser";
import { Block_item_declarationContext } from "./SystemVerilogParser";
import { Modport_declarationContext } from "./SystemVerilogParser";
import { Modport_itemContext } from "./SystemVerilogParser";
import { Modport_ports_declarationContext } from "./SystemVerilogParser";
import { Modport_clocking_declarationContext } from "./SystemVerilogParser";
import { Modport_simple_ports_declarationContext } from "./SystemVerilogParser";
import { Modport_simple_portContext } from "./SystemVerilogParser";
import { Modport_tf_ports_declarationContext } from "./SystemVerilogParser";
import { Modport_tf_portContext } from "./SystemVerilogParser";
import { Import_exportContext } from "./SystemVerilogParser";
import { Concurrent_assertion_itemContext } from "./SystemVerilogParser";
import { Concurrent_assertion_statementContext } from "./SystemVerilogParser";
import { Assert_property_statementContext } from "./SystemVerilogParser";
import { Assume_property_statementContext } from "./SystemVerilogParser";
import { Cover_property_statementContext } from "./SystemVerilogParser";
import { Expect_property_statementContext } from "./SystemVerilogParser";
import { Cover_sequence_statementContext } from "./SystemVerilogParser";
import { Restrict_property_statementContext } from "./SystemVerilogParser";
import { Property_instanceContext } from "./SystemVerilogParser";
import { Property_list_of_argumentsContext } from "./SystemVerilogParser";
import { Property_actual_argContext } from "./SystemVerilogParser";
import { Assertion_item_declarationContext } from "./SystemVerilogParser";
import { Property_declarationContext } from "./SystemVerilogParser";
import { Property_port_listContext } from "./SystemVerilogParser";
import { Property_port_itemContext } from "./SystemVerilogParser";
import { Property_lvar_port_directionContext } from "./SystemVerilogParser";
import { Property_formal_typeContext } from "./SystemVerilogParser";
import { Property_specContext } from "./SystemVerilogParser";
import { Property_exprContext } from "./SystemVerilogParser";
import { Property_case_itemContext } from "./SystemVerilogParser";
import { Sequence_declarationContext } from "./SystemVerilogParser";
import { Sequence_port_listContext } from "./SystemVerilogParser";
import { Sequence_port_itemContext } from "./SystemVerilogParser";
import { Sequence_lvar_port_directionContext } from "./SystemVerilogParser";
import { Sequence_formal_typeContext } from "./SystemVerilogParser";
import { Sequence_exprContext } from "./SystemVerilogParser";
import { Cycle_delay_rangeContext } from "./SystemVerilogParser";
import { Sequence_method_callContext } from "./SystemVerilogParser";
import { Sequence_match_itemContext } from "./SystemVerilogParser";
import { Sequence_instanceContext } from "./SystemVerilogParser";
import { Sequence_list_of_argumentsContext } from "./SystemVerilogParser";
import { Sequence_actual_argContext } from "./SystemVerilogParser";
import { Boolean_abbrevContext } from "./SystemVerilogParser";
import { Sequence_abbrevContext } from "./SystemVerilogParser";
import { Consecutive_repetitionContext } from "./SystemVerilogParser";
import { Non_consecutive_repetitionContext } from "./SystemVerilogParser";
import { Goto_repetitionContext } from "./SystemVerilogParser";
import { Const_or_range_expressionContext } from "./SystemVerilogParser";
import { Cycle_delay_const_range_expressionContext } from "./SystemVerilogParser";
import { Expression_or_distContext } from "./SystemVerilogParser";
import { Assertion_variable_declarationContext } from "./SystemVerilogParser";
import { Covergroup_declarationContext } from "./SystemVerilogParser";
import { Coverage_spec_or_optionContext } from "./SystemVerilogParser";
import { Coverage_optionContext } from "./SystemVerilogParser";
import { Coverage_specContext } from "./SystemVerilogParser";
import { Coverage_eventContext } from "./SystemVerilogParser";
import { Block_event_expressionContext } from "./SystemVerilogParser";
import { Hierarchical_btf_identifierContext } from "./SystemVerilogParser";
import { Cover_pointContext } from "./SystemVerilogParser";
import { Bins_or_emptyContext } from "./SystemVerilogParser";
import { Bins_or_optionsContext } from "./SystemVerilogParser";
import { Bins_keywordContext } from "./SystemVerilogParser";
import { Trans_listContext } from "./SystemVerilogParser";
import { Trans_setContext } from "./SystemVerilogParser";
import { Trans_range_listContext } from "./SystemVerilogParser";
import { Trans_itemContext } from "./SystemVerilogParser";
import { Repeat_rangeContext } from "./SystemVerilogParser";
import { Cover_crossContext } from "./SystemVerilogParser";
import { List_of_cross_itemsContext } from "./SystemVerilogParser";
import { Cross_itemContext } from "./SystemVerilogParser";
import { Cross_bodyContext } from "./SystemVerilogParser";
import { Cross_body_itemContext } from "./SystemVerilogParser";
import { Bins_selection_or_optionContext } from "./SystemVerilogParser";
import { Bins_selectionContext } from "./SystemVerilogParser";
import { Select_expressionContext } from "./SystemVerilogParser";
import { Select_conditionContext } from "./SystemVerilogParser";
import { Bins_expressionContext } from "./SystemVerilogParser";
import { Covergroup_range_listContext } from "./SystemVerilogParser";
import { Covergroup_value_rangeContext } from "./SystemVerilogParser";
import { With_covergroup_expressionContext } from "./SystemVerilogParser";
import { Set_covergroup_expressionContext } from "./SystemVerilogParser";
import { Integer_covergroup_expressionContext } from "./SystemVerilogParser";
import { Cross_set_expressionContext } from "./SystemVerilogParser";
import { Covergroup_expressionContext } from "./SystemVerilogParser";
import { Let_declarationContext } from "./SystemVerilogParser";
import { Let_identifierContext } from "./SystemVerilogParser";
import { Let_port_listContext } from "./SystemVerilogParser";
import { Let_port_itemContext } from "./SystemVerilogParser";
import { Let_formal_typeContext } from "./SystemVerilogParser";
import { Let_expressionContext } from "./SystemVerilogParser";
import { Let_list_of_argumentsContext } from "./SystemVerilogParser";
import { Let_actual_argContext } from "./SystemVerilogParser";
import { Gate_instantiationContext } from "./SystemVerilogParser";
import { Cmos_switch_instanceContext } from "./SystemVerilogParser";
import { Enable_gate_instanceContext } from "./SystemVerilogParser";
import { Mos_switch_instanceContext } from "./SystemVerilogParser";
import { N_input_gate_instanceContext } from "./SystemVerilogParser";
import { N_output_gate_instanceContext } from "./SystemVerilogParser";
import { Pass_switch_instanceContext } from "./SystemVerilogParser";
import { Pass_enable_switch_instanceContext } from "./SystemVerilogParser";
import { Pull_gate_instanceContext } from "./SystemVerilogParser";
import { Pulldown_strengthContext } from "./SystemVerilogParser";
import { Pullup_strengthContext } from "./SystemVerilogParser";
import { Enable_terminalContext } from "./SystemVerilogParser";
import { Inout_terminalContext } from "./SystemVerilogParser";
import { Input_terminalContext } from "./SystemVerilogParser";
import { Ncontrol_terminalContext } from "./SystemVerilogParser";
import { Output_terminalContext } from "./SystemVerilogParser";
import { Pcontrol_terminalContext } from "./SystemVerilogParser";
import { Cmos_switchtypeContext } from "./SystemVerilogParser";
import { Enable_gatetypeContext } from "./SystemVerilogParser";
import { Mos_switchtypeContext } from "./SystemVerilogParser";
import { N_input_gatetypeContext } from "./SystemVerilogParser";
import { N_output_gatetypeContext } from "./SystemVerilogParser";
import { Pass_en_switchtypeContext } from "./SystemVerilogParser";
import { Pass_switchtypeContext } from "./SystemVerilogParser";
import { Module_instantiationContext } from "./SystemVerilogParser";
import { Parameter_value_assignmentContext } from "./SystemVerilogParser";
import { List_of_parameter_assignmentsContext } from "./SystemVerilogParser";
import { Ordered_parameter_assignmentContext } from "./SystemVerilogParser";
import { Named_parameter_assignmentContext } from "./SystemVerilogParser";
import { Hierarchical_instanceContext } from "./SystemVerilogParser";
import { Name_of_instanceContext } from "./SystemVerilogParser";
import { List_of_port_connectionsContext } from "./SystemVerilogParser";
import { Ordered_port_connectionContext } from "./SystemVerilogParser";
import { Named_port_connectionContext } from "./SystemVerilogParser";
import { Interface_instantiationContext } from "./SystemVerilogParser";
import { Program_instantiationContext } from "./SystemVerilogParser";
import { Checker_instantiationContext } from "./SystemVerilogParser";
import { List_of_checker_port_connectionsContext } from "./SystemVerilogParser";
import { Ordered_checker_port_connectionContext } from "./SystemVerilogParser";
import { Named_checker_port_connectionContext } from "./SystemVerilogParser";
import { Generate_regionContext } from "./SystemVerilogParser";
import { Loop_generate_constructContext } from "./SystemVerilogParser";
import { Genvar_initializationContext } from "./SystemVerilogParser";
import { Genvar_iterationContext } from "./SystemVerilogParser";
import { Conditional_generate_constructContext } from "./SystemVerilogParser";
import { If_generate_constructContext } from "./SystemVerilogParser";
import { Case_generate_constructContext } from "./SystemVerilogParser";
import { Case_generate_itemContext } from "./SystemVerilogParser";
import { Generate_blockContext } from "./SystemVerilogParser";
import { Generate_itemContext } from "./SystemVerilogParser";
import { Udp_nonansi_declarationContext } from "./SystemVerilogParser";
import { Udp_ansi_declarationContext } from "./SystemVerilogParser";
import { Udp_declarationContext } from "./SystemVerilogParser";
import { Udp_port_listContext } from "./SystemVerilogParser";
import { Udp_declaration_port_listContext } from "./SystemVerilogParser";
import { Udp_port_declarationContext } from "./SystemVerilogParser";
import { Udp_output_declarationContext } from "./SystemVerilogParser";
import { Udp_input_declarationContext } from "./SystemVerilogParser";
import { Udp_reg_declarationContext } from "./SystemVerilogParser";
import { Udp_bodyContext } from "./SystemVerilogParser";
import { Combinational_bodyContext } from "./SystemVerilogParser";
import { Combinational_entryContext } from "./SystemVerilogParser";
import { Sequential_bodyContext } from "./SystemVerilogParser";
import { Udp_initial_statementContext } from "./SystemVerilogParser";
import { Init_valContext } from "./SystemVerilogParser";
import { Sequential_entryContext } from "./SystemVerilogParser";
import { Seq_input_listContext } from "./SystemVerilogParser";
import { Level_input_listContext } from "./SystemVerilogParser";
import { Edge_input_listContext } from "./SystemVerilogParser";
import { Edge_indicatorContext } from "./SystemVerilogParser";
import { Current_stateContext } from "./SystemVerilogParser";
import { Next_stateContext } from "./SystemVerilogParser";
import { Output_symbolContext } from "./SystemVerilogParser";
import { Level_symbolContext } from "./SystemVerilogParser";
import { Edge_symbolContext } from "./SystemVerilogParser";
import { Udp_instantiationContext } from "./SystemVerilogParser";
import { Udp_instanceContext } from "./SystemVerilogParser";
import { Continuous_assignContext } from "./SystemVerilogParser";
import { List_of_net_assignmentsContext } from "./SystemVerilogParser";
import { List_of_variable_assignmentsContext } from "./SystemVerilogParser";
import { Net_aliasContext } from "./SystemVerilogParser";
import { Net_assignmentContext } from "./SystemVerilogParser";
import { Initial_constructContext } from "./SystemVerilogParser";
import { Always_constructContext } from "./SystemVerilogParser";
import { Always_keywordContext } from "./SystemVerilogParser";
import { Final_constructContext } from "./SystemVerilogParser";
import { Blocking_assignmentContext } from "./SystemVerilogParser";
import { Operator_assignmentContext } from "./SystemVerilogParser";
import { Assignment_operatorContext } from "./SystemVerilogParser";
import { Nonblocking_assignmentContext } from "./SystemVerilogParser";
import { Procedural_continuous_assignmentContext } from "./SystemVerilogParser";
import { Variable_assignmentContext } from "./SystemVerilogParser";
import { Action_blockContext } from "./SystemVerilogParser";
import { Seq_blockContext } from "./SystemVerilogParser";
import { Par_blockContext } from "./SystemVerilogParser";
import { Join_keywordContext } from "./SystemVerilogParser";
import { Statement_or_nullContext } from "./SystemVerilogParser";
import { StatementContext } from "./SystemVerilogParser";
import { Statement_itemContext } from "./SystemVerilogParser";
import { Display_tasksContext } from "./SystemVerilogParser";
import { Display_task_nameContext } from "./SystemVerilogParser";
import { Monitor_tasksContext } from "./SystemVerilogParser";
import { Monitor_task_nameContext } from "./SystemVerilogParser";
import { Function_statementContext } from "./SystemVerilogParser";
import { Function_statement_or_nullContext } from "./SystemVerilogParser";
import { Variable_identifier_listContext } from "./SystemVerilogParser";
import { Procedural_timing_control_statementContext } from "./SystemVerilogParser";
import { Delay_or_event_controlContext } from "./SystemVerilogParser";
import { Delay_controlContext } from "./SystemVerilogParser";
import { Event_controlContext } from "./SystemVerilogParser";
import { Event_expressionContext } from "./SystemVerilogParser";
import { Procedural_timing_controlContext } from "./SystemVerilogParser";
import { Jump_statementContext } from "./SystemVerilogParser";
import { Wait_statementContext } from "./SystemVerilogParser";
import { Event_triggerContext } from "./SystemVerilogParser";
import { Disable_statementContext } from "./SystemVerilogParser";
import { Conditional_statementContext } from "./SystemVerilogParser";
import { Unique_priorityContext } from "./SystemVerilogParser";
import { Cond_predicateContext } from "./SystemVerilogParser";
import { Case_statementContext } from "./SystemVerilogParser";
import { Case_keywordContext } from "./SystemVerilogParser";
import { Case_expressionContext } from "./SystemVerilogParser";
import { Case_itemContext } from "./SystemVerilogParser";
import { Case_pattern_itemContext } from "./SystemVerilogParser";
import { Case_inside_itemContext } from "./SystemVerilogParser";
import { Case_item_expressionContext } from "./SystemVerilogParser";
import { Randcase_statementContext } from "./SystemVerilogParser";
import { Randcase_itemContext } from "./SystemVerilogParser";
import { Open_range_listContext } from "./SystemVerilogParser";
import { Open_value_rangeContext } from "./SystemVerilogParser";
import { PatternContext } from "./SystemVerilogParser";
import { Assignment_patternContext } from "./SystemVerilogParser";
import { Structure_pattern_keyContext } from "./SystemVerilogParser";
import { Array_pattern_keyContext } from "./SystemVerilogParser";
import { Assignment_pattern_keyContext } from "./SystemVerilogParser";
import { Assignment_pattern_expressionContext } from "./SystemVerilogParser";
import { Assignment_pattern_expression_typeContext } from "./SystemVerilogParser";
import { Constant_assignment_pattern_expressionContext } from "./SystemVerilogParser";
import { Assignment_pattern_net_lvalueContext } from "./SystemVerilogParser";
import { Assignment_pattern_variable_lvalueContext } from "./SystemVerilogParser";
import { Loop_statementContext } from "./SystemVerilogParser";
import { For_initializationContext } from "./SystemVerilogParser";
import { For_variable_declarationContext } from "./SystemVerilogParser";
import { For_stepContext } from "./SystemVerilogParser";
import { For_step_assignmentContext } from "./SystemVerilogParser";
import { Loop_variablesContext } from "./SystemVerilogParser";
import { Subroutine_call_statementContext } from "./SystemVerilogParser";
import { Assertion_itemContext } from "./SystemVerilogParser";
import { Deferred_immediate_assertion_itemContext } from "./SystemVerilogParser";
import { Procedural_assertion_statementContext } from "./SystemVerilogParser";
import { Immediate_assertion_statementContext } from "./SystemVerilogParser";
import { Simple_immediate_assertion_statementContext } from "./SystemVerilogParser";
import { Simple_immediate_assert_statementContext } from "./SystemVerilogParser";
import { Simple_immediate_assume_statementContext } from "./SystemVerilogParser";
import { Simple_immediate_cover_statementContext } from "./SystemVerilogParser";
import { Deferred_immediate_assertion_statementContext } from "./SystemVerilogParser";
import { Deferred_immediate_assert_statementContext } from "./SystemVerilogParser";
import { Deferred_immediate_assume_statementContext } from "./SystemVerilogParser";
import { Deferred_immediate_cover_statementContext } from "./SystemVerilogParser";
import { Clocking_declarationContext } from "./SystemVerilogParser";
import { Clocking_eventContext } from "./SystemVerilogParser";
import { Clocking_itemContext } from "./SystemVerilogParser";
import { Default_skewContext } from "./SystemVerilogParser";
import { Clocking_directionContext } from "./SystemVerilogParser";
import { List_of_clocking_decl_assignContext } from "./SystemVerilogParser";
import { Clocking_decl_assignContext } from "./SystemVerilogParser";
import { Clocking_skewContext } from "./SystemVerilogParser";
import { Clocking_driveContext } from "./SystemVerilogParser";
import { Cycle_delayContext } from "./SystemVerilogParser";
import { ClockvarContext } from "./SystemVerilogParser";
import { Clockvar_expressionContext } from "./SystemVerilogParser";
import { Randsequence_statementContext } from "./SystemVerilogParser";
import { ProductionContext } from "./SystemVerilogParser";
import { Rs_ruleContext } from "./SystemVerilogParser";
import { Rs_production_listContext } from "./SystemVerilogParser";
import { Weight_specificationContext } from "./SystemVerilogParser";
import { Rs_code_blockContext } from "./SystemVerilogParser";
import { Rs_prodContext } from "./SystemVerilogParser";
import { Production_itemContext } from "./SystemVerilogParser";
import { Rs_if_elseContext } from "./SystemVerilogParser";
import { Rs_repeatContext } from "./SystemVerilogParser";
import { Rs_caseContext } from "./SystemVerilogParser";
import { Rs_case_itemContext } from "./SystemVerilogParser";
import { Specify_blockContext } from "./SystemVerilogParser";
import { Specify_itemContext } from "./SystemVerilogParser";
import { Pulsestyle_declarationContext } from "./SystemVerilogParser";
import { Showcancelled_declarationContext } from "./SystemVerilogParser";
import { Path_declarationContext } from "./SystemVerilogParser";
import { Simple_path_declarationContext } from "./SystemVerilogParser";
import { Parallel_path_descriptionContext } from "./SystemVerilogParser";
import { Full_path_descriptionContext } from "./SystemVerilogParser";
import { List_of_path_inputsContext } from "./SystemVerilogParser";
import { List_of_path_outputsContext } from "./SystemVerilogParser";
import { Specify_input_terminal_descriptorContext } from "./SystemVerilogParser";
import { Specify_output_terminal_descriptorContext } from "./SystemVerilogParser";
import { Input_identifierContext } from "./SystemVerilogParser";
import { Output_identifierContext } from "./SystemVerilogParser";
import { Path_delay_valueContext } from "./SystemVerilogParser";
import { List_of_path_delay_expressionsContext } from "./SystemVerilogParser";
import { T_path_delay_expressionContext } from "./SystemVerilogParser";
import { Trise_path_delay_expressionContext } from "./SystemVerilogParser";
import { Tfall_path_delay_expressionContext } from "./SystemVerilogParser";
import { Tz_path_delay_expressionContext } from "./SystemVerilogParser";
import { T01_path_delay_expressionContext } from "./SystemVerilogParser";
import { T10_path_delay_expressionContext } from "./SystemVerilogParser";
import { T0z_path_delay_expressionContext } from "./SystemVerilogParser";
import { Tz1_path_delay_expressionContext } from "./SystemVerilogParser";
import { T1z_path_delay_expressionContext } from "./SystemVerilogParser";
import { Tz0_path_delay_expressionContext } from "./SystemVerilogParser";
import { T0x_path_delay_expressionContext } from "./SystemVerilogParser";
import { Tx1_path_delay_expressionContext } from "./SystemVerilogParser";
import { T1x_path_delay_expressionContext } from "./SystemVerilogParser";
import { Tx0_path_delay_expressionContext } from "./SystemVerilogParser";
import { Txz_path_delay_expressionContext } from "./SystemVerilogParser";
import { Tzx_path_delay_expressionContext } from "./SystemVerilogParser";
import { Path_delay_expressionContext } from "./SystemVerilogParser";
import { Edge_sensitive_path_declarationContext } from "./SystemVerilogParser";
import { Parallel_edge_sensitive_path_descriptionContext } from "./SystemVerilogParser";
import { Full_edge_sensitive_path_descriptionContext } from "./SystemVerilogParser";
import { Data_source_expressionContext } from "./SystemVerilogParser";
import { Edge_identifierContext } from "./SystemVerilogParser";
import { State_dependent_path_declarationContext } from "./SystemVerilogParser";
import { Polarity_operatorContext } from "./SystemVerilogParser";
import { System_timing_checkContext } from "./SystemVerilogParser";
import { Setup_timing_checkContext } from "./SystemVerilogParser";
import { Hold_timing_checkContext } from "./SystemVerilogParser";
import { Setuphold_timing_checkContext } from "./SystemVerilogParser";
import { Recovery_timing_checkContext } from "./SystemVerilogParser";
import { Removal_timing_checkContext } from "./SystemVerilogParser";
import { Recrem_timing_checkContext } from "./SystemVerilogParser";
import { Skew_timing_checkContext } from "./SystemVerilogParser";
import { Timeskew_timing_checkContext } from "./SystemVerilogParser";
import { Fullskew_timing_checkContext } from "./SystemVerilogParser";
import { Period_timing_checkContext } from "./SystemVerilogParser";
import { Width_timing_checkContext } from "./SystemVerilogParser";
import { Nochange_timing_checkContext } from "./SystemVerilogParser";
import { Timecheck_conditionContext } from "./SystemVerilogParser";
import { Controlled_reference_eventContext } from "./SystemVerilogParser";
import { Data_eventContext } from "./SystemVerilogParser";
import { Delayed_dataContext } from "./SystemVerilogParser";
import { Delayed_referenceContext } from "./SystemVerilogParser";
import { End_edge_offsetContext } from "./SystemVerilogParser";
import { Event_based_flagContext } from "./SystemVerilogParser";
import { NotifierContext } from "./SystemVerilogParser";
import { Reference_eventContext } from "./SystemVerilogParser";
import { Remain_active_flagContext } from "./SystemVerilogParser";
import { Timestamp_conditionContext } from "./SystemVerilogParser";
import { Start_edge_offsetContext } from "./SystemVerilogParser";
import { ThresholdContext } from "./SystemVerilogParser";
import { Timing_check_limitContext } from "./SystemVerilogParser";
import { Timing_check_eventContext } from "./SystemVerilogParser";
import { Controlled_timing_check_eventContext } from "./SystemVerilogParser";
import { Timing_check_event_controlContext } from "./SystemVerilogParser";
import { Specify_terminal_descriptorContext } from "./SystemVerilogParser";
import { Edge_control_specifierContext } from "./SystemVerilogParser";
import { Edge_descriptorContext } from "./SystemVerilogParser";
import { Zero_or_oneContext } from "./SystemVerilogParser";
import { Z_or_xContext } from "./SystemVerilogParser";
import { Timing_check_conditionContext } from "./SystemVerilogParser";
import { Scalar_timing_check_conditionContext } from "./SystemVerilogParser";
import { Scalar_constantContext } from "./SystemVerilogParser";
import { ConcatenationContext } from "./SystemVerilogParser";
import { Constant_concatenationContext } from "./SystemVerilogParser";
import { Constant_multiple_concatenationContext } from "./SystemVerilogParser";
import { Module_path_concatenationContext } from "./SystemVerilogParser";
import { Module_path_multiple_concatenationContext } from "./SystemVerilogParser";
import { Multiple_concatenationContext } from "./SystemVerilogParser";
import { Streaming_concatenationContext } from "./SystemVerilogParser";
import { Stream_operatorContext } from "./SystemVerilogParser";
import { Slice_sizeContext } from "./SystemVerilogParser";
import { Stream_concatenationContext } from "./SystemVerilogParser";
import { Stream_expressionContext } from "./SystemVerilogParser";
import { Array_range_expressionContext } from "./SystemVerilogParser";
import { Empty_unpacked_array_concatenationContext } from "./SystemVerilogParser";
import { Tf_callContext } from "./SystemVerilogParser";
import { System_tf_callContext } from "./SystemVerilogParser";
import { Subroutine_callContext } from "./SystemVerilogParser";
import { Function_subroutine_callContext } from "./SystemVerilogParser";
import { List_of_argumentsContext } from "./SystemVerilogParser";
import { Method_call_bodyContext } from "./SystemVerilogParser";
import { Built_in_method_callContext } from "./SystemVerilogParser";
import { Array_manipulation_callContext } from "./SystemVerilogParser";
import { Array_method_callContext } from "./SystemVerilogParser";
import { Iterator_argumentContext } from "./SystemVerilogParser";
import { Randomize_callContext } from "./SystemVerilogParser";
import { Array_method_nameContext } from "./SystemVerilogParser";
import { Inc_or_dec_expressionContext } from "./SystemVerilogParser";
import { Constant_expressionContext } from "./SystemVerilogParser";
import { Constant_mintypmax_expressionContext } from "./SystemVerilogParser";
import { Constant_param_expressionContext } from "./SystemVerilogParser";
import { Param_expressionContext } from "./SystemVerilogParser";
import { Constant_range_expressionContext } from "./SystemVerilogParser";
import { Constant_part_select_rangeContext } from "./SystemVerilogParser";
import { Constant_rangeContext } from "./SystemVerilogParser";
import { Constant_indexed_rangeContext } from "./SystemVerilogParser";
import { ExpressionContext } from "./SystemVerilogParser";
import { Tagged_union_expressionContext } from "./SystemVerilogParser";
import { Value_rangeContext } from "./SystemVerilogParser";
import { Mintypmax_expressionContext } from "./SystemVerilogParser";
import { Module_path_conditional_expressionContext } from "./SystemVerilogParser";
import { Module_path_expressionContext } from "./SystemVerilogParser";
import { Module_path_mintypmax_expressionContext } from "./SystemVerilogParser";
import { Part_select_rangeContext } from "./SystemVerilogParser";
import { Indexed_rangeContext } from "./SystemVerilogParser";
import { Genvar_expressionContext } from "./SystemVerilogParser";
import { Constant_primaryContext } from "./SystemVerilogParser";
import { PrimaryContext } from "./SystemVerilogParser";
import { Module_path_primaryContext } from "./SystemVerilogParser";
import { Class_qualifierContext } from "./SystemVerilogParser";
import { Range_expressionContext } from "./SystemVerilogParser";
import { Primary_literalContext } from "./SystemVerilogParser";
import { Time_literalContext } from "./SystemVerilogParser";
import { Time_unitContext } from "./SystemVerilogParser";
import { Implicit_class_handleContext } from "./SystemVerilogParser";
import { Bit_selectContext } from "./SystemVerilogParser";
import { SelectContext } from "./SystemVerilogParser";
import { Nonrange_selectContext } from "./SystemVerilogParser";
import { Constant_bit_selectContext } from "./SystemVerilogParser";
import { Constant_selectContext } from "./SystemVerilogParser";
import { Constant_let_expressionContext } from "./SystemVerilogParser";
import { Net_lvalueContext } from "./SystemVerilogParser";
import { Variable_lvalueContext } from "./SystemVerilogParser";
import { Nonrange_variable_lvalueContext } from "./SystemVerilogParser";
import { Unary_operatorContext } from "./SystemVerilogParser";
import { Binary_operatorContext } from "./SystemVerilogParser";
import { Inc_or_dec_operatorContext } from "./SystemVerilogParser";
import { Unary_module_path_operatorContext } from "./SystemVerilogParser";
import { Binary_module_path_operatorContext } from "./SystemVerilogParser";
import { NumberContext } from "./SystemVerilogParser";
import { Integral_numberContext } from "./SystemVerilogParser";
import { Decimal_numberContext } from "./SystemVerilogParser";
import { Binary_numberContext } from "./SystemVerilogParser";
import { Octal_numberContext } from "./SystemVerilogParser";
import { Hex_numberContext } from "./SystemVerilogParser";
import { SignContext } from "./SystemVerilogParser";
import { SizeContext } from "./SystemVerilogParser";
import { Non_zero_unsigned_numberContext } from "./SystemVerilogParser";
import { Real_numberContext } from "./SystemVerilogParser";
import { Fixed_point_numberContext } from "./SystemVerilogParser";
import { ExpContext } from "./SystemVerilogParser";
import { Unsigned_numberContext } from "./SystemVerilogParser";
import { Binary_valueContext } from "./SystemVerilogParser";
import { Octal_valueContext } from "./SystemVerilogParser";
import { Hex_valueContext } from "./SystemVerilogParser";
import { Decimal_baseContext } from "./SystemVerilogParser";
import { Binary_baseContext } from "./SystemVerilogParser";
import { Octal_baseContext } from "./SystemVerilogParser";
import { Hex_baseContext } from "./SystemVerilogParser";
import { Non_zero_decimal_digitContext } from "./SystemVerilogParser";
import { Decimal_digitContext } from "./SystemVerilogParser";
import { Binary_digitContext } from "./SystemVerilogParser";
import { Octal_digitContext } from "./SystemVerilogParser";
import { Hex_digitContext } from "./SystemVerilogParser";
import { X_digitContext } from "./SystemVerilogParser";
import { Z_digitContext } from "./SystemVerilogParser";
import { Unbased_unsized_literalContext } from "./SystemVerilogParser";
import { String_literalContext } from "./SystemVerilogParser";
import { Attribute_instanceContext } from "./SystemVerilogParser";
import { Attr_specContext } from "./SystemVerilogParser";
import { Attr_nameContext } from "./SystemVerilogParser";
import { Array_identifierContext } from "./SystemVerilogParser";
import { Block_identifierContext } from "./SystemVerilogParser";
import { Bin_identifierContext } from "./SystemVerilogParser";
import { C_identifierContext } from "./SystemVerilogParser";
import { Cell_identifierContext } from "./SystemVerilogParser";
import { Checker_identifierContext } from "./SystemVerilogParser";
import { Class_identifierContext } from "./SystemVerilogParser";
import { Class_variable_identifierContext } from "./SystemVerilogParser";
import { Clocking_identifierContext } from "./SystemVerilogParser";
import { Config_identifierContext } from "./SystemVerilogParser";
import { Const_identifierContext } from "./SystemVerilogParser";
import { Constraint_identifierContext } from "./SystemVerilogParser";
import { Covergroup_identifierContext } from "./SystemVerilogParser";
import { Covergroup_variable_identifierContext } from "./SystemVerilogParser";
import { Cover_point_identifierContext } from "./SystemVerilogParser";
import { Cross_identifierContext } from "./SystemVerilogParser";
import { Dynamic_array_variable_identifierContext } from "./SystemVerilogParser";
import { Enum_identifierContext } from "./SystemVerilogParser";
import { Formal_identifierContext } from "./SystemVerilogParser";
import { Formal_port_identifierContext } from "./SystemVerilogParser";
import { Function_identifierContext } from "./SystemVerilogParser";
import { Generate_block_identifierContext } from "./SystemVerilogParser";
import { Genvar_identifierContext } from "./SystemVerilogParser";
import { Hierarchical_array_identifierContext } from "./SystemVerilogParser";
import { Hierarchical_block_identifierContext } from "./SystemVerilogParser";
import { Hierarchical_event_identifierContext } from "./SystemVerilogParser";
import { Hierarchical_identifierContext } from "./SystemVerilogParser";
import { Hierarchical_net_identifierContext } from "./SystemVerilogParser";
import { Hierarchical_parameter_identifierContext } from "./SystemVerilogParser";
import { Hierarchical_property_identifierContext } from "./SystemVerilogParser";
import { Hierarchical_sequence_identifierContext } from "./SystemVerilogParser";
import { Hierarchical_task_identifierContext } from "./SystemVerilogParser";
import { Hierarchical_tf_identifierContext } from "./SystemVerilogParser";
import { Hierarchical_variable_identifierContext } from "./SystemVerilogParser";
import { IdentifierContext } from "./SystemVerilogParser";
import { Index_variable_identifierContext } from "./SystemVerilogParser";
import { Interface_identifierContext } from "./SystemVerilogParser";
import { Interface_instance_identifierContext } from "./SystemVerilogParser";
import { Inout_port_identifierContext } from "./SystemVerilogParser";
import { Input_port_identifierContext } from "./SystemVerilogParser";
import { Instance_identifierContext } from "./SystemVerilogParser";
import { Library_identifierContext } from "./SystemVerilogParser";
import { Member_identifierContext } from "./SystemVerilogParser";
import { Method_identifierContext } from "./SystemVerilogParser";
import { Modport_identifierContext } from "./SystemVerilogParser";
import { Module_identifierContext } from "./SystemVerilogParser";
import { Net_identifierContext } from "./SystemVerilogParser";
import { Net_type_identifierContext } from "./SystemVerilogParser";
import { Output_port_identifierContext } from "./SystemVerilogParser";
import { Package_identifierContext } from "./SystemVerilogParser";
import { Package_scopeContext } from "./SystemVerilogParser";
import { Parameter_identifierContext } from "./SystemVerilogParser";
import { Port_identifierContext } from "./SystemVerilogParser";
import { Production_identifierContext } from "./SystemVerilogParser";
import { Program_identifierContext } from "./SystemVerilogParser";
import { Property_identifierContext } from "./SystemVerilogParser";
import { Ps_class_identifierContext } from "./SystemVerilogParser";
import { Ps_covergroup_identifierContext } from "./SystemVerilogParser";
import { Ps_checker_identifierContext } from "./SystemVerilogParser";
import { Ps_identifierContext } from "./SystemVerilogParser";
import { Ps_or_hierarchical_array_identifierContext } from "./SystemVerilogParser";
import { Ps_or_hierarchical_net_identifierContext } from "./SystemVerilogParser";
import { Ps_or_hierarchical_property_identifierContext } from "./SystemVerilogParser";
import { Ps_or_hierarchical_sequence_identifierContext } from "./SystemVerilogParser";
import { Ps_or_hierarchical_tf_identifierContext } from "./SystemVerilogParser";
import { Ps_parameter_identifierContext } from "./SystemVerilogParser";
import { Ps_type_identifierContext } from "./SystemVerilogParser";
import { Sequence_identifierContext } from "./SystemVerilogParser";
import { Signal_identifierContext } from "./SystemVerilogParser";
import { Simple_identifierContext } from "./SystemVerilogParser";
import { Specparam_identifierContext } from "./SystemVerilogParser";
import { Task_identifierContext } from "./SystemVerilogParser";
import { Tf_identifierContext } from "./SystemVerilogParser";
import { Terminal_identifierContext } from "./SystemVerilogParser";
import { Topmodule_identifierContext } from "./SystemVerilogParser";
import { Type_identifierContext } from "./SystemVerilogParser";
import { Udp_identifierContext } from "./SystemVerilogParser";
import { Variable_identifierContext } from "./SystemVerilogParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SystemVerilogParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface SystemVerilogVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `SystemVerilogParser.system_verilog_text`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSystem_verilog_text?: (ctx: System_verilog_textContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.source_text`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSource_text?: (ctx: Source_textContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDescription?: (ctx: DescriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_nonansi_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_nonansi_header?: (ctx: Module_nonansi_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_ansi_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_ansi_header?: (ctx: Module_ansi_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_declaration?: (ctx: Module_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_keyword?: (ctx: Module_keywordContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_declaration?: (ctx: Interface_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_nonansi_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_nonansi_header?: (ctx: Interface_nonansi_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_ansi_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_ansi_header?: (ctx: Interface_ansi_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.program_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram_declaration?: (ctx: Program_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.program_nonansi_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram_nonansi_header?: (ctx: Program_nonansi_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.program_ansi_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram_ansi_header?: (ctx: Program_ansi_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.checker_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChecker_declaration?: (ctx: Checker_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_declaration?: (ctx: Class_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_class_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_class_type?: (ctx: Interface_class_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_class_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_class_declaration?: (ctx: Interface_class_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_class_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_class_item?: (ctx: Interface_class_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_class_method`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_class_method?: (ctx: Interface_class_methodContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.package_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_declaration?: (ctx: Package_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.timeunits_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeunits_declaration?: (ctx: Timeunits_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.timescale_compiler_directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimescale_compiler_directive?: (ctx: Timescale_compiler_directiveContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.time_precision`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTime_precision?: (ctx: Time_precisionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.include_compiler_directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInclude_compiler_directive?: (ctx: Include_compiler_directiveContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.parameter_port_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_port_list?: (ctx: Parameter_port_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.parameter_port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_port_declaration?: (ctx: Parameter_port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_ports`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_ports?: (ctx: List_of_portsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_port_declarations`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_port_declarations?: (ctx: List_of_port_declarationsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_declaration?: (ctx: Port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.port`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort?: (ctx: PortContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.port_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_expression?: (ctx: Port_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.port_reference`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_reference?: (ctx: Port_referenceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.port_direction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_direction?: (ctx: Port_directionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.net_port_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_port_header?: (ctx: Net_port_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.variable_port_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_port_header?: (ctx: Variable_port_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_port_header`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_port_header?: (ctx: Interface_port_headerContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ansi_port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnsi_port_declaration?: (ctx: Ansi_port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.elaboration_system_task`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElaboration_system_task?: (ctx: Elaboration_system_taskContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.finish_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFinish_number?: (ctx: Finish_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_common_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_common_item?: (ctx: Module_common_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.simulation_control_task`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimulation_control_task?: (ctx: Simulation_control_taskContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_item?: (ctx: Module_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_or_generate_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_or_generate_item?: (ctx: Module_or_generate_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_or_generate_item_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_or_generate_item_declaration?: (ctx: Module_or_generate_item_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.non_port_module_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNon_port_module_item?: (ctx: Non_port_module_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.parameter_override`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_override?: (ctx: Parameter_overrideContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bind_directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBind_directive?: (ctx: Bind_directiveContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bind_target_scope`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBind_target_scope?: (ctx: Bind_target_scopeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bind_target_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBind_target_instance?: (ctx: Bind_target_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bind_target_instance_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBind_target_instance_list?: (ctx: Bind_target_instance_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bind_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBind_instantiation?: (ctx: Bind_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.config_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConfig_declaration?: (ctx: Config_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.design_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDesign_statement?: (ctx: Design_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.config_rule_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConfig_rule_statement?: (ctx: Config_rule_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.default_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefault_clause?: (ctx: Default_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.inst_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInst_clause?: (ctx: Inst_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.inst_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInst_name?: (ctx: Inst_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cell_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCell_clause?: (ctx: Cell_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.liblist_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiblist_clause?: (ctx: Liblist_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.use_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUse_clause?: (ctx: Use_clauseContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_or_generate_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_or_generate_item?: (ctx: Interface_or_generate_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.extern_tf_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtern_tf_declaration?: (ctx: Extern_tf_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_item?: (ctx: Interface_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.non_port_interface_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNon_port_interface_item?: (ctx: Non_port_interface_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.program_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram_item?: (ctx: Program_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.non_port_program_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNon_port_program_item?: (ctx: Non_port_program_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.program_generate_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram_generate_item?: (ctx: Program_generate_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.checker_port_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChecker_port_list?: (ctx: Checker_port_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.checker_port_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChecker_port_item?: (ctx: Checker_port_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.checker_port_direction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChecker_port_direction?: (ctx: Checker_port_directionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.checker_or_generate_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChecker_or_generate_item?: (ctx: Checker_or_generate_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.checker_or_generate_item_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChecker_or_generate_item_declaration?: (ctx: Checker_or_generate_item_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.checker_generate_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChecker_generate_item?: (ctx: Checker_generate_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_item?: (ctx: Class_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_property`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_property?: (ctx: Class_propertyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_method`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_method?: (ctx: Class_methodContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_constructor_prototype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_constructor_prototype?: (ctx: Class_constructor_prototypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_constraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_constraint?: (ctx: Class_constraintContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_item_qualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_item_qualifier?: (ctx: Class_item_qualifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_qualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_qualifier?: (ctx: Property_qualifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.random_qualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRandom_qualifier?: (ctx: Random_qualifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.method_qualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethod_qualifier?: (ctx: Method_qualifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.method_prototype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethod_prototype?: (ctx: Method_prototypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_constructor_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_constructor_declaration?: (ctx: Class_constructor_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constraint_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraint_declaration?: (ctx: Constraint_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constraint_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraint_block?: (ctx: Constraint_blockContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constraint_block_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraint_block_item?: (ctx: Constraint_block_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.solve_before_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSolve_before_list?: (ctx: Solve_before_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constraint_primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraint_primary?: (ctx: Constraint_primaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constraint_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraint_expression?: (ctx: Constraint_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.uniqueness_constraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUniqueness_constraint?: (ctx: Uniqueness_constraintContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constraint_set`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraint_set?: (ctx: Constraint_setContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.dist_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDist_list?: (ctx: Dist_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.dist_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDist_item?: (ctx: Dist_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.dist_weight`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDist_weight?: (ctx: Dist_weightContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constraint_prototype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraint_prototype?: (ctx: Constraint_prototypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constraint_prototype_qualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraint_prototype_qualifier?: (ctx: Constraint_prototype_qualifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.extern_constraint_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtern_constraint_declaration?: (ctx: Extern_constraint_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.identifier_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier_list?: (ctx: Identifier_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.package_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_item?: (ctx: Package_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.package_or_generate_item_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_or_generate_item_declaration?: (ctx: Package_or_generate_item_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.anonymous_program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnonymous_program?: (ctx: Anonymous_programContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.anonymous_program_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnonymous_program_item?: (ctx: Anonymous_program_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.local_parameter_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocal_parameter_declaration?: (ctx: Local_parameter_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.parameter_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_declaration?: (ctx: Parameter_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.specparam_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecparam_declaration?: (ctx: Specparam_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.inout_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInout_declaration?: (ctx: Inout_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.input_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInput_declaration?: (ctx: Input_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.output_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutput_declaration?: (ctx: Output_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_port_declaration?: (ctx: Interface_port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ref_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRef_declaration?: (ctx: Ref_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.data_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitData_declaration?: (ctx: Data_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.package_import_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_import_declaration?: (ctx: Package_import_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.package_import_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_import_item?: (ctx: Package_import_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.package_export_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_export_declaration?: (ctx: Package_export_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.genvar_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenvar_declaration?: (ctx: Genvar_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.net_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_declaration?: (ctx: Net_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.type_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_declaration?: (ctx: Type_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.net_type_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_type_declaration?: (ctx: Net_type_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.lifetime`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLifetime?: (ctx: LifetimeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.data_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitData_type?: (ctx: Data_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.data_type_or_implicit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitData_type_or_implicit?: (ctx: Data_type_or_implicitContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.implicit_data_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImplicit_data_type?: (ctx: Implicit_data_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.enum_base_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnum_base_type?: (ctx: Enum_base_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.enum_name_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnum_name_declaration?: (ctx: Enum_name_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_scope`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_scope?: (ctx: Class_scopeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_type?: (ctx: Class_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.integer_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInteger_type?: (ctx: Integer_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.integer_atom_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInteger_atom_type?: (ctx: Integer_atom_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.integer_vector_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInteger_vector_type?: (ctx: Integer_vector_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.non_integer_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNon_integer_type?: (ctx: Non_integer_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.net_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_type?: (ctx: Net_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.net_port_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_port_type?: (ctx: Net_port_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.variable_port_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_port_type?: (ctx: Variable_port_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.var_data_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVar_data_type?: (ctx: Var_data_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.signing`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSigning?: (ctx: SigningContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.simple_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_type?: (ctx: Simple_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.struct_union_member`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStruct_union_member?: (ctx: Struct_union_memberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.data_type_or_void`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitData_type_or_void?: (ctx: Data_type_or_voidContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.struct_union`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStruct_union?: (ctx: Struct_unionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.type_reference`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_reference?: (ctx: Type_referenceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.drive_strength`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDrive_strength?: (ctx: Drive_strengthContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.strength0`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrength0?: (ctx: Strength0Context) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.strength1`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrength1?: (ctx: Strength1Context) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.charge_strength`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCharge_strength?: (ctx: Charge_strengthContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.delay3`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelay3?: (ctx: Delay3Context) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.delay2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelay2?: (ctx: Delay2Context) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.delay_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelay_value?: (ctx: Delay_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_defparam_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_defparam_assignments?: (ctx: List_of_defparam_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_genvar_identifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_genvar_identifiers?: (ctx: List_of_genvar_identifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_interface_identifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_interface_identifiers?: (ctx: List_of_interface_identifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_net_decl_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_net_decl_assignments?: (ctx: List_of_net_decl_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_param_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_param_assignments?: (ctx: List_of_param_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_port_identifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_port_identifiers?: (ctx: List_of_port_identifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_udp_port_identifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_udp_port_identifiers?: (ctx: List_of_udp_port_identifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_specparam_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_specparam_assignments?: (ctx: List_of_specparam_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_tf_variable_identifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_tf_variable_identifiers?: (ctx: List_of_tf_variable_identifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_type_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_type_assignments?: (ctx: List_of_type_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_variable_decl_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_variable_decl_assignments?: (ctx: List_of_variable_decl_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_variable_identifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_variable_identifiers?: (ctx: List_of_variable_identifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_variable_port_identifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_variable_port_identifiers?: (ctx: List_of_variable_port_identifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.defparam_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefparam_assignment?: (ctx: Defparam_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.net_decl_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_decl_assignment?: (ctx: Net_decl_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.param_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam_assignment?: (ctx: Param_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.specparam_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecparam_assignment?: (ctx: Specparam_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.type_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_assignment?: (ctx: Type_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.pulse_control_specparam`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPulse_control_specparam?: (ctx: Pulse_control_specparamContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.error_limit_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitError_limit_value?: (ctx: Error_limit_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.reject_limit_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReject_limit_value?: (ctx: Reject_limit_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.limit_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLimit_value?: (ctx: Limit_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.variable_decl_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_decl_assignment?: (ctx: Variable_decl_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_new`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_new?: (ctx: Class_newContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.dynamic_array_new`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDynamic_array_new?: (ctx: Dynamic_array_newContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.unpacked_dimension`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnpacked_dimension?: (ctx: Unpacked_dimensionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.packed_dimension`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPacked_dimension?: (ctx: Packed_dimensionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.associative_dimension`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssociative_dimension?: (ctx: Associative_dimensionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.variable_dimension`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_dimension?: (ctx: Variable_dimensionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.queue_dimension`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueue_dimension?: (ctx: Queue_dimensionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.unsized_dimension`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnsized_dimension?: (ctx: Unsized_dimensionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.function_data_type_or_implicit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_data_type_or_implicit?: (ctx: Function_data_type_or_implicitContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.function_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_declaration?: (ctx: Function_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.function_body_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_body_declaration?: (ctx: Function_body_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.function_prototype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_prototype?: (ctx: Function_prototypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.dpi_import_export`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDpi_import_export?: (ctx: Dpi_import_exportContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.dpi_spec_string`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDpi_spec_string?: (ctx: Dpi_spec_stringContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.dpi_function_import_property`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDpi_function_import_property?: (ctx: Dpi_function_import_propertyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.dpi_task_import_property`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDpi_task_import_property?: (ctx: Dpi_task_import_propertyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.dpi_function_proto`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDpi_function_proto?: (ctx: Dpi_function_protoContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.dpi_task_proto`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDpi_task_proto?: (ctx: Dpi_task_protoContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.task_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_declaration?: (ctx: Task_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.task_body_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_body_declaration?: (ctx: Task_body_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tf_item_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTf_item_declaration?: (ctx: Tf_item_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tf_port_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTf_port_list?: (ctx: Tf_port_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tf_port_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTf_port_item?: (ctx: Tf_port_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tf_port_direction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTf_port_direction?: (ctx: Tf_port_directionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tf_port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTf_port_declaration?: (ctx: Tf_port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.task_prototype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_prototype?: (ctx: Task_prototypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.block_item_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_item_declaration?: (ctx: Block_item_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.modport_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModport_declaration?: (ctx: Modport_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.modport_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModport_item?: (ctx: Modport_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.modport_ports_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModport_ports_declaration?: (ctx: Modport_ports_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.modport_clocking_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModport_clocking_declaration?: (ctx: Modport_clocking_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.modport_simple_ports_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModport_simple_ports_declaration?: (ctx: Modport_simple_ports_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.modport_simple_port`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModport_simple_port?: (ctx: Modport_simple_portContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.modport_tf_ports_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModport_tf_ports_declaration?: (ctx: Modport_tf_ports_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.modport_tf_port`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModport_tf_port?: (ctx: Modport_tf_portContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.import_export`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_export?: (ctx: Import_exportContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.concurrent_assertion_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcurrent_assertion_item?: (ctx: Concurrent_assertion_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.concurrent_assertion_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcurrent_assertion_statement?: (ctx: Concurrent_assertion_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assert_property_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssert_property_statement?: (ctx: Assert_property_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assume_property_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssume_property_statement?: (ctx: Assume_property_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cover_property_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCover_property_statement?: (ctx: Cover_property_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.expect_property_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpect_property_statement?: (ctx: Expect_property_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cover_sequence_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCover_sequence_statement?: (ctx: Cover_sequence_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.restrict_property_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRestrict_property_statement?: (ctx: Restrict_property_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_instance?: (ctx: Property_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_list_of_arguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_list_of_arguments?: (ctx: Property_list_of_argumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_actual_arg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_actual_arg?: (ctx: Property_actual_argContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assertion_item_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssertion_item_declaration?: (ctx: Assertion_item_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_declaration?: (ctx: Property_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_port_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_port_list?: (ctx: Property_port_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_port_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_port_item?: (ctx: Property_port_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_lvar_port_direction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_lvar_port_direction?: (ctx: Property_lvar_port_directionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_formal_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_formal_type?: (ctx: Property_formal_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_spec?: (ctx: Property_specContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_expr?: (ctx: Property_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_case_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_case_item?: (ctx: Property_case_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_declaration?: (ctx: Sequence_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_port_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_port_list?: (ctx: Sequence_port_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_port_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_port_item?: (ctx: Sequence_port_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_lvar_port_direction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_lvar_port_direction?: (ctx: Sequence_lvar_port_directionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_formal_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_formal_type?: (ctx: Sequence_formal_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_expr?: (ctx: Sequence_exprContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cycle_delay_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCycle_delay_range?: (ctx: Cycle_delay_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_method_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_method_call?: (ctx: Sequence_method_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_match_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_match_item?: (ctx: Sequence_match_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_instance?: (ctx: Sequence_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_list_of_arguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_list_of_arguments?: (ctx: Sequence_list_of_argumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_actual_arg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_actual_arg?: (ctx: Sequence_actual_argContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.boolean_abbrev`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolean_abbrev?: (ctx: Boolean_abbrevContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_abbrev`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_abbrev?: (ctx: Sequence_abbrevContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.consecutive_repetition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConsecutive_repetition?: (ctx: Consecutive_repetitionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.non_consecutive_repetition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNon_consecutive_repetition?: (ctx: Non_consecutive_repetitionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.goto_repetition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGoto_repetition?: (ctx: Goto_repetitionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.const_or_range_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConst_or_range_expression?: (ctx: Const_or_range_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cycle_delay_const_range_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCycle_delay_const_range_expression?: (ctx: Cycle_delay_const_range_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.expression_or_dist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression_or_dist?: (ctx: Expression_or_distContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assertion_variable_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssertion_variable_declaration?: (ctx: Assertion_variable_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.covergroup_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCovergroup_declaration?: (ctx: Covergroup_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.coverage_spec_or_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoverage_spec_or_option?: (ctx: Coverage_spec_or_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.coverage_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoverage_option?: (ctx: Coverage_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.coverage_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoverage_spec?: (ctx: Coverage_specContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.coverage_event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCoverage_event?: (ctx: Coverage_eventContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.block_event_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_event_expression?: (ctx: Block_event_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_btf_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_btf_identifier?: (ctx: Hierarchical_btf_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cover_point`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCover_point?: (ctx: Cover_pointContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bins_or_empty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBins_or_empty?: (ctx: Bins_or_emptyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bins_or_options`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBins_or_options?: (ctx: Bins_or_optionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bins_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBins_keyword?: (ctx: Bins_keywordContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.trans_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrans_list?: (ctx: Trans_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.trans_set`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrans_set?: (ctx: Trans_setContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.trans_range_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrans_range_list?: (ctx: Trans_range_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.trans_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrans_item?: (ctx: Trans_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.repeat_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeat_range?: (ctx: Repeat_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cover_cross`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCover_cross?: (ctx: Cover_crossContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_cross_items`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_cross_items?: (ctx: List_of_cross_itemsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cross_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCross_item?: (ctx: Cross_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cross_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCross_body?: (ctx: Cross_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cross_body_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCross_body_item?: (ctx: Cross_body_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bins_selection_or_option`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBins_selection_or_option?: (ctx: Bins_selection_or_optionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bins_selection`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBins_selection?: (ctx: Bins_selectionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.select_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelect_expression?: (ctx: Select_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.select_condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelect_condition?: (ctx: Select_conditionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bins_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBins_expression?: (ctx: Bins_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.covergroup_range_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCovergroup_range_list?: (ctx: Covergroup_range_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.covergroup_value_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCovergroup_value_range?: (ctx: Covergroup_value_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.with_covergroup_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWith_covergroup_expression?: (ctx: With_covergroup_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.set_covergroup_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSet_covergroup_expression?: (ctx: Set_covergroup_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.integer_covergroup_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInteger_covergroup_expression?: (ctx: Integer_covergroup_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cross_set_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCross_set_expression?: (ctx: Cross_set_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.covergroup_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCovergroup_expression?: (ctx: Covergroup_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.let_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLet_declaration?: (ctx: Let_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.let_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLet_identifier?: (ctx: Let_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.let_port_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLet_port_list?: (ctx: Let_port_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.let_port_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLet_port_item?: (ctx: Let_port_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.let_formal_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLet_formal_type?: (ctx: Let_formal_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.let_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLet_expression?: (ctx: Let_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.let_list_of_arguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLet_list_of_arguments?: (ctx: Let_list_of_argumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.let_actual_arg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLet_actual_arg?: (ctx: Let_actual_argContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.gate_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGate_instantiation?: (ctx: Gate_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cmos_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmos_switch_instance?: (ctx: Cmos_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.enable_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnable_gate_instance?: (ctx: Enable_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.mos_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMos_switch_instance?: (ctx: Mos_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.n_input_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_input_gate_instance?: (ctx: N_input_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.n_output_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_output_gate_instance?: (ctx: N_output_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.pass_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_switch_instance?: (ctx: Pass_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_enable_switch_instance?: (ctx: Pass_enable_switch_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.pull_gate_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPull_gate_instance?: (ctx: Pull_gate_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.pulldown_strength`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPulldown_strength?: (ctx: Pulldown_strengthContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.pullup_strength`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPullup_strength?: (ctx: Pullup_strengthContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.enable_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnable_terminal?: (ctx: Enable_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.inout_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInout_terminal?: (ctx: Inout_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.input_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInput_terminal?: (ctx: Input_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ncontrol_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNcontrol_terminal?: (ctx: Ncontrol_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.output_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutput_terminal?: (ctx: Output_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.pcontrol_terminal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPcontrol_terminal?: (ctx: Pcontrol_terminalContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cmos_switchtype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmos_switchtype?: (ctx: Cmos_switchtypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.enable_gatetype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnable_gatetype?: (ctx: Enable_gatetypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.mos_switchtype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMos_switchtype?: (ctx: Mos_switchtypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.n_input_gatetype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_input_gatetype?: (ctx: N_input_gatetypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.n_output_gatetype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitN_output_gatetype?: (ctx: N_output_gatetypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.pass_en_switchtype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_en_switchtype?: (ctx: Pass_en_switchtypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.pass_switchtype`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPass_switchtype?: (ctx: Pass_switchtypeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_instantiation?: (ctx: Module_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.parameter_value_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_value_assignment?: (ctx: Parameter_value_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_parameter_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_parameter_assignments?: (ctx: List_of_parameter_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ordered_parameter_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrdered_parameter_assignment?: (ctx: Ordered_parameter_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.named_parameter_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamed_parameter_assignment?: (ctx: Named_parameter_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_instance?: (ctx: Hierarchical_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.name_of_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitName_of_instance?: (ctx: Name_of_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_port_connections`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_port_connections?: (ctx: List_of_port_connectionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ordered_port_connection`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrdered_port_connection?: (ctx: Ordered_port_connectionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.named_port_connection`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamed_port_connection?: (ctx: Named_port_connectionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_instantiation?: (ctx: Interface_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.program_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram_instantiation?: (ctx: Program_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.checker_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChecker_instantiation?: (ctx: Checker_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_checker_port_connections`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_checker_port_connections?: (ctx: List_of_checker_port_connectionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ordered_checker_port_connection`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrdered_checker_port_connection?: (ctx: Ordered_checker_port_connectionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.named_checker_port_connection`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamed_checker_port_connection?: (ctx: Named_checker_port_connectionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.generate_region`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_region?: (ctx: Generate_regionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.loop_generate_construct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoop_generate_construct?: (ctx: Loop_generate_constructContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.genvar_initialization`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenvar_initialization?: (ctx: Genvar_initializationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.genvar_iteration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenvar_iteration?: (ctx: Genvar_iterationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.conditional_generate_construct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional_generate_construct?: (ctx: Conditional_generate_constructContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.if_generate_construct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_generate_construct?: (ctx: If_generate_constructContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.case_generate_construct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_generate_construct?: (ctx: Case_generate_constructContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.case_generate_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_generate_item?: (ctx: Case_generate_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.generate_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_block?: (ctx: Generate_blockContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.generate_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_item?: (ctx: Generate_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_nonansi_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_nonansi_declaration?: (ctx: Udp_nonansi_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_ansi_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_ansi_declaration?: (ctx: Udp_ansi_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_declaration?: (ctx: Udp_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_port_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_port_list?: (ctx: Udp_port_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_declaration_port_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_declaration_port_list?: (ctx: Udp_declaration_port_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_port_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_port_declaration?: (ctx: Udp_port_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_output_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_output_declaration?: (ctx: Udp_output_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_input_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_input_declaration?: (ctx: Udp_input_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_reg_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_reg_declaration?: (ctx: Udp_reg_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_body?: (ctx: Udp_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.combinational_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCombinational_body?: (ctx: Combinational_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.combinational_entry`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCombinational_entry?: (ctx: Combinational_entryContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequential_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequential_body?: (ctx: Sequential_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_initial_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_initial_statement?: (ctx: Udp_initial_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.init_val`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInit_val?: (ctx: Init_valContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequential_entry`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequential_entry?: (ctx: Sequential_entryContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.seq_input_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSeq_input_list?: (ctx: Seq_input_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.level_input_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLevel_input_list?: (ctx: Level_input_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.edge_input_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdge_input_list?: (ctx: Edge_input_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.edge_indicator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdge_indicator?: (ctx: Edge_indicatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.current_state`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCurrent_state?: (ctx: Current_stateContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.next_state`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNext_state?: (ctx: Next_stateContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.output_symbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutput_symbol?: (ctx: Output_symbolContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.level_symbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLevel_symbol?: (ctx: Level_symbolContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.edge_symbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdge_symbol?: (ctx: Edge_symbolContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_instantiation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_instantiation?: (ctx: Udp_instantiationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_instance?: (ctx: Udp_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.continuous_assign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinuous_assign?: (ctx: Continuous_assignContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_net_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_net_assignments?: (ctx: List_of_net_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_variable_assignments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_variable_assignments?: (ctx: List_of_variable_assignmentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.net_alias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_alias?: (ctx: Net_aliasContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.net_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_assignment?: (ctx: Net_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.initial_construct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInitial_construct?: (ctx: Initial_constructContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.always_construct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlways_construct?: (ctx: Always_constructContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.always_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlways_keyword?: (ctx: Always_keywordContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.final_construct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFinal_construct?: (ctx: Final_constructContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.blocking_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlocking_assignment?: (ctx: Blocking_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.operator_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperator_assignment?: (ctx: Operator_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assignment_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_operator?: (ctx: Assignment_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.nonblocking_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonblocking_assignment?: (ctx: Nonblocking_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.procedural_continuous_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedural_continuous_assignment?: (ctx: Procedural_continuous_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.variable_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_assignment?: (ctx: Variable_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.action_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction_block?: (ctx: Action_blockContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.seq_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSeq_block?: (ctx: Seq_blockContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.par_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPar_block?: (ctx: Par_blockContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.join_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoin_keyword?: (ctx: Join_keywordContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.statement_or_null`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement_or_null?: (ctx: Statement_or_nullContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.statement_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement_item?: (ctx: Statement_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.display_tasks`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDisplay_tasks?: (ctx: Display_tasksContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.display_task_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDisplay_task_name?: (ctx: Display_task_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.monitor_tasks`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMonitor_tasks?: (ctx: Monitor_tasksContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.monitor_task_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMonitor_task_name?: (ctx: Monitor_task_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.function_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_statement?: (ctx: Function_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.function_statement_or_null`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_statement_or_null?: (ctx: Function_statement_or_nullContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.variable_identifier_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_identifier_list?: (ctx: Variable_identifier_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.procedural_timing_control_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedural_timing_control_statement?: (ctx: Procedural_timing_control_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.delay_or_event_control`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelay_or_event_control?: (ctx: Delay_or_event_controlContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.delay_control`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelay_control?: (ctx: Delay_controlContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.event_control`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_control?: (ctx: Event_controlContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.event_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_expression?: (ctx: Event_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.procedural_timing_control`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedural_timing_control?: (ctx: Procedural_timing_controlContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.jump_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJump_statement?: (ctx: Jump_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.wait_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWait_statement?: (ctx: Wait_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.event_trigger`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_trigger?: (ctx: Event_triggerContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.disable_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDisable_statement?: (ctx: Disable_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.conditional_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional_statement?: (ctx: Conditional_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.unique_priority`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnique_priority?: (ctx: Unique_priorityContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cond_predicate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCond_predicate?: (ctx: Cond_predicateContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.case_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_statement?: (ctx: Case_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.case_keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_keyword?: (ctx: Case_keywordContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.case_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_expression?: (ctx: Case_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.case_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_item?: (ctx: Case_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.case_pattern_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_pattern_item?: (ctx: Case_pattern_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.case_inside_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_inside_item?: (ctx: Case_inside_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.case_item_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase_item_expression?: (ctx: Case_item_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.randcase_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRandcase_statement?: (ctx: Randcase_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.randcase_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRandcase_item?: (ctx: Randcase_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.open_range_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpen_range_list?: (ctx: Open_range_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.open_value_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpen_value_range?: (ctx: Open_value_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.pattern`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPattern?: (ctx: PatternContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assignment_pattern`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_pattern?: (ctx: Assignment_patternContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.structure_pattern_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructure_pattern_key?: (ctx: Structure_pattern_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.array_pattern_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_pattern_key?: (ctx: Array_pattern_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assignment_pattern_key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_pattern_key?: (ctx: Assignment_pattern_keyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assignment_pattern_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_pattern_expression?: (ctx: Assignment_pattern_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assignment_pattern_expression_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_pattern_expression_type?: (ctx: Assignment_pattern_expression_typeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_assignment_pattern_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_assignment_pattern_expression?: (ctx: Constant_assignment_pattern_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assignment_pattern_net_lvalue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_pattern_net_lvalue?: (ctx: Assignment_pattern_net_lvalueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assignment_pattern_variable_lvalue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_pattern_variable_lvalue?: (ctx: Assignment_pattern_variable_lvalueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.loop_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoop_statement?: (ctx: Loop_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.for_initialization`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_initialization?: (ctx: For_initializationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.for_variable_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_variable_declaration?: (ctx: For_variable_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.for_step`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_step?: (ctx: For_stepContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.for_step_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor_step_assignment?: (ctx: For_step_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.loop_variables`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoop_variables?: (ctx: Loop_variablesContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.subroutine_call_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubroutine_call_statement?: (ctx: Subroutine_call_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.assertion_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssertion_item?: (ctx: Assertion_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.deferred_immediate_assertion_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeferred_immediate_assertion_item?: (ctx: Deferred_immediate_assertion_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.procedural_assertion_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcedural_assertion_statement?: (ctx: Procedural_assertion_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.immediate_assertion_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImmediate_assertion_statement?: (ctx: Immediate_assertion_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.simple_immediate_assertion_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_immediate_assertion_statement?: (ctx: Simple_immediate_assertion_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.simple_immediate_assert_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_immediate_assert_statement?: (ctx: Simple_immediate_assert_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.simple_immediate_assume_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_immediate_assume_statement?: (ctx: Simple_immediate_assume_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.simple_immediate_cover_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_immediate_cover_statement?: (ctx: Simple_immediate_cover_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.deferred_immediate_assertion_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeferred_immediate_assertion_statement?: (ctx: Deferred_immediate_assertion_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.deferred_immediate_assert_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeferred_immediate_assert_statement?: (ctx: Deferred_immediate_assert_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.deferred_immediate_assume_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeferred_immediate_assume_statement?: (ctx: Deferred_immediate_assume_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.deferred_immediate_cover_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeferred_immediate_cover_statement?: (ctx: Deferred_immediate_cover_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.clocking_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClocking_declaration?: (ctx: Clocking_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.clocking_event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClocking_event?: (ctx: Clocking_eventContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.clocking_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClocking_item?: (ctx: Clocking_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.default_skew`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefault_skew?: (ctx: Default_skewContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.clocking_direction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClocking_direction?: (ctx: Clocking_directionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_clocking_decl_assign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_clocking_decl_assign?: (ctx: List_of_clocking_decl_assignContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.clocking_decl_assign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClocking_decl_assign?: (ctx: Clocking_decl_assignContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.clocking_skew`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClocking_skew?: (ctx: Clocking_skewContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.clocking_drive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClocking_drive?: (ctx: Clocking_driveContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cycle_delay`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCycle_delay?: (ctx: Cycle_delayContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.clockvar`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClockvar?: (ctx: ClockvarContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.clockvar_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClockvar_expression?: (ctx: Clockvar_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.randsequence_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRandsequence_statement?: (ctx: Randsequence_statementContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.production`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProduction?: (ctx: ProductionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.rs_rule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRs_rule?: (ctx: Rs_ruleContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.rs_production_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRs_production_list?: (ctx: Rs_production_listContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.weight_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWeight_specification?: (ctx: Weight_specificationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.rs_code_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRs_code_block?: (ctx: Rs_code_blockContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.rs_prod`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRs_prod?: (ctx: Rs_prodContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.production_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProduction_item?: (ctx: Production_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.rs_if_else`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRs_if_else?: (ctx: Rs_if_elseContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.rs_repeat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRs_repeat?: (ctx: Rs_repeatContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.rs_case`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRs_case?: (ctx: Rs_caseContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.rs_case_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRs_case_item?: (ctx: Rs_case_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.specify_block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecify_block?: (ctx: Specify_blockContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.specify_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecify_item?: (ctx: Specify_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.pulsestyle_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPulsestyle_declaration?: (ctx: Pulsestyle_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.showcancelled_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowcancelled_declaration?: (ctx: Showcancelled_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.path_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPath_declaration?: (ctx: Path_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.simple_path_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_path_declaration?: (ctx: Simple_path_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.parallel_path_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParallel_path_description?: (ctx: Parallel_path_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.full_path_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFull_path_description?: (ctx: Full_path_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_path_inputs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_path_inputs?: (ctx: List_of_path_inputsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_path_outputs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_path_outputs?: (ctx: List_of_path_outputsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.specify_input_terminal_descriptor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecify_input_terminal_descriptor?: (ctx: Specify_input_terminal_descriptorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.specify_output_terminal_descriptor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecify_output_terminal_descriptor?: (ctx: Specify_output_terminal_descriptorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.input_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInput_identifier?: (ctx: Input_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.output_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutput_identifier?: (ctx: Output_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.path_delay_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPath_delay_value?: (ctx: Path_delay_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_path_delay_expressions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_path_delay_expressions?: (ctx: List_of_path_delay_expressionsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.t_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitT_path_delay_expression?: (ctx: T_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.trise_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrise_path_delay_expression?: (ctx: Trise_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tfall_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTfall_path_delay_expression?: (ctx: Tfall_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tz_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTz_path_delay_expression?: (ctx: Tz_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.t01_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitT01_path_delay_expression?: (ctx: T01_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.t10_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitT10_path_delay_expression?: (ctx: T10_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.t0z_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitT0z_path_delay_expression?: (ctx: T0z_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tz1_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTz1_path_delay_expression?: (ctx: Tz1_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.t1z_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitT1z_path_delay_expression?: (ctx: T1z_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tz0_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTz0_path_delay_expression?: (ctx: Tz0_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.t0x_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitT0x_path_delay_expression?: (ctx: T0x_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tx1_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTx1_path_delay_expression?: (ctx: Tx1_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.t1x_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitT1x_path_delay_expression?: (ctx: T1x_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tx0_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTx0_path_delay_expression?: (ctx: Tx0_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.txz_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTxz_path_delay_expression?: (ctx: Txz_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tzx_path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTzx_path_delay_expression?: (ctx: Tzx_path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.path_delay_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPath_delay_expression?: (ctx: Path_delay_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.edge_sensitive_path_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdge_sensitive_path_declaration?: (ctx: Edge_sensitive_path_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.parallel_edge_sensitive_path_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParallel_edge_sensitive_path_description?: (ctx: Parallel_edge_sensitive_path_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.full_edge_sensitive_path_description`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFull_edge_sensitive_path_description?: (ctx: Full_edge_sensitive_path_descriptionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.data_source_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitData_source_expression?: (ctx: Data_source_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.edge_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdge_identifier?: (ctx: Edge_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.state_dependent_path_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitState_dependent_path_declaration?: (ctx: State_dependent_path_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.polarity_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPolarity_operator?: (ctx: Polarity_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.system_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSystem_timing_check?: (ctx: System_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.setup_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetup_timing_check?: (ctx: Setup_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hold_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHold_timing_check?: (ctx: Hold_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.setuphold_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetuphold_timing_check?: (ctx: Setuphold_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.recovery_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRecovery_timing_check?: (ctx: Recovery_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.removal_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRemoval_timing_check?: (ctx: Removal_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.recrem_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRecrem_timing_check?: (ctx: Recrem_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.skew_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSkew_timing_check?: (ctx: Skew_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.timeskew_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeskew_timing_check?: (ctx: Timeskew_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.fullskew_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFullskew_timing_check?: (ctx: Fullskew_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.period_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPeriod_timing_check?: (ctx: Period_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.width_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWidth_timing_check?: (ctx: Width_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.nochange_timing_check`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNochange_timing_check?: (ctx: Nochange_timing_checkContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.timecheck_condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimecheck_condition?: (ctx: Timecheck_conditionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.controlled_reference_event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitControlled_reference_event?: (ctx: Controlled_reference_eventContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.data_event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitData_event?: (ctx: Data_eventContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.delayed_data`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelayed_data?: (ctx: Delayed_dataContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.delayed_reference`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDelayed_reference?: (ctx: Delayed_referenceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.end_edge_offset`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnd_edge_offset?: (ctx: End_edge_offsetContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.event_based_flag`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_based_flag?: (ctx: Event_based_flagContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.notifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotifier?: (ctx: NotifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.reference_event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReference_event?: (ctx: Reference_eventContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.remain_active_flag`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRemain_active_flag?: (ctx: Remain_active_flagContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.timestamp_condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimestamp_condition?: (ctx: Timestamp_conditionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.start_edge_offset`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStart_edge_offset?: (ctx: Start_edge_offsetContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.threshold`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThreshold?: (ctx: ThresholdContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.timing_check_limit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTiming_check_limit?: (ctx: Timing_check_limitContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.timing_check_event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTiming_check_event?: (ctx: Timing_check_eventContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.controlled_timing_check_event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitControlled_timing_check_event?: (ctx: Controlled_timing_check_eventContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.timing_check_event_control`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTiming_check_event_control?: (ctx: Timing_check_event_controlContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.specify_terminal_descriptor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecify_terminal_descriptor?: (ctx: Specify_terminal_descriptorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.edge_control_specifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdge_control_specifier?: (ctx: Edge_control_specifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.edge_descriptor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEdge_descriptor?: (ctx: Edge_descriptorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.zero_or_one`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitZero_or_one?: (ctx: Zero_or_oneContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.z_or_x`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitZ_or_x?: (ctx: Z_or_xContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.timing_check_condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTiming_check_condition?: (ctx: Timing_check_conditionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.scalar_timing_check_condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScalar_timing_check_condition?: (ctx: Scalar_timing_check_conditionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.scalar_constant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScalar_constant?: (ctx: Scalar_constantContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcatenation?: (ctx: ConcatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_concatenation?: (ctx: Constant_concatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_multiple_concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_multiple_concatenation?: (ctx: Constant_multiple_concatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_path_concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_path_concatenation?: (ctx: Module_path_concatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_path_multiple_concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_path_multiple_concatenation?: (ctx: Module_path_multiple_concatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.multiple_concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiple_concatenation?: (ctx: Multiple_concatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.streaming_concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStreaming_concatenation?: (ctx: Streaming_concatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.stream_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStream_operator?: (ctx: Stream_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.slice_size`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSlice_size?: (ctx: Slice_sizeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.stream_concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStream_concatenation?: (ctx: Stream_concatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.stream_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStream_expression?: (ctx: Stream_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.array_range_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_range_expression?: (ctx: Array_range_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.empty_unpacked_array_concatenation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmpty_unpacked_array_concatenation?: (ctx: Empty_unpacked_array_concatenationContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tf_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTf_call?: (ctx: Tf_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.system_tf_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSystem_tf_call?: (ctx: System_tf_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.subroutine_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubroutine_call?: (ctx: Subroutine_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.function_subroutine_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_subroutine_call?: (ctx: Function_subroutine_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.list_of_arguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList_of_arguments?: (ctx: List_of_argumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.method_call_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethod_call_body?: (ctx: Method_call_bodyContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.built_in_method_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBuilt_in_method_call?: (ctx: Built_in_method_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.array_manipulation_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_manipulation_call?: (ctx: Array_manipulation_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.array_method_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_method_call?: (ctx: Array_method_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.iterator_argument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIterator_argument?: (ctx: Iterator_argumentContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.randomize_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRandomize_call?: (ctx: Randomize_callContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.array_method_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_method_name?: (ctx: Array_method_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.inc_or_dec_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInc_or_dec_expression?: (ctx: Inc_or_dec_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_expression?: (ctx: Constant_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_mintypmax_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_mintypmax_expression?: (ctx: Constant_mintypmax_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_param_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_param_expression?: (ctx: Constant_param_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.param_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam_expression?: (ctx: Param_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_range_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_range_expression?: (ctx: Constant_range_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_part_select_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_part_select_range?: (ctx: Constant_part_select_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_range?: (ctx: Constant_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_indexed_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_indexed_range?: (ctx: Constant_indexed_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tagged_union_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTagged_union_expression?: (ctx: Tagged_union_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.value_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue_range?: (ctx: Value_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.mintypmax_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMintypmax_expression?: (ctx: Mintypmax_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_path_conditional_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_path_conditional_expression?: (ctx: Module_path_conditional_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_path_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_path_expression?: (ctx: Module_path_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_path_mintypmax_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_path_mintypmax_expression?: (ctx: Module_path_mintypmax_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.part_select_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPart_select_range?: (ctx: Part_select_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.indexed_range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexed_range?: (ctx: Indexed_rangeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.genvar_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenvar_expression?: (ctx: Genvar_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_primary?: (ctx: Constant_primaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary?: (ctx: PrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_path_primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_path_primary?: (ctx: Module_path_primaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_qualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_qualifier?: (ctx: Class_qualifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.range_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRange_expression?: (ctx: Range_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.primary_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary_literal?: (ctx: Primary_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.time_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTime_literal?: (ctx: Time_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.time_unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTime_unit?: (ctx: Time_unitContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.implicit_class_handle`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImplicit_class_handle?: (ctx: Implicit_class_handleContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bit_select`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBit_select?: (ctx: Bit_selectContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.select`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelect?: (ctx: SelectContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.nonrange_select`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonrange_select?: (ctx: Nonrange_selectContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_bit_select`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_bit_select?: (ctx: Constant_bit_selectContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_select`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_select?: (ctx: Constant_selectContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constant_let_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant_let_expression?: (ctx: Constant_let_expressionContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.net_lvalue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_lvalue?: (ctx: Net_lvalueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.variable_lvalue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_lvalue?: (ctx: Variable_lvalueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.nonrange_variable_lvalue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonrange_variable_lvalue?: (ctx: Nonrange_variable_lvalueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.unary_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary_operator?: (ctx: Unary_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.binary_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary_operator?: (ctx: Binary_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.inc_or_dec_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInc_or_dec_operator?: (ctx: Inc_or_dec_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.unary_module_path_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary_module_path_operator?: (ctx: Unary_module_path_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.binary_module_path_operator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary_module_path_operator?: (ctx: Binary_module_path_operatorContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.integral_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegral_number?: (ctx: Integral_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.decimal_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimal_number?: (ctx: Decimal_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.binary_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary_number?: (ctx: Binary_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.octal_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOctal_number?: (ctx: Octal_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hex_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHex_number?: (ctx: Hex_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSign?: (ctx: SignContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.size`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSize?: (ctx: SizeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.non_zero_unsigned_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNon_zero_unsigned_number?: (ctx: Non_zero_unsigned_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.real_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReal_number?: (ctx: Real_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.fixed_point_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFixed_point_number?: (ctx: Fixed_point_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.exp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExp?: (ctx: ExpContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.unsigned_number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnsigned_number?: (ctx: Unsigned_numberContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.binary_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary_value?: (ctx: Binary_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.octal_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOctal_value?: (ctx: Octal_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hex_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHex_value?: (ctx: Hex_valueContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.decimal_base`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimal_base?: (ctx: Decimal_baseContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.binary_base`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary_base?: (ctx: Binary_baseContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.octal_base`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOctal_base?: (ctx: Octal_baseContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hex_base`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHex_base?: (ctx: Hex_baseContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.non_zero_decimal_digit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNon_zero_decimal_digit?: (ctx: Non_zero_decimal_digitContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.decimal_digit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimal_digit?: (ctx: Decimal_digitContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.binary_digit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary_digit?: (ctx: Binary_digitContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.octal_digit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOctal_digit?: (ctx: Octal_digitContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hex_digit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHex_digit?: (ctx: Hex_digitContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.x_digit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitX_digit?: (ctx: X_digitContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.z_digit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitZ_digit?: (ctx: Z_digitContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.unbased_unsized_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnbased_unsized_literal?: (ctx: Unbased_unsized_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.string_literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitString_literal?: (ctx: String_literalContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.attribute_instance`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttribute_instance?: (ctx: Attribute_instanceContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.attr_spec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_spec?: (ctx: Attr_specContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.attr_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttr_name?: (ctx: Attr_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.array_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray_identifier?: (ctx: Array_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.block_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_identifier?: (ctx: Block_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.bin_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBin_identifier?: (ctx: Bin_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.c_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitC_identifier?: (ctx: C_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cell_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCell_identifier?: (ctx: Cell_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.checker_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChecker_identifier?: (ctx: Checker_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_identifier?: (ctx: Class_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.class_variable_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClass_variable_identifier?: (ctx: Class_variable_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.clocking_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClocking_identifier?: (ctx: Clocking_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.config_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConfig_identifier?: (ctx: Config_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.const_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConst_identifier?: (ctx: Const_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.constraint_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraint_identifier?: (ctx: Constraint_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.covergroup_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCovergroup_identifier?: (ctx: Covergroup_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.covergroup_variable_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCovergroup_variable_identifier?: (ctx: Covergroup_variable_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cover_point_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCover_point_identifier?: (ctx: Cover_point_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.cross_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCross_identifier?: (ctx: Cross_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.dynamic_array_variable_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDynamic_array_variable_identifier?: (ctx: Dynamic_array_variable_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.enum_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnum_identifier?: (ctx: Enum_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.formal_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormal_identifier?: (ctx: Formal_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.formal_port_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormal_port_identifier?: (ctx: Formal_port_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.function_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_identifier?: (ctx: Function_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.generate_block_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenerate_block_identifier?: (ctx: Generate_block_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.genvar_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenvar_identifier?: (ctx: Genvar_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_array_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_array_identifier?: (ctx: Hierarchical_array_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_block_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_block_identifier?: (ctx: Hierarchical_block_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_event_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_event_identifier?: (ctx: Hierarchical_event_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_identifier?: (ctx: Hierarchical_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_net_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_net_identifier?: (ctx: Hierarchical_net_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_parameter_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_parameter_identifier?: (ctx: Hierarchical_parameter_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_property_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_property_identifier?: (ctx: Hierarchical_property_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_sequence_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_sequence_identifier?: (ctx: Hierarchical_sequence_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_task_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_task_identifier?: (ctx: Hierarchical_task_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_tf_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_tf_identifier?: (ctx: Hierarchical_tf_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.hierarchical_variable_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHierarchical_variable_identifier?: (ctx: Hierarchical_variable_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.index_variable_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndex_variable_identifier?: (ctx: Index_variable_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_identifier?: (ctx: Interface_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.interface_instance_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterface_instance_identifier?: (ctx: Interface_instance_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.inout_port_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInout_port_identifier?: (ctx: Inout_port_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.input_port_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInput_port_identifier?: (ctx: Input_port_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.instance_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstance_identifier?: (ctx: Instance_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.library_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLibrary_identifier?: (ctx: Library_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.member_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMember_identifier?: (ctx: Member_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.method_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethod_identifier?: (ctx: Method_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.modport_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModport_identifier?: (ctx: Modport_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.module_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModule_identifier?: (ctx: Module_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.net_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_identifier?: (ctx: Net_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.net_type_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNet_type_identifier?: (ctx: Net_type_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.output_port_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutput_port_identifier?: (ctx: Output_port_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.package_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_identifier?: (ctx: Package_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.package_scope`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_scope?: (ctx: Package_scopeContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.parameter_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter_identifier?: (ctx: Parameter_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.port_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPort_identifier?: (ctx: Port_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.production_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProduction_identifier?: (ctx: Production_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.program_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram_identifier?: (ctx: Program_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.property_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProperty_identifier?: (ctx: Property_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ps_class_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPs_class_identifier?: (ctx: Ps_class_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ps_covergroup_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPs_covergroup_identifier?: (ctx: Ps_covergroup_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ps_checker_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPs_checker_identifier?: (ctx: Ps_checker_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ps_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPs_identifier?: (ctx: Ps_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_array_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPs_or_hierarchical_array_identifier?: (ctx: Ps_or_hierarchical_array_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_net_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPs_or_hierarchical_net_identifier?: (ctx: Ps_or_hierarchical_net_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_property_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPs_or_hierarchical_property_identifier?: (ctx: Ps_or_hierarchical_property_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_sequence_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPs_or_hierarchical_sequence_identifier?: (ctx: Ps_or_hierarchical_sequence_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_tf_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPs_or_hierarchical_tf_identifier?: (ctx: Ps_or_hierarchical_tf_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ps_parameter_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPs_parameter_identifier?: (ctx: Ps_parameter_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.ps_type_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPs_type_identifier?: (ctx: Ps_type_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.sequence_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence_identifier?: (ctx: Sequence_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.signal_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSignal_identifier?: (ctx: Signal_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.simple_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_identifier?: (ctx: Simple_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.specparam_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecparam_identifier?: (ctx: Specparam_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.task_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTask_identifier?: (ctx: Task_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.tf_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTf_identifier?: (ctx: Tf_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.terminal_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerminal_identifier?: (ctx: Terminal_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.topmodule_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTopmodule_identifier?: (ctx: Topmodule_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.type_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType_identifier?: (ctx: Type_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.udp_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUdp_identifier?: (ctx: Udp_identifierContext) => Result;

	/**
	 * Visit a parse tree produced by `SystemVerilogParser.variable_identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_identifier?: (ctx: Variable_identifierContext) => Result;
}

