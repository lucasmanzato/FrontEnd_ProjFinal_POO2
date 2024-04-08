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

// Função para criar a estrutura HTML de um cliente
function createClientElement(client) {
    const clientElement = document.createElement('div');
    clientElement.classList.add('cliente');
    
    const clientInfo = `Cliente: ${client.clientName}, CPF: ${client.clientCPF}, Ano de Nascimento: ${client.clientBDay}`;
    clientElement.appendChild(createTextElement(clientInfo));
    
    const deleteButton = createDeleteButton(client.idClient);
    clientElement.appendChild(deleteButton);
    
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
        console.log(`Cliente com ID ${id} excluído com sucesso.`);
        getAllClients(); // Recarrega a lista de clientes após a exclusão
    } catch (error) {
        console.error("Erro na requisição:", error.message);
    }
}

// Chama a função para buscar todos os clientes ao carregar a página
getAllClients();
