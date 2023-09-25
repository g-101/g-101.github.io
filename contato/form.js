class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("action");
            this.validationErrors = null;
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.settings.success;
    }

    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    validateFields() {
        this.validationErrors = [];
        const emailPattern =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            if (!field.value) {
                this.validationErrors.push(`O campo ${field.name} é obrigatório.`);
            }
        });

        const emailField = this.form.querySelectorAll("[type='email']");
        emailField.forEach((field) => {
            if (!field.value.match(emailPattern)) {
                this.validationErrors.push(
                    `O campo ${field.name} não está em um formato de e-mail válido.`
                );
            }
        });

        return this.validationErrors.length === 0;
    }

    getForm() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            if (this.validateFields()) {
                formObject[field.getAttribute("name")] = field.value;
            }
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando...";
    }

    async sendForm(event) {
        const formJSON = JSON.stringify(this.getForm());
        if (formJSON !== "{}") {
            try {
                this.onSubmission(event);
                await fetch(this.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: formJSON,
                });
                this.displaySuccess();
            } catch (error) {
                this.displayError();
                throw new Error(error);
            }
        } else {
            this.validationErrors.forEach((error) => {
                alert(error);
            });
            return;
        }
    }

    init() {
        if (this.form) this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();
