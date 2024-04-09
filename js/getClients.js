const url = "http://localhost:8080/clients";

// Função para criar um elemento de texto
function createTextElement(text) {
    const element = document.createElement('p');
    element.textContent = text;
    return element;
}

// Função para criar um botão de exclusão
function createDeleteButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Excluir';
    button.addEventListener('click', function() {
        deleteClient(id);
    });
    return button;
}

// Função para criar um botão de edição
function createEditButton(client) {
    const button = document.createElement('button');
    button.textContent = 'Editar';
    button.addEventListener('click', function() {
        openEditModal(client);
    });
    return button;
}

function openEditModal(client) {
    // Preencher os campos do formulário com os dados do cliente
    document.getElementById('clientName').value = client.clientName;
    document.getElementById('clientCPF').value = client.clientCPF;
    document.getElementById('clientBDay').value = client.clientBDay;

    // Bloquear a edição do campo CPF
    document.getElementById('clientCPF').readOnly = true;

    // Exibir o modal
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    // Adicionar evento para fechar o modal ao clicar no botão de fechar
    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    // Adicionar evento para fechar o modal ao clicar fora dele
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}


// Função para criar a estrutura HTML de um cliente
function createClientElement(client) {
    const clientElement = document.createElement('div');
    clientElement.classList.add('cliente');
    
    const clientInfo = `Cliente: ${client.clientName}, CPF: ${client.clientCPF}, Ano de Nascimento: ${client.clientBDay}`;
    clientElement.appendChild(createTextElement(clientInfo));
    
    const deleteButton = createDeleteButton(client.idClient);
    const editButton = createEditButton(client); // Adicione o botão de editar
    clientElement.appendChild(deleteButton);
    clientElement.appendChild(editButton); // Adicione o botão de editar
    
    return clientElement;
}

// Função para inserir os clientes na interface HTML
function insertClients(clients) {
    const clientsContainer = document.getElementById('clientsContainer');
    if (clientsContainer) {
        clientsContainer.innerHTML = ''; // Limpa o conteúdo antes de inserir os novos clientes
        clients.forEach(client => {
            const clientElement = createClientElement(client);
            clientsContainer.appendChild(clientElement);
        });
    } else {
        console.error('A div pai com o ID especificado não foi encontrada.');
    }
}

// Função para buscar todos os clientes da API
async function getAllClients() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const clientsData = await response.json();
        console.log(clientsData);

        for (const client of clientsData){
            clientsId[client.clientCPF] = client.idClient
        }

        insertClients(clientsData);
    } catch (error) {
        console.error("Erro na requisição:", error.message);
    }
}

// Função para excluir um cliente
async function deleteClient(id) {
    const deleteUrl = `${url}/${id}`;
    try {
        const response = await fetch(deleteUrl, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        getAllClients(); // Recarrega a lista de clientes após a exclusão
    } catch (error) {
        console.error("Erro na requisição:", error.message);
    }
}

// Função para abrir o modal de edição
const editForm = document.getElementById('editForm');
editForm.onsubmit = function(event) {
    event.preventDefault();
    const editedClientData = {
        clientName: document.getElementById('clientName').value,
        clientCPF: document.getElementById('clientCPF').value,
        clientBDay: parseInt(document.getElementById('clientBDay').value.split('-')[0])
    };

    // Aqui você precisa substituir {id} com o ID real do cliente
    const clientId = clientsId[editedClientData.clientCPF];

    console.log("Elemento 'clientCPF' encontrado:", document.getElementById('clientCPF'));
    console.log("Valor do campo 'clientCPF':", document.getElementById('clientCPF').value);
    console.log("ID do cliente:", clientId);
    console.log("Enviando dados editados do cliente:", JSON.stringify(editedClientData));
    

    fetch(`http://localhost:8080/clients/${clientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedClientData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar os dados.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados do servidor após edição:', data);
        // Aqui você pode atualizar os detalhes do cliente na interface do usuário
        // Exemplo: document.getElementById('clientDetails').innerText = JSON.stringify(data);
        modal.style.display = 'none'; // Fechar o modal após enviar os dados
        getAllClients();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}


// Função auxiliar para serializar os dados do formulário em um objeto JSON
function serializeFormData(form) {
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    return jsonData;
}

// Chama a função para buscar todos os clientes ao carregar a página
getAllClients();
var clientsId = {};
