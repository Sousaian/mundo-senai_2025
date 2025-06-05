const OPEN_CAGE_API_KEY = '1765be549cd94d9980aaac3916853904';
const cepOrigem = '74968539';
const form = document.getElementById("cep");
const cepInput = document.getElementById("cep_final");
const resultado = document.getElementById("preco-frete");

async function getCoordsByCep(cep) {
  const res1 = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!res1.ok) throw new Error("CEP inválido ou não encontrado");
  const data1 = await res1.json();
  const endereco = `${data1.logradouro || ''}, ${data1.localidade}, ${data1.uf}, Brasil`;

  const query = encodeURIComponent(endereco);
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${OPEN_CAGE_API_KEY}&language=pt&countrycode=br&limit=1`;

  const res2 = await fetch(url);
  const data2 = await res2.json();

  if (!data2.results.length) throw new Error("Não foi possível obter coordenadas para o CEP.");

  const location = data2.results[0].geometry;
  return { lat: location.lat, lng: location.lng };
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calcularFrete(distanciaKm) {
  const precoBase = 10;
  const precoPorKm = 0.5;
  return precoBase + distanciaKm * precoPorKm;
}

async function calcularFreteDestino(cepDestino) {
  try {
    const origem = await getCoordsByCep(cepOrigem);
    const destino = await getCoordsByCep(cepDestino);

    const distancia = haversine(origem.lat, origem.lng, destino.lat, destino.lng);
    const frete = calcularFrete(distancia);

    console.log(`Distância: ${distancia.toFixed(2)} km`);
    console.log(`Frete: R$ ${frete.toFixed(2)}`);
    return {
      distancia: distancia.toFixed(2),
      frete: frete.toFixed(2)
    };
  } catch (error) {
    console.error("Erro ao calcular frete:", error.message);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cep = cepInput.value.replace(/\D/g, '');
    resultado.textContent = "Calculando...";

    const res = await calcularFreteDestino(cep);
    if (res) {
      resultado.innerHTML = `
        Distância estimada: <strong>${res.distancia} km</strong><br>
        Valor do frete: <strong>R$ ${res.frete}</strong>
      `;
    } else {
      resultado.textContent = "Erro ao calcular o frete. Verifique o CEP.";
    }
  });
});
