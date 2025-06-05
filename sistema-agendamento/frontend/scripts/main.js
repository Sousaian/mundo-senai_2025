const API_URL = 'http://192.168.137.70:3333';

const eventsList = document.getElementById('events-list');
const form = document.getElementById('event-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const responsible = document.getElementById('responsible').value;

  const datetime = `${date}T${time}:00`;
  const selectedDate = new Date(datetime);
  const now = new Date();

  if (selectedDate < now) {
    alert("Insira uma data e hora futura.");
    return;
  }

  try {
    await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        date_time: datetime,
        responsible,
        rooms: [1]
      })
    });

    form.reset();
    loadEvents();
  } catch (error) {
    console.error('Erro ao criar evento:', error);
  }
});

async function loadEvents() {
  try {
    const response = await fetch(`${API_URL}/events`);
    const events = await response.json();

    eventsList.innerHTML = '';

    events.forEach(event => {
      const li = document.createElement('li');
      li.textContent = `${event.name_event} - ${event.date_time}`;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Excluir';
      deleteBtn.style.marginLeft = '10px';
      deleteBtn.addEventListener('click', () => deleteEvent(event.id_event));

      li.appendChild(deleteBtn);
      eventsList.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar eventos:', error);
  }
}

async function deleteEvent(id_event) {
  if (confirm('Tem certeza que deseja excluir este evento?')) {
    try {
      const response = await fetch(`${API_URL}/events/${id_event}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Evento excluído com sucesso!');
        loadEvents();
      } else {
        const errorData = await response.json();
        alert('Erro ao excluir: ' + errorData.message);
      }
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  }
}

loadEvents();
