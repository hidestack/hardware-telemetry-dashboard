import { hardwareMap } from '../services/telemetryService.js';

// Retorna todos os hardwares registados via MQTT
export const getHardwares = (req, res) => {
  // Converte o Map de memória num array para o enviar como JSON ao Vue.js
  const hardwares = Array.from(hardwareMap.values());
  res.json(hardwares);
};

// Altera o estado de um hardware específico para "alugado"
export const rentHardware = (req, res) => {
  const { id } = req.params;
  const hardware = hardwareMap.get(id);

  if (!hardware) {
    return res.status(404).json({ error: 'Hardware não encontrado no sistema.' });
  }

  if (hardware.status === 'alugado') {
    return res.status(400).json({ error: 'Este hardware já se encontra alugado.' });
  }

  // Atualiza o estado
  hardware.status = 'alugado';
  hardwareMap.set(id, hardware);

  res.json({ 
    message: `Hardware ${id} alugado com sucesso!`, 
    hardware 
  });
};