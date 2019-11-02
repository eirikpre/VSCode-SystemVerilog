// Generated from ./src/compiling/ANTLR/grammar/SystemVerilog.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
import { List_of_arguments_with_stringsContext } from "./SystemVerilogParser";
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
import { String_or_expressionContext } from "./SystemVerilogParser";
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
 * This interface defines a complete listener for a parse tree produced by
 * `SystemVerilogParser`.
 */
export interface SystemVerilogListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `SystemVerilogParser.system_verilog_text`.
	 * @param ctx the parse tree
	 */
	enterSystem_verilog_text?: (ctx: System_verilog_textContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.system_verilog_text`.
	 * @param ctx the parse tree
	 */
	exitSystem_verilog_text?: (ctx: System_verilog_textContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.source_text`.
	 * @param ctx the parse tree
	 */
	enterSource_text?: (ctx: Source_textContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.source_text`.
	 * @param ctx the parse tree
	 */
	exitSource_text?: (ctx: Source_textContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.description`.
	 * @param ctx the parse tree
	 */
	enterDescription?: (ctx: DescriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.description`.
	 * @param ctx the parse tree
	 */
	exitDescription?: (ctx: DescriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_nonansi_header`.
	 * @param ctx the parse tree
	 */
	enterModule_nonansi_header?: (ctx: Module_nonansi_headerContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_nonansi_header`.
	 * @param ctx the parse tree
	 */
	exitModule_nonansi_header?: (ctx: Module_nonansi_headerContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_ansi_header`.
	 * @param ctx the parse tree
	 */
	enterModule_ansi_header?: (ctx: Module_ansi_headerContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_ansi_header`.
	 * @param ctx the parse tree
	 */
	exitModule_ansi_header?: (ctx: Module_ansi_headerContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_declaration`.
	 * @param ctx the parse tree
	 */
	enterModule_declaration?: (ctx: Module_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_declaration`.
	 * @param ctx the parse tree
	 */
	exitModule_declaration?: (ctx: Module_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_keyword`.
	 * @param ctx the parse tree
	 */
	enterModule_keyword?: (ctx: Module_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_keyword`.
	 * @param ctx the parse tree
	 */
	exitModule_keyword?: (ctx: Module_keywordContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_declaration`.
	 * @param ctx the parse tree
	 */
	enterInterface_declaration?: (ctx: Interface_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_declaration`.
	 * @param ctx the parse tree
	 */
	exitInterface_declaration?: (ctx: Interface_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_nonansi_header`.
	 * @param ctx the parse tree
	 */
	enterInterface_nonansi_header?: (ctx: Interface_nonansi_headerContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_nonansi_header`.
	 * @param ctx the parse tree
	 */
	exitInterface_nonansi_header?: (ctx: Interface_nonansi_headerContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_ansi_header`.
	 * @param ctx the parse tree
	 */
	enterInterface_ansi_header?: (ctx: Interface_ansi_headerContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_ansi_header`.
	 * @param ctx the parse tree
	 */
	exitInterface_ansi_header?: (ctx: Interface_ansi_headerContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.program_declaration`.
	 * @param ctx the parse tree
	 */
	enterProgram_declaration?: (ctx: Program_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.program_declaration`.
	 * @param ctx the parse tree
	 */
	exitProgram_declaration?: (ctx: Program_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.program_nonansi_header`.
	 * @param ctx the parse tree
	 */
	enterProgram_nonansi_header?: (ctx: Program_nonansi_headerContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.program_nonansi_header`.
	 * @param ctx the parse tree
	 */
	exitProgram_nonansi_header?: (ctx: Program_nonansi_headerContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.program_ansi_header`.
	 * @param ctx the parse tree
	 */
	enterProgram_ansi_header?: (ctx: Program_ansi_headerContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.program_ansi_header`.
	 * @param ctx the parse tree
	 */
	exitProgram_ansi_header?: (ctx: Program_ansi_headerContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.checker_declaration`.
	 * @param ctx the parse tree
	 */
	enterChecker_declaration?: (ctx: Checker_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.checker_declaration`.
	 * @param ctx the parse tree
	 */
	exitChecker_declaration?: (ctx: Checker_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_declaration`.
	 * @param ctx the parse tree
	 */
	enterClass_declaration?: (ctx: Class_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_declaration`.
	 * @param ctx the parse tree
	 */
	exitClass_declaration?: (ctx: Class_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_class_type`.
	 * @param ctx the parse tree
	 */
	enterInterface_class_type?: (ctx: Interface_class_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_class_type`.
	 * @param ctx the parse tree
	 */
	exitInterface_class_type?: (ctx: Interface_class_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_class_declaration`.
	 * @param ctx the parse tree
	 */
	enterInterface_class_declaration?: (ctx: Interface_class_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_class_declaration`.
	 * @param ctx the parse tree
	 */
	exitInterface_class_declaration?: (ctx: Interface_class_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_class_item`.
	 * @param ctx the parse tree
	 */
	enterInterface_class_item?: (ctx: Interface_class_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_class_item`.
	 * @param ctx the parse tree
	 */
	exitInterface_class_item?: (ctx: Interface_class_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_class_method`.
	 * @param ctx the parse tree
	 */
	enterInterface_class_method?: (ctx: Interface_class_methodContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_class_method`.
	 * @param ctx the parse tree
	 */
	exitInterface_class_method?: (ctx: Interface_class_methodContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.package_declaration`.
	 * @param ctx the parse tree
	 */
	enterPackage_declaration?: (ctx: Package_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.package_declaration`.
	 * @param ctx the parse tree
	 */
	exitPackage_declaration?: (ctx: Package_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.timeunits_declaration`.
	 * @param ctx the parse tree
	 */
	enterTimeunits_declaration?: (ctx: Timeunits_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.timeunits_declaration`.
	 * @param ctx the parse tree
	 */
	exitTimeunits_declaration?: (ctx: Timeunits_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.timescale_compiler_directive`.
	 * @param ctx the parse tree
	 */
	enterTimescale_compiler_directive?: (ctx: Timescale_compiler_directiveContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.timescale_compiler_directive`.
	 * @param ctx the parse tree
	 */
	exitTimescale_compiler_directive?: (ctx: Timescale_compiler_directiveContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.time_precision`.
	 * @param ctx the parse tree
	 */
	enterTime_precision?: (ctx: Time_precisionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.time_precision`.
	 * @param ctx the parse tree
	 */
	exitTime_precision?: (ctx: Time_precisionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.include_compiler_directive`.
	 * @param ctx the parse tree
	 */
	enterInclude_compiler_directive?: (ctx: Include_compiler_directiveContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.include_compiler_directive`.
	 * @param ctx the parse tree
	 */
	exitInclude_compiler_directive?: (ctx: Include_compiler_directiveContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.parameter_port_list`.
	 * @param ctx the parse tree
	 */
	enterParameter_port_list?: (ctx: Parameter_port_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.parameter_port_list`.
	 * @param ctx the parse tree
	 */
	exitParameter_port_list?: (ctx: Parameter_port_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.parameter_port_declaration`.
	 * @param ctx the parse tree
	 */
	enterParameter_port_declaration?: (ctx: Parameter_port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.parameter_port_declaration`.
	 * @param ctx the parse tree
	 */
	exitParameter_port_declaration?: (ctx: Parameter_port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_ports`.
	 * @param ctx the parse tree
	 */
	enterList_of_ports?: (ctx: List_of_portsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_ports`.
	 * @param ctx the parse tree
	 */
	exitList_of_ports?: (ctx: List_of_portsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_port_declarations`.
	 * @param ctx the parse tree
	 */
	enterList_of_port_declarations?: (ctx: List_of_port_declarationsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_port_declarations`.
	 * @param ctx the parse tree
	 */
	exitList_of_port_declarations?: (ctx: List_of_port_declarationsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.port_declaration`.
	 * @param ctx the parse tree
	 */
	enterPort_declaration?: (ctx: Port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.port_declaration`.
	 * @param ctx the parse tree
	 */
	exitPort_declaration?: (ctx: Port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.port`.
	 * @param ctx the parse tree
	 */
	enterPort?: (ctx: PortContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.port`.
	 * @param ctx the parse tree
	 */
	exitPort?: (ctx: PortContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.port_expression`.
	 * @param ctx the parse tree
	 */
	enterPort_expression?: (ctx: Port_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.port_expression`.
	 * @param ctx the parse tree
	 */
	exitPort_expression?: (ctx: Port_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.port_reference`.
	 * @param ctx the parse tree
	 */
	enterPort_reference?: (ctx: Port_referenceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.port_reference`.
	 * @param ctx the parse tree
	 */
	exitPort_reference?: (ctx: Port_referenceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.port_direction`.
	 * @param ctx the parse tree
	 */
	enterPort_direction?: (ctx: Port_directionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.port_direction`.
	 * @param ctx the parse tree
	 */
	exitPort_direction?: (ctx: Port_directionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.net_port_header`.
	 * @param ctx the parse tree
	 */
	enterNet_port_header?: (ctx: Net_port_headerContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.net_port_header`.
	 * @param ctx the parse tree
	 */
	exitNet_port_header?: (ctx: Net_port_headerContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.variable_port_header`.
	 * @param ctx the parse tree
	 */
	enterVariable_port_header?: (ctx: Variable_port_headerContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.variable_port_header`.
	 * @param ctx the parse tree
	 */
	exitVariable_port_header?: (ctx: Variable_port_headerContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_port_header`.
	 * @param ctx the parse tree
	 */
	enterInterface_port_header?: (ctx: Interface_port_headerContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_port_header`.
	 * @param ctx the parse tree
	 */
	exitInterface_port_header?: (ctx: Interface_port_headerContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ansi_port_declaration`.
	 * @param ctx the parse tree
	 */
	enterAnsi_port_declaration?: (ctx: Ansi_port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ansi_port_declaration`.
	 * @param ctx the parse tree
	 */
	exitAnsi_port_declaration?: (ctx: Ansi_port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.elaboration_system_task`.
	 * @param ctx the parse tree
	 */
	enterElaboration_system_task?: (ctx: Elaboration_system_taskContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.elaboration_system_task`.
	 * @param ctx the parse tree
	 */
	exitElaboration_system_task?: (ctx: Elaboration_system_taskContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.finish_number`.
	 * @param ctx the parse tree
	 */
	enterFinish_number?: (ctx: Finish_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.finish_number`.
	 * @param ctx the parse tree
	 */
	exitFinish_number?: (ctx: Finish_numberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_common_item`.
	 * @param ctx the parse tree
	 */
	enterModule_common_item?: (ctx: Module_common_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_common_item`.
	 * @param ctx the parse tree
	 */
	exitModule_common_item?: (ctx: Module_common_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.simulation_control_task`.
	 * @param ctx the parse tree
	 */
	enterSimulation_control_task?: (ctx: Simulation_control_taskContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.simulation_control_task`.
	 * @param ctx the parse tree
	 */
	exitSimulation_control_task?: (ctx: Simulation_control_taskContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_item`.
	 * @param ctx the parse tree
	 */
	enterModule_item?: (ctx: Module_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_item`.
	 * @param ctx the parse tree
	 */
	exitModule_item?: (ctx: Module_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_or_generate_item`.
	 * @param ctx the parse tree
	 */
	enterModule_or_generate_item?: (ctx: Module_or_generate_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_or_generate_item`.
	 * @param ctx the parse tree
	 */
	exitModule_or_generate_item?: (ctx: Module_or_generate_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_or_generate_item_declaration`.
	 * @param ctx the parse tree
	 */
	enterModule_or_generate_item_declaration?: (ctx: Module_or_generate_item_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_or_generate_item_declaration`.
	 * @param ctx the parse tree
	 */
	exitModule_or_generate_item_declaration?: (ctx: Module_or_generate_item_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.non_port_module_item`.
	 * @param ctx the parse tree
	 */
	enterNon_port_module_item?: (ctx: Non_port_module_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.non_port_module_item`.
	 * @param ctx the parse tree
	 */
	exitNon_port_module_item?: (ctx: Non_port_module_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.parameter_override`.
	 * @param ctx the parse tree
	 */
	enterParameter_override?: (ctx: Parameter_overrideContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.parameter_override`.
	 * @param ctx the parse tree
	 */
	exitParameter_override?: (ctx: Parameter_overrideContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bind_directive`.
	 * @param ctx the parse tree
	 */
	enterBind_directive?: (ctx: Bind_directiveContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bind_directive`.
	 * @param ctx the parse tree
	 */
	exitBind_directive?: (ctx: Bind_directiveContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bind_target_scope`.
	 * @param ctx the parse tree
	 */
	enterBind_target_scope?: (ctx: Bind_target_scopeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bind_target_scope`.
	 * @param ctx the parse tree
	 */
	exitBind_target_scope?: (ctx: Bind_target_scopeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bind_target_instance`.
	 * @param ctx the parse tree
	 */
	enterBind_target_instance?: (ctx: Bind_target_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bind_target_instance`.
	 * @param ctx the parse tree
	 */
	exitBind_target_instance?: (ctx: Bind_target_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bind_target_instance_list`.
	 * @param ctx the parse tree
	 */
	enterBind_target_instance_list?: (ctx: Bind_target_instance_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bind_target_instance_list`.
	 * @param ctx the parse tree
	 */
	exitBind_target_instance_list?: (ctx: Bind_target_instance_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bind_instantiation`.
	 * @param ctx the parse tree
	 */
	enterBind_instantiation?: (ctx: Bind_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bind_instantiation`.
	 * @param ctx the parse tree
	 */
	exitBind_instantiation?: (ctx: Bind_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.config_declaration`.
	 * @param ctx the parse tree
	 */
	enterConfig_declaration?: (ctx: Config_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.config_declaration`.
	 * @param ctx the parse tree
	 */
	exitConfig_declaration?: (ctx: Config_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.design_statement`.
	 * @param ctx the parse tree
	 */
	enterDesign_statement?: (ctx: Design_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.design_statement`.
	 * @param ctx the parse tree
	 */
	exitDesign_statement?: (ctx: Design_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.config_rule_statement`.
	 * @param ctx the parse tree
	 */
	enterConfig_rule_statement?: (ctx: Config_rule_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.config_rule_statement`.
	 * @param ctx the parse tree
	 */
	exitConfig_rule_statement?: (ctx: Config_rule_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.default_clause`.
	 * @param ctx the parse tree
	 */
	enterDefault_clause?: (ctx: Default_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.default_clause`.
	 * @param ctx the parse tree
	 */
	exitDefault_clause?: (ctx: Default_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.inst_clause`.
	 * @param ctx the parse tree
	 */
	enterInst_clause?: (ctx: Inst_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.inst_clause`.
	 * @param ctx the parse tree
	 */
	exitInst_clause?: (ctx: Inst_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.inst_name`.
	 * @param ctx the parse tree
	 */
	enterInst_name?: (ctx: Inst_nameContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.inst_name`.
	 * @param ctx the parse tree
	 */
	exitInst_name?: (ctx: Inst_nameContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cell_clause`.
	 * @param ctx the parse tree
	 */
	enterCell_clause?: (ctx: Cell_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cell_clause`.
	 * @param ctx the parse tree
	 */
	exitCell_clause?: (ctx: Cell_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.liblist_clause`.
	 * @param ctx the parse tree
	 */
	enterLiblist_clause?: (ctx: Liblist_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.liblist_clause`.
	 * @param ctx the parse tree
	 */
	exitLiblist_clause?: (ctx: Liblist_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.use_clause`.
	 * @param ctx the parse tree
	 */
	enterUse_clause?: (ctx: Use_clauseContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.use_clause`.
	 * @param ctx the parse tree
	 */
	exitUse_clause?: (ctx: Use_clauseContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_or_generate_item`.
	 * @param ctx the parse tree
	 */
	enterInterface_or_generate_item?: (ctx: Interface_or_generate_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_or_generate_item`.
	 * @param ctx the parse tree
	 */
	exitInterface_or_generate_item?: (ctx: Interface_or_generate_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.extern_tf_declaration`.
	 * @param ctx the parse tree
	 */
	enterExtern_tf_declaration?: (ctx: Extern_tf_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.extern_tf_declaration`.
	 * @param ctx the parse tree
	 */
	exitExtern_tf_declaration?: (ctx: Extern_tf_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_item`.
	 * @param ctx the parse tree
	 */
	enterInterface_item?: (ctx: Interface_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_item`.
	 * @param ctx the parse tree
	 */
	exitInterface_item?: (ctx: Interface_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.non_port_interface_item`.
	 * @param ctx the parse tree
	 */
	enterNon_port_interface_item?: (ctx: Non_port_interface_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.non_port_interface_item`.
	 * @param ctx the parse tree
	 */
	exitNon_port_interface_item?: (ctx: Non_port_interface_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.program_item`.
	 * @param ctx the parse tree
	 */
	enterProgram_item?: (ctx: Program_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.program_item`.
	 * @param ctx the parse tree
	 */
	exitProgram_item?: (ctx: Program_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.non_port_program_item`.
	 * @param ctx the parse tree
	 */
	enterNon_port_program_item?: (ctx: Non_port_program_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.non_port_program_item`.
	 * @param ctx the parse tree
	 */
	exitNon_port_program_item?: (ctx: Non_port_program_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.program_generate_item`.
	 * @param ctx the parse tree
	 */
	enterProgram_generate_item?: (ctx: Program_generate_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.program_generate_item`.
	 * @param ctx the parse tree
	 */
	exitProgram_generate_item?: (ctx: Program_generate_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.checker_port_list`.
	 * @param ctx the parse tree
	 */
	enterChecker_port_list?: (ctx: Checker_port_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.checker_port_list`.
	 * @param ctx the parse tree
	 */
	exitChecker_port_list?: (ctx: Checker_port_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.checker_port_item`.
	 * @param ctx the parse tree
	 */
	enterChecker_port_item?: (ctx: Checker_port_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.checker_port_item`.
	 * @param ctx the parse tree
	 */
	exitChecker_port_item?: (ctx: Checker_port_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.checker_port_direction`.
	 * @param ctx the parse tree
	 */
	enterChecker_port_direction?: (ctx: Checker_port_directionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.checker_port_direction`.
	 * @param ctx the parse tree
	 */
	exitChecker_port_direction?: (ctx: Checker_port_directionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.checker_or_generate_item`.
	 * @param ctx the parse tree
	 */
	enterChecker_or_generate_item?: (ctx: Checker_or_generate_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.checker_or_generate_item`.
	 * @param ctx the parse tree
	 */
	exitChecker_or_generate_item?: (ctx: Checker_or_generate_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.checker_or_generate_item_declaration`.
	 * @param ctx the parse tree
	 */
	enterChecker_or_generate_item_declaration?: (ctx: Checker_or_generate_item_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.checker_or_generate_item_declaration`.
	 * @param ctx the parse tree
	 */
	exitChecker_or_generate_item_declaration?: (ctx: Checker_or_generate_item_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.checker_generate_item`.
	 * @param ctx the parse tree
	 */
	enterChecker_generate_item?: (ctx: Checker_generate_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.checker_generate_item`.
	 * @param ctx the parse tree
	 */
	exitChecker_generate_item?: (ctx: Checker_generate_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_item`.
	 * @param ctx the parse tree
	 */
	enterClass_item?: (ctx: Class_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_item`.
	 * @param ctx the parse tree
	 */
	exitClass_item?: (ctx: Class_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_property`.
	 * @param ctx the parse tree
	 */
	enterClass_property?: (ctx: Class_propertyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_property`.
	 * @param ctx the parse tree
	 */
	exitClass_property?: (ctx: Class_propertyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_method`.
	 * @param ctx the parse tree
	 */
	enterClass_method?: (ctx: Class_methodContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_method`.
	 * @param ctx the parse tree
	 */
	exitClass_method?: (ctx: Class_methodContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_constructor_prototype`.
	 * @param ctx the parse tree
	 */
	enterClass_constructor_prototype?: (ctx: Class_constructor_prototypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_constructor_prototype`.
	 * @param ctx the parse tree
	 */
	exitClass_constructor_prototype?: (ctx: Class_constructor_prototypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_constraint`.
	 * @param ctx the parse tree
	 */
	enterClass_constraint?: (ctx: Class_constraintContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_constraint`.
	 * @param ctx the parse tree
	 */
	exitClass_constraint?: (ctx: Class_constraintContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_item_qualifier`.
	 * @param ctx the parse tree
	 */
	enterClass_item_qualifier?: (ctx: Class_item_qualifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_item_qualifier`.
	 * @param ctx the parse tree
	 */
	exitClass_item_qualifier?: (ctx: Class_item_qualifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_qualifier`.
	 * @param ctx the parse tree
	 */
	enterProperty_qualifier?: (ctx: Property_qualifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_qualifier`.
	 * @param ctx the parse tree
	 */
	exitProperty_qualifier?: (ctx: Property_qualifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.random_qualifier`.
	 * @param ctx the parse tree
	 */
	enterRandom_qualifier?: (ctx: Random_qualifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.random_qualifier`.
	 * @param ctx the parse tree
	 */
	exitRandom_qualifier?: (ctx: Random_qualifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.method_qualifier`.
	 * @param ctx the parse tree
	 */
	enterMethod_qualifier?: (ctx: Method_qualifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.method_qualifier`.
	 * @param ctx the parse tree
	 */
	exitMethod_qualifier?: (ctx: Method_qualifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.method_prototype`.
	 * @param ctx the parse tree
	 */
	enterMethod_prototype?: (ctx: Method_prototypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.method_prototype`.
	 * @param ctx the parse tree
	 */
	exitMethod_prototype?: (ctx: Method_prototypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_constructor_declaration`.
	 * @param ctx the parse tree
	 */
	enterClass_constructor_declaration?: (ctx: Class_constructor_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_constructor_declaration`.
	 * @param ctx the parse tree
	 */
	exitClass_constructor_declaration?: (ctx: Class_constructor_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constraint_declaration`.
	 * @param ctx the parse tree
	 */
	enterConstraint_declaration?: (ctx: Constraint_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constraint_declaration`.
	 * @param ctx the parse tree
	 */
	exitConstraint_declaration?: (ctx: Constraint_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constraint_block`.
	 * @param ctx the parse tree
	 */
	enterConstraint_block?: (ctx: Constraint_blockContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constraint_block`.
	 * @param ctx the parse tree
	 */
	exitConstraint_block?: (ctx: Constraint_blockContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constraint_block_item`.
	 * @param ctx the parse tree
	 */
	enterConstraint_block_item?: (ctx: Constraint_block_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constraint_block_item`.
	 * @param ctx the parse tree
	 */
	exitConstraint_block_item?: (ctx: Constraint_block_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.solve_before_list`.
	 * @param ctx the parse tree
	 */
	enterSolve_before_list?: (ctx: Solve_before_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.solve_before_list`.
	 * @param ctx the parse tree
	 */
	exitSolve_before_list?: (ctx: Solve_before_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constraint_primary`.
	 * @param ctx the parse tree
	 */
	enterConstraint_primary?: (ctx: Constraint_primaryContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constraint_primary`.
	 * @param ctx the parse tree
	 */
	exitConstraint_primary?: (ctx: Constraint_primaryContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constraint_expression`.
	 * @param ctx the parse tree
	 */
	enterConstraint_expression?: (ctx: Constraint_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constraint_expression`.
	 * @param ctx the parse tree
	 */
	exitConstraint_expression?: (ctx: Constraint_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.uniqueness_constraint`.
	 * @param ctx the parse tree
	 */
	enterUniqueness_constraint?: (ctx: Uniqueness_constraintContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.uniqueness_constraint`.
	 * @param ctx the parse tree
	 */
	exitUniqueness_constraint?: (ctx: Uniqueness_constraintContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constraint_set`.
	 * @param ctx the parse tree
	 */
	enterConstraint_set?: (ctx: Constraint_setContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constraint_set`.
	 * @param ctx the parse tree
	 */
	exitConstraint_set?: (ctx: Constraint_setContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.dist_list`.
	 * @param ctx the parse tree
	 */
	enterDist_list?: (ctx: Dist_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.dist_list`.
	 * @param ctx the parse tree
	 */
	exitDist_list?: (ctx: Dist_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.dist_item`.
	 * @param ctx the parse tree
	 */
	enterDist_item?: (ctx: Dist_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.dist_item`.
	 * @param ctx the parse tree
	 */
	exitDist_item?: (ctx: Dist_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.dist_weight`.
	 * @param ctx the parse tree
	 */
	enterDist_weight?: (ctx: Dist_weightContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.dist_weight`.
	 * @param ctx the parse tree
	 */
	exitDist_weight?: (ctx: Dist_weightContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constraint_prototype`.
	 * @param ctx the parse tree
	 */
	enterConstraint_prototype?: (ctx: Constraint_prototypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constraint_prototype`.
	 * @param ctx the parse tree
	 */
	exitConstraint_prototype?: (ctx: Constraint_prototypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constraint_prototype_qualifier`.
	 * @param ctx the parse tree
	 */
	enterConstraint_prototype_qualifier?: (ctx: Constraint_prototype_qualifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constraint_prototype_qualifier`.
	 * @param ctx the parse tree
	 */
	exitConstraint_prototype_qualifier?: (ctx: Constraint_prototype_qualifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.extern_constraint_declaration`.
	 * @param ctx the parse tree
	 */
	enterExtern_constraint_declaration?: (ctx: Extern_constraint_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.extern_constraint_declaration`.
	 * @param ctx the parse tree
	 */
	exitExtern_constraint_declaration?: (ctx: Extern_constraint_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.identifier_list`.
	 * @param ctx the parse tree
	 */
	enterIdentifier_list?: (ctx: Identifier_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.identifier_list`.
	 * @param ctx the parse tree
	 */
	exitIdentifier_list?: (ctx: Identifier_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.package_item`.
	 * @param ctx the parse tree
	 */
	enterPackage_item?: (ctx: Package_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.package_item`.
	 * @param ctx the parse tree
	 */
	exitPackage_item?: (ctx: Package_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.package_or_generate_item_declaration`.
	 * @param ctx the parse tree
	 */
	enterPackage_or_generate_item_declaration?: (ctx: Package_or_generate_item_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.package_or_generate_item_declaration`.
	 * @param ctx the parse tree
	 */
	exitPackage_or_generate_item_declaration?: (ctx: Package_or_generate_item_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.anonymous_program`.
	 * @param ctx the parse tree
	 */
	enterAnonymous_program?: (ctx: Anonymous_programContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.anonymous_program`.
	 * @param ctx the parse tree
	 */
	exitAnonymous_program?: (ctx: Anonymous_programContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.anonymous_program_item`.
	 * @param ctx the parse tree
	 */
	enterAnonymous_program_item?: (ctx: Anonymous_program_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.anonymous_program_item`.
	 * @param ctx the parse tree
	 */
	exitAnonymous_program_item?: (ctx: Anonymous_program_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.local_parameter_declaration`.
	 * @param ctx the parse tree
	 */
	enterLocal_parameter_declaration?: (ctx: Local_parameter_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.local_parameter_declaration`.
	 * @param ctx the parse tree
	 */
	exitLocal_parameter_declaration?: (ctx: Local_parameter_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.parameter_declaration`.
	 * @param ctx the parse tree
	 */
	enterParameter_declaration?: (ctx: Parameter_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.parameter_declaration`.
	 * @param ctx the parse tree
	 */
	exitParameter_declaration?: (ctx: Parameter_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.specparam_declaration`.
	 * @param ctx the parse tree
	 */
	enterSpecparam_declaration?: (ctx: Specparam_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.specparam_declaration`.
	 * @param ctx the parse tree
	 */
	exitSpecparam_declaration?: (ctx: Specparam_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.inout_declaration`.
	 * @param ctx the parse tree
	 */
	enterInout_declaration?: (ctx: Inout_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.inout_declaration`.
	 * @param ctx the parse tree
	 */
	exitInout_declaration?: (ctx: Inout_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.input_declaration`.
	 * @param ctx the parse tree
	 */
	enterInput_declaration?: (ctx: Input_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.input_declaration`.
	 * @param ctx the parse tree
	 */
	exitInput_declaration?: (ctx: Input_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.output_declaration`.
	 * @param ctx the parse tree
	 */
	enterOutput_declaration?: (ctx: Output_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.output_declaration`.
	 * @param ctx the parse tree
	 */
	exitOutput_declaration?: (ctx: Output_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_port_declaration`.
	 * @param ctx the parse tree
	 */
	enterInterface_port_declaration?: (ctx: Interface_port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_port_declaration`.
	 * @param ctx the parse tree
	 */
	exitInterface_port_declaration?: (ctx: Interface_port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ref_declaration`.
	 * @param ctx the parse tree
	 */
	enterRef_declaration?: (ctx: Ref_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ref_declaration`.
	 * @param ctx the parse tree
	 */
	exitRef_declaration?: (ctx: Ref_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.data_declaration`.
	 * @param ctx the parse tree
	 */
	enterData_declaration?: (ctx: Data_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.data_declaration`.
	 * @param ctx the parse tree
	 */
	exitData_declaration?: (ctx: Data_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.package_import_declaration`.
	 * @param ctx the parse tree
	 */
	enterPackage_import_declaration?: (ctx: Package_import_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.package_import_declaration`.
	 * @param ctx the parse tree
	 */
	exitPackage_import_declaration?: (ctx: Package_import_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.package_import_item`.
	 * @param ctx the parse tree
	 */
	enterPackage_import_item?: (ctx: Package_import_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.package_import_item`.
	 * @param ctx the parse tree
	 */
	exitPackage_import_item?: (ctx: Package_import_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.package_export_declaration`.
	 * @param ctx the parse tree
	 */
	enterPackage_export_declaration?: (ctx: Package_export_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.package_export_declaration`.
	 * @param ctx the parse tree
	 */
	exitPackage_export_declaration?: (ctx: Package_export_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.genvar_declaration`.
	 * @param ctx the parse tree
	 */
	enterGenvar_declaration?: (ctx: Genvar_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.genvar_declaration`.
	 * @param ctx the parse tree
	 */
	exitGenvar_declaration?: (ctx: Genvar_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.net_declaration`.
	 * @param ctx the parse tree
	 */
	enterNet_declaration?: (ctx: Net_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.net_declaration`.
	 * @param ctx the parse tree
	 */
	exitNet_declaration?: (ctx: Net_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.type_declaration`.
	 * @param ctx the parse tree
	 */
	enterType_declaration?: (ctx: Type_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.type_declaration`.
	 * @param ctx the parse tree
	 */
	exitType_declaration?: (ctx: Type_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.net_type_declaration`.
	 * @param ctx the parse tree
	 */
	enterNet_type_declaration?: (ctx: Net_type_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.net_type_declaration`.
	 * @param ctx the parse tree
	 */
	exitNet_type_declaration?: (ctx: Net_type_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.lifetime`.
	 * @param ctx the parse tree
	 */
	enterLifetime?: (ctx: LifetimeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.lifetime`.
	 * @param ctx the parse tree
	 */
	exitLifetime?: (ctx: LifetimeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.data_type`.
	 * @param ctx the parse tree
	 */
	enterData_type?: (ctx: Data_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.data_type`.
	 * @param ctx the parse tree
	 */
	exitData_type?: (ctx: Data_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.data_type_or_implicit`.
	 * @param ctx the parse tree
	 */
	enterData_type_or_implicit?: (ctx: Data_type_or_implicitContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.data_type_or_implicit`.
	 * @param ctx the parse tree
	 */
	exitData_type_or_implicit?: (ctx: Data_type_or_implicitContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.implicit_data_type`.
	 * @param ctx the parse tree
	 */
	enterImplicit_data_type?: (ctx: Implicit_data_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.implicit_data_type`.
	 * @param ctx the parse tree
	 */
	exitImplicit_data_type?: (ctx: Implicit_data_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.enum_base_type`.
	 * @param ctx the parse tree
	 */
	enterEnum_base_type?: (ctx: Enum_base_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.enum_base_type`.
	 * @param ctx the parse tree
	 */
	exitEnum_base_type?: (ctx: Enum_base_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.enum_name_declaration`.
	 * @param ctx the parse tree
	 */
	enterEnum_name_declaration?: (ctx: Enum_name_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.enum_name_declaration`.
	 * @param ctx the parse tree
	 */
	exitEnum_name_declaration?: (ctx: Enum_name_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_scope`.
	 * @param ctx the parse tree
	 */
	enterClass_scope?: (ctx: Class_scopeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_scope`.
	 * @param ctx the parse tree
	 */
	exitClass_scope?: (ctx: Class_scopeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_type`.
	 * @param ctx the parse tree
	 */
	enterClass_type?: (ctx: Class_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_type`.
	 * @param ctx the parse tree
	 */
	exitClass_type?: (ctx: Class_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.integer_type`.
	 * @param ctx the parse tree
	 */
	enterInteger_type?: (ctx: Integer_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.integer_type`.
	 * @param ctx the parse tree
	 */
	exitInteger_type?: (ctx: Integer_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.integer_atom_type`.
	 * @param ctx the parse tree
	 */
	enterInteger_atom_type?: (ctx: Integer_atom_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.integer_atom_type`.
	 * @param ctx the parse tree
	 */
	exitInteger_atom_type?: (ctx: Integer_atom_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.integer_vector_type`.
	 * @param ctx the parse tree
	 */
	enterInteger_vector_type?: (ctx: Integer_vector_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.integer_vector_type`.
	 * @param ctx the parse tree
	 */
	exitInteger_vector_type?: (ctx: Integer_vector_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.non_integer_type`.
	 * @param ctx the parse tree
	 */
	enterNon_integer_type?: (ctx: Non_integer_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.non_integer_type`.
	 * @param ctx the parse tree
	 */
	exitNon_integer_type?: (ctx: Non_integer_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.net_type`.
	 * @param ctx the parse tree
	 */
	enterNet_type?: (ctx: Net_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.net_type`.
	 * @param ctx the parse tree
	 */
	exitNet_type?: (ctx: Net_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.net_port_type`.
	 * @param ctx the parse tree
	 */
	enterNet_port_type?: (ctx: Net_port_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.net_port_type`.
	 * @param ctx the parse tree
	 */
	exitNet_port_type?: (ctx: Net_port_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.variable_port_type`.
	 * @param ctx the parse tree
	 */
	enterVariable_port_type?: (ctx: Variable_port_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.variable_port_type`.
	 * @param ctx the parse tree
	 */
	exitVariable_port_type?: (ctx: Variable_port_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.var_data_type`.
	 * @param ctx the parse tree
	 */
	enterVar_data_type?: (ctx: Var_data_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.var_data_type`.
	 * @param ctx the parse tree
	 */
	exitVar_data_type?: (ctx: Var_data_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.signing`.
	 * @param ctx the parse tree
	 */
	enterSigning?: (ctx: SigningContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.signing`.
	 * @param ctx the parse tree
	 */
	exitSigning?: (ctx: SigningContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.simple_type`.
	 * @param ctx the parse tree
	 */
	enterSimple_type?: (ctx: Simple_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.simple_type`.
	 * @param ctx the parse tree
	 */
	exitSimple_type?: (ctx: Simple_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.struct_union_member`.
	 * @param ctx the parse tree
	 */
	enterStruct_union_member?: (ctx: Struct_union_memberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.struct_union_member`.
	 * @param ctx the parse tree
	 */
	exitStruct_union_member?: (ctx: Struct_union_memberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.data_type_or_void`.
	 * @param ctx the parse tree
	 */
	enterData_type_or_void?: (ctx: Data_type_or_voidContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.data_type_or_void`.
	 * @param ctx the parse tree
	 */
	exitData_type_or_void?: (ctx: Data_type_or_voidContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.struct_union`.
	 * @param ctx the parse tree
	 */
	enterStruct_union?: (ctx: Struct_unionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.struct_union`.
	 * @param ctx the parse tree
	 */
	exitStruct_union?: (ctx: Struct_unionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.type_reference`.
	 * @param ctx the parse tree
	 */
	enterType_reference?: (ctx: Type_referenceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.type_reference`.
	 * @param ctx the parse tree
	 */
	exitType_reference?: (ctx: Type_referenceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.drive_strength`.
	 * @param ctx the parse tree
	 */
	enterDrive_strength?: (ctx: Drive_strengthContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.drive_strength`.
	 * @param ctx the parse tree
	 */
	exitDrive_strength?: (ctx: Drive_strengthContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.strength0`.
	 * @param ctx the parse tree
	 */
	enterStrength0?: (ctx: Strength0Context) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.strength0`.
	 * @param ctx the parse tree
	 */
	exitStrength0?: (ctx: Strength0Context) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.strength1`.
	 * @param ctx the parse tree
	 */
	enterStrength1?: (ctx: Strength1Context) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.strength1`.
	 * @param ctx the parse tree
	 */
	exitStrength1?: (ctx: Strength1Context) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.charge_strength`.
	 * @param ctx the parse tree
	 */
	enterCharge_strength?: (ctx: Charge_strengthContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.charge_strength`.
	 * @param ctx the parse tree
	 */
	exitCharge_strength?: (ctx: Charge_strengthContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.delay3`.
	 * @param ctx the parse tree
	 */
	enterDelay3?: (ctx: Delay3Context) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.delay3`.
	 * @param ctx the parse tree
	 */
	exitDelay3?: (ctx: Delay3Context) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.delay2`.
	 * @param ctx the parse tree
	 */
	enterDelay2?: (ctx: Delay2Context) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.delay2`.
	 * @param ctx the parse tree
	 */
	exitDelay2?: (ctx: Delay2Context) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.delay_value`.
	 * @param ctx the parse tree
	 */
	enterDelay_value?: (ctx: Delay_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.delay_value`.
	 * @param ctx the parse tree
	 */
	exitDelay_value?: (ctx: Delay_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_defparam_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_defparam_assignments?: (ctx: List_of_defparam_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_defparam_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_defparam_assignments?: (ctx: List_of_defparam_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_genvar_identifiers`.
	 * @param ctx the parse tree
	 */
	enterList_of_genvar_identifiers?: (ctx: List_of_genvar_identifiersContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_genvar_identifiers`.
	 * @param ctx the parse tree
	 */
	exitList_of_genvar_identifiers?: (ctx: List_of_genvar_identifiersContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_interface_identifiers`.
	 * @param ctx the parse tree
	 */
	enterList_of_interface_identifiers?: (ctx: List_of_interface_identifiersContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_interface_identifiers`.
	 * @param ctx the parse tree
	 */
	exitList_of_interface_identifiers?: (ctx: List_of_interface_identifiersContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_net_decl_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_net_decl_assignments?: (ctx: List_of_net_decl_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_net_decl_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_net_decl_assignments?: (ctx: List_of_net_decl_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_param_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_param_assignments?: (ctx: List_of_param_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_param_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_param_assignments?: (ctx: List_of_param_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_port_identifiers`.
	 * @param ctx the parse tree
	 */
	enterList_of_port_identifiers?: (ctx: List_of_port_identifiersContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_port_identifiers`.
	 * @param ctx the parse tree
	 */
	exitList_of_port_identifiers?: (ctx: List_of_port_identifiersContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_udp_port_identifiers`.
	 * @param ctx the parse tree
	 */
	enterList_of_udp_port_identifiers?: (ctx: List_of_udp_port_identifiersContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_udp_port_identifiers`.
	 * @param ctx the parse tree
	 */
	exitList_of_udp_port_identifiers?: (ctx: List_of_udp_port_identifiersContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_specparam_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_specparam_assignments?: (ctx: List_of_specparam_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_specparam_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_specparam_assignments?: (ctx: List_of_specparam_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_tf_variable_identifiers`.
	 * @param ctx the parse tree
	 */
	enterList_of_tf_variable_identifiers?: (ctx: List_of_tf_variable_identifiersContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_tf_variable_identifiers`.
	 * @param ctx the parse tree
	 */
	exitList_of_tf_variable_identifiers?: (ctx: List_of_tf_variable_identifiersContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_type_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_type_assignments?: (ctx: List_of_type_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_type_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_type_assignments?: (ctx: List_of_type_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_variable_decl_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_variable_decl_assignments?: (ctx: List_of_variable_decl_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_variable_decl_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_variable_decl_assignments?: (ctx: List_of_variable_decl_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_variable_identifiers`.
	 * @param ctx the parse tree
	 */
	enterList_of_variable_identifiers?: (ctx: List_of_variable_identifiersContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_variable_identifiers`.
	 * @param ctx the parse tree
	 */
	exitList_of_variable_identifiers?: (ctx: List_of_variable_identifiersContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_variable_port_identifiers`.
	 * @param ctx the parse tree
	 */
	enterList_of_variable_port_identifiers?: (ctx: List_of_variable_port_identifiersContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_variable_port_identifiers`.
	 * @param ctx the parse tree
	 */
	exitList_of_variable_port_identifiers?: (ctx: List_of_variable_port_identifiersContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.defparam_assignment`.
	 * @param ctx the parse tree
	 */
	enterDefparam_assignment?: (ctx: Defparam_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.defparam_assignment`.
	 * @param ctx the parse tree
	 */
	exitDefparam_assignment?: (ctx: Defparam_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.net_decl_assignment`.
	 * @param ctx the parse tree
	 */
	enterNet_decl_assignment?: (ctx: Net_decl_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.net_decl_assignment`.
	 * @param ctx the parse tree
	 */
	exitNet_decl_assignment?: (ctx: Net_decl_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.param_assignment`.
	 * @param ctx the parse tree
	 */
	enterParam_assignment?: (ctx: Param_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.param_assignment`.
	 * @param ctx the parse tree
	 */
	exitParam_assignment?: (ctx: Param_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.specparam_assignment`.
	 * @param ctx the parse tree
	 */
	enterSpecparam_assignment?: (ctx: Specparam_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.specparam_assignment`.
	 * @param ctx the parse tree
	 */
	exitSpecparam_assignment?: (ctx: Specparam_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.type_assignment`.
	 * @param ctx the parse tree
	 */
	enterType_assignment?: (ctx: Type_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.type_assignment`.
	 * @param ctx the parse tree
	 */
	exitType_assignment?: (ctx: Type_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.pulse_control_specparam`.
	 * @param ctx the parse tree
	 */
	enterPulse_control_specparam?: (ctx: Pulse_control_specparamContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.pulse_control_specparam`.
	 * @param ctx the parse tree
	 */
	exitPulse_control_specparam?: (ctx: Pulse_control_specparamContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.error_limit_value`.
	 * @param ctx the parse tree
	 */
	enterError_limit_value?: (ctx: Error_limit_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.error_limit_value`.
	 * @param ctx the parse tree
	 */
	exitError_limit_value?: (ctx: Error_limit_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.reject_limit_value`.
	 * @param ctx the parse tree
	 */
	enterReject_limit_value?: (ctx: Reject_limit_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.reject_limit_value`.
	 * @param ctx the parse tree
	 */
	exitReject_limit_value?: (ctx: Reject_limit_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.limit_value`.
	 * @param ctx the parse tree
	 */
	enterLimit_value?: (ctx: Limit_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.limit_value`.
	 * @param ctx the parse tree
	 */
	exitLimit_value?: (ctx: Limit_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.variable_decl_assignment`.
	 * @param ctx the parse tree
	 */
	enterVariable_decl_assignment?: (ctx: Variable_decl_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.variable_decl_assignment`.
	 * @param ctx the parse tree
	 */
	exitVariable_decl_assignment?: (ctx: Variable_decl_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_new`.
	 * @param ctx the parse tree
	 */
	enterClass_new?: (ctx: Class_newContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_new`.
	 * @param ctx the parse tree
	 */
	exitClass_new?: (ctx: Class_newContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.dynamic_array_new`.
	 * @param ctx the parse tree
	 */
	enterDynamic_array_new?: (ctx: Dynamic_array_newContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.dynamic_array_new`.
	 * @param ctx the parse tree
	 */
	exitDynamic_array_new?: (ctx: Dynamic_array_newContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.unpacked_dimension`.
	 * @param ctx the parse tree
	 */
	enterUnpacked_dimension?: (ctx: Unpacked_dimensionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.unpacked_dimension`.
	 * @param ctx the parse tree
	 */
	exitUnpacked_dimension?: (ctx: Unpacked_dimensionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.packed_dimension`.
	 * @param ctx the parse tree
	 */
	enterPacked_dimension?: (ctx: Packed_dimensionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.packed_dimension`.
	 * @param ctx the parse tree
	 */
	exitPacked_dimension?: (ctx: Packed_dimensionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.associative_dimension`.
	 * @param ctx the parse tree
	 */
	enterAssociative_dimension?: (ctx: Associative_dimensionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.associative_dimension`.
	 * @param ctx the parse tree
	 */
	exitAssociative_dimension?: (ctx: Associative_dimensionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.variable_dimension`.
	 * @param ctx the parse tree
	 */
	enterVariable_dimension?: (ctx: Variable_dimensionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.variable_dimension`.
	 * @param ctx the parse tree
	 */
	exitVariable_dimension?: (ctx: Variable_dimensionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.queue_dimension`.
	 * @param ctx the parse tree
	 */
	enterQueue_dimension?: (ctx: Queue_dimensionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.queue_dimension`.
	 * @param ctx the parse tree
	 */
	exitQueue_dimension?: (ctx: Queue_dimensionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.unsized_dimension`.
	 * @param ctx the parse tree
	 */
	enterUnsized_dimension?: (ctx: Unsized_dimensionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.unsized_dimension`.
	 * @param ctx the parse tree
	 */
	exitUnsized_dimension?: (ctx: Unsized_dimensionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.function_data_type_or_implicit`.
	 * @param ctx the parse tree
	 */
	enterFunction_data_type_or_implicit?: (ctx: Function_data_type_or_implicitContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.function_data_type_or_implicit`.
	 * @param ctx the parse tree
	 */
	exitFunction_data_type_or_implicit?: (ctx: Function_data_type_or_implicitContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.function_declaration`.
	 * @param ctx the parse tree
	 */
	enterFunction_declaration?: (ctx: Function_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.function_declaration`.
	 * @param ctx the parse tree
	 */
	exitFunction_declaration?: (ctx: Function_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.function_body_declaration`.
	 * @param ctx the parse tree
	 */
	enterFunction_body_declaration?: (ctx: Function_body_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.function_body_declaration`.
	 * @param ctx the parse tree
	 */
	exitFunction_body_declaration?: (ctx: Function_body_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.function_prototype`.
	 * @param ctx the parse tree
	 */
	enterFunction_prototype?: (ctx: Function_prototypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.function_prototype`.
	 * @param ctx the parse tree
	 */
	exitFunction_prototype?: (ctx: Function_prototypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.dpi_import_export`.
	 * @param ctx the parse tree
	 */
	enterDpi_import_export?: (ctx: Dpi_import_exportContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.dpi_import_export`.
	 * @param ctx the parse tree
	 */
	exitDpi_import_export?: (ctx: Dpi_import_exportContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.dpi_spec_string`.
	 * @param ctx the parse tree
	 */
	enterDpi_spec_string?: (ctx: Dpi_spec_stringContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.dpi_spec_string`.
	 * @param ctx the parse tree
	 */
	exitDpi_spec_string?: (ctx: Dpi_spec_stringContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.dpi_function_import_property`.
	 * @param ctx the parse tree
	 */
	enterDpi_function_import_property?: (ctx: Dpi_function_import_propertyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.dpi_function_import_property`.
	 * @param ctx the parse tree
	 */
	exitDpi_function_import_property?: (ctx: Dpi_function_import_propertyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.dpi_task_import_property`.
	 * @param ctx the parse tree
	 */
	enterDpi_task_import_property?: (ctx: Dpi_task_import_propertyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.dpi_task_import_property`.
	 * @param ctx the parse tree
	 */
	exitDpi_task_import_property?: (ctx: Dpi_task_import_propertyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.dpi_function_proto`.
	 * @param ctx the parse tree
	 */
	enterDpi_function_proto?: (ctx: Dpi_function_protoContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.dpi_function_proto`.
	 * @param ctx the parse tree
	 */
	exitDpi_function_proto?: (ctx: Dpi_function_protoContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.dpi_task_proto`.
	 * @param ctx the parse tree
	 */
	enterDpi_task_proto?: (ctx: Dpi_task_protoContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.dpi_task_proto`.
	 * @param ctx the parse tree
	 */
	exitDpi_task_proto?: (ctx: Dpi_task_protoContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.task_declaration`.
	 * @param ctx the parse tree
	 */
	enterTask_declaration?: (ctx: Task_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.task_declaration`.
	 * @param ctx the parse tree
	 */
	exitTask_declaration?: (ctx: Task_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.task_body_declaration`.
	 * @param ctx the parse tree
	 */
	enterTask_body_declaration?: (ctx: Task_body_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.task_body_declaration`.
	 * @param ctx the parse tree
	 */
	exitTask_body_declaration?: (ctx: Task_body_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tf_item_declaration`.
	 * @param ctx the parse tree
	 */
	enterTf_item_declaration?: (ctx: Tf_item_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tf_item_declaration`.
	 * @param ctx the parse tree
	 */
	exitTf_item_declaration?: (ctx: Tf_item_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tf_port_list`.
	 * @param ctx the parse tree
	 */
	enterTf_port_list?: (ctx: Tf_port_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tf_port_list`.
	 * @param ctx the parse tree
	 */
	exitTf_port_list?: (ctx: Tf_port_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tf_port_item`.
	 * @param ctx the parse tree
	 */
	enterTf_port_item?: (ctx: Tf_port_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tf_port_item`.
	 * @param ctx the parse tree
	 */
	exitTf_port_item?: (ctx: Tf_port_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tf_port_direction`.
	 * @param ctx the parse tree
	 */
	enterTf_port_direction?: (ctx: Tf_port_directionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tf_port_direction`.
	 * @param ctx the parse tree
	 */
	exitTf_port_direction?: (ctx: Tf_port_directionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tf_port_declaration`.
	 * @param ctx the parse tree
	 */
	enterTf_port_declaration?: (ctx: Tf_port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tf_port_declaration`.
	 * @param ctx the parse tree
	 */
	exitTf_port_declaration?: (ctx: Tf_port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.task_prototype`.
	 * @param ctx the parse tree
	 */
	enterTask_prototype?: (ctx: Task_prototypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.task_prototype`.
	 * @param ctx the parse tree
	 */
	exitTask_prototype?: (ctx: Task_prototypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.block_item_declaration`.
	 * @param ctx the parse tree
	 */
	enterBlock_item_declaration?: (ctx: Block_item_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.block_item_declaration`.
	 * @param ctx the parse tree
	 */
	exitBlock_item_declaration?: (ctx: Block_item_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.modport_declaration`.
	 * @param ctx the parse tree
	 */
	enterModport_declaration?: (ctx: Modport_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.modport_declaration`.
	 * @param ctx the parse tree
	 */
	exitModport_declaration?: (ctx: Modport_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.modport_item`.
	 * @param ctx the parse tree
	 */
	enterModport_item?: (ctx: Modport_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.modport_item`.
	 * @param ctx the parse tree
	 */
	exitModport_item?: (ctx: Modport_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.modport_ports_declaration`.
	 * @param ctx the parse tree
	 */
	enterModport_ports_declaration?: (ctx: Modport_ports_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.modport_ports_declaration`.
	 * @param ctx the parse tree
	 */
	exitModport_ports_declaration?: (ctx: Modport_ports_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.modport_clocking_declaration`.
	 * @param ctx the parse tree
	 */
	enterModport_clocking_declaration?: (ctx: Modport_clocking_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.modport_clocking_declaration`.
	 * @param ctx the parse tree
	 */
	exitModport_clocking_declaration?: (ctx: Modport_clocking_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.modport_simple_ports_declaration`.
	 * @param ctx the parse tree
	 */
	enterModport_simple_ports_declaration?: (ctx: Modport_simple_ports_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.modport_simple_ports_declaration`.
	 * @param ctx the parse tree
	 */
	exitModport_simple_ports_declaration?: (ctx: Modport_simple_ports_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.modport_simple_port`.
	 * @param ctx the parse tree
	 */
	enterModport_simple_port?: (ctx: Modport_simple_portContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.modport_simple_port`.
	 * @param ctx the parse tree
	 */
	exitModport_simple_port?: (ctx: Modport_simple_portContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.modport_tf_ports_declaration`.
	 * @param ctx the parse tree
	 */
	enterModport_tf_ports_declaration?: (ctx: Modport_tf_ports_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.modport_tf_ports_declaration`.
	 * @param ctx the parse tree
	 */
	exitModport_tf_ports_declaration?: (ctx: Modport_tf_ports_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.modport_tf_port`.
	 * @param ctx the parse tree
	 */
	enterModport_tf_port?: (ctx: Modport_tf_portContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.modport_tf_port`.
	 * @param ctx the parse tree
	 */
	exitModport_tf_port?: (ctx: Modport_tf_portContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.import_export`.
	 * @param ctx the parse tree
	 */
	enterImport_export?: (ctx: Import_exportContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.import_export`.
	 * @param ctx the parse tree
	 */
	exitImport_export?: (ctx: Import_exportContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.concurrent_assertion_item`.
	 * @param ctx the parse tree
	 */
	enterConcurrent_assertion_item?: (ctx: Concurrent_assertion_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.concurrent_assertion_item`.
	 * @param ctx the parse tree
	 */
	exitConcurrent_assertion_item?: (ctx: Concurrent_assertion_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.concurrent_assertion_statement`.
	 * @param ctx the parse tree
	 */
	enterConcurrent_assertion_statement?: (ctx: Concurrent_assertion_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.concurrent_assertion_statement`.
	 * @param ctx the parse tree
	 */
	exitConcurrent_assertion_statement?: (ctx: Concurrent_assertion_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assert_property_statement`.
	 * @param ctx the parse tree
	 */
	enterAssert_property_statement?: (ctx: Assert_property_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assert_property_statement`.
	 * @param ctx the parse tree
	 */
	exitAssert_property_statement?: (ctx: Assert_property_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assume_property_statement`.
	 * @param ctx the parse tree
	 */
	enterAssume_property_statement?: (ctx: Assume_property_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assume_property_statement`.
	 * @param ctx the parse tree
	 */
	exitAssume_property_statement?: (ctx: Assume_property_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cover_property_statement`.
	 * @param ctx the parse tree
	 */
	enterCover_property_statement?: (ctx: Cover_property_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cover_property_statement`.
	 * @param ctx the parse tree
	 */
	exitCover_property_statement?: (ctx: Cover_property_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.expect_property_statement`.
	 * @param ctx the parse tree
	 */
	enterExpect_property_statement?: (ctx: Expect_property_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.expect_property_statement`.
	 * @param ctx the parse tree
	 */
	exitExpect_property_statement?: (ctx: Expect_property_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cover_sequence_statement`.
	 * @param ctx the parse tree
	 */
	enterCover_sequence_statement?: (ctx: Cover_sequence_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cover_sequence_statement`.
	 * @param ctx the parse tree
	 */
	exitCover_sequence_statement?: (ctx: Cover_sequence_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.restrict_property_statement`.
	 * @param ctx the parse tree
	 */
	enterRestrict_property_statement?: (ctx: Restrict_property_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.restrict_property_statement`.
	 * @param ctx the parse tree
	 */
	exitRestrict_property_statement?: (ctx: Restrict_property_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_instance`.
	 * @param ctx the parse tree
	 */
	enterProperty_instance?: (ctx: Property_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_instance`.
	 * @param ctx the parse tree
	 */
	exitProperty_instance?: (ctx: Property_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_list_of_arguments`.
	 * @param ctx the parse tree
	 */
	enterProperty_list_of_arguments?: (ctx: Property_list_of_argumentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_list_of_arguments`.
	 * @param ctx the parse tree
	 */
	exitProperty_list_of_arguments?: (ctx: Property_list_of_argumentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_actual_arg`.
	 * @param ctx the parse tree
	 */
	enterProperty_actual_arg?: (ctx: Property_actual_argContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_actual_arg`.
	 * @param ctx the parse tree
	 */
	exitProperty_actual_arg?: (ctx: Property_actual_argContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assertion_item_declaration`.
	 * @param ctx the parse tree
	 */
	enterAssertion_item_declaration?: (ctx: Assertion_item_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assertion_item_declaration`.
	 * @param ctx the parse tree
	 */
	exitAssertion_item_declaration?: (ctx: Assertion_item_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_declaration`.
	 * @param ctx the parse tree
	 */
	enterProperty_declaration?: (ctx: Property_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_declaration`.
	 * @param ctx the parse tree
	 */
	exitProperty_declaration?: (ctx: Property_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_port_list`.
	 * @param ctx the parse tree
	 */
	enterProperty_port_list?: (ctx: Property_port_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_port_list`.
	 * @param ctx the parse tree
	 */
	exitProperty_port_list?: (ctx: Property_port_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_port_item`.
	 * @param ctx the parse tree
	 */
	enterProperty_port_item?: (ctx: Property_port_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_port_item`.
	 * @param ctx the parse tree
	 */
	exitProperty_port_item?: (ctx: Property_port_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_lvar_port_direction`.
	 * @param ctx the parse tree
	 */
	enterProperty_lvar_port_direction?: (ctx: Property_lvar_port_directionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_lvar_port_direction`.
	 * @param ctx the parse tree
	 */
	exitProperty_lvar_port_direction?: (ctx: Property_lvar_port_directionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_formal_type`.
	 * @param ctx the parse tree
	 */
	enterProperty_formal_type?: (ctx: Property_formal_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_formal_type`.
	 * @param ctx the parse tree
	 */
	exitProperty_formal_type?: (ctx: Property_formal_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_spec`.
	 * @param ctx the parse tree
	 */
	enterProperty_spec?: (ctx: Property_specContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_spec`.
	 * @param ctx the parse tree
	 */
	exitProperty_spec?: (ctx: Property_specContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_expr`.
	 * @param ctx the parse tree
	 */
	enterProperty_expr?: (ctx: Property_exprContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_expr`.
	 * @param ctx the parse tree
	 */
	exitProperty_expr?: (ctx: Property_exprContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_case_item`.
	 * @param ctx the parse tree
	 */
	enterProperty_case_item?: (ctx: Property_case_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_case_item`.
	 * @param ctx the parse tree
	 */
	exitProperty_case_item?: (ctx: Property_case_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_declaration`.
	 * @param ctx the parse tree
	 */
	enterSequence_declaration?: (ctx: Sequence_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_declaration`.
	 * @param ctx the parse tree
	 */
	exitSequence_declaration?: (ctx: Sequence_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_port_list`.
	 * @param ctx the parse tree
	 */
	enterSequence_port_list?: (ctx: Sequence_port_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_port_list`.
	 * @param ctx the parse tree
	 */
	exitSequence_port_list?: (ctx: Sequence_port_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_port_item`.
	 * @param ctx the parse tree
	 */
	enterSequence_port_item?: (ctx: Sequence_port_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_port_item`.
	 * @param ctx the parse tree
	 */
	exitSequence_port_item?: (ctx: Sequence_port_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_lvar_port_direction`.
	 * @param ctx the parse tree
	 */
	enterSequence_lvar_port_direction?: (ctx: Sequence_lvar_port_directionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_lvar_port_direction`.
	 * @param ctx the parse tree
	 */
	exitSequence_lvar_port_direction?: (ctx: Sequence_lvar_port_directionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_formal_type`.
	 * @param ctx the parse tree
	 */
	enterSequence_formal_type?: (ctx: Sequence_formal_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_formal_type`.
	 * @param ctx the parse tree
	 */
	exitSequence_formal_type?: (ctx: Sequence_formal_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_expr`.
	 * @param ctx the parse tree
	 */
	enterSequence_expr?: (ctx: Sequence_exprContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_expr`.
	 * @param ctx the parse tree
	 */
	exitSequence_expr?: (ctx: Sequence_exprContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cycle_delay_range`.
	 * @param ctx the parse tree
	 */
	enterCycle_delay_range?: (ctx: Cycle_delay_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cycle_delay_range`.
	 * @param ctx the parse tree
	 */
	exitCycle_delay_range?: (ctx: Cycle_delay_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_method_call`.
	 * @param ctx the parse tree
	 */
	enterSequence_method_call?: (ctx: Sequence_method_callContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_method_call`.
	 * @param ctx the parse tree
	 */
	exitSequence_method_call?: (ctx: Sequence_method_callContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_match_item`.
	 * @param ctx the parse tree
	 */
	enterSequence_match_item?: (ctx: Sequence_match_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_match_item`.
	 * @param ctx the parse tree
	 */
	exitSequence_match_item?: (ctx: Sequence_match_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_instance`.
	 * @param ctx the parse tree
	 */
	enterSequence_instance?: (ctx: Sequence_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_instance`.
	 * @param ctx the parse tree
	 */
	exitSequence_instance?: (ctx: Sequence_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_list_of_arguments`.
	 * @param ctx the parse tree
	 */
	enterSequence_list_of_arguments?: (ctx: Sequence_list_of_argumentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_list_of_arguments`.
	 * @param ctx the parse tree
	 */
	exitSequence_list_of_arguments?: (ctx: Sequence_list_of_argumentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_actual_arg`.
	 * @param ctx the parse tree
	 */
	enterSequence_actual_arg?: (ctx: Sequence_actual_argContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_actual_arg`.
	 * @param ctx the parse tree
	 */
	exitSequence_actual_arg?: (ctx: Sequence_actual_argContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.boolean_abbrev`.
	 * @param ctx the parse tree
	 */
	enterBoolean_abbrev?: (ctx: Boolean_abbrevContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.boolean_abbrev`.
	 * @param ctx the parse tree
	 */
	exitBoolean_abbrev?: (ctx: Boolean_abbrevContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_abbrev`.
	 * @param ctx the parse tree
	 */
	enterSequence_abbrev?: (ctx: Sequence_abbrevContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_abbrev`.
	 * @param ctx the parse tree
	 */
	exitSequence_abbrev?: (ctx: Sequence_abbrevContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.consecutive_repetition`.
	 * @param ctx the parse tree
	 */
	enterConsecutive_repetition?: (ctx: Consecutive_repetitionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.consecutive_repetition`.
	 * @param ctx the parse tree
	 */
	exitConsecutive_repetition?: (ctx: Consecutive_repetitionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.non_consecutive_repetition`.
	 * @param ctx the parse tree
	 */
	enterNon_consecutive_repetition?: (ctx: Non_consecutive_repetitionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.non_consecutive_repetition`.
	 * @param ctx the parse tree
	 */
	exitNon_consecutive_repetition?: (ctx: Non_consecutive_repetitionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.goto_repetition`.
	 * @param ctx the parse tree
	 */
	enterGoto_repetition?: (ctx: Goto_repetitionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.goto_repetition`.
	 * @param ctx the parse tree
	 */
	exitGoto_repetition?: (ctx: Goto_repetitionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.const_or_range_expression`.
	 * @param ctx the parse tree
	 */
	enterConst_or_range_expression?: (ctx: Const_or_range_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.const_or_range_expression`.
	 * @param ctx the parse tree
	 */
	exitConst_or_range_expression?: (ctx: Const_or_range_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cycle_delay_const_range_expression`.
	 * @param ctx the parse tree
	 */
	enterCycle_delay_const_range_expression?: (ctx: Cycle_delay_const_range_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cycle_delay_const_range_expression`.
	 * @param ctx the parse tree
	 */
	exitCycle_delay_const_range_expression?: (ctx: Cycle_delay_const_range_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.expression_or_dist`.
	 * @param ctx the parse tree
	 */
	enterExpression_or_dist?: (ctx: Expression_or_distContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.expression_or_dist`.
	 * @param ctx the parse tree
	 */
	exitExpression_or_dist?: (ctx: Expression_or_distContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assertion_variable_declaration`.
	 * @param ctx the parse tree
	 */
	enterAssertion_variable_declaration?: (ctx: Assertion_variable_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assertion_variable_declaration`.
	 * @param ctx the parse tree
	 */
	exitAssertion_variable_declaration?: (ctx: Assertion_variable_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.covergroup_declaration`.
	 * @param ctx the parse tree
	 */
	enterCovergroup_declaration?: (ctx: Covergroup_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.covergroup_declaration`.
	 * @param ctx the parse tree
	 */
	exitCovergroup_declaration?: (ctx: Covergroup_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.coverage_spec_or_option`.
	 * @param ctx the parse tree
	 */
	enterCoverage_spec_or_option?: (ctx: Coverage_spec_or_optionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.coverage_spec_or_option`.
	 * @param ctx the parse tree
	 */
	exitCoverage_spec_or_option?: (ctx: Coverage_spec_or_optionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.coverage_option`.
	 * @param ctx the parse tree
	 */
	enterCoverage_option?: (ctx: Coverage_optionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.coverage_option`.
	 * @param ctx the parse tree
	 */
	exitCoverage_option?: (ctx: Coverage_optionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.coverage_spec`.
	 * @param ctx the parse tree
	 */
	enterCoverage_spec?: (ctx: Coverage_specContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.coverage_spec`.
	 * @param ctx the parse tree
	 */
	exitCoverage_spec?: (ctx: Coverage_specContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.coverage_event`.
	 * @param ctx the parse tree
	 */
	enterCoverage_event?: (ctx: Coverage_eventContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.coverage_event`.
	 * @param ctx the parse tree
	 */
	exitCoverage_event?: (ctx: Coverage_eventContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.block_event_expression`.
	 * @param ctx the parse tree
	 */
	enterBlock_event_expression?: (ctx: Block_event_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.block_event_expression`.
	 * @param ctx the parse tree
	 */
	exitBlock_event_expression?: (ctx: Block_event_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_btf_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_btf_identifier?: (ctx: Hierarchical_btf_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_btf_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_btf_identifier?: (ctx: Hierarchical_btf_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cover_point`.
	 * @param ctx the parse tree
	 */
	enterCover_point?: (ctx: Cover_pointContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cover_point`.
	 * @param ctx the parse tree
	 */
	exitCover_point?: (ctx: Cover_pointContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bins_or_empty`.
	 * @param ctx the parse tree
	 */
	enterBins_or_empty?: (ctx: Bins_or_emptyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bins_or_empty`.
	 * @param ctx the parse tree
	 */
	exitBins_or_empty?: (ctx: Bins_or_emptyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bins_or_options`.
	 * @param ctx the parse tree
	 */
	enterBins_or_options?: (ctx: Bins_or_optionsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bins_or_options`.
	 * @param ctx the parse tree
	 */
	exitBins_or_options?: (ctx: Bins_or_optionsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bins_keyword`.
	 * @param ctx the parse tree
	 */
	enterBins_keyword?: (ctx: Bins_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bins_keyword`.
	 * @param ctx the parse tree
	 */
	exitBins_keyword?: (ctx: Bins_keywordContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.trans_list`.
	 * @param ctx the parse tree
	 */
	enterTrans_list?: (ctx: Trans_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.trans_list`.
	 * @param ctx the parse tree
	 */
	exitTrans_list?: (ctx: Trans_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.trans_set`.
	 * @param ctx the parse tree
	 */
	enterTrans_set?: (ctx: Trans_setContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.trans_set`.
	 * @param ctx the parse tree
	 */
	exitTrans_set?: (ctx: Trans_setContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.trans_range_list`.
	 * @param ctx the parse tree
	 */
	enterTrans_range_list?: (ctx: Trans_range_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.trans_range_list`.
	 * @param ctx the parse tree
	 */
	exitTrans_range_list?: (ctx: Trans_range_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.trans_item`.
	 * @param ctx the parse tree
	 */
	enterTrans_item?: (ctx: Trans_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.trans_item`.
	 * @param ctx the parse tree
	 */
	exitTrans_item?: (ctx: Trans_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.repeat_range`.
	 * @param ctx the parse tree
	 */
	enterRepeat_range?: (ctx: Repeat_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.repeat_range`.
	 * @param ctx the parse tree
	 */
	exitRepeat_range?: (ctx: Repeat_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cover_cross`.
	 * @param ctx the parse tree
	 */
	enterCover_cross?: (ctx: Cover_crossContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cover_cross`.
	 * @param ctx the parse tree
	 */
	exitCover_cross?: (ctx: Cover_crossContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_cross_items`.
	 * @param ctx the parse tree
	 */
	enterList_of_cross_items?: (ctx: List_of_cross_itemsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_cross_items`.
	 * @param ctx the parse tree
	 */
	exitList_of_cross_items?: (ctx: List_of_cross_itemsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cross_item`.
	 * @param ctx the parse tree
	 */
	enterCross_item?: (ctx: Cross_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cross_item`.
	 * @param ctx the parse tree
	 */
	exitCross_item?: (ctx: Cross_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cross_body`.
	 * @param ctx the parse tree
	 */
	enterCross_body?: (ctx: Cross_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cross_body`.
	 * @param ctx the parse tree
	 */
	exitCross_body?: (ctx: Cross_bodyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cross_body_item`.
	 * @param ctx the parse tree
	 */
	enterCross_body_item?: (ctx: Cross_body_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cross_body_item`.
	 * @param ctx the parse tree
	 */
	exitCross_body_item?: (ctx: Cross_body_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bins_selection_or_option`.
	 * @param ctx the parse tree
	 */
	enterBins_selection_or_option?: (ctx: Bins_selection_or_optionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bins_selection_or_option`.
	 * @param ctx the parse tree
	 */
	exitBins_selection_or_option?: (ctx: Bins_selection_or_optionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bins_selection`.
	 * @param ctx the parse tree
	 */
	enterBins_selection?: (ctx: Bins_selectionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bins_selection`.
	 * @param ctx the parse tree
	 */
	exitBins_selection?: (ctx: Bins_selectionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.select_expression`.
	 * @param ctx the parse tree
	 */
	enterSelect_expression?: (ctx: Select_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.select_expression`.
	 * @param ctx the parse tree
	 */
	exitSelect_expression?: (ctx: Select_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.select_condition`.
	 * @param ctx the parse tree
	 */
	enterSelect_condition?: (ctx: Select_conditionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.select_condition`.
	 * @param ctx the parse tree
	 */
	exitSelect_condition?: (ctx: Select_conditionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bins_expression`.
	 * @param ctx the parse tree
	 */
	enterBins_expression?: (ctx: Bins_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bins_expression`.
	 * @param ctx the parse tree
	 */
	exitBins_expression?: (ctx: Bins_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.covergroup_range_list`.
	 * @param ctx the parse tree
	 */
	enterCovergroup_range_list?: (ctx: Covergroup_range_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.covergroup_range_list`.
	 * @param ctx the parse tree
	 */
	exitCovergroup_range_list?: (ctx: Covergroup_range_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.covergroup_value_range`.
	 * @param ctx the parse tree
	 */
	enterCovergroup_value_range?: (ctx: Covergroup_value_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.covergroup_value_range`.
	 * @param ctx the parse tree
	 */
	exitCovergroup_value_range?: (ctx: Covergroup_value_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.with_covergroup_expression`.
	 * @param ctx the parse tree
	 */
	enterWith_covergroup_expression?: (ctx: With_covergroup_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.with_covergroup_expression`.
	 * @param ctx the parse tree
	 */
	exitWith_covergroup_expression?: (ctx: With_covergroup_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.set_covergroup_expression`.
	 * @param ctx the parse tree
	 */
	enterSet_covergroup_expression?: (ctx: Set_covergroup_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.set_covergroup_expression`.
	 * @param ctx the parse tree
	 */
	exitSet_covergroup_expression?: (ctx: Set_covergroup_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.integer_covergroup_expression`.
	 * @param ctx the parse tree
	 */
	enterInteger_covergroup_expression?: (ctx: Integer_covergroup_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.integer_covergroup_expression`.
	 * @param ctx the parse tree
	 */
	exitInteger_covergroup_expression?: (ctx: Integer_covergroup_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cross_set_expression`.
	 * @param ctx the parse tree
	 */
	enterCross_set_expression?: (ctx: Cross_set_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cross_set_expression`.
	 * @param ctx the parse tree
	 */
	exitCross_set_expression?: (ctx: Cross_set_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.covergroup_expression`.
	 * @param ctx the parse tree
	 */
	enterCovergroup_expression?: (ctx: Covergroup_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.covergroup_expression`.
	 * @param ctx the parse tree
	 */
	exitCovergroup_expression?: (ctx: Covergroup_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.let_declaration`.
	 * @param ctx the parse tree
	 */
	enterLet_declaration?: (ctx: Let_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.let_declaration`.
	 * @param ctx the parse tree
	 */
	exitLet_declaration?: (ctx: Let_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.let_identifier`.
	 * @param ctx the parse tree
	 */
	enterLet_identifier?: (ctx: Let_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.let_identifier`.
	 * @param ctx the parse tree
	 */
	exitLet_identifier?: (ctx: Let_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.let_port_list`.
	 * @param ctx the parse tree
	 */
	enterLet_port_list?: (ctx: Let_port_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.let_port_list`.
	 * @param ctx the parse tree
	 */
	exitLet_port_list?: (ctx: Let_port_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.let_port_item`.
	 * @param ctx the parse tree
	 */
	enterLet_port_item?: (ctx: Let_port_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.let_port_item`.
	 * @param ctx the parse tree
	 */
	exitLet_port_item?: (ctx: Let_port_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.let_formal_type`.
	 * @param ctx the parse tree
	 */
	enterLet_formal_type?: (ctx: Let_formal_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.let_formal_type`.
	 * @param ctx the parse tree
	 */
	exitLet_formal_type?: (ctx: Let_formal_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.let_expression`.
	 * @param ctx the parse tree
	 */
	enterLet_expression?: (ctx: Let_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.let_expression`.
	 * @param ctx the parse tree
	 */
	exitLet_expression?: (ctx: Let_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.let_list_of_arguments`.
	 * @param ctx the parse tree
	 */
	enterLet_list_of_arguments?: (ctx: Let_list_of_argumentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.let_list_of_arguments`.
	 * @param ctx the parse tree
	 */
	exitLet_list_of_arguments?: (ctx: Let_list_of_argumentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.let_actual_arg`.
	 * @param ctx the parse tree
	 */
	enterLet_actual_arg?: (ctx: Let_actual_argContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.let_actual_arg`.
	 * @param ctx the parse tree
	 */
	exitLet_actual_arg?: (ctx: Let_actual_argContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.gate_instantiation`.
	 * @param ctx the parse tree
	 */
	enterGate_instantiation?: (ctx: Gate_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.gate_instantiation`.
	 * @param ctx the parse tree
	 */
	exitGate_instantiation?: (ctx: Gate_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cmos_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterCmos_switch_instance?: (ctx: Cmos_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cmos_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitCmos_switch_instance?: (ctx: Cmos_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.enable_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterEnable_gate_instance?: (ctx: Enable_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.enable_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitEnable_gate_instance?: (ctx: Enable_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.mos_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterMos_switch_instance?: (ctx: Mos_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.mos_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitMos_switch_instance?: (ctx: Mos_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.n_input_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterN_input_gate_instance?: (ctx: N_input_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.n_input_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitN_input_gate_instance?: (ctx: N_input_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.n_output_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterN_output_gate_instance?: (ctx: N_output_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.n_output_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitN_output_gate_instance?: (ctx: N_output_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.pass_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterPass_switch_instance?: (ctx: Pass_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.pass_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitPass_switch_instance?: (ctx: Pass_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 */
	enterPass_enable_switch_instance?: (ctx: Pass_enable_switch_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.pass_enable_switch_instance`.
	 * @param ctx the parse tree
	 */
	exitPass_enable_switch_instance?: (ctx: Pass_enable_switch_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.pull_gate_instance`.
	 * @param ctx the parse tree
	 */
	enterPull_gate_instance?: (ctx: Pull_gate_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.pull_gate_instance`.
	 * @param ctx the parse tree
	 */
	exitPull_gate_instance?: (ctx: Pull_gate_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.pulldown_strength`.
	 * @param ctx the parse tree
	 */
	enterPulldown_strength?: (ctx: Pulldown_strengthContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.pulldown_strength`.
	 * @param ctx the parse tree
	 */
	exitPulldown_strength?: (ctx: Pulldown_strengthContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.pullup_strength`.
	 * @param ctx the parse tree
	 */
	enterPullup_strength?: (ctx: Pullup_strengthContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.pullup_strength`.
	 * @param ctx the parse tree
	 */
	exitPullup_strength?: (ctx: Pullup_strengthContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.enable_terminal`.
	 * @param ctx the parse tree
	 */
	enterEnable_terminal?: (ctx: Enable_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.enable_terminal`.
	 * @param ctx the parse tree
	 */
	exitEnable_terminal?: (ctx: Enable_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.inout_terminal`.
	 * @param ctx the parse tree
	 */
	enterInout_terminal?: (ctx: Inout_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.inout_terminal`.
	 * @param ctx the parse tree
	 */
	exitInout_terminal?: (ctx: Inout_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.input_terminal`.
	 * @param ctx the parse tree
	 */
	enterInput_terminal?: (ctx: Input_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.input_terminal`.
	 * @param ctx the parse tree
	 */
	exitInput_terminal?: (ctx: Input_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ncontrol_terminal`.
	 * @param ctx the parse tree
	 */
	enterNcontrol_terminal?: (ctx: Ncontrol_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ncontrol_terminal`.
	 * @param ctx the parse tree
	 */
	exitNcontrol_terminal?: (ctx: Ncontrol_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.output_terminal`.
	 * @param ctx the parse tree
	 */
	enterOutput_terminal?: (ctx: Output_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.output_terminal`.
	 * @param ctx the parse tree
	 */
	exitOutput_terminal?: (ctx: Output_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.pcontrol_terminal`.
	 * @param ctx the parse tree
	 */
	enterPcontrol_terminal?: (ctx: Pcontrol_terminalContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.pcontrol_terminal`.
	 * @param ctx the parse tree
	 */
	exitPcontrol_terminal?: (ctx: Pcontrol_terminalContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cmos_switchtype`.
	 * @param ctx the parse tree
	 */
	enterCmos_switchtype?: (ctx: Cmos_switchtypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cmos_switchtype`.
	 * @param ctx the parse tree
	 */
	exitCmos_switchtype?: (ctx: Cmos_switchtypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.enable_gatetype`.
	 * @param ctx the parse tree
	 */
	enterEnable_gatetype?: (ctx: Enable_gatetypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.enable_gatetype`.
	 * @param ctx the parse tree
	 */
	exitEnable_gatetype?: (ctx: Enable_gatetypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.mos_switchtype`.
	 * @param ctx the parse tree
	 */
	enterMos_switchtype?: (ctx: Mos_switchtypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.mos_switchtype`.
	 * @param ctx the parse tree
	 */
	exitMos_switchtype?: (ctx: Mos_switchtypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.n_input_gatetype`.
	 * @param ctx the parse tree
	 */
	enterN_input_gatetype?: (ctx: N_input_gatetypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.n_input_gatetype`.
	 * @param ctx the parse tree
	 */
	exitN_input_gatetype?: (ctx: N_input_gatetypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.n_output_gatetype`.
	 * @param ctx the parse tree
	 */
	enterN_output_gatetype?: (ctx: N_output_gatetypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.n_output_gatetype`.
	 * @param ctx the parse tree
	 */
	exitN_output_gatetype?: (ctx: N_output_gatetypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.pass_en_switchtype`.
	 * @param ctx the parse tree
	 */
	enterPass_en_switchtype?: (ctx: Pass_en_switchtypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.pass_en_switchtype`.
	 * @param ctx the parse tree
	 */
	exitPass_en_switchtype?: (ctx: Pass_en_switchtypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.pass_switchtype`.
	 * @param ctx the parse tree
	 */
	enterPass_switchtype?: (ctx: Pass_switchtypeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.pass_switchtype`.
	 * @param ctx the parse tree
	 */
	exitPass_switchtype?: (ctx: Pass_switchtypeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_instantiation`.
	 * @param ctx the parse tree
	 */
	enterModule_instantiation?: (ctx: Module_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_instantiation`.
	 * @param ctx the parse tree
	 */
	exitModule_instantiation?: (ctx: Module_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.parameter_value_assignment`.
	 * @param ctx the parse tree
	 */
	enterParameter_value_assignment?: (ctx: Parameter_value_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.parameter_value_assignment`.
	 * @param ctx the parse tree
	 */
	exitParameter_value_assignment?: (ctx: Parameter_value_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_parameter_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_parameter_assignments?: (ctx: List_of_parameter_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_parameter_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_parameter_assignments?: (ctx: List_of_parameter_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ordered_parameter_assignment`.
	 * @param ctx the parse tree
	 */
	enterOrdered_parameter_assignment?: (ctx: Ordered_parameter_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ordered_parameter_assignment`.
	 * @param ctx the parse tree
	 */
	exitOrdered_parameter_assignment?: (ctx: Ordered_parameter_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.named_parameter_assignment`.
	 * @param ctx the parse tree
	 */
	enterNamed_parameter_assignment?: (ctx: Named_parameter_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.named_parameter_assignment`.
	 * @param ctx the parse tree
	 */
	exitNamed_parameter_assignment?: (ctx: Named_parameter_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_instance`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_instance?: (ctx: Hierarchical_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_instance`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_instance?: (ctx: Hierarchical_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.name_of_instance`.
	 * @param ctx the parse tree
	 */
	enterName_of_instance?: (ctx: Name_of_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.name_of_instance`.
	 * @param ctx the parse tree
	 */
	exitName_of_instance?: (ctx: Name_of_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_port_connections`.
	 * @param ctx the parse tree
	 */
	enterList_of_port_connections?: (ctx: List_of_port_connectionsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_port_connections`.
	 * @param ctx the parse tree
	 */
	exitList_of_port_connections?: (ctx: List_of_port_connectionsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ordered_port_connection`.
	 * @param ctx the parse tree
	 */
	enterOrdered_port_connection?: (ctx: Ordered_port_connectionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ordered_port_connection`.
	 * @param ctx the parse tree
	 */
	exitOrdered_port_connection?: (ctx: Ordered_port_connectionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.named_port_connection`.
	 * @param ctx the parse tree
	 */
	enterNamed_port_connection?: (ctx: Named_port_connectionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.named_port_connection`.
	 * @param ctx the parse tree
	 */
	exitNamed_port_connection?: (ctx: Named_port_connectionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_instantiation`.
	 * @param ctx the parse tree
	 */
	enterInterface_instantiation?: (ctx: Interface_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_instantiation`.
	 * @param ctx the parse tree
	 */
	exitInterface_instantiation?: (ctx: Interface_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.program_instantiation`.
	 * @param ctx the parse tree
	 */
	enterProgram_instantiation?: (ctx: Program_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.program_instantiation`.
	 * @param ctx the parse tree
	 */
	exitProgram_instantiation?: (ctx: Program_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.checker_instantiation`.
	 * @param ctx the parse tree
	 */
	enterChecker_instantiation?: (ctx: Checker_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.checker_instantiation`.
	 * @param ctx the parse tree
	 */
	exitChecker_instantiation?: (ctx: Checker_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_checker_port_connections`.
	 * @param ctx the parse tree
	 */
	enterList_of_checker_port_connections?: (ctx: List_of_checker_port_connectionsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_checker_port_connections`.
	 * @param ctx the parse tree
	 */
	exitList_of_checker_port_connections?: (ctx: List_of_checker_port_connectionsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ordered_checker_port_connection`.
	 * @param ctx the parse tree
	 */
	enterOrdered_checker_port_connection?: (ctx: Ordered_checker_port_connectionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ordered_checker_port_connection`.
	 * @param ctx the parse tree
	 */
	exitOrdered_checker_port_connection?: (ctx: Ordered_checker_port_connectionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.named_checker_port_connection`.
	 * @param ctx the parse tree
	 */
	enterNamed_checker_port_connection?: (ctx: Named_checker_port_connectionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.named_checker_port_connection`.
	 * @param ctx the parse tree
	 */
	exitNamed_checker_port_connection?: (ctx: Named_checker_port_connectionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.generate_region`.
	 * @param ctx the parse tree
	 */
	enterGenerate_region?: (ctx: Generate_regionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.generate_region`.
	 * @param ctx the parse tree
	 */
	exitGenerate_region?: (ctx: Generate_regionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.loop_generate_construct`.
	 * @param ctx the parse tree
	 */
	enterLoop_generate_construct?: (ctx: Loop_generate_constructContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.loop_generate_construct`.
	 * @param ctx the parse tree
	 */
	exitLoop_generate_construct?: (ctx: Loop_generate_constructContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.genvar_initialization`.
	 * @param ctx the parse tree
	 */
	enterGenvar_initialization?: (ctx: Genvar_initializationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.genvar_initialization`.
	 * @param ctx the parse tree
	 */
	exitGenvar_initialization?: (ctx: Genvar_initializationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.genvar_iteration`.
	 * @param ctx the parse tree
	 */
	enterGenvar_iteration?: (ctx: Genvar_iterationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.genvar_iteration`.
	 * @param ctx the parse tree
	 */
	exitGenvar_iteration?: (ctx: Genvar_iterationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.conditional_generate_construct`.
	 * @param ctx the parse tree
	 */
	enterConditional_generate_construct?: (ctx: Conditional_generate_constructContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.conditional_generate_construct`.
	 * @param ctx the parse tree
	 */
	exitConditional_generate_construct?: (ctx: Conditional_generate_constructContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.if_generate_construct`.
	 * @param ctx the parse tree
	 */
	enterIf_generate_construct?: (ctx: If_generate_constructContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.if_generate_construct`.
	 * @param ctx the parse tree
	 */
	exitIf_generate_construct?: (ctx: If_generate_constructContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.case_generate_construct`.
	 * @param ctx the parse tree
	 */
	enterCase_generate_construct?: (ctx: Case_generate_constructContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.case_generate_construct`.
	 * @param ctx the parse tree
	 */
	exitCase_generate_construct?: (ctx: Case_generate_constructContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.case_generate_item`.
	 * @param ctx the parse tree
	 */
	enterCase_generate_item?: (ctx: Case_generate_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.case_generate_item`.
	 * @param ctx the parse tree
	 */
	exitCase_generate_item?: (ctx: Case_generate_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.generate_block`.
	 * @param ctx the parse tree
	 */
	enterGenerate_block?: (ctx: Generate_blockContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.generate_block`.
	 * @param ctx the parse tree
	 */
	exitGenerate_block?: (ctx: Generate_blockContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.generate_item`.
	 * @param ctx the parse tree
	 */
	enterGenerate_item?: (ctx: Generate_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.generate_item`.
	 * @param ctx the parse tree
	 */
	exitGenerate_item?: (ctx: Generate_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_nonansi_declaration`.
	 * @param ctx the parse tree
	 */
	enterUdp_nonansi_declaration?: (ctx: Udp_nonansi_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_nonansi_declaration`.
	 * @param ctx the parse tree
	 */
	exitUdp_nonansi_declaration?: (ctx: Udp_nonansi_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_ansi_declaration`.
	 * @param ctx the parse tree
	 */
	enterUdp_ansi_declaration?: (ctx: Udp_ansi_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_ansi_declaration`.
	 * @param ctx the parse tree
	 */
	exitUdp_ansi_declaration?: (ctx: Udp_ansi_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_declaration`.
	 * @param ctx the parse tree
	 */
	enterUdp_declaration?: (ctx: Udp_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_declaration`.
	 * @param ctx the parse tree
	 */
	exitUdp_declaration?: (ctx: Udp_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_port_list`.
	 * @param ctx the parse tree
	 */
	enterUdp_port_list?: (ctx: Udp_port_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_port_list`.
	 * @param ctx the parse tree
	 */
	exitUdp_port_list?: (ctx: Udp_port_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_declaration_port_list`.
	 * @param ctx the parse tree
	 */
	enterUdp_declaration_port_list?: (ctx: Udp_declaration_port_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_declaration_port_list`.
	 * @param ctx the parse tree
	 */
	exitUdp_declaration_port_list?: (ctx: Udp_declaration_port_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_port_declaration`.
	 * @param ctx the parse tree
	 */
	enterUdp_port_declaration?: (ctx: Udp_port_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_port_declaration`.
	 * @param ctx the parse tree
	 */
	exitUdp_port_declaration?: (ctx: Udp_port_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_output_declaration`.
	 * @param ctx the parse tree
	 */
	enterUdp_output_declaration?: (ctx: Udp_output_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_output_declaration`.
	 * @param ctx the parse tree
	 */
	exitUdp_output_declaration?: (ctx: Udp_output_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_input_declaration`.
	 * @param ctx the parse tree
	 */
	enterUdp_input_declaration?: (ctx: Udp_input_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_input_declaration`.
	 * @param ctx the parse tree
	 */
	exitUdp_input_declaration?: (ctx: Udp_input_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_reg_declaration`.
	 * @param ctx the parse tree
	 */
	enterUdp_reg_declaration?: (ctx: Udp_reg_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_reg_declaration`.
	 * @param ctx the parse tree
	 */
	exitUdp_reg_declaration?: (ctx: Udp_reg_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_body`.
	 * @param ctx the parse tree
	 */
	enterUdp_body?: (ctx: Udp_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_body`.
	 * @param ctx the parse tree
	 */
	exitUdp_body?: (ctx: Udp_bodyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.combinational_body`.
	 * @param ctx the parse tree
	 */
	enterCombinational_body?: (ctx: Combinational_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.combinational_body`.
	 * @param ctx the parse tree
	 */
	exitCombinational_body?: (ctx: Combinational_bodyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.combinational_entry`.
	 * @param ctx the parse tree
	 */
	enterCombinational_entry?: (ctx: Combinational_entryContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.combinational_entry`.
	 * @param ctx the parse tree
	 */
	exitCombinational_entry?: (ctx: Combinational_entryContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequential_body`.
	 * @param ctx the parse tree
	 */
	enterSequential_body?: (ctx: Sequential_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequential_body`.
	 * @param ctx the parse tree
	 */
	exitSequential_body?: (ctx: Sequential_bodyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_initial_statement`.
	 * @param ctx the parse tree
	 */
	enterUdp_initial_statement?: (ctx: Udp_initial_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_initial_statement`.
	 * @param ctx the parse tree
	 */
	exitUdp_initial_statement?: (ctx: Udp_initial_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.init_val`.
	 * @param ctx the parse tree
	 */
	enterInit_val?: (ctx: Init_valContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.init_val`.
	 * @param ctx the parse tree
	 */
	exitInit_val?: (ctx: Init_valContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequential_entry`.
	 * @param ctx the parse tree
	 */
	enterSequential_entry?: (ctx: Sequential_entryContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequential_entry`.
	 * @param ctx the parse tree
	 */
	exitSequential_entry?: (ctx: Sequential_entryContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.seq_input_list`.
	 * @param ctx the parse tree
	 */
	enterSeq_input_list?: (ctx: Seq_input_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.seq_input_list`.
	 * @param ctx the parse tree
	 */
	exitSeq_input_list?: (ctx: Seq_input_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.level_input_list`.
	 * @param ctx the parse tree
	 */
	enterLevel_input_list?: (ctx: Level_input_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.level_input_list`.
	 * @param ctx the parse tree
	 */
	exitLevel_input_list?: (ctx: Level_input_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.edge_input_list`.
	 * @param ctx the parse tree
	 */
	enterEdge_input_list?: (ctx: Edge_input_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.edge_input_list`.
	 * @param ctx the parse tree
	 */
	exitEdge_input_list?: (ctx: Edge_input_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.edge_indicator`.
	 * @param ctx the parse tree
	 */
	enterEdge_indicator?: (ctx: Edge_indicatorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.edge_indicator`.
	 * @param ctx the parse tree
	 */
	exitEdge_indicator?: (ctx: Edge_indicatorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.current_state`.
	 * @param ctx the parse tree
	 */
	enterCurrent_state?: (ctx: Current_stateContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.current_state`.
	 * @param ctx the parse tree
	 */
	exitCurrent_state?: (ctx: Current_stateContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.next_state`.
	 * @param ctx the parse tree
	 */
	enterNext_state?: (ctx: Next_stateContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.next_state`.
	 * @param ctx the parse tree
	 */
	exitNext_state?: (ctx: Next_stateContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.output_symbol`.
	 * @param ctx the parse tree
	 */
	enterOutput_symbol?: (ctx: Output_symbolContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.output_symbol`.
	 * @param ctx the parse tree
	 */
	exitOutput_symbol?: (ctx: Output_symbolContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.level_symbol`.
	 * @param ctx the parse tree
	 */
	enterLevel_symbol?: (ctx: Level_symbolContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.level_symbol`.
	 * @param ctx the parse tree
	 */
	exitLevel_symbol?: (ctx: Level_symbolContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.edge_symbol`.
	 * @param ctx the parse tree
	 */
	enterEdge_symbol?: (ctx: Edge_symbolContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.edge_symbol`.
	 * @param ctx the parse tree
	 */
	exitEdge_symbol?: (ctx: Edge_symbolContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_instantiation`.
	 * @param ctx the parse tree
	 */
	enterUdp_instantiation?: (ctx: Udp_instantiationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_instantiation`.
	 * @param ctx the parse tree
	 */
	exitUdp_instantiation?: (ctx: Udp_instantiationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_instance`.
	 * @param ctx the parse tree
	 */
	enterUdp_instance?: (ctx: Udp_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_instance`.
	 * @param ctx the parse tree
	 */
	exitUdp_instance?: (ctx: Udp_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.continuous_assign`.
	 * @param ctx the parse tree
	 */
	enterContinuous_assign?: (ctx: Continuous_assignContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.continuous_assign`.
	 * @param ctx the parse tree
	 */
	exitContinuous_assign?: (ctx: Continuous_assignContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_net_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_net_assignments?: (ctx: List_of_net_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_net_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_net_assignments?: (ctx: List_of_net_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_variable_assignments`.
	 * @param ctx the parse tree
	 */
	enterList_of_variable_assignments?: (ctx: List_of_variable_assignmentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_variable_assignments`.
	 * @param ctx the parse tree
	 */
	exitList_of_variable_assignments?: (ctx: List_of_variable_assignmentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.net_alias`.
	 * @param ctx the parse tree
	 */
	enterNet_alias?: (ctx: Net_aliasContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.net_alias`.
	 * @param ctx the parse tree
	 */
	exitNet_alias?: (ctx: Net_aliasContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.net_assignment`.
	 * @param ctx the parse tree
	 */
	enterNet_assignment?: (ctx: Net_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.net_assignment`.
	 * @param ctx the parse tree
	 */
	exitNet_assignment?: (ctx: Net_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.initial_construct`.
	 * @param ctx the parse tree
	 */
	enterInitial_construct?: (ctx: Initial_constructContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.initial_construct`.
	 * @param ctx the parse tree
	 */
	exitInitial_construct?: (ctx: Initial_constructContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.always_construct`.
	 * @param ctx the parse tree
	 */
	enterAlways_construct?: (ctx: Always_constructContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.always_construct`.
	 * @param ctx the parse tree
	 */
	exitAlways_construct?: (ctx: Always_constructContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.always_keyword`.
	 * @param ctx the parse tree
	 */
	enterAlways_keyword?: (ctx: Always_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.always_keyword`.
	 * @param ctx the parse tree
	 */
	exitAlways_keyword?: (ctx: Always_keywordContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.final_construct`.
	 * @param ctx the parse tree
	 */
	enterFinal_construct?: (ctx: Final_constructContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.final_construct`.
	 * @param ctx the parse tree
	 */
	exitFinal_construct?: (ctx: Final_constructContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.blocking_assignment`.
	 * @param ctx the parse tree
	 */
	enterBlocking_assignment?: (ctx: Blocking_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.blocking_assignment`.
	 * @param ctx the parse tree
	 */
	exitBlocking_assignment?: (ctx: Blocking_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.operator_assignment`.
	 * @param ctx the parse tree
	 */
	enterOperator_assignment?: (ctx: Operator_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.operator_assignment`.
	 * @param ctx the parse tree
	 */
	exitOperator_assignment?: (ctx: Operator_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assignment_operator`.
	 * @param ctx the parse tree
	 */
	enterAssignment_operator?: (ctx: Assignment_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assignment_operator`.
	 * @param ctx the parse tree
	 */
	exitAssignment_operator?: (ctx: Assignment_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.nonblocking_assignment`.
	 * @param ctx the parse tree
	 */
	enterNonblocking_assignment?: (ctx: Nonblocking_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.nonblocking_assignment`.
	 * @param ctx the parse tree
	 */
	exitNonblocking_assignment?: (ctx: Nonblocking_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.procedural_continuous_assignment`.
	 * @param ctx the parse tree
	 */
	enterProcedural_continuous_assignment?: (ctx: Procedural_continuous_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.procedural_continuous_assignment`.
	 * @param ctx the parse tree
	 */
	exitProcedural_continuous_assignment?: (ctx: Procedural_continuous_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.variable_assignment`.
	 * @param ctx the parse tree
	 */
	enterVariable_assignment?: (ctx: Variable_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.variable_assignment`.
	 * @param ctx the parse tree
	 */
	exitVariable_assignment?: (ctx: Variable_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.action_block`.
	 * @param ctx the parse tree
	 */
	enterAction_block?: (ctx: Action_blockContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.action_block`.
	 * @param ctx the parse tree
	 */
	exitAction_block?: (ctx: Action_blockContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.seq_block`.
	 * @param ctx the parse tree
	 */
	enterSeq_block?: (ctx: Seq_blockContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.seq_block`.
	 * @param ctx the parse tree
	 */
	exitSeq_block?: (ctx: Seq_blockContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.par_block`.
	 * @param ctx the parse tree
	 */
	enterPar_block?: (ctx: Par_blockContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.par_block`.
	 * @param ctx the parse tree
	 */
	exitPar_block?: (ctx: Par_blockContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.join_keyword`.
	 * @param ctx the parse tree
	 */
	enterJoin_keyword?: (ctx: Join_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.join_keyword`.
	 * @param ctx the parse tree
	 */
	exitJoin_keyword?: (ctx: Join_keywordContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.statement_or_null`.
	 * @param ctx the parse tree
	 */
	enterStatement_or_null?: (ctx: Statement_or_nullContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.statement_or_null`.
	 * @param ctx the parse tree
	 */
	exitStatement_or_null?: (ctx: Statement_or_nullContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.statement_item`.
	 * @param ctx the parse tree
	 */
	enterStatement_item?: (ctx: Statement_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.statement_item`.
	 * @param ctx the parse tree
	 */
	exitStatement_item?: (ctx: Statement_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.display_tasks`.
	 * @param ctx the parse tree
	 */
	enterDisplay_tasks?: (ctx: Display_tasksContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.display_tasks`.
	 * @param ctx the parse tree
	 */
	exitDisplay_tasks?: (ctx: Display_tasksContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.display_task_name`.
	 * @param ctx the parse tree
	 */
	enterDisplay_task_name?: (ctx: Display_task_nameContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.display_task_name`.
	 * @param ctx the parse tree
	 */
	exitDisplay_task_name?: (ctx: Display_task_nameContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.monitor_tasks`.
	 * @param ctx the parse tree
	 */
	enterMonitor_tasks?: (ctx: Monitor_tasksContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.monitor_tasks`.
	 * @param ctx the parse tree
	 */
	exitMonitor_tasks?: (ctx: Monitor_tasksContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.monitor_task_name`.
	 * @param ctx the parse tree
	 */
	enterMonitor_task_name?: (ctx: Monitor_task_nameContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.monitor_task_name`.
	 * @param ctx the parse tree
	 */
	exitMonitor_task_name?: (ctx: Monitor_task_nameContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.function_statement`.
	 * @param ctx the parse tree
	 */
	enterFunction_statement?: (ctx: Function_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.function_statement`.
	 * @param ctx the parse tree
	 */
	exitFunction_statement?: (ctx: Function_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.function_statement_or_null`.
	 * @param ctx the parse tree
	 */
	enterFunction_statement_or_null?: (ctx: Function_statement_or_nullContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.function_statement_or_null`.
	 * @param ctx the parse tree
	 */
	exitFunction_statement_or_null?: (ctx: Function_statement_or_nullContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.variable_identifier_list`.
	 * @param ctx the parse tree
	 */
	enterVariable_identifier_list?: (ctx: Variable_identifier_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.variable_identifier_list`.
	 * @param ctx the parse tree
	 */
	exitVariable_identifier_list?: (ctx: Variable_identifier_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.procedural_timing_control_statement`.
	 * @param ctx the parse tree
	 */
	enterProcedural_timing_control_statement?: (ctx: Procedural_timing_control_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.procedural_timing_control_statement`.
	 * @param ctx the parse tree
	 */
	exitProcedural_timing_control_statement?: (ctx: Procedural_timing_control_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.delay_or_event_control`.
	 * @param ctx the parse tree
	 */
	enterDelay_or_event_control?: (ctx: Delay_or_event_controlContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.delay_or_event_control`.
	 * @param ctx the parse tree
	 */
	exitDelay_or_event_control?: (ctx: Delay_or_event_controlContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.delay_control`.
	 * @param ctx the parse tree
	 */
	enterDelay_control?: (ctx: Delay_controlContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.delay_control`.
	 * @param ctx the parse tree
	 */
	exitDelay_control?: (ctx: Delay_controlContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.event_control`.
	 * @param ctx the parse tree
	 */
	enterEvent_control?: (ctx: Event_controlContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.event_control`.
	 * @param ctx the parse tree
	 */
	exitEvent_control?: (ctx: Event_controlContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.event_expression`.
	 * @param ctx the parse tree
	 */
	enterEvent_expression?: (ctx: Event_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.event_expression`.
	 * @param ctx the parse tree
	 */
	exitEvent_expression?: (ctx: Event_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.procedural_timing_control`.
	 * @param ctx the parse tree
	 */
	enterProcedural_timing_control?: (ctx: Procedural_timing_controlContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.procedural_timing_control`.
	 * @param ctx the parse tree
	 */
	exitProcedural_timing_control?: (ctx: Procedural_timing_controlContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.jump_statement`.
	 * @param ctx the parse tree
	 */
	enterJump_statement?: (ctx: Jump_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.jump_statement`.
	 * @param ctx the parse tree
	 */
	exitJump_statement?: (ctx: Jump_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.wait_statement`.
	 * @param ctx the parse tree
	 */
	enterWait_statement?: (ctx: Wait_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.wait_statement`.
	 * @param ctx the parse tree
	 */
	exitWait_statement?: (ctx: Wait_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.event_trigger`.
	 * @param ctx the parse tree
	 */
	enterEvent_trigger?: (ctx: Event_triggerContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.event_trigger`.
	 * @param ctx the parse tree
	 */
	exitEvent_trigger?: (ctx: Event_triggerContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.disable_statement`.
	 * @param ctx the parse tree
	 */
	enterDisable_statement?: (ctx: Disable_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.disable_statement`.
	 * @param ctx the parse tree
	 */
	exitDisable_statement?: (ctx: Disable_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.conditional_statement`.
	 * @param ctx the parse tree
	 */
	enterConditional_statement?: (ctx: Conditional_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.conditional_statement`.
	 * @param ctx the parse tree
	 */
	exitConditional_statement?: (ctx: Conditional_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.unique_priority`.
	 * @param ctx the parse tree
	 */
	enterUnique_priority?: (ctx: Unique_priorityContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.unique_priority`.
	 * @param ctx the parse tree
	 */
	exitUnique_priority?: (ctx: Unique_priorityContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cond_predicate`.
	 * @param ctx the parse tree
	 */
	enterCond_predicate?: (ctx: Cond_predicateContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cond_predicate`.
	 * @param ctx the parse tree
	 */
	exitCond_predicate?: (ctx: Cond_predicateContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.case_statement`.
	 * @param ctx the parse tree
	 */
	enterCase_statement?: (ctx: Case_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.case_statement`.
	 * @param ctx the parse tree
	 */
	exitCase_statement?: (ctx: Case_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.case_keyword`.
	 * @param ctx the parse tree
	 */
	enterCase_keyword?: (ctx: Case_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.case_keyword`.
	 * @param ctx the parse tree
	 */
	exitCase_keyword?: (ctx: Case_keywordContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.case_expression`.
	 * @param ctx the parse tree
	 */
	enterCase_expression?: (ctx: Case_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.case_expression`.
	 * @param ctx the parse tree
	 */
	exitCase_expression?: (ctx: Case_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.case_item`.
	 * @param ctx the parse tree
	 */
	enterCase_item?: (ctx: Case_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.case_item`.
	 * @param ctx the parse tree
	 */
	exitCase_item?: (ctx: Case_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.case_pattern_item`.
	 * @param ctx the parse tree
	 */
	enterCase_pattern_item?: (ctx: Case_pattern_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.case_pattern_item`.
	 * @param ctx the parse tree
	 */
	exitCase_pattern_item?: (ctx: Case_pattern_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.case_inside_item`.
	 * @param ctx the parse tree
	 */
	enterCase_inside_item?: (ctx: Case_inside_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.case_inside_item`.
	 * @param ctx the parse tree
	 */
	exitCase_inside_item?: (ctx: Case_inside_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.case_item_expression`.
	 * @param ctx the parse tree
	 */
	enterCase_item_expression?: (ctx: Case_item_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.case_item_expression`.
	 * @param ctx the parse tree
	 */
	exitCase_item_expression?: (ctx: Case_item_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.randcase_statement`.
	 * @param ctx the parse tree
	 */
	enterRandcase_statement?: (ctx: Randcase_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.randcase_statement`.
	 * @param ctx the parse tree
	 */
	exitRandcase_statement?: (ctx: Randcase_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.randcase_item`.
	 * @param ctx the parse tree
	 */
	enterRandcase_item?: (ctx: Randcase_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.randcase_item`.
	 * @param ctx the parse tree
	 */
	exitRandcase_item?: (ctx: Randcase_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.open_range_list`.
	 * @param ctx the parse tree
	 */
	enterOpen_range_list?: (ctx: Open_range_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.open_range_list`.
	 * @param ctx the parse tree
	 */
	exitOpen_range_list?: (ctx: Open_range_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.open_value_range`.
	 * @param ctx the parse tree
	 */
	enterOpen_value_range?: (ctx: Open_value_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.open_value_range`.
	 * @param ctx the parse tree
	 */
	exitOpen_value_range?: (ctx: Open_value_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.pattern`.
	 * @param ctx the parse tree
	 */
	enterPattern?: (ctx: PatternContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.pattern`.
	 * @param ctx the parse tree
	 */
	exitPattern?: (ctx: PatternContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assignment_pattern`.
	 * @param ctx the parse tree
	 */
	enterAssignment_pattern?: (ctx: Assignment_patternContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assignment_pattern`.
	 * @param ctx the parse tree
	 */
	exitAssignment_pattern?: (ctx: Assignment_patternContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.structure_pattern_key`.
	 * @param ctx the parse tree
	 */
	enterStructure_pattern_key?: (ctx: Structure_pattern_keyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.structure_pattern_key`.
	 * @param ctx the parse tree
	 */
	exitStructure_pattern_key?: (ctx: Structure_pattern_keyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.array_pattern_key`.
	 * @param ctx the parse tree
	 */
	enterArray_pattern_key?: (ctx: Array_pattern_keyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.array_pattern_key`.
	 * @param ctx the parse tree
	 */
	exitArray_pattern_key?: (ctx: Array_pattern_keyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assignment_pattern_key`.
	 * @param ctx the parse tree
	 */
	enterAssignment_pattern_key?: (ctx: Assignment_pattern_keyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assignment_pattern_key`.
	 * @param ctx the parse tree
	 */
	exitAssignment_pattern_key?: (ctx: Assignment_pattern_keyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assignment_pattern_expression`.
	 * @param ctx the parse tree
	 */
	enterAssignment_pattern_expression?: (ctx: Assignment_pattern_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assignment_pattern_expression`.
	 * @param ctx the parse tree
	 */
	exitAssignment_pattern_expression?: (ctx: Assignment_pattern_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assignment_pattern_expression_type`.
	 * @param ctx the parse tree
	 */
	enterAssignment_pattern_expression_type?: (ctx: Assignment_pattern_expression_typeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assignment_pattern_expression_type`.
	 * @param ctx the parse tree
	 */
	exitAssignment_pattern_expression_type?: (ctx: Assignment_pattern_expression_typeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_assignment_pattern_expression`.
	 * @param ctx the parse tree
	 */
	enterConstant_assignment_pattern_expression?: (ctx: Constant_assignment_pattern_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_assignment_pattern_expression`.
	 * @param ctx the parse tree
	 */
	exitConstant_assignment_pattern_expression?: (ctx: Constant_assignment_pattern_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assignment_pattern_net_lvalue`.
	 * @param ctx the parse tree
	 */
	enterAssignment_pattern_net_lvalue?: (ctx: Assignment_pattern_net_lvalueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assignment_pattern_net_lvalue`.
	 * @param ctx the parse tree
	 */
	exitAssignment_pattern_net_lvalue?: (ctx: Assignment_pattern_net_lvalueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assignment_pattern_variable_lvalue`.
	 * @param ctx the parse tree
	 */
	enterAssignment_pattern_variable_lvalue?: (ctx: Assignment_pattern_variable_lvalueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assignment_pattern_variable_lvalue`.
	 * @param ctx the parse tree
	 */
	exitAssignment_pattern_variable_lvalue?: (ctx: Assignment_pattern_variable_lvalueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.loop_statement`.
	 * @param ctx the parse tree
	 */
	enterLoop_statement?: (ctx: Loop_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.loop_statement`.
	 * @param ctx the parse tree
	 */
	exitLoop_statement?: (ctx: Loop_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.for_initialization`.
	 * @param ctx the parse tree
	 */
	enterFor_initialization?: (ctx: For_initializationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.for_initialization`.
	 * @param ctx the parse tree
	 */
	exitFor_initialization?: (ctx: For_initializationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.for_variable_declaration`.
	 * @param ctx the parse tree
	 */
	enterFor_variable_declaration?: (ctx: For_variable_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.for_variable_declaration`.
	 * @param ctx the parse tree
	 */
	exitFor_variable_declaration?: (ctx: For_variable_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.for_step`.
	 * @param ctx the parse tree
	 */
	enterFor_step?: (ctx: For_stepContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.for_step`.
	 * @param ctx the parse tree
	 */
	exitFor_step?: (ctx: For_stepContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.for_step_assignment`.
	 * @param ctx the parse tree
	 */
	enterFor_step_assignment?: (ctx: For_step_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.for_step_assignment`.
	 * @param ctx the parse tree
	 */
	exitFor_step_assignment?: (ctx: For_step_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.loop_variables`.
	 * @param ctx the parse tree
	 */
	enterLoop_variables?: (ctx: Loop_variablesContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.loop_variables`.
	 * @param ctx the parse tree
	 */
	exitLoop_variables?: (ctx: Loop_variablesContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.subroutine_call_statement`.
	 * @param ctx the parse tree
	 */
	enterSubroutine_call_statement?: (ctx: Subroutine_call_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.subroutine_call_statement`.
	 * @param ctx the parse tree
	 */
	exitSubroutine_call_statement?: (ctx: Subroutine_call_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.assertion_item`.
	 * @param ctx the parse tree
	 */
	enterAssertion_item?: (ctx: Assertion_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.assertion_item`.
	 * @param ctx the parse tree
	 */
	exitAssertion_item?: (ctx: Assertion_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.deferred_immediate_assertion_item`.
	 * @param ctx the parse tree
	 */
	enterDeferred_immediate_assertion_item?: (ctx: Deferred_immediate_assertion_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.deferred_immediate_assertion_item`.
	 * @param ctx the parse tree
	 */
	exitDeferred_immediate_assertion_item?: (ctx: Deferred_immediate_assertion_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.procedural_assertion_statement`.
	 * @param ctx the parse tree
	 */
	enterProcedural_assertion_statement?: (ctx: Procedural_assertion_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.procedural_assertion_statement`.
	 * @param ctx the parse tree
	 */
	exitProcedural_assertion_statement?: (ctx: Procedural_assertion_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.immediate_assertion_statement`.
	 * @param ctx the parse tree
	 */
	enterImmediate_assertion_statement?: (ctx: Immediate_assertion_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.immediate_assertion_statement`.
	 * @param ctx the parse tree
	 */
	exitImmediate_assertion_statement?: (ctx: Immediate_assertion_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.simple_immediate_assertion_statement`.
	 * @param ctx the parse tree
	 */
	enterSimple_immediate_assertion_statement?: (ctx: Simple_immediate_assertion_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.simple_immediate_assertion_statement`.
	 * @param ctx the parse tree
	 */
	exitSimple_immediate_assertion_statement?: (ctx: Simple_immediate_assertion_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.simple_immediate_assert_statement`.
	 * @param ctx the parse tree
	 */
	enterSimple_immediate_assert_statement?: (ctx: Simple_immediate_assert_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.simple_immediate_assert_statement`.
	 * @param ctx the parse tree
	 */
	exitSimple_immediate_assert_statement?: (ctx: Simple_immediate_assert_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.simple_immediate_assume_statement`.
	 * @param ctx the parse tree
	 */
	enterSimple_immediate_assume_statement?: (ctx: Simple_immediate_assume_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.simple_immediate_assume_statement`.
	 * @param ctx the parse tree
	 */
	exitSimple_immediate_assume_statement?: (ctx: Simple_immediate_assume_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.simple_immediate_cover_statement`.
	 * @param ctx the parse tree
	 */
	enterSimple_immediate_cover_statement?: (ctx: Simple_immediate_cover_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.simple_immediate_cover_statement`.
	 * @param ctx the parse tree
	 */
	exitSimple_immediate_cover_statement?: (ctx: Simple_immediate_cover_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.deferred_immediate_assertion_statement`.
	 * @param ctx the parse tree
	 */
	enterDeferred_immediate_assertion_statement?: (ctx: Deferred_immediate_assertion_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.deferred_immediate_assertion_statement`.
	 * @param ctx the parse tree
	 */
	exitDeferred_immediate_assertion_statement?: (ctx: Deferred_immediate_assertion_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.deferred_immediate_assert_statement`.
	 * @param ctx the parse tree
	 */
	enterDeferred_immediate_assert_statement?: (ctx: Deferred_immediate_assert_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.deferred_immediate_assert_statement`.
	 * @param ctx the parse tree
	 */
	exitDeferred_immediate_assert_statement?: (ctx: Deferred_immediate_assert_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.deferred_immediate_assume_statement`.
	 * @param ctx the parse tree
	 */
	enterDeferred_immediate_assume_statement?: (ctx: Deferred_immediate_assume_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.deferred_immediate_assume_statement`.
	 * @param ctx the parse tree
	 */
	exitDeferred_immediate_assume_statement?: (ctx: Deferred_immediate_assume_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.deferred_immediate_cover_statement`.
	 * @param ctx the parse tree
	 */
	enterDeferred_immediate_cover_statement?: (ctx: Deferred_immediate_cover_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.deferred_immediate_cover_statement`.
	 * @param ctx the parse tree
	 */
	exitDeferred_immediate_cover_statement?: (ctx: Deferred_immediate_cover_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.clocking_declaration`.
	 * @param ctx the parse tree
	 */
	enterClocking_declaration?: (ctx: Clocking_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.clocking_declaration`.
	 * @param ctx the parse tree
	 */
	exitClocking_declaration?: (ctx: Clocking_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.clocking_event`.
	 * @param ctx the parse tree
	 */
	enterClocking_event?: (ctx: Clocking_eventContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.clocking_event`.
	 * @param ctx the parse tree
	 */
	exitClocking_event?: (ctx: Clocking_eventContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.clocking_item`.
	 * @param ctx the parse tree
	 */
	enterClocking_item?: (ctx: Clocking_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.clocking_item`.
	 * @param ctx the parse tree
	 */
	exitClocking_item?: (ctx: Clocking_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.default_skew`.
	 * @param ctx the parse tree
	 */
	enterDefault_skew?: (ctx: Default_skewContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.default_skew`.
	 * @param ctx the parse tree
	 */
	exitDefault_skew?: (ctx: Default_skewContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.clocking_direction`.
	 * @param ctx the parse tree
	 */
	enterClocking_direction?: (ctx: Clocking_directionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.clocking_direction`.
	 * @param ctx the parse tree
	 */
	exitClocking_direction?: (ctx: Clocking_directionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_clocking_decl_assign`.
	 * @param ctx the parse tree
	 */
	enterList_of_clocking_decl_assign?: (ctx: List_of_clocking_decl_assignContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_clocking_decl_assign`.
	 * @param ctx the parse tree
	 */
	exitList_of_clocking_decl_assign?: (ctx: List_of_clocking_decl_assignContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.clocking_decl_assign`.
	 * @param ctx the parse tree
	 */
	enterClocking_decl_assign?: (ctx: Clocking_decl_assignContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.clocking_decl_assign`.
	 * @param ctx the parse tree
	 */
	exitClocking_decl_assign?: (ctx: Clocking_decl_assignContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.clocking_skew`.
	 * @param ctx the parse tree
	 */
	enterClocking_skew?: (ctx: Clocking_skewContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.clocking_skew`.
	 * @param ctx the parse tree
	 */
	exitClocking_skew?: (ctx: Clocking_skewContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.clocking_drive`.
	 * @param ctx the parse tree
	 */
	enterClocking_drive?: (ctx: Clocking_driveContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.clocking_drive`.
	 * @param ctx the parse tree
	 */
	exitClocking_drive?: (ctx: Clocking_driveContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cycle_delay`.
	 * @param ctx the parse tree
	 */
	enterCycle_delay?: (ctx: Cycle_delayContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cycle_delay`.
	 * @param ctx the parse tree
	 */
	exitCycle_delay?: (ctx: Cycle_delayContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.clockvar`.
	 * @param ctx the parse tree
	 */
	enterClockvar?: (ctx: ClockvarContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.clockvar`.
	 * @param ctx the parse tree
	 */
	exitClockvar?: (ctx: ClockvarContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.clockvar_expression`.
	 * @param ctx the parse tree
	 */
	enterClockvar_expression?: (ctx: Clockvar_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.clockvar_expression`.
	 * @param ctx the parse tree
	 */
	exitClockvar_expression?: (ctx: Clockvar_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.randsequence_statement`.
	 * @param ctx the parse tree
	 */
	enterRandsequence_statement?: (ctx: Randsequence_statementContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.randsequence_statement`.
	 * @param ctx the parse tree
	 */
	exitRandsequence_statement?: (ctx: Randsequence_statementContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.production`.
	 * @param ctx the parse tree
	 */
	enterProduction?: (ctx: ProductionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.production`.
	 * @param ctx the parse tree
	 */
	exitProduction?: (ctx: ProductionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.rs_rule`.
	 * @param ctx the parse tree
	 */
	enterRs_rule?: (ctx: Rs_ruleContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.rs_rule`.
	 * @param ctx the parse tree
	 */
	exitRs_rule?: (ctx: Rs_ruleContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.rs_production_list`.
	 * @param ctx the parse tree
	 */
	enterRs_production_list?: (ctx: Rs_production_listContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.rs_production_list`.
	 * @param ctx the parse tree
	 */
	exitRs_production_list?: (ctx: Rs_production_listContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.weight_specification`.
	 * @param ctx the parse tree
	 */
	enterWeight_specification?: (ctx: Weight_specificationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.weight_specification`.
	 * @param ctx the parse tree
	 */
	exitWeight_specification?: (ctx: Weight_specificationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.rs_code_block`.
	 * @param ctx the parse tree
	 */
	enterRs_code_block?: (ctx: Rs_code_blockContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.rs_code_block`.
	 * @param ctx the parse tree
	 */
	exitRs_code_block?: (ctx: Rs_code_blockContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.rs_prod`.
	 * @param ctx the parse tree
	 */
	enterRs_prod?: (ctx: Rs_prodContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.rs_prod`.
	 * @param ctx the parse tree
	 */
	exitRs_prod?: (ctx: Rs_prodContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.production_item`.
	 * @param ctx the parse tree
	 */
	enterProduction_item?: (ctx: Production_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.production_item`.
	 * @param ctx the parse tree
	 */
	exitProduction_item?: (ctx: Production_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.rs_if_else`.
	 * @param ctx the parse tree
	 */
	enterRs_if_else?: (ctx: Rs_if_elseContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.rs_if_else`.
	 * @param ctx the parse tree
	 */
	exitRs_if_else?: (ctx: Rs_if_elseContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.rs_repeat`.
	 * @param ctx the parse tree
	 */
	enterRs_repeat?: (ctx: Rs_repeatContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.rs_repeat`.
	 * @param ctx the parse tree
	 */
	exitRs_repeat?: (ctx: Rs_repeatContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.rs_case`.
	 * @param ctx the parse tree
	 */
	enterRs_case?: (ctx: Rs_caseContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.rs_case`.
	 * @param ctx the parse tree
	 */
	exitRs_case?: (ctx: Rs_caseContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.rs_case_item`.
	 * @param ctx the parse tree
	 */
	enterRs_case_item?: (ctx: Rs_case_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.rs_case_item`.
	 * @param ctx the parse tree
	 */
	exitRs_case_item?: (ctx: Rs_case_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.specify_block`.
	 * @param ctx the parse tree
	 */
	enterSpecify_block?: (ctx: Specify_blockContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.specify_block`.
	 * @param ctx the parse tree
	 */
	exitSpecify_block?: (ctx: Specify_blockContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.specify_item`.
	 * @param ctx the parse tree
	 */
	enterSpecify_item?: (ctx: Specify_itemContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.specify_item`.
	 * @param ctx the parse tree
	 */
	exitSpecify_item?: (ctx: Specify_itemContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.pulsestyle_declaration`.
	 * @param ctx the parse tree
	 */
	enterPulsestyle_declaration?: (ctx: Pulsestyle_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.pulsestyle_declaration`.
	 * @param ctx the parse tree
	 */
	exitPulsestyle_declaration?: (ctx: Pulsestyle_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.showcancelled_declaration`.
	 * @param ctx the parse tree
	 */
	enterShowcancelled_declaration?: (ctx: Showcancelled_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.showcancelled_declaration`.
	 * @param ctx the parse tree
	 */
	exitShowcancelled_declaration?: (ctx: Showcancelled_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.path_declaration`.
	 * @param ctx the parse tree
	 */
	enterPath_declaration?: (ctx: Path_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.path_declaration`.
	 * @param ctx the parse tree
	 */
	exitPath_declaration?: (ctx: Path_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.simple_path_declaration`.
	 * @param ctx the parse tree
	 */
	enterSimple_path_declaration?: (ctx: Simple_path_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.simple_path_declaration`.
	 * @param ctx the parse tree
	 */
	exitSimple_path_declaration?: (ctx: Simple_path_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.parallel_path_description`.
	 * @param ctx the parse tree
	 */
	enterParallel_path_description?: (ctx: Parallel_path_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.parallel_path_description`.
	 * @param ctx the parse tree
	 */
	exitParallel_path_description?: (ctx: Parallel_path_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.full_path_description`.
	 * @param ctx the parse tree
	 */
	enterFull_path_description?: (ctx: Full_path_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.full_path_description`.
	 * @param ctx the parse tree
	 */
	exitFull_path_description?: (ctx: Full_path_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_path_inputs`.
	 * @param ctx the parse tree
	 */
	enterList_of_path_inputs?: (ctx: List_of_path_inputsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_path_inputs`.
	 * @param ctx the parse tree
	 */
	exitList_of_path_inputs?: (ctx: List_of_path_inputsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_path_outputs`.
	 * @param ctx the parse tree
	 */
	enterList_of_path_outputs?: (ctx: List_of_path_outputsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_path_outputs`.
	 * @param ctx the parse tree
	 */
	exitList_of_path_outputs?: (ctx: List_of_path_outputsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.specify_input_terminal_descriptor`.
	 * @param ctx the parse tree
	 */
	enterSpecify_input_terminal_descriptor?: (ctx: Specify_input_terminal_descriptorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.specify_input_terminal_descriptor`.
	 * @param ctx the parse tree
	 */
	exitSpecify_input_terminal_descriptor?: (ctx: Specify_input_terminal_descriptorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.specify_output_terminal_descriptor`.
	 * @param ctx the parse tree
	 */
	enterSpecify_output_terminal_descriptor?: (ctx: Specify_output_terminal_descriptorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.specify_output_terminal_descriptor`.
	 * @param ctx the parse tree
	 */
	exitSpecify_output_terminal_descriptor?: (ctx: Specify_output_terminal_descriptorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.input_identifier`.
	 * @param ctx the parse tree
	 */
	enterInput_identifier?: (ctx: Input_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.input_identifier`.
	 * @param ctx the parse tree
	 */
	exitInput_identifier?: (ctx: Input_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.output_identifier`.
	 * @param ctx the parse tree
	 */
	enterOutput_identifier?: (ctx: Output_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.output_identifier`.
	 * @param ctx the parse tree
	 */
	exitOutput_identifier?: (ctx: Output_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.path_delay_value`.
	 * @param ctx the parse tree
	 */
	enterPath_delay_value?: (ctx: Path_delay_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.path_delay_value`.
	 * @param ctx the parse tree
	 */
	exitPath_delay_value?: (ctx: Path_delay_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_path_delay_expressions`.
	 * @param ctx the parse tree
	 */
	enterList_of_path_delay_expressions?: (ctx: List_of_path_delay_expressionsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_path_delay_expressions`.
	 * @param ctx the parse tree
	 */
	exitList_of_path_delay_expressions?: (ctx: List_of_path_delay_expressionsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.t_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterT_path_delay_expression?: (ctx: T_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.t_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitT_path_delay_expression?: (ctx: T_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.trise_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterTrise_path_delay_expression?: (ctx: Trise_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.trise_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitTrise_path_delay_expression?: (ctx: Trise_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tfall_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterTfall_path_delay_expression?: (ctx: Tfall_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tfall_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitTfall_path_delay_expression?: (ctx: Tfall_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tz_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterTz_path_delay_expression?: (ctx: Tz_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tz_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitTz_path_delay_expression?: (ctx: Tz_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.t01_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterT01_path_delay_expression?: (ctx: T01_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.t01_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitT01_path_delay_expression?: (ctx: T01_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.t10_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterT10_path_delay_expression?: (ctx: T10_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.t10_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitT10_path_delay_expression?: (ctx: T10_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.t0z_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterT0z_path_delay_expression?: (ctx: T0z_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.t0z_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitT0z_path_delay_expression?: (ctx: T0z_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tz1_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterTz1_path_delay_expression?: (ctx: Tz1_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tz1_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitTz1_path_delay_expression?: (ctx: Tz1_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.t1z_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterT1z_path_delay_expression?: (ctx: T1z_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.t1z_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitT1z_path_delay_expression?: (ctx: T1z_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tz0_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterTz0_path_delay_expression?: (ctx: Tz0_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tz0_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitTz0_path_delay_expression?: (ctx: Tz0_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.t0x_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterT0x_path_delay_expression?: (ctx: T0x_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.t0x_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitT0x_path_delay_expression?: (ctx: T0x_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tx1_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterTx1_path_delay_expression?: (ctx: Tx1_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tx1_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitTx1_path_delay_expression?: (ctx: Tx1_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.t1x_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterT1x_path_delay_expression?: (ctx: T1x_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.t1x_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitT1x_path_delay_expression?: (ctx: T1x_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tx0_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterTx0_path_delay_expression?: (ctx: Tx0_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tx0_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitTx0_path_delay_expression?: (ctx: Tx0_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.txz_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterTxz_path_delay_expression?: (ctx: Txz_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.txz_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitTxz_path_delay_expression?: (ctx: Txz_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tzx_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterTzx_path_delay_expression?: (ctx: Tzx_path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tzx_path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitTzx_path_delay_expression?: (ctx: Tzx_path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.path_delay_expression`.
	 * @param ctx the parse tree
	 */
	enterPath_delay_expression?: (ctx: Path_delay_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.path_delay_expression`.
	 * @param ctx the parse tree
	 */
	exitPath_delay_expression?: (ctx: Path_delay_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.edge_sensitive_path_declaration`.
	 * @param ctx the parse tree
	 */
	enterEdge_sensitive_path_declaration?: (ctx: Edge_sensitive_path_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.edge_sensitive_path_declaration`.
	 * @param ctx the parse tree
	 */
	exitEdge_sensitive_path_declaration?: (ctx: Edge_sensitive_path_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.parallel_edge_sensitive_path_description`.
	 * @param ctx the parse tree
	 */
	enterParallel_edge_sensitive_path_description?: (ctx: Parallel_edge_sensitive_path_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.parallel_edge_sensitive_path_description`.
	 * @param ctx the parse tree
	 */
	exitParallel_edge_sensitive_path_description?: (ctx: Parallel_edge_sensitive_path_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.full_edge_sensitive_path_description`.
	 * @param ctx the parse tree
	 */
	enterFull_edge_sensitive_path_description?: (ctx: Full_edge_sensitive_path_descriptionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.full_edge_sensitive_path_description`.
	 * @param ctx the parse tree
	 */
	exitFull_edge_sensitive_path_description?: (ctx: Full_edge_sensitive_path_descriptionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.data_source_expression`.
	 * @param ctx the parse tree
	 */
	enterData_source_expression?: (ctx: Data_source_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.data_source_expression`.
	 * @param ctx the parse tree
	 */
	exitData_source_expression?: (ctx: Data_source_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.edge_identifier`.
	 * @param ctx the parse tree
	 */
	enterEdge_identifier?: (ctx: Edge_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.edge_identifier`.
	 * @param ctx the parse tree
	 */
	exitEdge_identifier?: (ctx: Edge_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.state_dependent_path_declaration`.
	 * @param ctx the parse tree
	 */
	enterState_dependent_path_declaration?: (ctx: State_dependent_path_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.state_dependent_path_declaration`.
	 * @param ctx the parse tree
	 */
	exitState_dependent_path_declaration?: (ctx: State_dependent_path_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.polarity_operator`.
	 * @param ctx the parse tree
	 */
	enterPolarity_operator?: (ctx: Polarity_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.polarity_operator`.
	 * @param ctx the parse tree
	 */
	exitPolarity_operator?: (ctx: Polarity_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.system_timing_check`.
	 * @param ctx the parse tree
	 */
	enterSystem_timing_check?: (ctx: System_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.system_timing_check`.
	 * @param ctx the parse tree
	 */
	exitSystem_timing_check?: (ctx: System_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.setup_timing_check`.
	 * @param ctx the parse tree
	 */
	enterSetup_timing_check?: (ctx: Setup_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.setup_timing_check`.
	 * @param ctx the parse tree
	 */
	exitSetup_timing_check?: (ctx: Setup_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hold_timing_check`.
	 * @param ctx the parse tree
	 */
	enterHold_timing_check?: (ctx: Hold_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hold_timing_check`.
	 * @param ctx the parse tree
	 */
	exitHold_timing_check?: (ctx: Hold_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.setuphold_timing_check`.
	 * @param ctx the parse tree
	 */
	enterSetuphold_timing_check?: (ctx: Setuphold_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.setuphold_timing_check`.
	 * @param ctx the parse tree
	 */
	exitSetuphold_timing_check?: (ctx: Setuphold_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.recovery_timing_check`.
	 * @param ctx the parse tree
	 */
	enterRecovery_timing_check?: (ctx: Recovery_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.recovery_timing_check`.
	 * @param ctx the parse tree
	 */
	exitRecovery_timing_check?: (ctx: Recovery_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.removal_timing_check`.
	 * @param ctx the parse tree
	 */
	enterRemoval_timing_check?: (ctx: Removal_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.removal_timing_check`.
	 * @param ctx the parse tree
	 */
	exitRemoval_timing_check?: (ctx: Removal_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.recrem_timing_check`.
	 * @param ctx the parse tree
	 */
	enterRecrem_timing_check?: (ctx: Recrem_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.recrem_timing_check`.
	 * @param ctx the parse tree
	 */
	exitRecrem_timing_check?: (ctx: Recrem_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.skew_timing_check`.
	 * @param ctx the parse tree
	 */
	enterSkew_timing_check?: (ctx: Skew_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.skew_timing_check`.
	 * @param ctx the parse tree
	 */
	exitSkew_timing_check?: (ctx: Skew_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.timeskew_timing_check`.
	 * @param ctx the parse tree
	 */
	enterTimeskew_timing_check?: (ctx: Timeskew_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.timeskew_timing_check`.
	 * @param ctx the parse tree
	 */
	exitTimeskew_timing_check?: (ctx: Timeskew_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.fullskew_timing_check`.
	 * @param ctx the parse tree
	 */
	enterFullskew_timing_check?: (ctx: Fullskew_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.fullskew_timing_check`.
	 * @param ctx the parse tree
	 */
	exitFullskew_timing_check?: (ctx: Fullskew_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.period_timing_check`.
	 * @param ctx the parse tree
	 */
	enterPeriod_timing_check?: (ctx: Period_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.period_timing_check`.
	 * @param ctx the parse tree
	 */
	exitPeriod_timing_check?: (ctx: Period_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.width_timing_check`.
	 * @param ctx the parse tree
	 */
	enterWidth_timing_check?: (ctx: Width_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.width_timing_check`.
	 * @param ctx the parse tree
	 */
	exitWidth_timing_check?: (ctx: Width_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.nochange_timing_check`.
	 * @param ctx the parse tree
	 */
	enterNochange_timing_check?: (ctx: Nochange_timing_checkContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.nochange_timing_check`.
	 * @param ctx the parse tree
	 */
	exitNochange_timing_check?: (ctx: Nochange_timing_checkContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.timecheck_condition`.
	 * @param ctx the parse tree
	 */
	enterTimecheck_condition?: (ctx: Timecheck_conditionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.timecheck_condition`.
	 * @param ctx the parse tree
	 */
	exitTimecheck_condition?: (ctx: Timecheck_conditionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.controlled_reference_event`.
	 * @param ctx the parse tree
	 */
	enterControlled_reference_event?: (ctx: Controlled_reference_eventContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.controlled_reference_event`.
	 * @param ctx the parse tree
	 */
	exitControlled_reference_event?: (ctx: Controlled_reference_eventContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.data_event`.
	 * @param ctx the parse tree
	 */
	enterData_event?: (ctx: Data_eventContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.data_event`.
	 * @param ctx the parse tree
	 */
	exitData_event?: (ctx: Data_eventContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.delayed_data`.
	 * @param ctx the parse tree
	 */
	enterDelayed_data?: (ctx: Delayed_dataContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.delayed_data`.
	 * @param ctx the parse tree
	 */
	exitDelayed_data?: (ctx: Delayed_dataContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.delayed_reference`.
	 * @param ctx the parse tree
	 */
	enterDelayed_reference?: (ctx: Delayed_referenceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.delayed_reference`.
	 * @param ctx the parse tree
	 */
	exitDelayed_reference?: (ctx: Delayed_referenceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.end_edge_offset`.
	 * @param ctx the parse tree
	 */
	enterEnd_edge_offset?: (ctx: End_edge_offsetContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.end_edge_offset`.
	 * @param ctx the parse tree
	 */
	exitEnd_edge_offset?: (ctx: End_edge_offsetContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.event_based_flag`.
	 * @param ctx the parse tree
	 */
	enterEvent_based_flag?: (ctx: Event_based_flagContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.event_based_flag`.
	 * @param ctx the parse tree
	 */
	exitEvent_based_flag?: (ctx: Event_based_flagContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.notifier`.
	 * @param ctx the parse tree
	 */
	enterNotifier?: (ctx: NotifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.notifier`.
	 * @param ctx the parse tree
	 */
	exitNotifier?: (ctx: NotifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.reference_event`.
	 * @param ctx the parse tree
	 */
	enterReference_event?: (ctx: Reference_eventContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.reference_event`.
	 * @param ctx the parse tree
	 */
	exitReference_event?: (ctx: Reference_eventContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.remain_active_flag`.
	 * @param ctx the parse tree
	 */
	enterRemain_active_flag?: (ctx: Remain_active_flagContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.remain_active_flag`.
	 * @param ctx the parse tree
	 */
	exitRemain_active_flag?: (ctx: Remain_active_flagContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.timestamp_condition`.
	 * @param ctx the parse tree
	 */
	enterTimestamp_condition?: (ctx: Timestamp_conditionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.timestamp_condition`.
	 * @param ctx the parse tree
	 */
	exitTimestamp_condition?: (ctx: Timestamp_conditionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.start_edge_offset`.
	 * @param ctx the parse tree
	 */
	enterStart_edge_offset?: (ctx: Start_edge_offsetContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.start_edge_offset`.
	 * @param ctx the parse tree
	 */
	exitStart_edge_offset?: (ctx: Start_edge_offsetContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.threshold`.
	 * @param ctx the parse tree
	 */
	enterThreshold?: (ctx: ThresholdContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.threshold`.
	 * @param ctx the parse tree
	 */
	exitThreshold?: (ctx: ThresholdContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.timing_check_limit`.
	 * @param ctx the parse tree
	 */
	enterTiming_check_limit?: (ctx: Timing_check_limitContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.timing_check_limit`.
	 * @param ctx the parse tree
	 */
	exitTiming_check_limit?: (ctx: Timing_check_limitContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.timing_check_event`.
	 * @param ctx the parse tree
	 */
	enterTiming_check_event?: (ctx: Timing_check_eventContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.timing_check_event`.
	 * @param ctx the parse tree
	 */
	exitTiming_check_event?: (ctx: Timing_check_eventContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.controlled_timing_check_event`.
	 * @param ctx the parse tree
	 */
	enterControlled_timing_check_event?: (ctx: Controlled_timing_check_eventContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.controlled_timing_check_event`.
	 * @param ctx the parse tree
	 */
	exitControlled_timing_check_event?: (ctx: Controlled_timing_check_eventContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.timing_check_event_control`.
	 * @param ctx the parse tree
	 */
	enterTiming_check_event_control?: (ctx: Timing_check_event_controlContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.timing_check_event_control`.
	 * @param ctx the parse tree
	 */
	exitTiming_check_event_control?: (ctx: Timing_check_event_controlContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.specify_terminal_descriptor`.
	 * @param ctx the parse tree
	 */
	enterSpecify_terminal_descriptor?: (ctx: Specify_terminal_descriptorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.specify_terminal_descriptor`.
	 * @param ctx the parse tree
	 */
	exitSpecify_terminal_descriptor?: (ctx: Specify_terminal_descriptorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.edge_control_specifier`.
	 * @param ctx the parse tree
	 */
	enterEdge_control_specifier?: (ctx: Edge_control_specifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.edge_control_specifier`.
	 * @param ctx the parse tree
	 */
	exitEdge_control_specifier?: (ctx: Edge_control_specifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.edge_descriptor`.
	 * @param ctx the parse tree
	 */
	enterEdge_descriptor?: (ctx: Edge_descriptorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.edge_descriptor`.
	 * @param ctx the parse tree
	 */
	exitEdge_descriptor?: (ctx: Edge_descriptorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.zero_or_one`.
	 * @param ctx the parse tree
	 */
	enterZero_or_one?: (ctx: Zero_or_oneContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.zero_or_one`.
	 * @param ctx the parse tree
	 */
	exitZero_or_one?: (ctx: Zero_or_oneContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.z_or_x`.
	 * @param ctx the parse tree
	 */
	enterZ_or_x?: (ctx: Z_or_xContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.z_or_x`.
	 * @param ctx the parse tree
	 */
	exitZ_or_x?: (ctx: Z_or_xContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.timing_check_condition`.
	 * @param ctx the parse tree
	 */
	enterTiming_check_condition?: (ctx: Timing_check_conditionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.timing_check_condition`.
	 * @param ctx the parse tree
	 */
	exitTiming_check_condition?: (ctx: Timing_check_conditionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.scalar_timing_check_condition`.
	 * @param ctx the parse tree
	 */
	enterScalar_timing_check_condition?: (ctx: Scalar_timing_check_conditionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.scalar_timing_check_condition`.
	 * @param ctx the parse tree
	 */
	exitScalar_timing_check_condition?: (ctx: Scalar_timing_check_conditionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.scalar_constant`.
	 * @param ctx the parse tree
	 */
	enterScalar_constant?: (ctx: Scalar_constantContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.scalar_constant`.
	 * @param ctx the parse tree
	 */
	exitScalar_constant?: (ctx: Scalar_constantContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.concatenation`.
	 * @param ctx the parse tree
	 */
	enterConcatenation?: (ctx: ConcatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.concatenation`.
	 * @param ctx the parse tree
	 */
	exitConcatenation?: (ctx: ConcatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_concatenation`.
	 * @param ctx the parse tree
	 */
	enterConstant_concatenation?: (ctx: Constant_concatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_concatenation`.
	 * @param ctx the parse tree
	 */
	exitConstant_concatenation?: (ctx: Constant_concatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_multiple_concatenation`.
	 * @param ctx the parse tree
	 */
	enterConstant_multiple_concatenation?: (ctx: Constant_multiple_concatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_multiple_concatenation`.
	 * @param ctx the parse tree
	 */
	exitConstant_multiple_concatenation?: (ctx: Constant_multiple_concatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_path_concatenation`.
	 * @param ctx the parse tree
	 */
	enterModule_path_concatenation?: (ctx: Module_path_concatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_path_concatenation`.
	 * @param ctx the parse tree
	 */
	exitModule_path_concatenation?: (ctx: Module_path_concatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_path_multiple_concatenation`.
	 * @param ctx the parse tree
	 */
	enterModule_path_multiple_concatenation?: (ctx: Module_path_multiple_concatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_path_multiple_concatenation`.
	 * @param ctx the parse tree
	 */
	exitModule_path_multiple_concatenation?: (ctx: Module_path_multiple_concatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.multiple_concatenation`.
	 * @param ctx the parse tree
	 */
	enterMultiple_concatenation?: (ctx: Multiple_concatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.multiple_concatenation`.
	 * @param ctx the parse tree
	 */
	exitMultiple_concatenation?: (ctx: Multiple_concatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.streaming_concatenation`.
	 * @param ctx the parse tree
	 */
	enterStreaming_concatenation?: (ctx: Streaming_concatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.streaming_concatenation`.
	 * @param ctx the parse tree
	 */
	exitStreaming_concatenation?: (ctx: Streaming_concatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.stream_operator`.
	 * @param ctx the parse tree
	 */
	enterStream_operator?: (ctx: Stream_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.stream_operator`.
	 * @param ctx the parse tree
	 */
	exitStream_operator?: (ctx: Stream_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.slice_size`.
	 * @param ctx the parse tree
	 */
	enterSlice_size?: (ctx: Slice_sizeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.slice_size`.
	 * @param ctx the parse tree
	 */
	exitSlice_size?: (ctx: Slice_sizeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.stream_concatenation`.
	 * @param ctx the parse tree
	 */
	enterStream_concatenation?: (ctx: Stream_concatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.stream_concatenation`.
	 * @param ctx the parse tree
	 */
	exitStream_concatenation?: (ctx: Stream_concatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.stream_expression`.
	 * @param ctx the parse tree
	 */
	enterStream_expression?: (ctx: Stream_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.stream_expression`.
	 * @param ctx the parse tree
	 */
	exitStream_expression?: (ctx: Stream_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.array_range_expression`.
	 * @param ctx the parse tree
	 */
	enterArray_range_expression?: (ctx: Array_range_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.array_range_expression`.
	 * @param ctx the parse tree
	 */
	exitArray_range_expression?: (ctx: Array_range_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.empty_unpacked_array_concatenation`.
	 * @param ctx the parse tree
	 */
	enterEmpty_unpacked_array_concatenation?: (ctx: Empty_unpacked_array_concatenationContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.empty_unpacked_array_concatenation`.
	 * @param ctx the parse tree
	 */
	exitEmpty_unpacked_array_concatenation?: (ctx: Empty_unpacked_array_concatenationContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tf_call`.
	 * @param ctx the parse tree
	 */
	enterTf_call?: (ctx: Tf_callContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tf_call`.
	 * @param ctx the parse tree
	 */
	exitTf_call?: (ctx: Tf_callContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.system_tf_call`.
	 * @param ctx the parse tree
	 */
	enterSystem_tf_call?: (ctx: System_tf_callContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.system_tf_call`.
	 * @param ctx the parse tree
	 */
	exitSystem_tf_call?: (ctx: System_tf_callContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.subroutine_call`.
	 * @param ctx the parse tree
	 */
	enterSubroutine_call?: (ctx: Subroutine_callContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.subroutine_call`.
	 * @param ctx the parse tree
	 */
	exitSubroutine_call?: (ctx: Subroutine_callContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.function_subroutine_call`.
	 * @param ctx the parse tree
	 */
	enterFunction_subroutine_call?: (ctx: Function_subroutine_callContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.function_subroutine_call`.
	 * @param ctx the parse tree
	 */
	exitFunction_subroutine_call?: (ctx: Function_subroutine_callContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_arguments`.
	 * @param ctx the parse tree
	 */
	enterList_of_arguments?: (ctx: List_of_argumentsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_arguments`.
	 * @param ctx the parse tree
	 */
	exitList_of_arguments?: (ctx: List_of_argumentsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.list_of_arguments_with_strings`.
	 * @param ctx the parse tree
	 */
	enterList_of_arguments_with_strings?: (ctx: List_of_arguments_with_stringsContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.list_of_arguments_with_strings`.
	 * @param ctx the parse tree
	 */
	exitList_of_arguments_with_strings?: (ctx: List_of_arguments_with_stringsContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.method_call_body`.
	 * @param ctx the parse tree
	 */
	enterMethod_call_body?: (ctx: Method_call_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.method_call_body`.
	 * @param ctx the parse tree
	 */
	exitMethod_call_body?: (ctx: Method_call_bodyContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.built_in_method_call`.
	 * @param ctx the parse tree
	 */
	enterBuilt_in_method_call?: (ctx: Built_in_method_callContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.built_in_method_call`.
	 * @param ctx the parse tree
	 */
	exitBuilt_in_method_call?: (ctx: Built_in_method_callContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.array_manipulation_call`.
	 * @param ctx the parse tree
	 */
	enterArray_manipulation_call?: (ctx: Array_manipulation_callContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.array_manipulation_call`.
	 * @param ctx the parse tree
	 */
	exitArray_manipulation_call?: (ctx: Array_manipulation_callContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.array_method_call`.
	 * @param ctx the parse tree
	 */
	enterArray_method_call?: (ctx: Array_method_callContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.array_method_call`.
	 * @param ctx the parse tree
	 */
	exitArray_method_call?: (ctx: Array_method_callContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.iterator_argument`.
	 * @param ctx the parse tree
	 */
	enterIterator_argument?: (ctx: Iterator_argumentContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.iterator_argument`.
	 * @param ctx the parse tree
	 */
	exitIterator_argument?: (ctx: Iterator_argumentContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.randomize_call`.
	 * @param ctx the parse tree
	 */
	enterRandomize_call?: (ctx: Randomize_callContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.randomize_call`.
	 * @param ctx the parse tree
	 */
	exitRandomize_call?: (ctx: Randomize_callContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.array_method_name`.
	 * @param ctx the parse tree
	 */
	enterArray_method_name?: (ctx: Array_method_nameContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.array_method_name`.
	 * @param ctx the parse tree
	 */
	exitArray_method_name?: (ctx: Array_method_nameContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.inc_or_dec_expression`.
	 * @param ctx the parse tree
	 */
	enterInc_or_dec_expression?: (ctx: Inc_or_dec_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.inc_or_dec_expression`.
	 * @param ctx the parse tree
	 */
	exitInc_or_dec_expression?: (ctx: Inc_or_dec_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_expression`.
	 * @param ctx the parse tree
	 */
	enterConstant_expression?: (ctx: Constant_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_expression`.
	 * @param ctx the parse tree
	 */
	exitConstant_expression?: (ctx: Constant_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_mintypmax_expression`.
	 * @param ctx the parse tree
	 */
	enterConstant_mintypmax_expression?: (ctx: Constant_mintypmax_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_mintypmax_expression`.
	 * @param ctx the parse tree
	 */
	exitConstant_mintypmax_expression?: (ctx: Constant_mintypmax_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_param_expression`.
	 * @param ctx the parse tree
	 */
	enterConstant_param_expression?: (ctx: Constant_param_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_param_expression`.
	 * @param ctx the parse tree
	 */
	exitConstant_param_expression?: (ctx: Constant_param_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.param_expression`.
	 * @param ctx the parse tree
	 */
	enterParam_expression?: (ctx: Param_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.param_expression`.
	 * @param ctx the parse tree
	 */
	exitParam_expression?: (ctx: Param_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_range_expression`.
	 * @param ctx the parse tree
	 */
	enterConstant_range_expression?: (ctx: Constant_range_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_range_expression`.
	 * @param ctx the parse tree
	 */
	exitConstant_range_expression?: (ctx: Constant_range_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_part_select_range`.
	 * @param ctx the parse tree
	 */
	enterConstant_part_select_range?: (ctx: Constant_part_select_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_part_select_range`.
	 * @param ctx the parse tree
	 */
	exitConstant_part_select_range?: (ctx: Constant_part_select_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_range`.
	 * @param ctx the parse tree
	 */
	enterConstant_range?: (ctx: Constant_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_range`.
	 * @param ctx the parse tree
	 */
	exitConstant_range?: (ctx: Constant_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_indexed_range`.
	 * @param ctx the parse tree
	 */
	enterConstant_indexed_range?: (ctx: Constant_indexed_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_indexed_range`.
	 * @param ctx the parse tree
	 */
	exitConstant_indexed_range?: (ctx: Constant_indexed_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.string_or_expression`.
	 * @param ctx the parse tree
	 */
	enterString_or_expression?: (ctx: String_or_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.string_or_expression`.
	 * @param ctx the parse tree
	 */
	exitString_or_expression?: (ctx: String_or_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tagged_union_expression`.
	 * @param ctx the parse tree
	 */
	enterTagged_union_expression?: (ctx: Tagged_union_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tagged_union_expression`.
	 * @param ctx the parse tree
	 */
	exitTagged_union_expression?: (ctx: Tagged_union_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.value_range`.
	 * @param ctx the parse tree
	 */
	enterValue_range?: (ctx: Value_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.value_range`.
	 * @param ctx the parse tree
	 */
	exitValue_range?: (ctx: Value_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.mintypmax_expression`.
	 * @param ctx the parse tree
	 */
	enterMintypmax_expression?: (ctx: Mintypmax_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.mintypmax_expression`.
	 * @param ctx the parse tree
	 */
	exitMintypmax_expression?: (ctx: Mintypmax_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_path_conditional_expression`.
	 * @param ctx the parse tree
	 */
	enterModule_path_conditional_expression?: (ctx: Module_path_conditional_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_path_conditional_expression`.
	 * @param ctx the parse tree
	 */
	exitModule_path_conditional_expression?: (ctx: Module_path_conditional_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_path_expression`.
	 * @param ctx the parse tree
	 */
	enterModule_path_expression?: (ctx: Module_path_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_path_expression`.
	 * @param ctx the parse tree
	 */
	exitModule_path_expression?: (ctx: Module_path_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_path_mintypmax_expression`.
	 * @param ctx the parse tree
	 */
	enterModule_path_mintypmax_expression?: (ctx: Module_path_mintypmax_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_path_mintypmax_expression`.
	 * @param ctx the parse tree
	 */
	exitModule_path_mintypmax_expression?: (ctx: Module_path_mintypmax_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.part_select_range`.
	 * @param ctx the parse tree
	 */
	enterPart_select_range?: (ctx: Part_select_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.part_select_range`.
	 * @param ctx the parse tree
	 */
	exitPart_select_range?: (ctx: Part_select_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.indexed_range`.
	 * @param ctx the parse tree
	 */
	enterIndexed_range?: (ctx: Indexed_rangeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.indexed_range`.
	 * @param ctx the parse tree
	 */
	exitIndexed_range?: (ctx: Indexed_rangeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.genvar_expression`.
	 * @param ctx the parse tree
	 */
	enterGenvar_expression?: (ctx: Genvar_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.genvar_expression`.
	 * @param ctx the parse tree
	 */
	exitGenvar_expression?: (ctx: Genvar_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_primary`.
	 * @param ctx the parse tree
	 */
	enterConstant_primary?: (ctx: Constant_primaryContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_primary`.
	 * @param ctx the parse tree
	 */
	exitConstant_primary?: (ctx: Constant_primaryContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.primary`.
	 * @param ctx the parse tree
	 */
	enterPrimary?: (ctx: PrimaryContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.primary`.
	 * @param ctx the parse tree
	 */
	exitPrimary?: (ctx: PrimaryContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_path_primary`.
	 * @param ctx the parse tree
	 */
	enterModule_path_primary?: (ctx: Module_path_primaryContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_path_primary`.
	 * @param ctx the parse tree
	 */
	exitModule_path_primary?: (ctx: Module_path_primaryContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_qualifier`.
	 * @param ctx the parse tree
	 */
	enterClass_qualifier?: (ctx: Class_qualifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_qualifier`.
	 * @param ctx the parse tree
	 */
	exitClass_qualifier?: (ctx: Class_qualifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.range_expression`.
	 * @param ctx the parse tree
	 */
	enterRange_expression?: (ctx: Range_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.range_expression`.
	 * @param ctx the parse tree
	 */
	exitRange_expression?: (ctx: Range_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.primary_literal`.
	 * @param ctx the parse tree
	 */
	enterPrimary_literal?: (ctx: Primary_literalContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.primary_literal`.
	 * @param ctx the parse tree
	 */
	exitPrimary_literal?: (ctx: Primary_literalContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.time_literal`.
	 * @param ctx the parse tree
	 */
	enterTime_literal?: (ctx: Time_literalContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.time_literal`.
	 * @param ctx the parse tree
	 */
	exitTime_literal?: (ctx: Time_literalContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.time_unit`.
	 * @param ctx the parse tree
	 */
	enterTime_unit?: (ctx: Time_unitContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.time_unit`.
	 * @param ctx the parse tree
	 */
	exitTime_unit?: (ctx: Time_unitContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.implicit_class_handle`.
	 * @param ctx the parse tree
	 */
	enterImplicit_class_handle?: (ctx: Implicit_class_handleContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.implicit_class_handle`.
	 * @param ctx the parse tree
	 */
	exitImplicit_class_handle?: (ctx: Implicit_class_handleContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bit_select`.
	 * @param ctx the parse tree
	 */
	enterBit_select?: (ctx: Bit_selectContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bit_select`.
	 * @param ctx the parse tree
	 */
	exitBit_select?: (ctx: Bit_selectContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.select`.
	 * @param ctx the parse tree
	 */
	enterSelect?: (ctx: SelectContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.select`.
	 * @param ctx the parse tree
	 */
	exitSelect?: (ctx: SelectContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.nonrange_select`.
	 * @param ctx the parse tree
	 */
	enterNonrange_select?: (ctx: Nonrange_selectContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.nonrange_select`.
	 * @param ctx the parse tree
	 */
	exitNonrange_select?: (ctx: Nonrange_selectContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_bit_select`.
	 * @param ctx the parse tree
	 */
	enterConstant_bit_select?: (ctx: Constant_bit_selectContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_bit_select`.
	 * @param ctx the parse tree
	 */
	exitConstant_bit_select?: (ctx: Constant_bit_selectContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_select`.
	 * @param ctx the parse tree
	 */
	enterConstant_select?: (ctx: Constant_selectContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_select`.
	 * @param ctx the parse tree
	 */
	exitConstant_select?: (ctx: Constant_selectContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constant_let_expression`.
	 * @param ctx the parse tree
	 */
	enterConstant_let_expression?: (ctx: Constant_let_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constant_let_expression`.
	 * @param ctx the parse tree
	 */
	exitConstant_let_expression?: (ctx: Constant_let_expressionContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.net_lvalue`.
	 * @param ctx the parse tree
	 */
	enterNet_lvalue?: (ctx: Net_lvalueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.net_lvalue`.
	 * @param ctx the parse tree
	 */
	exitNet_lvalue?: (ctx: Net_lvalueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.variable_lvalue`.
	 * @param ctx the parse tree
	 */
	enterVariable_lvalue?: (ctx: Variable_lvalueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.variable_lvalue`.
	 * @param ctx the parse tree
	 */
	exitVariable_lvalue?: (ctx: Variable_lvalueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.nonrange_variable_lvalue`.
	 * @param ctx the parse tree
	 */
	enterNonrange_variable_lvalue?: (ctx: Nonrange_variable_lvalueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.nonrange_variable_lvalue`.
	 * @param ctx the parse tree
	 */
	exitNonrange_variable_lvalue?: (ctx: Nonrange_variable_lvalueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.unary_operator`.
	 * @param ctx the parse tree
	 */
	enterUnary_operator?: (ctx: Unary_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.unary_operator`.
	 * @param ctx the parse tree
	 */
	exitUnary_operator?: (ctx: Unary_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.binary_operator`.
	 * @param ctx the parse tree
	 */
	enterBinary_operator?: (ctx: Binary_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.binary_operator`.
	 * @param ctx the parse tree
	 */
	exitBinary_operator?: (ctx: Binary_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.inc_or_dec_operator`.
	 * @param ctx the parse tree
	 */
	enterInc_or_dec_operator?: (ctx: Inc_or_dec_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.inc_or_dec_operator`.
	 * @param ctx the parse tree
	 */
	exitInc_or_dec_operator?: (ctx: Inc_or_dec_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.unary_module_path_operator`.
	 * @param ctx the parse tree
	 */
	enterUnary_module_path_operator?: (ctx: Unary_module_path_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.unary_module_path_operator`.
	 * @param ctx the parse tree
	 */
	exitUnary_module_path_operator?: (ctx: Unary_module_path_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.binary_module_path_operator`.
	 * @param ctx the parse tree
	 */
	enterBinary_module_path_operator?: (ctx: Binary_module_path_operatorContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.binary_module_path_operator`.
	 * @param ctx the parse tree
	 */
	exitBinary_module_path_operator?: (ctx: Binary_module_path_operatorContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.number`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.number`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.integral_number`.
	 * @param ctx the parse tree
	 */
	enterIntegral_number?: (ctx: Integral_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.integral_number`.
	 * @param ctx the parse tree
	 */
	exitIntegral_number?: (ctx: Integral_numberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.decimal_number`.
	 * @param ctx the parse tree
	 */
	enterDecimal_number?: (ctx: Decimal_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.decimal_number`.
	 * @param ctx the parse tree
	 */
	exitDecimal_number?: (ctx: Decimal_numberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.binary_number`.
	 * @param ctx the parse tree
	 */
	enterBinary_number?: (ctx: Binary_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.binary_number`.
	 * @param ctx the parse tree
	 */
	exitBinary_number?: (ctx: Binary_numberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.octal_number`.
	 * @param ctx the parse tree
	 */
	enterOctal_number?: (ctx: Octal_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.octal_number`.
	 * @param ctx the parse tree
	 */
	exitOctal_number?: (ctx: Octal_numberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hex_number`.
	 * @param ctx the parse tree
	 */
	enterHex_number?: (ctx: Hex_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hex_number`.
	 * @param ctx the parse tree
	 */
	exitHex_number?: (ctx: Hex_numberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sign`.
	 * @param ctx the parse tree
	 */
	enterSign?: (ctx: SignContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sign`.
	 * @param ctx the parse tree
	 */
	exitSign?: (ctx: SignContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.size`.
	 * @param ctx the parse tree
	 */
	enterSize?: (ctx: SizeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.size`.
	 * @param ctx the parse tree
	 */
	exitSize?: (ctx: SizeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.non_zero_unsigned_number`.
	 * @param ctx the parse tree
	 */
	enterNon_zero_unsigned_number?: (ctx: Non_zero_unsigned_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.non_zero_unsigned_number`.
	 * @param ctx the parse tree
	 */
	exitNon_zero_unsigned_number?: (ctx: Non_zero_unsigned_numberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.real_number`.
	 * @param ctx the parse tree
	 */
	enterReal_number?: (ctx: Real_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.real_number`.
	 * @param ctx the parse tree
	 */
	exitReal_number?: (ctx: Real_numberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.fixed_point_number`.
	 * @param ctx the parse tree
	 */
	enterFixed_point_number?: (ctx: Fixed_point_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.fixed_point_number`.
	 * @param ctx the parse tree
	 */
	exitFixed_point_number?: (ctx: Fixed_point_numberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.exp`.
	 * @param ctx the parse tree
	 */
	enterExp?: (ctx: ExpContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.exp`.
	 * @param ctx the parse tree
	 */
	exitExp?: (ctx: ExpContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.unsigned_number`.
	 * @param ctx the parse tree
	 */
	enterUnsigned_number?: (ctx: Unsigned_numberContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.unsigned_number`.
	 * @param ctx the parse tree
	 */
	exitUnsigned_number?: (ctx: Unsigned_numberContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.binary_value`.
	 * @param ctx the parse tree
	 */
	enterBinary_value?: (ctx: Binary_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.binary_value`.
	 * @param ctx the parse tree
	 */
	exitBinary_value?: (ctx: Binary_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.octal_value`.
	 * @param ctx the parse tree
	 */
	enterOctal_value?: (ctx: Octal_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.octal_value`.
	 * @param ctx the parse tree
	 */
	exitOctal_value?: (ctx: Octal_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hex_value`.
	 * @param ctx the parse tree
	 */
	enterHex_value?: (ctx: Hex_valueContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hex_value`.
	 * @param ctx the parse tree
	 */
	exitHex_value?: (ctx: Hex_valueContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.decimal_base`.
	 * @param ctx the parse tree
	 */
	enterDecimal_base?: (ctx: Decimal_baseContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.decimal_base`.
	 * @param ctx the parse tree
	 */
	exitDecimal_base?: (ctx: Decimal_baseContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.binary_base`.
	 * @param ctx the parse tree
	 */
	enterBinary_base?: (ctx: Binary_baseContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.binary_base`.
	 * @param ctx the parse tree
	 */
	exitBinary_base?: (ctx: Binary_baseContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.octal_base`.
	 * @param ctx the parse tree
	 */
	enterOctal_base?: (ctx: Octal_baseContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.octal_base`.
	 * @param ctx the parse tree
	 */
	exitOctal_base?: (ctx: Octal_baseContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hex_base`.
	 * @param ctx the parse tree
	 */
	enterHex_base?: (ctx: Hex_baseContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hex_base`.
	 * @param ctx the parse tree
	 */
	exitHex_base?: (ctx: Hex_baseContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.non_zero_decimal_digit`.
	 * @param ctx the parse tree
	 */
	enterNon_zero_decimal_digit?: (ctx: Non_zero_decimal_digitContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.non_zero_decimal_digit`.
	 * @param ctx the parse tree
	 */
	exitNon_zero_decimal_digit?: (ctx: Non_zero_decimal_digitContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.decimal_digit`.
	 * @param ctx the parse tree
	 */
	enterDecimal_digit?: (ctx: Decimal_digitContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.decimal_digit`.
	 * @param ctx the parse tree
	 */
	exitDecimal_digit?: (ctx: Decimal_digitContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.binary_digit`.
	 * @param ctx the parse tree
	 */
	enterBinary_digit?: (ctx: Binary_digitContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.binary_digit`.
	 * @param ctx the parse tree
	 */
	exitBinary_digit?: (ctx: Binary_digitContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.octal_digit`.
	 * @param ctx the parse tree
	 */
	enterOctal_digit?: (ctx: Octal_digitContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.octal_digit`.
	 * @param ctx the parse tree
	 */
	exitOctal_digit?: (ctx: Octal_digitContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hex_digit`.
	 * @param ctx the parse tree
	 */
	enterHex_digit?: (ctx: Hex_digitContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hex_digit`.
	 * @param ctx the parse tree
	 */
	exitHex_digit?: (ctx: Hex_digitContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.x_digit`.
	 * @param ctx the parse tree
	 */
	enterX_digit?: (ctx: X_digitContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.x_digit`.
	 * @param ctx the parse tree
	 */
	exitX_digit?: (ctx: X_digitContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.z_digit`.
	 * @param ctx the parse tree
	 */
	enterZ_digit?: (ctx: Z_digitContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.z_digit`.
	 * @param ctx the parse tree
	 */
	exitZ_digit?: (ctx: Z_digitContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.unbased_unsized_literal`.
	 * @param ctx the parse tree
	 */
	enterUnbased_unsized_literal?: (ctx: Unbased_unsized_literalContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.unbased_unsized_literal`.
	 * @param ctx the parse tree
	 */
	exitUnbased_unsized_literal?: (ctx: Unbased_unsized_literalContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.string_literal`.
	 * @param ctx the parse tree
	 */
	enterString_literal?: (ctx: String_literalContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.string_literal`.
	 * @param ctx the parse tree
	 */
	exitString_literal?: (ctx: String_literalContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.attribute_instance`.
	 * @param ctx the parse tree
	 */
	enterAttribute_instance?: (ctx: Attribute_instanceContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.attribute_instance`.
	 * @param ctx the parse tree
	 */
	exitAttribute_instance?: (ctx: Attribute_instanceContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.attr_spec`.
	 * @param ctx the parse tree
	 */
	enterAttr_spec?: (ctx: Attr_specContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.attr_spec`.
	 * @param ctx the parse tree
	 */
	exitAttr_spec?: (ctx: Attr_specContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.attr_name`.
	 * @param ctx the parse tree
	 */
	enterAttr_name?: (ctx: Attr_nameContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.attr_name`.
	 * @param ctx the parse tree
	 */
	exitAttr_name?: (ctx: Attr_nameContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.array_identifier`.
	 * @param ctx the parse tree
	 */
	enterArray_identifier?: (ctx: Array_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.array_identifier`.
	 * @param ctx the parse tree
	 */
	exitArray_identifier?: (ctx: Array_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.block_identifier`.
	 * @param ctx the parse tree
	 */
	enterBlock_identifier?: (ctx: Block_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.block_identifier`.
	 * @param ctx the parse tree
	 */
	exitBlock_identifier?: (ctx: Block_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.bin_identifier`.
	 * @param ctx the parse tree
	 */
	enterBin_identifier?: (ctx: Bin_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.bin_identifier`.
	 * @param ctx the parse tree
	 */
	exitBin_identifier?: (ctx: Bin_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.c_identifier`.
	 * @param ctx the parse tree
	 */
	enterC_identifier?: (ctx: C_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.c_identifier`.
	 * @param ctx the parse tree
	 */
	exitC_identifier?: (ctx: C_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cell_identifier`.
	 * @param ctx the parse tree
	 */
	enterCell_identifier?: (ctx: Cell_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cell_identifier`.
	 * @param ctx the parse tree
	 */
	exitCell_identifier?: (ctx: Cell_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.checker_identifier`.
	 * @param ctx the parse tree
	 */
	enterChecker_identifier?: (ctx: Checker_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.checker_identifier`.
	 * @param ctx the parse tree
	 */
	exitChecker_identifier?: (ctx: Checker_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_identifier`.
	 * @param ctx the parse tree
	 */
	enterClass_identifier?: (ctx: Class_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_identifier`.
	 * @param ctx the parse tree
	 */
	exitClass_identifier?: (ctx: Class_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.class_variable_identifier`.
	 * @param ctx the parse tree
	 */
	enterClass_variable_identifier?: (ctx: Class_variable_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.class_variable_identifier`.
	 * @param ctx the parse tree
	 */
	exitClass_variable_identifier?: (ctx: Class_variable_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.clocking_identifier`.
	 * @param ctx the parse tree
	 */
	enterClocking_identifier?: (ctx: Clocking_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.clocking_identifier`.
	 * @param ctx the parse tree
	 */
	exitClocking_identifier?: (ctx: Clocking_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.config_identifier`.
	 * @param ctx the parse tree
	 */
	enterConfig_identifier?: (ctx: Config_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.config_identifier`.
	 * @param ctx the parse tree
	 */
	exitConfig_identifier?: (ctx: Config_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.const_identifier`.
	 * @param ctx the parse tree
	 */
	enterConst_identifier?: (ctx: Const_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.const_identifier`.
	 * @param ctx the parse tree
	 */
	exitConst_identifier?: (ctx: Const_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.constraint_identifier`.
	 * @param ctx the parse tree
	 */
	enterConstraint_identifier?: (ctx: Constraint_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.constraint_identifier`.
	 * @param ctx the parse tree
	 */
	exitConstraint_identifier?: (ctx: Constraint_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.covergroup_identifier`.
	 * @param ctx the parse tree
	 */
	enterCovergroup_identifier?: (ctx: Covergroup_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.covergroup_identifier`.
	 * @param ctx the parse tree
	 */
	exitCovergroup_identifier?: (ctx: Covergroup_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.covergroup_variable_identifier`.
	 * @param ctx the parse tree
	 */
	enterCovergroup_variable_identifier?: (ctx: Covergroup_variable_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.covergroup_variable_identifier`.
	 * @param ctx the parse tree
	 */
	exitCovergroup_variable_identifier?: (ctx: Covergroup_variable_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cover_point_identifier`.
	 * @param ctx the parse tree
	 */
	enterCover_point_identifier?: (ctx: Cover_point_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cover_point_identifier`.
	 * @param ctx the parse tree
	 */
	exitCover_point_identifier?: (ctx: Cover_point_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.cross_identifier`.
	 * @param ctx the parse tree
	 */
	enterCross_identifier?: (ctx: Cross_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.cross_identifier`.
	 * @param ctx the parse tree
	 */
	exitCross_identifier?: (ctx: Cross_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.dynamic_array_variable_identifier`.
	 * @param ctx the parse tree
	 */
	enterDynamic_array_variable_identifier?: (ctx: Dynamic_array_variable_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.dynamic_array_variable_identifier`.
	 * @param ctx the parse tree
	 */
	exitDynamic_array_variable_identifier?: (ctx: Dynamic_array_variable_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.enum_identifier`.
	 * @param ctx the parse tree
	 */
	enterEnum_identifier?: (ctx: Enum_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.enum_identifier`.
	 * @param ctx the parse tree
	 */
	exitEnum_identifier?: (ctx: Enum_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.formal_identifier`.
	 * @param ctx the parse tree
	 */
	enterFormal_identifier?: (ctx: Formal_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.formal_identifier`.
	 * @param ctx the parse tree
	 */
	exitFormal_identifier?: (ctx: Formal_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.formal_port_identifier`.
	 * @param ctx the parse tree
	 */
	enterFormal_port_identifier?: (ctx: Formal_port_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.formal_port_identifier`.
	 * @param ctx the parse tree
	 */
	exitFormal_port_identifier?: (ctx: Formal_port_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.function_identifier`.
	 * @param ctx the parse tree
	 */
	enterFunction_identifier?: (ctx: Function_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.function_identifier`.
	 * @param ctx the parse tree
	 */
	exitFunction_identifier?: (ctx: Function_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.generate_block_identifier`.
	 * @param ctx the parse tree
	 */
	enterGenerate_block_identifier?: (ctx: Generate_block_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.generate_block_identifier`.
	 * @param ctx the parse tree
	 */
	exitGenerate_block_identifier?: (ctx: Generate_block_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.genvar_identifier`.
	 * @param ctx the parse tree
	 */
	enterGenvar_identifier?: (ctx: Genvar_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.genvar_identifier`.
	 * @param ctx the parse tree
	 */
	exitGenvar_identifier?: (ctx: Genvar_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_array_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_array_identifier?: (ctx: Hierarchical_array_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_array_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_array_identifier?: (ctx: Hierarchical_array_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_block_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_block_identifier?: (ctx: Hierarchical_block_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_block_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_block_identifier?: (ctx: Hierarchical_block_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_event_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_event_identifier?: (ctx: Hierarchical_event_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_event_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_event_identifier?: (ctx: Hierarchical_event_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_identifier?: (ctx: Hierarchical_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_identifier?: (ctx: Hierarchical_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_net_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_net_identifier?: (ctx: Hierarchical_net_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_net_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_net_identifier?: (ctx: Hierarchical_net_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_parameter_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_parameter_identifier?: (ctx: Hierarchical_parameter_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_parameter_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_parameter_identifier?: (ctx: Hierarchical_parameter_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_property_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_property_identifier?: (ctx: Hierarchical_property_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_property_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_property_identifier?: (ctx: Hierarchical_property_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_sequence_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_sequence_identifier?: (ctx: Hierarchical_sequence_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_sequence_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_sequence_identifier?: (ctx: Hierarchical_sequence_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_task_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_task_identifier?: (ctx: Hierarchical_task_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_task_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_task_identifier?: (ctx: Hierarchical_task_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_tf_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_tf_identifier?: (ctx: Hierarchical_tf_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_tf_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_tf_identifier?: (ctx: Hierarchical_tf_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.hierarchical_variable_identifier`.
	 * @param ctx the parse tree
	 */
	enterHierarchical_variable_identifier?: (ctx: Hierarchical_variable_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.hierarchical_variable_identifier`.
	 * @param ctx the parse tree
	 */
	exitHierarchical_variable_identifier?: (ctx: Hierarchical_variable_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.index_variable_identifier`.
	 * @param ctx the parse tree
	 */
	enterIndex_variable_identifier?: (ctx: Index_variable_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.index_variable_identifier`.
	 * @param ctx the parse tree
	 */
	exitIndex_variable_identifier?: (ctx: Index_variable_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_identifier`.
	 * @param ctx the parse tree
	 */
	enterInterface_identifier?: (ctx: Interface_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_identifier`.
	 * @param ctx the parse tree
	 */
	exitInterface_identifier?: (ctx: Interface_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.interface_instance_identifier`.
	 * @param ctx the parse tree
	 */
	enterInterface_instance_identifier?: (ctx: Interface_instance_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.interface_instance_identifier`.
	 * @param ctx the parse tree
	 */
	exitInterface_instance_identifier?: (ctx: Interface_instance_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.inout_port_identifier`.
	 * @param ctx the parse tree
	 */
	enterInout_port_identifier?: (ctx: Inout_port_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.inout_port_identifier`.
	 * @param ctx the parse tree
	 */
	exitInout_port_identifier?: (ctx: Inout_port_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.input_port_identifier`.
	 * @param ctx the parse tree
	 */
	enterInput_port_identifier?: (ctx: Input_port_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.input_port_identifier`.
	 * @param ctx the parse tree
	 */
	exitInput_port_identifier?: (ctx: Input_port_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.instance_identifier`.
	 * @param ctx the parse tree
	 */
	enterInstance_identifier?: (ctx: Instance_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.instance_identifier`.
	 * @param ctx the parse tree
	 */
	exitInstance_identifier?: (ctx: Instance_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.library_identifier`.
	 * @param ctx the parse tree
	 */
	enterLibrary_identifier?: (ctx: Library_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.library_identifier`.
	 * @param ctx the parse tree
	 */
	exitLibrary_identifier?: (ctx: Library_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.member_identifier`.
	 * @param ctx the parse tree
	 */
	enterMember_identifier?: (ctx: Member_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.member_identifier`.
	 * @param ctx the parse tree
	 */
	exitMember_identifier?: (ctx: Member_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.method_identifier`.
	 * @param ctx the parse tree
	 */
	enterMethod_identifier?: (ctx: Method_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.method_identifier`.
	 * @param ctx the parse tree
	 */
	exitMethod_identifier?: (ctx: Method_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.modport_identifier`.
	 * @param ctx the parse tree
	 */
	enterModport_identifier?: (ctx: Modport_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.modport_identifier`.
	 * @param ctx the parse tree
	 */
	exitModport_identifier?: (ctx: Modport_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.module_identifier`.
	 * @param ctx the parse tree
	 */
	enterModule_identifier?: (ctx: Module_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.module_identifier`.
	 * @param ctx the parse tree
	 */
	exitModule_identifier?: (ctx: Module_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.net_identifier`.
	 * @param ctx the parse tree
	 */
	enterNet_identifier?: (ctx: Net_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.net_identifier`.
	 * @param ctx the parse tree
	 */
	exitNet_identifier?: (ctx: Net_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.net_type_identifier`.
	 * @param ctx the parse tree
	 */
	enterNet_type_identifier?: (ctx: Net_type_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.net_type_identifier`.
	 * @param ctx the parse tree
	 */
	exitNet_type_identifier?: (ctx: Net_type_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.output_port_identifier`.
	 * @param ctx the parse tree
	 */
	enterOutput_port_identifier?: (ctx: Output_port_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.output_port_identifier`.
	 * @param ctx the parse tree
	 */
	exitOutput_port_identifier?: (ctx: Output_port_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.package_identifier`.
	 * @param ctx the parse tree
	 */
	enterPackage_identifier?: (ctx: Package_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.package_identifier`.
	 * @param ctx the parse tree
	 */
	exitPackage_identifier?: (ctx: Package_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.package_scope`.
	 * @param ctx the parse tree
	 */
	enterPackage_scope?: (ctx: Package_scopeContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.package_scope`.
	 * @param ctx the parse tree
	 */
	exitPackage_scope?: (ctx: Package_scopeContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.parameter_identifier`.
	 * @param ctx the parse tree
	 */
	enterParameter_identifier?: (ctx: Parameter_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.parameter_identifier`.
	 * @param ctx the parse tree
	 */
	exitParameter_identifier?: (ctx: Parameter_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.port_identifier`.
	 * @param ctx the parse tree
	 */
	enterPort_identifier?: (ctx: Port_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.port_identifier`.
	 * @param ctx the parse tree
	 */
	exitPort_identifier?: (ctx: Port_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.production_identifier`.
	 * @param ctx the parse tree
	 */
	enterProduction_identifier?: (ctx: Production_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.production_identifier`.
	 * @param ctx the parse tree
	 */
	exitProduction_identifier?: (ctx: Production_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.program_identifier`.
	 * @param ctx the parse tree
	 */
	enterProgram_identifier?: (ctx: Program_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.program_identifier`.
	 * @param ctx the parse tree
	 */
	exitProgram_identifier?: (ctx: Program_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.property_identifier`.
	 * @param ctx the parse tree
	 */
	enterProperty_identifier?: (ctx: Property_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.property_identifier`.
	 * @param ctx the parse tree
	 */
	exitProperty_identifier?: (ctx: Property_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ps_class_identifier`.
	 * @param ctx the parse tree
	 */
	enterPs_class_identifier?: (ctx: Ps_class_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ps_class_identifier`.
	 * @param ctx the parse tree
	 */
	exitPs_class_identifier?: (ctx: Ps_class_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ps_covergroup_identifier`.
	 * @param ctx the parse tree
	 */
	enterPs_covergroup_identifier?: (ctx: Ps_covergroup_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ps_covergroup_identifier`.
	 * @param ctx the parse tree
	 */
	exitPs_covergroup_identifier?: (ctx: Ps_covergroup_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ps_checker_identifier`.
	 * @param ctx the parse tree
	 */
	enterPs_checker_identifier?: (ctx: Ps_checker_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ps_checker_identifier`.
	 * @param ctx the parse tree
	 */
	exitPs_checker_identifier?: (ctx: Ps_checker_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ps_identifier`.
	 * @param ctx the parse tree
	 */
	enterPs_identifier?: (ctx: Ps_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ps_identifier`.
	 * @param ctx the parse tree
	 */
	exitPs_identifier?: (ctx: Ps_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_array_identifier`.
	 * @param ctx the parse tree
	 */
	enterPs_or_hierarchical_array_identifier?: (ctx: Ps_or_hierarchical_array_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_array_identifier`.
	 * @param ctx the parse tree
	 */
	exitPs_or_hierarchical_array_identifier?: (ctx: Ps_or_hierarchical_array_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_net_identifier`.
	 * @param ctx the parse tree
	 */
	enterPs_or_hierarchical_net_identifier?: (ctx: Ps_or_hierarchical_net_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_net_identifier`.
	 * @param ctx the parse tree
	 */
	exitPs_or_hierarchical_net_identifier?: (ctx: Ps_or_hierarchical_net_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_property_identifier`.
	 * @param ctx the parse tree
	 */
	enterPs_or_hierarchical_property_identifier?: (ctx: Ps_or_hierarchical_property_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_property_identifier`.
	 * @param ctx the parse tree
	 */
	exitPs_or_hierarchical_property_identifier?: (ctx: Ps_or_hierarchical_property_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_sequence_identifier`.
	 * @param ctx the parse tree
	 */
	enterPs_or_hierarchical_sequence_identifier?: (ctx: Ps_or_hierarchical_sequence_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_sequence_identifier`.
	 * @param ctx the parse tree
	 */
	exitPs_or_hierarchical_sequence_identifier?: (ctx: Ps_or_hierarchical_sequence_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_tf_identifier`.
	 * @param ctx the parse tree
	 */
	enterPs_or_hierarchical_tf_identifier?: (ctx: Ps_or_hierarchical_tf_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ps_or_hierarchical_tf_identifier`.
	 * @param ctx the parse tree
	 */
	exitPs_or_hierarchical_tf_identifier?: (ctx: Ps_or_hierarchical_tf_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ps_parameter_identifier`.
	 * @param ctx the parse tree
	 */
	enterPs_parameter_identifier?: (ctx: Ps_parameter_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ps_parameter_identifier`.
	 * @param ctx the parse tree
	 */
	exitPs_parameter_identifier?: (ctx: Ps_parameter_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.ps_type_identifier`.
	 * @param ctx the parse tree
	 */
	enterPs_type_identifier?: (ctx: Ps_type_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.ps_type_identifier`.
	 * @param ctx the parse tree
	 */
	exitPs_type_identifier?: (ctx: Ps_type_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.sequence_identifier`.
	 * @param ctx the parse tree
	 */
	enterSequence_identifier?: (ctx: Sequence_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.sequence_identifier`.
	 * @param ctx the parse tree
	 */
	exitSequence_identifier?: (ctx: Sequence_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.signal_identifier`.
	 * @param ctx the parse tree
	 */
	enterSignal_identifier?: (ctx: Signal_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.signal_identifier`.
	 * @param ctx the parse tree
	 */
	exitSignal_identifier?: (ctx: Signal_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.simple_identifier`.
	 * @param ctx the parse tree
	 */
	enterSimple_identifier?: (ctx: Simple_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.simple_identifier`.
	 * @param ctx the parse tree
	 */
	exitSimple_identifier?: (ctx: Simple_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.specparam_identifier`.
	 * @param ctx the parse tree
	 */
	enterSpecparam_identifier?: (ctx: Specparam_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.specparam_identifier`.
	 * @param ctx the parse tree
	 */
	exitSpecparam_identifier?: (ctx: Specparam_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.task_identifier`.
	 * @param ctx the parse tree
	 */
	enterTask_identifier?: (ctx: Task_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.task_identifier`.
	 * @param ctx the parse tree
	 */
	exitTask_identifier?: (ctx: Task_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.tf_identifier`.
	 * @param ctx the parse tree
	 */
	enterTf_identifier?: (ctx: Tf_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.tf_identifier`.
	 * @param ctx the parse tree
	 */
	exitTf_identifier?: (ctx: Tf_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.terminal_identifier`.
	 * @param ctx the parse tree
	 */
	enterTerminal_identifier?: (ctx: Terminal_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.terminal_identifier`.
	 * @param ctx the parse tree
	 */
	exitTerminal_identifier?: (ctx: Terminal_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.topmodule_identifier`.
	 * @param ctx the parse tree
	 */
	enterTopmodule_identifier?: (ctx: Topmodule_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.topmodule_identifier`.
	 * @param ctx the parse tree
	 */
	exitTopmodule_identifier?: (ctx: Topmodule_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.type_identifier`.
	 * @param ctx the parse tree
	 */
	enterType_identifier?: (ctx: Type_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.type_identifier`.
	 * @param ctx the parse tree
	 */
	exitType_identifier?: (ctx: Type_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.udp_identifier`.
	 * @param ctx the parse tree
	 */
	enterUdp_identifier?: (ctx: Udp_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.udp_identifier`.
	 * @param ctx the parse tree
	 */
	exitUdp_identifier?: (ctx: Udp_identifierContext) => void;

	/**
	 * Enter a parse tree produced by `SystemVerilogParser.variable_identifier`.
	 * @param ctx the parse tree
	 */
	enterVariable_identifier?: (ctx: Variable_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `SystemVerilogParser.variable_identifier`.
	 * @param ctx the parse tree
	 */
	exitVariable_identifier?: (ctx: Variable_identifierContext) => void;
}

