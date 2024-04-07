document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    // Obtenha os valores dos campos do formulário
    var clientName = document.getElementById('clientName').value;
    var clientCPF = document.getElementById('clientCPF').value;
    var inDate = document.getElementById('inDate').value;
    var outDate = document.getElementById('outDate').value;
    var numberRoom = document.getElementById('numberRoom').value;
    var roomType = document.getElementById('roomType').value;
    var cafeDaManha = document.getElementById('cafeDaManha').checked;

    // Crie um objeto JSON com os valores
    var data = {
        clientName: clientName,
        clientCPF: clientCPF,
        inDate: inDate,
        outDate: outDate,
        numberRoom: numberRoom,
        roomType: roomType,
        cafeDaManha: cafeDaManha
    };

    // Converta o objeto JSON em uma string
    var jsonData = JSON.stringify(data);

    // Defina a URL para enviar os dados
    var url = 'http://localhost:8080/rooms';

    // Faça uma solicitação POST usando Fetch API
    fetch(url, {
        method: 'POST',
        body: jsonData,
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        // Faça algo com a resposta, se necessário
    })
    .catch(error => {
        console.error('Erro:', error);
        // Trate o erro, se necessário
    });
});