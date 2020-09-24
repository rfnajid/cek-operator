const { getOperator } = window.NoTelp;

const tel = document.getElementById("tel");
const submitButton = document.getElementById("submit-button");
const error = document.getElementById("error");
const resultCard = document.getElementById("result-card");
const logoOperator = document.getElementById("logo-operator");
const operator = document.getElementById("operator");
const card = document.getElementById("card");

const init = () => {
    tel.addEventListener('change', checkOperator);
    submitButton.addEventListener('click', checkOperator);
}

const setError = (message) => {
    document.getElementById("error").innerHTML = message ;
}

const show = (element) => {
    element.style.display = "block";
}

const hide = (element) => {
    element.style.display = "none";
}

const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

const setMessage = (message) => {
    switch (message) {
        case "INVALID":
            message = "Nomor Invalid";
            break;
        case "BELOW MINIMUM LENGTH":
            message = "Nomor kurang panjang";
            break;
        case "ABOVE MAXIMUM LENGTH":
            message = "Nomor terlalu panjang";
            break;
        case "NOT FOUND":
            message = "Nomor tidak diketahui";
            break;
    }
    error.innerHTML = message;
}

const setOperatorLogo = (operator) => {
    operator = toKebabCase(operator);
    logoOperator.src = "assets/images/operator/" + operator + ".jpg";
}

const setResult = (result) => {

    operator.value = result.operator;
    card.value = result.card;
    setMessage(result.message);
    setOperatorLogo(result.operator);

    if(result.valid){
        hide(error)
        show(resultCard);
    }else{
        hide(resultCard);
        show(error);
    }
}

const checkOperator = () => {
    // result object => { operator : string, card: string, message: string, valid: boolean}
    const result = getOperator(tel.value, true);
    setResult(result);
}


init();