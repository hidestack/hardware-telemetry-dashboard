import dotenv from 'dotenv';
import app from './app.js';
import { startBroker } from './config/broker.js';
import { mqttClient } from './config/mqtt.js';
import { handleMqttMessage } from './services/telemetryService.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Envolvemos a inicialização numa função async
const initApp = async () => {
  // 1. Aguarda o Broker iniciar
  await startBroker();

  // 2. Ouve as mensagens
  mqttClient.on('message', (topic, message) => {
    handleMqttMessage(topic, message);
  });

  // 3. Inicia a API REST
  app.listen(PORT, () => {
    console.log(`[HTTP] Servidor Express a correr na porta ${PORT}`);
  });
};

initApp();