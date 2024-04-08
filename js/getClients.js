const url = "http://localhost:8080/clients";

function inserirClientes(jsonData) {
    var divPai = document.getElementById('clientsContainer'); // Obtém a div pai

    // Verifica se a div pai existe
    if (divPai) {
        // Itera sobre os dados do JSON
        jsonData.forEach(function(cliente) {
            // Cria uma nova div para cada cliente
            var divCliente = document.createElement('div');
            divCliente.classList.add('cliente'); // Adiciona uma classe à div do cliente

            // Cria e preenche os elementos de texto com as informações do cliente
            var textoCliente = document.createElement('p');
            textoCliente.textContent = `Cliente: ${cliente.clientName}, CPF: ${cliente.clientCPF}, Ano de Nascimento: ${cliente.clientBDay}`;

            // Adiciona o texto do cliente à div do cliente
            divCliente.appendChild(textoCliente);

            // Adiciona a div do cliente à div pai
            divPai.appendChild(divCliente);
        });
    } else {
        console.error('A div pai com o ID especificado não foi encontrada.');
    }
}

async function getAllRooms() {
  try {
    const response = await fetch(url, {method: 'GET'});

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json(); 

    console.log("Dados da API:", data);

    inserirClientes(data);

  } catch (error) {
    console.error("Erro na requisição:", error.message);
  }
}

getAllRooms();
