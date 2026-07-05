# Entregable 1: Arquitectura del Ecosistema Tecnológico

Este documento presenta el diseño de la **Arquitectura de Referencia de Alto Nivel** para la plataforma financiera omnicanal del Ecosistema Financiero Integral de **Vanti S.A. ESP**. El diseño es **agnóstico a la nube** (multi-cloud ready), **orientado a eventos** (Event-Driven) y cuenta con **integraciones híbridas/on-premise** para desacoplar sistemas transaccionales y de registro.

> [!TIP]
> **Edición en Diagrams.net (Draw.io)**: 
> Se ha generado un archivo 100% editable para Diagrams.net en tu carpeta: [arquitectura_ecosistema.drawio](file:///c:/Users/crist/OneDrive/Escritorio/Vanti/arquitectura/arquitectura_ecosistema.drawio). 
> Para abrirlo y editarlo interactivamente, ve a [app.diagrams.net](https://app.diagrams.net/), selecciona **File -> Open From -> Device** (Archivo -> Abrir desde -> Dispositivo) y carga este archivo. Cuenta con los estilos visuales premium integrados (fondo oscuro y paleta Vanti).

---

## 🗺️ 1. Diagrama de Arquitectura (Modelo Conceptual)

A continuación se presenta el flujo lógico e integraciones del ecosistema:

```mermaid
graph TD
    %% Estilos de Nodos
    classDef channel fill:#1E293B,stroke:#334155,stroke-width:2px,color:#F8FAFC;
    classDef gate fill:rgba(251,192,45,0.1),stroke:#FBC02D,stroke-width:2px,color:#FBC02D;
    classDef bus fill:rgba(2,132,199,0.15),stroke:#0284c7,stroke-width:2px,color:#F8FAFC;
    classDef service fill:#1E293B,stroke:#334155,stroke-width:2px,color:#F8FAFC;
    classDef bpm fill:rgba(16,185,129,0.1),stroke:#10b981,stroke-width:2px,color:#10b981;
    classDef cross fill:#1E293B,stroke:#334155,stroke-dasharray: 5 5,color:#94A3B8;

    %% 1. Canales
    subgraph Canales ["📱 Canales Digitales & Físicos"]
        C1["App Móvil<br>(iOS / Android)"]:::channel
        C2["Portal Web<br>(Gas / No Gas)"]:::channel
        C3["Portales Aliados<br>(B2B APIs)"]:::channel
        C4["Call Center<br>(IVR / Agentes)"]:::channel
        C5["Oficinas Vanti<br>(Cajas / Atención)"]:::channel
    end

    %% 2. Seguridad y Gateway
    GW["🛡️ API Gateway & IAM Security<br>(WAF | OAuth2 / OIDC | JWT | MFA | Apigee / AWS API GW)"]:::gate

    %% 3. Capa BFF
    BFF["📱 BFF - Backend For Frontend<br>(GraphQL / Node.js / Go - Agregación de APIs y Consultas Rápidas)"]:::service

    %% 4. Backbone de Eventos
    EVB["⚡ Backbone de Eventos (Event Bus)<br>(Kafka / RabbitMQ / EventBridge - Cola de Mensajes Asíncrona)"]:::bus

    %% 5. Capa de Microservicios Core
    subgraph CoreServices ["🏦 Capa de Servicios Financieros y de Negocio"]
        S_CORE["Core Bancario<br>(Cuentas / Ledger)"]:::service
        S_RISK["Motor de Riesgo<br>(Scoring / Buró)"]:::service
        S_BIOM["Biometría / KYC<br>(On-prem / Cloud SDK)"]:::service
        S_PAY["Pasarela de Pagos<br>(PSE / Recaudo / Tarjetas)"]:::service
        S_CRM["CRM / Cliente 360<br>(Clientes Gas & No Gas)"]:::service
    end

    %% 6. Orquestación BPM
    BPM["⚙️ Orquestador de Procesos (BPM Engine)<br>(Camunda / Temporal - Ciclo de Vida: Originación ➔ Scoring ➔ Desembolso)"]:::bpm

    %% 7. Sistemas de Registro e Insights
    subgraph RecordSystems ["💼 Capa de Registro Contable y Analítica"]
        R_ESTA["Estados de Cuenta<br>(Gas / No Gas)"]:::service
        R_SAP["SAP / Libro Mayor<br>(Contabilidad Oficial)"]:::service
        R_LAKE["Data Lake / BI<br>(Analítica / CTO Panel)"]:::service
    end

    %% 8. Transversales
    NOTIF["✉️ Motor de Notificaciones<br>(SMS / WhatsApp / Push / Email)"]:::cross
    OBS["🔍 Observabilidad & Auditoría<br>(Logs / Tracing / OpenTelemetry)"]:::cross

    %% Relaciones
    C1 & C2 & C3 & C4 & C5 -->|HTTPS / REST| GW
    GW -->|REST / JSON| BFF
    BFF -->|Publicar Eventos / GraphQL| EVB
    
    EVB -->|Sub / Consumo asíncrono| S_CORE
    EVB -->|Sub / Consumo asíncrono| S_RISK
    EVB -->|Sub / Consumo asíncrono| S_BIOM
    EVB -->|Sub / Consumo asíncrono| S_PAY
    EVB -->|Sub / Consumo asíncrono| S_CRM

    S_CORE & S_RISK & S_BIOM & S_PAY & S_CRM -->|Orquestar Pasos| BPM
    
    BPM -->|Batch / Async| R_ESTA
    BPM -->|Integración SAP RFC| R_SAP
    BPM -->|Ingesta / ETL| R_LAKE

    BPM -.->|Trigger| NOTIF
    BFF & EVB & CoreServices -.->|Telemetría APM| OBS
```

---

## 🏛️ 2. Desglose Detallado de Capas y Componentes

### 1. Canales Omnicanal (Capa de Acceso)
Soporta una experiencia unificada independientemente del medio de contacto del cliente (interno, externo o aliado):
*   **Canales de Autoservicio**: *App Móvil* nativa y *Portal Web* responsivo, dirigidos a clientes Gas (recaudo de facturas) y No Gas (créditos de consumo).
*   **Canales Físicos y de Soporte**: *Call Center* (integrado vía IVR) y terminales de *Oficinas Vanti* para que asesores o cajeros consulten y gestionen el mismo inventario de datos.
*   **Portales Aliados (B2B)**: Consumo seguro por parte de terceros (comercios donde se originan créditos de consumo No Gas).

### 2. Capa de Seguridad (WAF / IAM / API Gateway)
El único punto de entrada público de la red que aísla los recursos internos:
*   **WAF (Web Application Firewall)**: Mitiga ataques DDoS, inyecciones de código y OWASP Top 10.
*   **IAM (Identity & Access Management)**: Gestión unificada de identidades corporativas y clientes. Utiliza estándares **OAuth2** y **OpenID Connect (OIDC)**.
*   **Autenticación**: Soporta MFA (Multi-Factor Authentication) por SMS/Email, tokens **JWT** (JSON Web Tokens) firmados con vida útil corta para autorizar solicitudes REST en las capas inferiores.

### 3. Capa BFF (Backend for Frontend)
Desacopla la lógica de presentación de la lógica de negocio core:
*   **Propósito**: Agregación de servicios y traducción de protocolos. Por ejemplo, si la App móvil necesita cargar información consolidada de Cuentas, Contratos de Gas e Historial de Pagos, realiza una sola petición al BFF, y este se encarga de llamar a los microservicios correspondientes de forma paralela.
*   **Tecnología**: GraphQL o APIs REST ligeras escritas en Node.js, Go o Java Spring Boot.

### 4. Capa de Integración Orientada a Eventos (Backbone / Event Bus)
El corazón de la comunicación asíncrona y reactiva del ecosistema:
*   **Desacoplamiento Transaccional**: Evita integraciones síncronas punto a punto. Cuando una HU o un servicio realiza una acción (Ej: "Pago Recibido"), no llama directamente a SAP o a Estados de Cuenta; publica el evento `pago.procesado` en el bus de eventos.
*   **Tecnología**: Apache Kafka (para alto rendimiento de streaming de eventos) o RabbitMQ/AWS EventBridge para colas estándares.
*   **Garantías**: Mecanismos de reintentos (Dead Letter Queues - DLQ) e idempotencia para evitar duplicación de transacciones.

### 5. Capa de Microservicios Core de Negocio
Servicios modulares con bases de datos independientes (patrón *Database per Service*) para garantizar resiliencia:
*   **Core Bancario**: Ledger financiero y saldos de cuentas de ahorro/crédito.
*   **Motor de Riesgo (Scoring)**: Consume reglas de negocio y perfilamiento crediticio (on-premise o cloud).
*   **Biometría & KYC**: Validación facial de identidad contra registradurías o bases nacionales.
*   **Pasarela de Pagos (Recaudo)**: Integración segura con PSE, redes de tarjetas de crédito y corresponsales bancarios.
*   **CRM / Cliente 360**: Vista unificada que conecta el ID de contrato de gas con el ID de cliente de consumo No Gas.

### 6. Capa de Orquestación de Procesos (BPM)
Maneja transacciones distribuidas de larga duración (Saga Pattern):
*   **Propósito**: Unificar flujos complejos como la **Originación de Crédito** (Originación ➔ Validación Identidad ➔ Scoring de Riesgo ➔ Firma de Pagaré ➔ Desembolso).
*   **Tecnología**: Motores ligeros como Camunda (BPMN 2.0) o Temporal.io, que garantizan la consistencia del flujo de trabajo, compensaciones ante fallos y trazabilidad del estado.

### 7. Capa de Sistemas de Registro, Analítica y Notificaciones
*   **Estados de Cuenta**: Módulo optimizado para lectura y generación masiva de PDF/consulta en línea para clientes.
*   **SAP / Libro Mayor**: Contabilidad oficial corporativa de Vanti S.A. ESP. Integración asíncrona mediante mensajes RFC/IDoc para no sobrecargar el ERP transaccional.
*   **Data Lake**: Almacena datos crudos e históricos para modelos de analítica, comportamiento de mora, tableros predictivos de riesgo y el portal del CTO.
*   **Notificaciones**: Envío automático de confirmaciones transaccionales vía WhatsApp, SMS, push e-mail.

---

## 🔌 3. Patrones de Integración y Flujo de Datos

Para asegurar alta resiliencia y escalabilidad, la arquitectura utiliza tres patrones de integración principales:

```
[Cliente] ──(Síncrono REST)──> [BFF / Microservicio] ──(Asíncrono Eventos)──> [Kafka / Broker] ──(Suscriptor)──> [Libro Mayor / ERP]
```

1.  **Asíncrono Orientado a Eventos (Publish-Subscribe)**:
    *   *Uso*: Notificaciones, actualización de estados de cuenta, journalización en SAP y analítica.
    *   *Ventaja*: Si el ERP (SAP) se encuentra en mantenimiento técnico off-line, el evento queda en cola en el Bus de Eventos. Una vez que SAP vuelve a estar disponible, procesa las transacciones pendientes sin que el cliente final experimente caídas en el Portal o la App.
2.  **Síncrono REST / gRPC (Request-Response)**:
    *   *Uso*: Validaciones inmediatas que requieren respuesta en tiempo real (Autenticación IAM, Scoring crítico inmediato, Consulta de saldo en Core Bancario).
3.  **Lotes por Lotes (Batch ETL)**:
    *   *Uso*: Sincronización nocturna de estados de cuenta de facturación Gas y No Gas, e ingesta de datos agregados hacia el Data Lake para el cierre financiero mensual.

---

## 🔒 4. Estrategia de Infraestructura Agnóstica a la Nube

Para garantizar que el ecosistema pueda operar de forma idéntica en AWS, Azure, Google Cloud o en servidores propios (On-Premise), se aplican las siguientes directrices de infraestructura:

1.  **Contenedores y Orquestación (Kubernetes - K8s)**:
    *   Todos los microservicios se despliegan en contenedores Docker y son administrados por Kubernetes. Esto permite migrar el clúster de nubes (EKS en AWS, AKS en Azure, GKE en GCP o clúster físico) sin modificar una sola línea de código.
2.  **Bases de Datos Desacopladas**:
    *   Uso de bases de datos relacionales estándar (PostgreSQL) y no relacionales (Redis/MongoDB) que cuentan con soporte administrado en cualquier nube o instalación local de Linux.
3.  **Infraestructura como Código (IaC)**:
    *   Definición de toda la red, clústeres, colas y almacenamiento a través de scripts de **Terraform**, permitiendo levantar la infraestructura completa del ecosistema financiero en minutos de forma replicable y automatizada.
