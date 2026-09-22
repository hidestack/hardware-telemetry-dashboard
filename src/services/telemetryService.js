// Armazenamento em memória para guardar o último estado de cada hardware
export const hardwareMap = new Map();

export const handleMqttMessage = (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    const topicParts = topic.split('/');
    const hardwareId = topicParts[1];

    // Atualiza ou insere as métricas de telemetria recebidas
    const currentData = hardwareMap.get(hardwareId) || { status: 'disponivel' };
    
    hardwareMap.set(hardwareId, {
      ...currentData,
      id: hardwareId,
      temp: payload.temp,
      gpuUsage: payload.gpuUsage,
      vramUsage: payload.vramUsage,
      lastUpdated: new Date().toISOString()
    });

    console.log(`[Telemetria] Recebido de ${hardwareId}:`, payload);
  } catch (error) {
    console.error('[MQTT] Erro ao ler payload JSON:', error.message);
  }
};