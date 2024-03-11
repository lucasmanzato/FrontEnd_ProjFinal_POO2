const url = "https://localhost:8080/rooms";

async function getAllRooms() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json(); // Converte a resposta para JSON

    console.log("Dados da API:", data);
  } catch (error) {
    console.error("Erro na requisição:", error.message);
  }
}

getAllRooms();
