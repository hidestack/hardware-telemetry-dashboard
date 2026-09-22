# 🖥️ Hardware Telemetry & Asset Management Dashboard

Uma plataforma Fullstack em tempo real para monitorização de telemetria de componentes de hardware (GPUs/Servidores) e gestão de locação de ativos, utilizando **Node.js**, **Vue.js** e o protocolo **MQTT**.

---

## 🚀 Tecnologias Utilizadas

### **Front-end**
- **Vue.js 3** (Composition API)
- **Vite** (Build tool)
- **Axios** (Consumo de API REST)

### **Back-end & Mensageria**
- **Node.js** & **Express**
- **MQTT Protocol** (Broker embutido com **Aedes**)
- **ESModules** (Sintaxe moderna `import/export`)

---

## 🛠️ Arquitetura do Sistema

1. **Simulador / Hardware Real:** Emite métricas de telemetria (temperatura, utilização de GPU e VRAM) para o tópico MQTT `hardware/+/telemetry`.
2. **Broker MQTT (Aedes):** Processa e distribui as mensagens na porta `1883`.
3. **Servidor Node.js:** Subscreve o broker, mantém o estado em memória dos componentes e expõe endpoints REST.
4. **Interface Vue.js:** Consome a API REST e atualiza dinamicamente a interface com os dados mais recentes.

---

## 📦 Como Executar o Projeto

### **Pré-requisitos**
- Node.js (v18+)
- npm instalado

### **1. Clonar o repositório**
```bash
git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
cd SEU_REPOSITORIO
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

Aceda à aplicação em: `http://localhost:5173`