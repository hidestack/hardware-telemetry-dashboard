import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';

// Estabelece conexão com o Broker na porta 1883
export const mqttClient = mqtt.connect(brokerUrl);

mqttClient.on('connect', () => {
  console.log(`[MQTT] Conectado ao Broker em ${brokerUrl}`);
  
  // Inscreve no tópico wildcard de telemetria dos hardwares (ex: hardware/gpu-01/telemetry)
  mqttClient.subscribe('hardware/+/telemetry', (err) => {
    if (!err) {
      console.log('[MQTT] Inscrito com sucesso no tópico: hardware/+/telemetry');
    }
  });
});

mqttClient.on('error', (error) => {
  console.error('[MQTT] Erro na conexão:', error.message);
});