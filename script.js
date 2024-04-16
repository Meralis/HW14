const form = document.querySelector('.form');
const submitButton = document.querySelector('.submit');
const buyButton = document.querySelector('.buyButton');
const inputs = document.querySelectorAll('input');
const emptyWarningMsg = {
    className: 'emptyFieldWarning',
    message: 'Це поле не може бути пустим',
    selector: '.emptyFieldWarning'
}
const incorrectWarningMsg = {
    className: 'incorrectFieldWarning',
    message: 'Дані введено некорректно',
    selector: '.incorrectFieldWarning'
}
const regexes = {
    'full_name': /^[A-ZА-Я][a-zа-я]+ [A-ZА-Я][a-zа-я]+ [A-ZА-Я][a-zа-я]+$/,
    'phone': /^(?=(?:.*\d){10})\+?\d{0,3}[-()]?\d{2,3}[-()]?\d{3}-?\d{2}-?\d{2}$/,
    'email': /^[a-z0-9._%+-]{5,}@[a-z0-9.-]+\.[a-z]{2,}$/i,
};

buyButton.addEventListener('click', () => form.classList.add('visible'));
form.addEventListener('input', handleChange);

function buildAddInsertWarning(warningMsg, input) {
    const span = document.createElement('span');
    span.textContent = warningMsg.message;
    span.classList.add(warningMsg.className);
    input.parentElement.insertBefore(span, input);
}

function validateInput(input) {
    const regex = regexes[input.name] || null;
    let isInputValid = regex ? regex.test(input.value) : true;
    if (!isInputValid) {
        buildAddInsertWarning(incorrectWarningMsg, input);
    }
    return isInputValid;
}

function handleChange(e) {
    if (e.target.tagName === 'INPUT') {
        const input = e.target;
        input.parentElement.querySelectorAll(`${emptyWarningMsg.selector}, ${incorrectWarningMsg.selector}`).forEach(warning => warning.remove());
        if (!input.value) {
            buildAddInsertWarning(emptyWarningMsg, input);
        }
        if (input.value) {
            validateInput(input);
        }
    }
}

function validateForm() {
    document.querySelectorAll(`${emptyWarningMsg.selector}, ${incorrectWarningMsg.selector}`).forEach(warning => warning.remove());
    let isFormValid = true;
    inputs.forEach(input => {
        if (!input.value) {
            buildAddInsertWarning(emptyWarningMsg, input);
            isFormValid = false;
        } else {
            isFormValid = validateInput(input) && isFormValid;
        }
    });
    const incorrectWarnings = document.querySelectorAll(incorrectWarningMsg.selector);
    if (incorrectWarnings.length) isFormValid = false;
    return isFormValid;
}

function buildOrderItem(description, fieldName) {
    let element = document.createElement('p');
    element.textContent = `${description}: ${fieldName}`;
    return element;
}

function buildOrderBlock(formObject) {
    const orderBlock = document.createElement('div');
    orderBlock.appendChild(buildOrderItem('ПІБ', formObject.full_name));
    orderBlock.appendChild(buildOrderItem('Номер телефону', formObject.phone));
    orderBlock.appendChild(buildOrderItem('Email', formObject.email));
    orderBlock.appendChild(buildOrderItem('Місто', formObject.city));
    orderBlock.appendChild(buildOrderItem('Відділення НП', formObject.novaPoshtaBranch));
    orderBlock.appendChild(buildOrderItem('Тип оплати', formObject.payment_type));
    orderBlock.appendChild(buildOrderItem('Кількість', formObject.quantity));
    if (formObject.comment) {
        orderBlock.appendChild(buildOrderItem('Коментар', formObject.comment));
    }
    return orderBlock;
}

function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        const orderBlock = buildOrderBlock(formObject);
        form.classList.remove('visible');
        form.parentElement.insertBefore(orderBlock, form);
        form.reset();
    }
}

form.addEventListener('submit', handleSubmit);