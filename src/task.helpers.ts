import type {Task} from "./task.interfaces.ts";

export const formatEnumValue = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().replace('_', ' ');
}

export const formatValue = (key: keyof Task, value: Task[keyof Task]): string | null => {
    if (!value) return null;
    if (key === 'createdAt' || key === 'doneAt' || key === 'deadline') {
        const date = new Date(value);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
    if (key === 'status' || key === 'priority') {
        return formatEnumValue(value);
    }
    return value;
}

export const getTaskInfoItemHTML = (key: keyof Task, value: Task[keyof Task]) => `
    <div class="task__info__item">
                <span class="task__info__label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span class="task__info__value">${formatValue(key, value)}</span >
            </div>
`

export const getTaskInfoContentHTML = (task: Task) => {
    const nonInfoTaskKeys: (keyof Task)[] = ['id', 'title', 'status'];
    return Object.entries(task).map(([_key, value]) => {
        const key = _key as keyof Task;
        if (nonInfoTaskKeys.includes(key) || !value) return '';
        return getTaskInfoItemHTML(key, value)
    }).join('')
}

export const getTaskListItemHTML = (task: Task) => `
    <div class="task__item">
         <div class="task__header">
            <h3 class="task__title"><span>${task.title}</span>
                <span class="task__badge--status">${formatEnumValue(task.status)}</span>
            </h3>
            <span class="task__subtitle">${task.id}</span>
        </div>
        <div class="task__info">
            ${getTaskInfoContentHTML(task)}
        </div>
    </div>
`

export const appendTaskListItem = (task: Task) => {
    const taskList = document.getElementById('task__list');
    if (!taskList) return;
    taskList.innerHTML += '\n' + getTaskListItemHTML(task);
}

export const clearTaskList = () => {
    const taskList = document.getElementById('task__list');
    if (!taskList) return;
    taskList.innerHTML = '';
}

export const renderTaskList = async (tasks: Task[]) => {
    clearTaskList();
    tasks.forEach(task => {
        appendTaskListItem(task);
    })
}