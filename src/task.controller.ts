import type {Task} from "./task.interfaces.ts";
import {TaskService} from "./task.service.ts";

export class TaskController {
    private _service: TaskService;
    private readonly _listRenderFn: (tasks: Task[]) => void;

     constructor(taskService: TaskService, listRenderFn: typeof this._listRenderFn) {
        this._service = taskService;
        this._listRenderFn = listRenderFn;
        this.loadTasks();
    }

    private handleServiceCall = async (serviceCall: Promise<Task[]>) => {
        try {
            const tasks = await serviceCall;
            this._listRenderFn(tasks);
        }   catch (error) {
            if (error instanceof Error) {
                alert(`An error occurred: ${error.message}`);
            }
        }
    }

    createTask = async (payload: unknown) => {
        await this.handleServiceCall(this._service.createTask(payload));
    }
    loadTask = async (id: string) => {
        await this.handleServiceCall(this._service.fetchTaskById(id));
    }
    loadTasks = async () => {
        await this.handleServiceCall(this._service.fetchTasks());
    }
    updateTask = async (id: string, updates: Partial<Task>) => {
        await this.handleServiceCall(this._service.updateTask(id, updates));
    }
    removeTask = async (id: string) => {
        await this.handleServiceCall(this._service.deleteTask(id));
    }
}

