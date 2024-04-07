const form = document.querySelector('#registerClient');

const nomeInput = document.querySelector('#nome');
const cpfInput = document.querySelector('#cpf');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = JSON.stringify({
        nome: nomeInput.value,
        cpf: cpfInput.value
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