document.getElementById('cpfForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cpf = document.getElementById('cpf').value;
    const resultElement = document.getElementById('result');

    if (validateCPF(cpf)) {
        resultElement.textContent = 'CPF é válido!';
        resultElement.style.color = 'green';
        resultElement.classList.remove('invalid');
    } else {
        resultElement.textContent = 'CPF é inválido!';
        resultElement.style.color = 'red';
        resultElement.classList.add('invalid');
    }
});

document.getElementById('generateBtn').addEventListener('click', function() {
    const generatedCpf = generateCPF();
    document.getElementById('generatedCpf').textContent = generatedCpf;
    document.getElementById('copyBtn').style.display = 'inline-block';
});

document.getElementById('copyBtn').addEventListener('click', function() {
    const generatedCpf = document.getElementById('generatedCpf').textContent;
    navigator.clipboard.writeText(generatedCpf).then(() => {
        alert('CPF copiado para a área de transferência!');
    });
});

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;

    return true;
}

function generateCPF() {
    let cpf = '';
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10).toString();
    }

    cpf += calculateDigit(cpf);
    cpf += calculateDigit(cpf);

    return formatCPF(cpf);
}

function calculateDigit(cpf) {
    let sum = 0;
    let multiplier = cpf.length + 1;

    for (let i = 0; i < cpf.length; i++) {
        sum += parseInt(cpf.charAt(i)) * multiplier--;
    }

    let remainder = 11 - (sum % 11);
    return remainder > 9 ? '0' : remainder.toString();
}

function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
