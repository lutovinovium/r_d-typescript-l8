import './style.css'
import { TaskController} from "./task.controller.ts";
import {TaskService} from "./task.service.ts";
import {renderTaskList} from "./task.helpers.ts";
import {renderForm} from "./form.helpers.ts";
import {FormController} from "./form.controller.ts";

const taskService = new TaskService();
const taskRenderController = new TaskController(taskService, renderTaskList);
new FormController(renderForm, 'task__form', taskRenderController.createTask);