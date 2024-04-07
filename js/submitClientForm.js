const form = document.querySelector('#registerClient');

const clientNameInput = document.querySelector('#clientName');
const clientCPFInput = document.querySelector('#clientCPF');
const clientBDayInput = document.querySelector('#clientBDay');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const clientBDay = new Date(clientBDayInput.value);
    const clientBDayInt = clientBDay.getFullYear(); 

    const data = JSON.stringify({
        clientName: clientNameInput.value,
        clientCPF: clientCPFInput.value,
        clientBDay: clientBDayInt
    });

    console.log(data);

    const url = 'http://localhost:8080/clients'; 

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        if (response.ok) {
            console.log('Dados enviados com sucesso!');
        } else {
            console.error('Erro ao enviar os dados:', response.status);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});
