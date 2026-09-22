<template>
  <div class="dashboard">
    <header>
      <h1>🖥️ Monitor de Ativos & Telemetria IoT</h1>
      <p>Acompanhamento de GPUs e gestão de aluguer em tempo real</p>
    </header>

    <div v-if="hardwares.length === 0" class="loading">
      A aguardar dados de telemetria do broker MQTT...
    </div>

    <div class="grid" v-else>
      <div 
        v-for="item in hardwares" 
        :key="item.id" 
        class="card"
        :class="{ rented: item.status === 'alugado' }"
      >
        <div class="card-header">
          <h2>{{ item.id.toUpperCase() }}</h2>
          <span class="badge" :class="item.status || 'disponivel'">
            {{ item.status === 'alugado' ? 'Alugada' : 'Disponível' }}
          </span>
        </div>

        <div class="metrics">
          <div class="metric">
            <span class="label">Temperatura:</span>
            <span class="value temp">{{ item.temp || 'N/A' }}</span>
          </div>
          <div class="metric">
            <span class="label">Uso de GPU:</span>
            <span class="value">{{ item.gpuUsage || 'N/A' }}</span>
          </div>
          <div class="metric">
            <span class="label">VRAM:</span>
            <span class="value">{{ item.vramUsage || 'N/A' }}</span>
          </div>
        </div>

        <div class="actions">
          <!-- Botão que altera dinamicamente com base no estado do aluguer -->
          <button 
            v-if="item.status !== 'alugado'" 
            class="btn-rent"
            @click="rentGpu(item.id)"
          >
            Alugar Agora
          </button>
          <span v-else class="rented-label">
            ✓ Unidade Reservada
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

const hardwares = ref([]);
let intervalId = null;

// Procura os dados atualizados no back-end
const fetchHardwares = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/hardwares');
    hardwares.value = response.data;
  } catch (error) {
    console.error('Erro ao procurar dados dos hardwares:', error);
  }
};

// Envia a requisição de aluguer para a API
const rentGpu = async (id) => {
  try {
    await axios.post(`http://localhost:3000/api/hardwares/${id}/rent`);
    await fetchHardwares(); // Atualiza a lista imediatamente
  } catch (error) {
    alert(error.response?.data?.error || 'Erro ao processar aluguer.');
  }
};

onMounted(() => {
  fetchHardwares();
  // Atualiza a interface a cada 2 segundos com as novas métricas do MQTT
  intervalId = setInterval(fetchHardwares, 2000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}

header {
  text-align: center;
  margin-bottom: 2.5rem;
}

header h1 {
  margin-bottom: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.card.rented {
  border-color: #cbd5e1;
  background-color: #f8fafc;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: #dcfce7;
  color: #166534;
}

.badge.alugado {
  background-color: #f1f5f9;
  color: #475569;
}

.metrics {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

.metric .value {
  font-weight: bold;
}

.metric .temp {
  color: #e11d48;
}

.actions {
  text-align: center;
}

.btn-rent {
  width: 100%;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-rent:hover {
  background-color: #1d4ed8;
}

.rented-label {
  color: #16a34a;
  font-weight: bold;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
}
</style>