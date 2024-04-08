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

// Função para criar um botão de editar
function createEditButton(room) {
    const button = document.createElement('button');
    button.textContent = 'Editar';
    button.addEventListener('click', function() {
        openEditModal(room);
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
    const editButton = createEditButton(room);
    roomElement.appendChild(deleteButton);
    roomElement.appendChild(editButton);
    
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

// Função para abrir o modal de edição
// Função para abrir o modal de edição
function openEditModal(room) {
  const modal = document.getElementById('modal');
  const modalContent = document.querySelector('.modal-content');
  const closeModalButton = document.querySelector('.close');
  
  // Preencher os campos do formulário com os dados da reserva
  document.getElementById('clientName').value = room.clientName;
  document.getElementById('clientCPF').value = room.clientCPF;
  document.getElementById('inDate').value = room.inDate;
  document.getElementById('outDate').value = room.outDate;
  document.getElementById('numberRoom').value = room.numberRoom;
  document.getElementById('roomType').value = room.roomType;
  document.getElementById('cafeDaManha').checked = room.cafeDaManha;
  
  // Exibir o modal
  modal.style.display = 'block';
  
  // Fechar o modal ao clicar no botão de fechar ou fora do modal
  closeModalButton.onclick = function() {
      modal.style.display = 'none';
  }
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  }
  
  // Lidar com o envio do formulário
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.onsubmit = function(event) {
      event.preventDefault();
      const editedBookingData = {
          clientName: document.getElementById('clientName').value,
          clientCPF: document.getElementById('clientCPF').value,
          inDate: document.getElementById('inDate').value,
          outDate: document.getElementById('outDate').value,
          numberRoom: document.getElementById('numberRoom').value,
          roomType: document.getElementById('roomType').value,
          cafeDaManha: document.getElementById('cafeDaManha').checked
      };
      // Aqui você pode enviar os dados editados como JSON para o servidor
      // e depois recarregar as reservas na página
      console.log('Dados do formulário enviado:', editedBookingData);
      modal.style.display = 'none'; // Fechar o modal após enviar os dados
  }
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


// Chama a função para buscar todas as reservas ao carregar a página
getAllRooms();
