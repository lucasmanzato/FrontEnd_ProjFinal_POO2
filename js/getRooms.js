const url = "http://localhost:8080/rooms";

function inserirReservas(jsonData) {
  var divPai = document.getElementById('roomsContainer'); // Obtém a div pai

  // Verifica se a div pai existe
  if (divPai) {
      // Itera sobre os dados do JSON
      jsonData.forEach(function(reserva) {
          // Cria uma nova div para cada reserva
          var divReserva = document.createElement('div');
          divReserva.classList.add('reserva'); // Adiciona uma classe à div da reserva

          // Cria e preenche os elementos de texto com as informações da reserva
          var textoReserva = document.createElement('p');
          textoReserva.textContent = `Cliente: ${reserva.clientName}, CPF: ${reserva.clientCPF}, Tipo de quarto: ${reserva.roomType}, Número do quarto: ${reserva.numberRoom}, Café da manhã: ${reserva.cafeDaManha ? 'Sim' : 'Não'}, Data de entrada: ${reserva.inDate}, Data de saída: ${reserva.outDate}`;

          // Adiciona o texto da reserva à div da reserva
          divReserva.appendChild(textoReserva);

          // Adiciona a div da reserva à div pai
          divPai.appendChild(divReserva);
      });
  } else {
      console.error('A div pai com o ID especificado não foi encontrada.');
  }
}

async function getAllRooms() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json(); 

    console.log("Dados da API:", data);

    inserirReservas(data);

  } catch (error) {
    console.error("Erro na requisição:", error.message);
  }
}

getAllRooms();
