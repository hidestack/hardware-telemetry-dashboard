# 🖥️ Hardware Telemetry & Asset Management Dashboard

Uma plataforma Fullstack em tempo real para monitorização de telemetria de componentes de hardware (GPUs/Servidores) e gestão de locação de ativos, utilizando **Node.js**, **Vue.js** e o protocolo **MQTT**.

---

## 🚀 Tecnologias Utilizadas

### **Front-end**
- **Vue.js 3** (Composition API)
- **Vite** (Build tool)
- **Axios** (Consumo de API REST)

### **Back-end & Mensageria**
- **Node.js** com **ESModules** (import/export)
- **Express.js** (API REST e rotas)
- **Aedes** (Broker MQTT interno embutido)
- **MQTT.js** (Cliente MQTT para subscrição de tópicos)
- **Dotenv** & **CORS**
  
---

## 🛠️ Arquitetura do Sistema

1. **Simulador / Hardware Real:** Emite métricas de telemetria (temperatura, utilização de GPU e VRAM) para o tópico MQTT `hardware/+/telemetry`.
2. **Broker MQTT (Aedes):** Processa e distribui as mensagens na porta `1883`.
3. **Servidor Node.js:** Subscreve o broker, mantém o estado em memória dos componentes e expõe endpoints REST.
4. **Interface Vue.js:** Consome a API REST e atualiza dinamicamente a interface com os dados mais recentes.

---

📁 Estrutura de Diretórios
```bash
hardware-telemetry-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── broker.js         # Instância e inicialização do Broker MQTT (Aedes)
│   │   │   └── mqtt.js           # Cliente MQTT interno conectado à porta 1883
│   │   ├── controllers/
│   │   │   └── hardwareController.js # Lógica de negócio (listar e alugar)
│   │   ├── routes/
│   │   │   └── hardwareRoutes.js # Endpoints REST para o front-end
│   │   ├── services/
│   │   │   └── telemetryService.js   # Processamento das mensagens de telemetria
│   │   ├── simulator.js          # Script simulador de emissão de telemetria
│   │   ├── app.js                # Configuração de middlewares Express
│   │   └── server.js             # Ponto de entrada (Servidor HTTP + Broker)
│   ├── .env                      # Configuração de variáveis de ambiente
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.vue               # Dashboard reativo principal
│   │   └── main.js
│   ├── index.html
│   └── package.json
│
├── .gitignore                    # Regras Globais do Git (node_modules, .env)
└── README.md
```

## 📦 Como Executar o Projeto

### **Pré-requisitos**
- Node.js (v18+)
- npm instalado

### **1. Clonar o repositório**
```bash
git clone [https://github.com/hidestack/hardware-telemetry-dashboard.git](https://github.com/hidestack/hardware-telemetry-dashboard.git)
cd hardware-telemetry-dashboard
```

### **2. Iniciar o Back-end e Broker MQTT**
```bash
cd backend
npm install
npm run dev
```

### **3. Iniciar o Simulador de Hardware (Num novo terminal)**
```bash
cd backend
node src/simulator.js
```

### **4. Iniciar o Front-end Vue.js (Num novo terminal)**
```bash
cd frontend
npm install
npm run dev
```

Acesso à aplicação em: `http://localhost:5173`

👤 Autor
Desenvolvido por Antonio Thiago.

