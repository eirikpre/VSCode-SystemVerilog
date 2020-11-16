import { TaskProvider, Task, ShellExecution, TaskScope, CancellationToken, TaskDefinition, ShellExecutionOptions } from "vscode";

interface SystemVerilogTaskDefinition extends TaskDefinition {
    command: string;
    args: string[];
    options?: ShellExecutionOptions;
}

const verilator: SystemVerilogTaskDefinition = {
    type: "systemverilog",
    command: "verilator",
    args: [
        "${file}",
        "-sv",
        "--language", "1800-2012",
    ],
};

export class SystemVerilogTaskProvider implements TaskProvider {

    public provideTasks(token: CancellationToken): Task[] {

        let results: Task[] = [];


        [verilator].forEach(tool => {
            results.push(
                new Task(
                    verilator,
                    TaskScope.Workspace,
                    tool.command,
                    "systemverilog",
                    new ShellExecution(
                        tool.command, tool.args, tool.options
                    )
                )
            )
        });

        console.log(`returning ${results}`);
        return results;
    }

	public resolveTask(task: Task): Task | undefined {
		if (task) {
            // resolveTask requires that the same definition object be used.
            const def: SystemVerilogTaskDefinition = <any>task.definition;
            return new Task(
                def,
                // getDefinition(task.definition.command),
                task.scope ?? TaskScope.Workspace,
                def.command,
                "systemverilog",
                new ShellExecution(
                    def.command,
                    def.args,
                    def.options
                 )
            );
		}
		return undefined;
		// return _task;
	}

}

function getDefinition(s: string) {
    switch (s) {
        case "verilator": return verilator;
        // case ""
        default:
            return { type: "systemverilog" }
    }
}


