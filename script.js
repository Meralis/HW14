const form = document.querySelector('.form');
const submitButton = document.querySelector('.submit');
const warningSpan = document.createElement('span');
const buyButton = document.querySelector('.buyButton');
const inputs = document.querySelectorAll('input');
warningSpan.textContent = 'Це поле не може бути пустим';
warningSpan.classList.add('warning');

buyButton.addEventListener('click', () => form.classList.add('visible'));

function handleChange(e) {
    const input = e.target;
    let warningSpan = input.parentElement.querySelector('.warning');
    if (!input.value) {
        if (!warningSpan) {
            warningSpan = document.createElement('span');
            warningSpan.textContent = 'Це поле не може бути пустим';
            warningSpan.classList.add('warning');
            input.parentElement.insertBefore(warningSpan, input);
        }
    } else {
        if (warningSpan) {
            warningSpan.remove();
        }
    }
}
inputs.forEach(input => input.addEventListener('input', handleChange));

function validateForm() {
    document.querySelectorAll('.warning').forEach(warning => warning.remove());
    let isFormValid = true;
    inputs.forEach(input => {
        if (!input.value) {
            input.parentElement.insertBefore(warningSpan.cloneNode(true), input);
            isFormValid = false;
        }
    });
    return isFormValid;
}

function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        console.log(formObject);
        form.reset();
    }
}

form.addEventListener('submit', handleSubmit);