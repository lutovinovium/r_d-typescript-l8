export class FormController {
    private readonly _formElement: HTMLFormElement;
    private _onSubmit: (formData: Record<string, string>) => Promise<void>;

    constructor(renderFn: (anchor: string) => HTMLFormElement, anchor: string, onSubmit: typeof this._onSubmit) {
        this._onSubmit = onSubmit;
        this._formElement = renderFn(anchor);
        this._addSubmitHandler();
    }

    private _getFormData = (): Record<string, string> => {
        const formData = new FormData(this._formElement);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        return data;
    }

    private _handleFormSubmit = async (event: Event) => {
        event.preventDefault();
        const formData = this._getFormData();
        await this._onSubmit(formData);
        this._formElement.reset();
    }

    private _addSubmitHandler = () => {
        this._formElement.addEventListener('submit', this._handleFormSubmit);
    }

}