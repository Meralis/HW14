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
    const warnings = document.querySelectorAll('.warning');
    warnings.forEach(warning => warning.remove());
    let isFormValid = true;
    inputs.forEach(input => {
        if (!input.value) {
            input.parentElement.insertBefore(warningSpan.cloneNode(true), input);
            isFormValid = false;
        }
    });
    return isFormValid;
}

function buildOrderBlock(formObject) {
    const orderBlock = document.createElement('div');

    const fullNameElement = document.createElement('p');
    fullNameElement.textContent = `ПІБ: ${formObject.full_name}`;
    orderBlock.appendChild(fullNameElement);

    const cityElement = document.createElement('p');
    cityElement.textContent = `Місто: ${formObject.city}`;
    orderBlock.appendChild(cityElement);

    const novaPoshtaElement = document.createElement('p');
    novaPoshtaElement.textContent = `Відділення НП: ${formObject.novaPoshtaBranch}`;
    orderBlock.appendChild(novaPoshtaElement);

    const paymentTypeElement = document.createElement('p');
    paymentTypeElement.textContent = `Тип оплати: ${formObject.payment_type}`;
    orderBlock.appendChild(paymentTypeElement);

    const quantityElement = document.createElement('p');
    quantityElement.textContent = `Кількість: ${formObject.quantity}`;
    orderBlock.appendChild(quantityElement);

    const commentElement = document.createElement('p');
    commentElement.textContent = `Коментар: ${formObject.comment}`;
    orderBlock.appendChild(commentElement);

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