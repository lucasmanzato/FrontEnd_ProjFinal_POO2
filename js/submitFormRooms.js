const form = document.querySelector('#registerRoom');

const numQuartoInput = document.getElementById('numQuarto');
const cpfInput = document.getElementById('cpf');
const dataEntradaInput = document.getElementById('dataEntrada');
const dataSaidaInput = document.getElementById('dataSaida');
const submitButton = document.querySelector('input[type="submit"]');
const removerButton = document.querySelector('input[type="button"]');


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = JSON.stringify({
        numQuarto: numQuartoInput.value,
        cpf: cpfInput.value,
        dataEntrada: dataEntradaInput.value,
        dataSaida: dataSaidaInput.value
    })

    console.log(data)

    const url = 'http://localhost:8080/rooms'; 

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        if (response.ok) {
            console.log('Dados enviados com sucesso!');
            // Faça algo com a resposta da API, se necessário
        } else {
            console.error('Erro ao enviar os dados:', response.status);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});