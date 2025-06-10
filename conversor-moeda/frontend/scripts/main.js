const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');

const converterBtn = document.getElementById('converter');
const resultadoDiv = document.getElementById('resultadoDiv'); // Corrigido ID aqui

// Abertura e fechamento do modal
openModal.addEventListener('click', () => {
    modal.style.display = 'flex';
    resultadoDiv.innerHTML = ''; // limpa resultado ao abrir
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    resultadoDiv.innerHTML = ''; // limpa resultado ao fechar
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        resultadoDiv.innerHTML = '';
    }
});

// Função de conversão
converterBtn.addEventListener('click', async () => {
    const from = document.getElementById('fromCurrency').value.trim().toUpperCase();
    const to = document.getElementById('toCurrency').value.trim().toUpperCase();
    const amount = document.getElementById('amount').value.trim();

    if (!from || !to || !amount) {
        resultadoDiv.innerHTML = '<p style="color: red;">Preencha todos os campos.</p>';
        return;
    }

    try {
        const response = await fetch(`http://10.140.29.71:3010/api/converter?from=${from}&to=${to}&amount=${amount}`);

        if (!response.ok) {
            let msg = 'Erro na requisição';
            try {
                const errorData = await response.json();
                msg = errorData.error || msg;
            } catch (_) {}
            resultadoDiv.innerHTML = `<p style="color: red;">Erro: ${msg}</p>`;
            return;
        }

        const data = await response.json();

        resultadoDiv.innerHTML = `
            <p><strong>${data.amount} ${data.from}</strong> equivale a <strong>${data.converted} ${data.to}</strong></p>
            <p>Taxa de câmbio: 1 ${data.from} = ${data.rate} ${data.to}</p>
            <p><small>Atualizado em: ${new Date(data.timestamp * 1000).toLocaleString()}</small></p>
        `;
    } catch (error) {
        console.error('Erro na requisição:', error);
        resultadoDiv.innerHTML = '<p style="color: red;">Erro ao conectar com a API.</p>';
    }
});
