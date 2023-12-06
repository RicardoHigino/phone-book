import validator from 'validator'

export default class Contato {
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        for(let errorText of this.form.querySelectorAll('.alert-danger')) errorText.remove();
        const el = e.target;
        const nameInput = el.querySelector('input[name="nome"]');
        const surnameInput = el.querySelector('input[name="sobrenome"]')
        const emailInput = el.querySelector('input[name="email"]');
        const phoneInput = el.querySelector('input[name="telefone"]')
        let error = false;

        if(!nameInput.value || typeof nameInput.value !== 'string'){
            this.criaErro(nameInput, 'Nome precisa ser preenchido.');
            error = true;
        }

        if(!surnameInput.value){
            this.criaErro(surnameInput, 'Sobrenome inválido.')
            error = true;
        }

        if(!validator.isEmail(emailInput.value)) {
            this.criaErro(emailInput, 'E-mail inválido.')
            error = true;
        }

        // only numbers
        if(!validator.isNumeric(phoneInput.value) || phoneInput.value.length < 9){
            this.criaErro(phoneInput, 'Telefone inválido.')
            error = true;
        }
        
        if(!error) el.submit();
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('alert-danger');
        campo.insertAdjacentElement('afterend', div)
    }
}