const url = "http://localhost:8080/rooms";

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
        deleteRoom(id);
    });
    return button;
}

// Função para criar a estrutura HTML de uma reserva
function createRoomElement(room) {
    const roomElement = document.createElement('div');
    roomElement.classList.add('reserva');
    
    const roomInfo = `Cliente: ${room.clientName}, CPF: ${room.clientCPF}, Tipo de quarto: ${room.roomType}, Número do quarto: ${room.numberRoom}, Café da manhã: ${room.cafeDaManha ? 'Sim' : 'Não'}, Data de entrada: ${room.inDate}, Data de saída: ${room.outDate}`;
    roomElement.appendChild(createTextElement(roomInfo));
    
    const deleteButton = createDeleteButton(room.idRoom);
    roomElement.appendChild(deleteButton);
    
    return roomElement;
}

// Função para inserir as reservas na interface HTML
function insertRooms(rooms) {
    const roomsContainer = document.getElementById('roomsContainer');
    if (roomsContainer) {
        roomsContainer.innerHTML = ''; // Limpa o conteúdo antes de inserir as novas reservas
        rooms.forEach(room => {
            const roomElement = createRoomElement(room);
            roomsContainer.appendChild(roomElement);
        });
    } else {
        console.error('A div pai com o ID especificado não foi encontrada.');
    }
}

// Função para buscar todas as reservas da API
async function getAllRooms() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const roomsData = await response.json();
        insertRooms(roomsData);
    } catch (error) {
        console.error("Erro na requisição:", error.message);
    }
}

// Função para excluir uma reserva
async function deleteRoom(id) {
    const deleteUrl = `${url}/${id}`;
    try {
        const response = await fetch(deleteUrl, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        console.log(`Reserva com ID ${id} excluída com sucesso.`);
        getAllRooms(); // Recarrega a lista de reservas após a exclusão
    } catch (error) {
        console.error("Erro na requisição:", error.message);
    }
}

// Chama a função para buscar todas as reservas ao carregar a página
getAllRooms();
