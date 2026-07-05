# Guía de Sustentación Técnica: Arquitectura y Dashboard Ejecutivo

Esta guía está diseñada para prepararte frente al **Comité Evaluador (CTO y Arquitectos Principales)**. Resume los conceptos metodológicos, las métricas del dashboard y las respuestas clave a preguntas difíciles sobre las decisiones de diseño.

---

## 📊 1. Metodología de Valor Ganado (EVM) y Siglas Clave

El dashboard utiliza la metodología **EVM (Earned Value Management)** o Gestión de Valor Ganado. Es el estándar global en ingeniería de costos y gerencia de proyectos para medir el desempeño combinando **Alcance, Tiempo y Costo**.

### Las Tres Dimensiones Base:
1.  **PV (Planned Value - Valor Planificado)**:
    *   *¿Qué es?*: El presupuesto que **deberíamos haber gastado** hasta el día de hoy según la planeación original.
    *   *Ejemplo*: Si planificamos desarrollar una HU que cuesta $10M en 10 días, a mitad del cronograma (día 5) su PV es $5M.
2.  **AC (Actual Cost - Costo Real)**:
    *   *¿Qué es?*: El dinero que **realmente se ha gastado** (horas de desarrollo facturadas) en el trabajo completado hasta hoy.
    *   *Ejemplo*: Si la célula de desarrollo cobró $6M en programar la mitad de la HU, el AC es $6M.
3.  **EV (Earned Value - Valor Ganado)**:
    *   *¿Qué es?*: El valor económico del **trabajo completado real**. Mide el progreso físico en términos monetarios.
    *   *Fórmula*: $EV = \% \text{ Avance Físico} \times \text{Presupuesto Total (BAC)}$
    *   *Ejemplo*: Si la HU de $10M va al 50% de avance real, el EV es $5M (sin importar cuánto hayamos gastado).

### Los Índices de Rendimiento (Sección 4.3 y 4.4):
*   **IPC / CPI (Índice de Desempeño de Costos)**:
    *   *Fórmula*: $IPC = EV / AC$
    *   *Lectura*: ¿Qué tan eficientes somos con el dinero?
        *   **$IPC \ge 1.0$ (Óptimo)**: Estamos rindiendo al máximo. Gastamos igual o menos del valor que estamos entregando (Bajo presupuesto).
        *   **$IPC < 1.0$ (Desviación)**: Estamos perdiendo dinero. Gastamos más del valor real de software entregado (Sobre presupuesto).
*   **IPT / SPI (Índice de Desempeño de Cronograma)**:
    *   *Fórmula*: $IPT = EV / PV$
    *   *Lectura*: ¿Qué tan rápido vamos respecto al plan?
        *   **$IPT \ge 1.0$ (Óptimo)**: Vamos al ritmo planificado o más rápido (Adelantados).
        *   **$IPT < 1.0$ (Retraso)**: La velocidad de entrega es más lenta que la planificada (Atrasados).

---

## 🏛️ 2. Entendiendo los Módulos 4.3 y 4.4 del Dashboard

### Módulo 4.3: Control Tridimensional (Curva-S y EVM)
*   **La Curva-S**: Muestra el acumulado de **PV** (línea azul punteada), **EV** (línea verde) y **AC** (línea roja) a lo largo del tiempo.
*   **Cómo leerla**:
    *   **Brecha Vertical (Costo)**: La diferencia vertical entre la línea verde ($EV$) y la línea roja ($AC$). Si la roja está arriba de la verde, hay pérdida de presupuesto.
    *   **Brecha Horizontal (Tiempo)**: La diferencia de tiempo (días de distancia) entre la línea verde ($EV$) y la azul ($PV$). Muestra cuánto retraso real lleva el equipo.

### Módulo 4.4: Radar de Salud y Valor Ganado Integrado
Es la matriz unificada que consolida las métricas individuales por proyecto. Evalúa la salud tridimensional de cada frente bajo las siguientes reglas:
*   🟢 **Saludable (Verde)**: Tanto $IPC$ como $IPT$ son $\ge 0.95$. El proyecto está en presupuesto y tiempo.
*   🟡 **En Alerta (Amarillo)**: Uno o ambos índices caen entre $0.85$ y $0.94$. Indica un desvío moderado que requiere atención del líder del proyecto.
*   🔴 **Crítico (Rojo)**: Al menos uno de los índices es $< 0.85$. El proyecto está severamente retrasado o con sobrecosto crítico.

---

## 🧠 3. Respuestas Clave para Defender la Arquitectura (HLD)

### P1: ¿Por qué la biometría y las consultas al buró de crédito son síncronas, mientras que la contabilidad y estados de cuenta son asíncronos?
*   **Respuesta**: *Síncrono por criticidad de flujo*: La biometría (KYC) y el motor de riesgo (buró) son pasos que requieren una respuesta inmediata para aprobar o rechazar la transacción del cliente en caliente (dentro de la sesión). No podemos dejar al cliente esperando en la app a ver si su identidad fue aprobada en un lote posterior. 
*   *Asíncrono por desacoplamiento*: El registro contable (SAP) y el procesamiento analítico (Data Lake) no interfieren con la experiencia del cliente. Si la pasarela de pagos se cae o el Data Lake está lento, el cliente debe poder hacer su pago igualmente. Los eventos se encolan en Kafka y se procesan asíncronamente en segundo plano.

### P2: ¿Dónde se ubica la Biometría y por qué?
*   **Respuesta**: La biometría está conceptualmente en la **Capa Media (Seguridad, Roles e Identidad)**, sirviendo como una validación perimetral del API Gateway. No pertenece a la capa de negocio puro porque es un habilitador de identidad (Identity Proofing) requerido antes de otorgar acceso o procesar cualquier transacción financiera.

### P3: ¿Cómo opera la capa de Monetización en la arquitectura?
*   **Respuesta**: Es un servicio de valor agregado que empaqueta los datos históricos de consumo de gas y comportamiento de pago del cliente (historias de pago al día, scoring interno de Vanti) y los expone mediante APIs monetizadas y seguras a aliados externos (ej. bancos u otras fintechs), generando una nueva vía de ingresos directos B2B para la compañía.

---

## ⚙️ 4. Instrucciones para Ejecución Local con Docker

Para evitar bloqueos de seguridad del navegador por CORS al intentar leer el archivo `data.json` localmente:

1.  Asegúrate de tener instalado **Docker** y **Docker Compose**.
2.  Abre una terminal en la raíz del proyecto y ejecuta:
    ```bash
    docker compose up -d
    ```
3.  Abre tu navegador e ingresa a: **[http://localhost:8080](http://localhost:8080)**.
