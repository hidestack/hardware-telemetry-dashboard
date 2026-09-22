import Aedes from 'aedes';
import net from 'net';

const port = 1883;

export const startBroker = async () => {
  try {
    // Utiliza o método estático createBroker() da classe Aedes
    const broker = typeof Aedes.createBroker === 'function' 
      ? await Aedes.createBroker() 
      : new Aedes();

    const server = net.createServer(broker.handle);

    server.listen(port, () => {
      console.log(`[Broker] Servidor MQTT interno a ouvir na porta ${port}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`[Broker] A porta ${port} já está em uso por outro processo local. O servidor continuará a rodar.`);
      } else {
        console.error('[Broker] Erro no servidor MQTT:', err.message);
      }
    });
  } catch (error) {
    console.error('[Broker] Erro ao criar a instância do Aedes:', error.message);
  }
};