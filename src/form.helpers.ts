import {Priority, Status} from "./task.constants.ts";
import {formatEnumValue} from "./task.helpers.ts";

const getFormOptionHTML = (value: string) => `<option value="${value}">${formatEnumValue(value)}</option>`

export const getFormHTML = () => {
    return `
        <span class="form__title">Create New Task</span>
        <label for="title" class="form__field__label">Title:</label>
        <input type="text" id="title" name="title" class="form__field__input" required />
        
        <label for="description" class="form__field__label">Description:</label>
        <textarea id="description" name="description" class="form__field__input" required></textarea>
        
        <div class="form__field">
            <label for="status" class="form__field__label">Status:</label>
            <select id="status" name="status" class="form__field__input" required>
                ${getFormOptionHTML(Status.TO_DO)}
                ${getFormOptionHTML(Status.IN_PROGRESS)}
            </select>
        </div>
        <div class="form__field">
            <label for="priority" class="form__field__label">Priority:</label>
            <select id="priority" name="priority" class="form__field__input" required>
                ${getFormOptionHTML(Priority.LOW)}
                ${getFormOptionHTML(Priority.MEDIUM)}
                ${getFormOptionHTML(Priority.HIGH)}
            </select>
        </div>
        <div class="form__field">
            <label for="deadline" class="form__field__label">Deadline:</label>
            <input type="date" id="deadline" name="deadline" class="form__field__input" required /> 
        </div>
        <button type="submit">Create Task</button>`
};

export const renderForm = (anchor: string) => {
    const formSelector = document.getElementById(anchor) as HTMLFormElement;
    if (formSelector) {
        formSelector.innerHTML = getFormHTML();
    }

    return formSelector;
}
