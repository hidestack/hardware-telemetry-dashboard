import mqtt from 'mqtt';

// Conecta ao nosso próprio Broker local
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('[Simulador] Conectado. A gerar dados de telemetria...');
  
  setInterval(() => {
    // Simula os dados da GPU 01
    const payloadGpu1 = {
      temp: Math.floor(Math.random() * (85 - 40) + 40) + '°C',
      gpuUsage: Math.floor(Math.random() * 100) + '%',
      vramUsage: '8GB'
    };
    client.publish('hardware/gpu-01/telemetry', JSON.stringify(payloadGpu1));

    // Simula os dados da GPU 02
    const payloadGpu2 = {
      temp: Math.floor(Math.random() * (75 - 35) + 35) + '°C',
      gpuUsage: Math.floor(Math.random() * 100) + '%',
      vramUsage: '12GB'
    };
    client.publish('hardware/gpu-02/telemetry', JSON.stringify(payloadGpu2));
    
  }, 3000);
});