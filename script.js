document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.inputButton').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o envio do formulário por padrão

            // Define as variáveis para verificação
            let camposVazios = false;
            let formMessage = '';

            // Identifica o formulário a partir do botão que foi clicado
            const form = button.closest('form');
            const formId = form.getAttribute('id'); // Adicione um atributo 'id' único a cada <form> no HTML

            // Verifica qual formulário está sendo submetido e configura a mensagem e campos apropriados
            switch(formId) {
                case 'cadCliente':
                    const nome = document.getElementById('nome')?.value.trim();
                    const cpfCliente = document.getElementById('cpf')?.value.trim();
                    const dataNasc = document.getElementById('dataNasc')?.value.trim();
                    camposVazios = !nome || !cpfCliente || !dataNasc;
                    formMessage = 'Formulário de cadastro do cliente preenchido corretamente.';
                    break;
                case 'quartoCliente':
                    const numQuartoCliente = document.getElementById('numQuarto')?.value.trim();
                    const cpfQuarto = document.getElementById('cpf')?.value.trim();
                    const dataEntrada = document.getElementById('dataEntrada')?.value.trim();
                    const dataSaida = document.getElementById('dataSaida')?.value.trim();
                    camposVazios = !numQuartoCliente || !cpfQuarto || !dataEntrada || !dataSaida;
                    formMessage = 'Formulário de cliente e quarto preenchido corretamente.';
                    break;
                case 'regQuarto':
                    const numQuartoReg = document.getElementById('numQuarto')?.value.trim();
                    const tipoQuarto = document.getElementById('tipoQuarto')?.value.trim();
                    camposVazios = !numQuartoReg || !tipoQuarto;
                    formMessage = 'Formulário de registro de quarto preenchido corretamente.';
                    break;
                default:
                    console.error('Formulário desconhecido');
            }

            // Verifica se algum campo está vazio
            if (camposVazios) {
                alert('Por favor, preencha todos os campos antes de enviar.');
                return false;
            } else {
                alert(formMessage);
                // Aqui, você poderia realmente enviar o formulário se quisesse.
            }
        });
    });
});
