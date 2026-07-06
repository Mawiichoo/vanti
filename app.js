/* ==========================================================================
   VANTI PORTFOLIO DASHBOARD - CORE LOGIC & TIMELINE CALENDAR ENGINE (v3.0)
   ========================================================================== */

// Embedded Fallback Dataset (Backup with Dates configured at all levels: Projects, Epics, HUs, ACs, HTs)
const BACKUP_DATA = {
  "projects": [
    {
      "id": "CORE",
      "name": "Core Bancario",
      "code": "CORE",
      "desc": "Motor transaccional principal y base de datos financiera.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-11-15",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-11-20"
    },
    {
      "id": "RIES",
      "name": "Motor de Riesgo",
      "code": "RIES",
      "desc": "Motor de decisión de crédito y análisis de perfil de cliente.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-09-23",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-09-16"
    },
    {
      "id": "BIOM",
      "name": "Validaciones Biométricas",
      "code": "BIOM",
      "desc": "Integración de validación de identidad y enrolamiento facial.",
      "plannedStartDate": "2026-07-29",
      "plannedEndDate": "2026-09-09",
      "actualStartDate": "2026-07-29",
      "actualEndDate": "2026-09-23"
    },
    {
      "id": "SAP",
      "name": "SAP Contable / Libro Mayor",
      "code": "SAP",
      "desc": "Integración contable oficial y sincronización de libro mayor.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-12-02",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-12-10"
    },
    {
      "id": "ESTA",
      "name": "Estados de Cuenta Individuales",
      "code": "ESTA",
      "desc": "Generación y consulta de estados de cuenta Gas y No Gas.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-09-09",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-08-26"
    },
    {
      "id": "INTE",
      "name": "Bus de Integración / APIs",
      "code": "INTE",
      "desc": "Middleware de orquestación y API Gateway de seguridad.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-08-26",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-08-26"
    },
    {
      "id": "PAGO",
      "name": "Pasarela de Pagos",
      "code": "PAGO",
      "desc": "Recaudos y pagos interbancarios en tiempo real.",
      "plannedStartDate": "2026-08-27",
      "plannedEndDate": "2026-09-24",
      "actualStartDate": "2026-08-27",
      "actualEndDate": "2026-09-24"
    },
    {
      "id": "NOTI",
      "name": "Notificaciones y Mensajería",
      "code": "NOTI",
      "desc": "Servicio de alertas push, SMS y correos transaccionales.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-07-21",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-07-21"
    }
  ],
  "epics": [
    {
      "id": "CORE-EP-01",
      "projectId": "CORE",
      "name": "Arquitectura y Core Transaccional",
      "desc": "Definición del esquema base e implementación del motor transaccional.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-10-20",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-10-27"
    },
    {
      "id": "CORE-EP-02",
      "projectId": "CORE",
      "name": "Servicios de Integración y Consultas",
      "desc": "Desarrollo de microservicios para consulta y movimientos bancarios.",
      "plannedStartDate": "2026-10-21",
      "plannedEndDate": "2026-11-15",
      "actualStartDate": "2026-10-28",
      "actualEndDate": "2026-11-20"
    },
    {
      "id": "RIES-EP-01",
      "projectId": "RIES",
      "name": "Políticas de Scoring y Modelos Crediticios",
      "desc": "Reglas de negocio y motor de decisión en tiempo real.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-09-23",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-09-16"
    },
    {
      "id": "BIOM-EP-01",
      "projectId": "BIOM",
      "name": "Validación de Identidad Multicanal",
      "desc": "Conectividad con el proveedor de biometría y enrolamiento facial.",
      "plannedStartDate": "2026-07-29",
      "plannedEndDate": "2026-09-09",
      "actualStartDate": "2026-07-29",
      "actualEndDate": "2026-09-23"
    },
    {
      "id": "SAP-EP-01",
      "projectId": "SAP",
      "name": "Gobernanza Contable y Asientos",
      "desc": "Integración contable automatizada con libro mayor.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-12-02",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-12-10"
    },
    {
      "id": "ESTA-EP-01",
      "projectId": "ESTA",
      "name": "Procesamiento de Extractos Gas/No Gas",
      "desc": "Servicio de consulta y renderizado de extractos individuales.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-09-09",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-08-26"
    },
    {
      "id": "INTE-EP-01",
      "projectId": "INTE",
      "name": "Orquestación y Seguridad de APIs",
      "desc": "Orquestación de microservicios, seguridad OAuth2 y colas de mensajes.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-08-26",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-08-26"
    },
    {
      "id": "PAGO-EP-01",
      "projectId": "PAGO",
      "name": "Recaudos PSE y Canales de Pago",
      "desc": "Integración con pasarela de pagos interbancarios.",
      "plannedStartDate": "2026-08-27",
      "plannedEndDate": "2026-09-24",
      "actualStartDate": "2026-08-27",
      "actualEndDate": "2026-09-24"
    },
    {
      "id": "NOTI-EP-01",
      "projectId": "NOTI",
      "name": "Mensajería Transaccional Unificada",
      "desc": "Servicio centralizado de envío de notificaciones y alertas.",
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-07-21",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-07-21"
    }
  ],
  "hus": [
    {
      "id": "CORE-HU-01",
      "epicId": "CORE-EP-01",
      "projectId": "CORE",
      "name": "Diseño de Arquitectura y Base de Datos",
      "state": "Done",
      "progress": 100,
      "plannedCost": 25.0,
      "actualCost": 24.0,
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-07-28",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-07-28",
      "dependency": "",
      "isCritical": true,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "CORE-HU-01-AC1", "text": "Definir esquema relacional de tablas transaccionales", "completed": true, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-10" },
        { "id": "CORE-HU-01-AC2", "text": "Configurar réplicas y políticas de alta disponibilidad", "completed": true, "plannedStartDate": "2026-07-11", "plannedEndDate": "2026-07-18" },
        { "id": "CORE-HU-01-AC3", "text": "Firmar aprobación del documento de arquitectura técnica", "completed": true, "plannedStartDate": "2026-07-19", "plannedEndDate": "2026-07-25" }
      ],
      "technicalTasks": [
        { "id": "CORE-HU-01-HT1", "text": "Crear scripts de migración liquibase/flyway", "completed": true, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-12" },
        { "id": "CORE-HU-01-HT2", "text": "Configurar cifrado en reposo TDE en base de datos", "completed": true, "plannedStartDate": "2026-07-13", "plannedEndDate": "2026-07-20" }
      ]
    },
    {
      "id": "CORE-HU-02",
      "epicId": "CORE-EP-01",
      "projectId": "CORE",
      "name": "Desarrollo del Core Transaccional Bancario",
      "state": "In Progress",
      "progress": 60,
      "plannedCost": 80.0,
      "actualCost": 75.0,
      "plannedStartDate": "2026-07-29",
      "plannedEndDate": "2026-10-20",
      "actualStartDate": "2026-07-29",
      "actualEndDate": "2026-10-27",
      "dependency": "CORE-HU-01",
      "isCritical": true,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "CORE-HU-02-AC1", "text": "Procesamiento de débitos y créditos con balance en tiempo real", "completed": true, "plannedStartDate": "2026-07-29", "plannedEndDate": "2026-08-30" },
        { "id": "CORE-HU-02-AC2", "text": "Manejo de transacciones ACID y rollbacks ante caídas", "completed": true, "plannedStartDate": "2026-08-31", "plannedEndDate": "2026-09-20" },
        { "id": "CORE-HU-02-AC3", "text": "Cumplir con latencia menor a 150ms bajo carga concurrente", "completed": false, "plannedStartDate": "2026-09-21", "plannedEndDate": "2026-10-15" }
      ],
      "technicalTasks": [
        { "id": "CORE-HU-02-HT1", "text": "Implementar lógica de bloqueo de cuentas distributivo", "completed": true, "plannedStartDate": "2026-07-29", "plannedEndDate": "2026-08-15" },
        { "id": "CORE-HU-02-HT2", "text": "Configurar caché Redis para balances rápidos", "completed": false, "plannedStartDate": "2026-08-16", "plannedEndDate": "2026-10-05" }
      ]
    },
    {
      "id": "CORE-HU-03",
      "epicId": "CORE-EP-02",
      "projectId": "CORE",
      "name": "API de Consultas y Transferencias",
      "state": "To Do",
      "progress": 0,
      "plannedCost": 15.0,
      "actualCost": 0.0,
      "plannedStartDate": "2026-10-21",
      "plannedEndDate": "2026-11-15",
      "actualStartDate": "2026-10-28",
      "actualEndDate": "2026-11-20",
      "dependency": "CORE-HU-02",
      "isCritical": false,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "CORE-HU-03-AC1", "text": "Endpoint expuesto para saldo e histórico de movimientos", "completed": false, "plannedStartDate": "2026-10-21", "plannedEndDate": "2026-11-05" },
        { "id": "CORE-HU-03-AC2", "text": "Validación de token de sesión en cabecera HTTP", "completed": false, "plannedStartDate": "2026-11-06", "plannedEndDate": "2026-11-15" }
      ],
      "technicalTasks": [
        { "id": "CORE-HU-03-HT1", "text": "Generar especificación OpenAPI / Swagger", "completed": false, "plannedStartDate": "2026-10-21", "plannedEndDate": "2026-10-30" }
      ]
    },
    {
      "id": "RIES-HU-01",
      "epicId": "RIES-EP-01",
      "projectId": "RIES",
      "name": "Definición de Reglas y Modelos de Scoring",
      "state": "Done",
      "progress": 100,
      "plannedCost": 20.0,
      "actualCost": 22.0,
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-07-28",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-08-04",
      "dependency": "",
      "isCritical": false,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "RIES-HU-01-AC1", "text": "Mapear variables de riesgo financiero de clientes Gas", "completed": true, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-12" },
        { "id": "RIES-HU-01-AC2", "text": "Definir modelo de scoring para clientes No Gas", "completed": true, "plannedStartDate": "2026-07-13", "plannedEndDate": "2026-07-20" }
      ],
      "technicalTasks": [
        { "id": "RIES-HU-01-HT1", "text": "Cargar árbol de decisión inicial en motor Drools/Camunda", "completed": true, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-15" }
      ]
    },
    {
      "id": "RIES-HU-02",
      "epicId": "RIES-EP-01",
      "projectId": "RIES",
      "name": "Desarrollo de API de Decisión en Tiempo Real",
      "state": "In Progress",
      "progress": 33,
      "plannedCost": 60.0,
      "actualCost": 40.0,
      "plannedStartDate": "2026-07-29",
      "plannedEndDate": "2026-09-23",
      "actualStartDate": "2026-07-29",
      "actualEndDate": "2026-09-16",
      "dependency": "CORE-HU-01",
      "isCritical": true,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "RIES-HU-02-AC1", "text": "API devuelve pre-aprobación en menos de 2 segundos", "completed": true, "plannedStartDate": "2026-07-29", "plannedEndDate": "2026-08-15" },
        { "id": "RIES-HU-02-AC2", "text": "Integrar Buró de Crédito externo en cascada", "completed": false, "plannedStartDate": "2026-08-16", "plannedEndDate": "2026-09-10" }
      ],
      "technicalTasks": [
        { "id": "RIES-HU-02-HT1", "text": "Optimizar consultas pesadas al histórico crediticio", "completed": false, "plannedStartDate": "2026-07-29", "plannedEndDate": "2026-08-25" }
      ]
    },
    {
      "id": "BIOM-HU-01",
      "epicId": "BIOM-EP-01",
      "projectId": "BIOM",
      "name": "Homologación con Proveedor y Enrolamiento Facial",
      "state": "In Progress",
      "progress": 66,
      "plannedCost": 35.0,
      "actualCost": 42.0,
      "plannedStartDate": "2026-07-29",
      "plannedEndDate": "2026-09-09",
      "actualStartDate": "2026-07-29",
      "actualEndDate": "2026-09-23",
      "dependency": "CORE-HU-01",
      "isCritical": true,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "BIOM-HU-01-AC1", "text": "Integrar SDK facial de validación con App móvil", "completed": true, "plannedStartDate": "2026-07-29", "plannedEndDate": "2026-08-10" },
        { "id": "BIOM-HU-01-AC2", "text": "Cumplir directrices de la Registraduría Nacional de Identidad", "completed": true, "plannedStartDate": "2026-08-11", "plannedEndDate": "2026-08-25" },
        { "id": "BIOM-HU-01-AC3", "text": "Validar prueba de vida del usuario (anti-spoofing)", "completed": false, "plannedStartDate": "2026-08-26", "plannedEndDate": "2026-09-05" }
      ],
      "technicalTasks": [
        { "id": "BIOM-HU-01-HT1", "text": "Manejo de errores ante desconexión de servicio de biometría", "completed": false, "plannedStartDate": "2026-07-29", "plannedEndDate": "2026-08-18" }
      ]
    },
    {
      "id": "SAP-HU-01",
      "epicId": "SAP-EP-01",
      "projectId": "SAP",
      "name": "Mapeo de Cuentas Contables y Estructura SAP",
      "state": "Done",
      "progress": 100,
      "plannedCost": 15.0,
      "actualCost": 15.0,
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-07-21",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-07-21",
      "dependency": "",
      "isCritical": false,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "SAP-HU-01-AC1", "text": "Definir matriz de homologación contable CORE-SAP", "completed": true, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-10" }
      ],
      "technicalTasks": [
        { "id": "SAP-HU-01-HT1", "text": "Configurar cuentas puente en Libro Mayor SAP", "completed": true, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-15" }
      ]
    },
    {
      "id": "SAP-HU-02",
      "epicId": "SAP-EP-01",
      "projectId": "SAP",
      "name": "Interfaz de Asientos Contables Automatizados",
      "state": "To Do",
      "progress": 0,
      "plannedCost": 40.0,
      "actualCost": 0.0,
      "plannedStartDate": "2026-10-21",
      "plannedEndDate": "2026-12-02",
      "actualStartDate": "2026-10-28",
      "actualEndDate": "2026-12-10",
      "dependency": "CORE-HU-02",
      "isCritical": false,
      "isMVP": false,
      "acceptanceCriteria": [
        { "id": "SAP-HU-02-AC1", "text": "Carga diaria de asientos resumidos vía RFC/BAPI", "completed": false, "plannedStartDate": "2026-10-21", "plannedEndDate": "2026-11-15" },
        { "id": "SAP-HU-02-AC2", "text": "Control de descuadres contables y alertas automáticas", "completed": false, "plannedStartDate": "2026-11-16", "plannedEndDate": "2026-11-25" }
      ],
      "technicalTasks": [
        { "id": "SAP-HU-02-HT1", "text": "Crear cola Kafka para mensajería de auditoría contable", "completed": false, "plannedStartDate": "2026-10-21", "plannedEndDate": "2026-11-05" }
      ]
    },
    {
      "id": "ESTA-HU-01",
      "epicId": "ESTA-EP-01",
      "projectId": "ESTA",
      "name": "Estructuración de Datos y PDF Clientes Gas",
      "state": "Done",
      "progress": 100,
      "plannedCost": 18.0,
      "actualCost": 16.0,
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-07-28",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-07-21",
      "dependency": "",
      "isCritical": false,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "ESTA-HU-01-AC1", "text": "Diseño de layout unificado de estado de cuenta mensual", "completed": true, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-10" },
        { "id": "ESTA-HU-01-AC2", "text": "Generación masiva de PDFs en lote en menos de 1 hora", "completed": true, "plannedStartDate": "2026-07-11", "plannedEndDate": "2026-07-22" }
      ],
      "technicalTasks": [
        { "id": "ESTA-HU-01-HT1", "text": "Integrar motor JasperReports/Thymeleaf", "completed": true, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-15" }
      ]
    },
    {
      "id": "ESTA-HU-02",
      "epicId": "ESTA-EP-01",
      "projectId": "ESTA",
      "name": "Portal y API de Consulta para Clientes No Gas",
      "state": "In Progress",
      "progress": 33,
      "plannedCost": 25.0,
      "actualCost": 10.0,
      "plannedStartDate": "2026-07-29",
      "plannedEndDate": "2026-09-09",
      "actualStartDate": "2026-07-29",
      "actualEndDate": "2026-08-26",
      "dependency": "ESTA-HU-01",
      "isCritical": false,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "ESTA-HU-02-AC1", "text": "Visualización del extracto en el portal web corporativo", "completed": true, "plannedStartDate": "2026-07-29", "plannedEndDate": "2026-08-10" },
        { "id": "ESTA-HU-02-AC2", "text": "Soporte de consulta en tiempo real desde la App Vanti", "completed": false, "plannedStartDate": "2026-08-11", "plannedEndDate": "2026-09-01" }
      ],
      "technicalTasks": [
        { "id": "ESTA-HU-02-HT1", "text": "Crear API RESTful con caché de lectura Redis", "completed": false, "plannedStartDate": "2026-07-29", "plannedEndDate": "2026-08-20" }
      ]
    },
    {
      "id": "INTE-HU-01",
      "epicId": "INTE-EP-01",
      "projectId": "INTE",
      "name": "Configuración de API Gateway y OAuth2",
      "state": "Done",
      "progress": 100,
      "plannedCost": 15.0,
      "actualCost": 14.0,
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-07-21",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-07-21",
      "dependency": "",
      "isCritical": true,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "INTE-HU-01-AC1", "text": "Montaje de WSO2 / Apigee en ambiente AWS", "completed": true, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-10" },
        { "id": "INTE-HU-01-AC2", "text": "Configurar proveedor de identidad (Okta/Keycloak)", "completed": true, "plannedStartDate": "2026-07-11", "plannedEndDate": "2026-07-15" }
      ],
      "technicalTasks": [
        { "id": "INTE-HU-01-HT1", "text": "Crear políticas de rate limiting y CORS", "completed": true, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-12" }
      ]
    },
    {
      "id": "INTE-HU-02",
      "epicId": "INTE-EP-01",
      "projectId": "INTE",
      "name": "Orquestación de Colas de Mensajería",
      "state": "In Progress",
      "progress": 50,
      "plannedCost": 30.0,
      "actualCost": 20.0,
      "plannedStartDate": "2026-07-22",
      "plannedEndDate": "2026-08-26",
      "actualStartDate": "2026-07-22",
      "actualEndDate": "2026-08-26",
      "dependency": "INTE-HU-01",
      "isCritical": true,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "INTE-HU-02-AC1", "text": "Orquestación asíncrona de eventos transaccionales", "completed": true, "plannedStartDate": "2026-07-22", "plannedEndDate": "2026-08-10" }
      ],
      "technicalTasks": [
        { "id": "INTE-HU-02-HT1", "text": "Configurar broker RabbitMQ / Kafka en Kubernetes", "completed": false, "plannedStartDate": "2026-07-22", "plannedEndDate": "2026-08-15" }
      ]
    },
    {
      "id": "PAGO-HU-01",
      "epicId": "PAGO-EP-01",
      "projectId": "PAGO",
      "name": "Integración con PSE e Interbancarios",
      "state": "To Do",
      "progress": 0,
      "plannedCost": 20.0,
      "actualCost": 0.0,
      "plannedStartDate": "2026-08-27",
      "plannedEndDate": "2026-09-24",
      "actualStartDate": "2026-08-27",
      "actualEndDate": "2026-09-24",
      "dependency": "INTE-HU-02",
      "isCritical": false,
      "isMVP": true,
      "acceptanceCriteria": [
        { "id": "PAGO-HU-01-AC1", "text": "Implementación del flujo de redirección PSE", "completed": false, "plannedStartDate": "2026-08-27", "plannedEndDate": "2026-09-10" },
        { "id": "PAGO-HU-01-AC2", "text": "Conciliación de pagos exitosos, fallidos y pendientes", "completed": false, "plannedStartDate": "2026-09-11", "plannedEndDate": "2026-09-24" }
      ],
      "technicalTasks": [
        { "id": "PAGO-HU-01-HT1", "text": "Configurar llaves de cifrado HMAC y firma digital", "completed": false, "plannedStartDate": "2026-08-27", "plannedEndDate": "2026-09-05" }
      ]
    },
    {
      "id": "NOTI-HU-01",
      "epicId": "NOTI-EP-01",
      "projectId": "NOTI",
      "name": "Servicio de Notificaciones Push/SMS/Email",
      "state": "To Do",
      "progress": 0,
      "plannedCost": 12.0,
      "actualCost": 0.0,
      "plannedStartDate": "2026-07-01",
      "plannedEndDate": "2026-07-21",
      "actualStartDate": "2026-07-01",
      "actualEndDate": "2026-07-21",
      "dependency": "",
      "isCritical": false,
      "isMVP": false,
      "acceptanceCriteria": [
        { "id": "NOTI-HU-01-AC1", "text": "Plantillas HTML responsivas para correos transaccionales", "completed": false, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-10" },
        { "id": "NOTI-HU-01-AC2", "text": "Integrar proveedor SMS (Twilio/Infobip)", "completed": false, "plannedStartDate": "2026-07-11", "plannedEndDate": "2026-07-15" }
      ],
      "technicalTasks": [
        { "id": "NOTI-HU-01-HT1", "text": "Implementar colas de reintentos para notificaciones fallidas", "completed": false, "plannedStartDate": "2026-07-01", "plannedEndDate": "2026-07-08" }
      ]
    }
  ]
};

// Global App State
let state = {
    projects: [],
    epics: [],
    hus: [],
    simulation: {
        capacity: 100,
        biometricsDelay: false,
        scopeCutMVP: false
    },
    activeTab: "dashboard"
};

let selectedBurndownProj = "CORE";
let selectedBurndownEpic = "ALL";

// Expanded UI Nodes tracking
let expandedProjectIds = ["CORE"];
let expandedEpicIds = [];
let expandedHUIds = [];

// Base reference date boundary calculation
let portfolioMinDate = new Date("2026-07-01");
let portfolioMaxDate = new Date("2026-12-31");

// Initialize application
document.addEventListener("DOMContentLoaded", async () => {
    setupEventListeners();
    await loadData();
    runCalculationsAndRender();
});

// Setup event handling
function setupEventListeners() {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });
    }

    const closeSidebarOnMobile = () => {
        if (window.innerWidth <= 950 && sidebar) {
            sidebar.classList.remove("active");
        }
    };

    if (sidebar) {
        sidebar.addEventListener("click", (e) => {
            if (window.innerWidth <= 950 && (e.target.closest("li") || e.target.closest("button:not(#menu-toggle)"))) {
                closeSidebarOnMobile();
            }
        });
    }

    document.getElementById("nav-dashboard").addEventListener("click", () => {
        switchTab("dashboard");
        closeSidebarOnMobile();
    });
    document.getElementById("nav-simulator").addEventListener("click", () => {
        switchTab("simulator");
        closeSidebarOnMobile();
    });
    document.getElementById("nav-data-manager").addEventListener("click", () => {
        switchTab("data-manager");
        closeSidebarOnMobile();
    });

    const sliderCapacity = document.getElementById("sim-capacity");
    const sliderVal = document.getElementById("sim-capacity-val");
    sliderCapacity.addEventListener("input", (e) => {
        state.simulation.capacity = parseInt(e.target.value);
        sliderVal.textContent = `${state.simulation.capacity}% (${getCapacityLabel(state.simulation.capacity)})`;
        runCalculationsAndRender();
        saveData();
    });

    const toggleBiometrics = document.getElementById("sim-biometrics-delay");
    const textBiometrics = document.getElementById("sim-biometrics-text");
    toggleBiometrics.addEventListener("change", (e) => {
        state.simulation.biometricsDelay = e.target.checked;
        textBiometrics.textContent = state.simulation.biometricsDelay ? "Sí (+21 días)" : "No (+0 días)";
        runCalculationsAndRender();
        saveData();
    });

    const toggleScope = document.getElementById("sim-scope-cut");
    const textScope = document.getElementById("sim-scope-text");
    toggleScope.addEventListener("change", (e) => {
        state.simulation.scopeCutMVP = e.target.checked;
        textScope.textContent = state.simulation.scopeCutMVP ? "Sí (Filtrado a Historias Esenciales MVP)" : "No (Alcance Completo)";
        runCalculationsAndRender();
        saveData();
    });

    document.getElementById("btn-reset-simulation").addEventListener("click", () => {
        sliderCapacity.value = 100;
        state.simulation.capacity = 100;
        sliderVal.textContent = "100% (Normal)";
        toggleBiometrics.checked = false;
        state.simulation.biometricsDelay = false;
        textBiometrics.textContent = "No (+0 días)";
        toggleScope.checked = false;
        state.simulation.scopeCutMVP = false;
        textScope.textContent = "No (Alcance Completo)";
        runCalculationsAndRender();
        saveData();
    });

    document.getElementById("btn-reset-all").addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas restablecer todos los datos? Esto borrará tus cambios.")) {
            localStorage.clear();
            state.projects = JSON.parse(JSON.stringify(BACKUP_DATA.projects));
            state.epics = JSON.parse(JSON.stringify(BACKUP_DATA.epics));
            state.hus = JSON.parse(JSON.stringify(BACKUP_DATA.hus));
            state.simulation = { capacity: 100, biometricsDelay: false, scopeCutMVP: false };
            saveData();
            syncSimulatorDOM();
            runCalculationsAndRender();
        }
    });

    document.getElementById("btn-reset-db").addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas restablecer la base de datos desde data.json? Se perderán los cambios manuales.")) {
            localStorage.removeItem("vanti_projects");
            localStorage.removeItem("vanti_epics");
            localStorage.removeItem("vanti_hus");
            localStorage.removeItem("vanti_simulation");
            location.reload();
        }
    });

    document.getElementById("btn-export-json").addEventListener("click", exportDataAsJSON);

    const fileInput = document.getElementById("file-import-json");
    document.getElementById("btn-import-json-trigger").addEventListener("click", () => fileInput.click());
    document.getElementById("btn-import-json-trigger-2").addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", handleImportJSON);

    document.getElementById("btn-download-template").addEventListener("click", (e) => {
        e.preventDefault();
        downloadTemplateJSON();
    });

    // Modal triggers & handlers
    document.getElementById("btn-add-project").addEventListener("click", () => openProjectModal());
    document.getElementById("btn-add-hu").addEventListener("click", () => openHUModal());
    document.getElementById("btn-add-epic").addEventListener("click", () => openEpicModal());

    document.getElementById("btn-close-modal").addEventListener("click", closeHUModal);
    document.getElementById("btn-cancel-modal").addEventListener("click", closeHUModal);
    document.getElementById("hu-form").addEventListener("submit", saveHUForm);

    document.getElementById("btn-close-project-modal").addEventListener("click", closeProjectModal);
    document.getElementById("btn-cancel-project-modal").addEventListener("click", closeProjectModal);
    document.getElementById("project-form").addEventListener("submit", saveProjectForm);

    document.getElementById("btn-close-epic-modal").addEventListener("click", closeEpicModal);
    document.getElementById("btn-cancel-epic-modal").addEventListener("click", closeEpicModal);
    document.getElementById("epic-form").addEventListener("submit", saveEpicForm);

    document.getElementById("btn-add-form-ac").addEventListener("click", () => addACFormRow());
    document.getElementById("btn-add-form-ht").addEventListener("click", () => addHTFormRow());

    document.getElementById("burndown-project-select").addEventListener("change", (e) => {
        selectedBurndownProj = e.target.value;
        populateEpicSelect();
        updateBurndownChart();
    });
    document.getElementById("burndown-epic-select").addEventListener("change", (e) => {
        selectedBurndownEpic = e.target.value;
        updateBurndownChart();
    });

    // Dynamic Panel Collapse Buttons Injection
    document.querySelectorAll(".panel").forEach(panel => {
        const header = panel.querySelector(".panel-header");
        if (!header) return;

        if (header.querySelector(".panel-collapse-btn")) return;

        const collapseBtn = document.createElement("button");
        collapseBtn.className = "panel-collapse-btn";
        collapseBtn.type = "button";
        collapseBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>`;
        collapseBtn.title = "Minimizar / Maximizar Panel";

        collapseBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            panel.classList.toggle("panel-collapsed");
        });

        header.appendChild(collapseBtn);
    });
}

// Load data
async function loadData() {
    const savedProjects = localStorage.getItem("vanti_projects");
    const savedEpics = localStorage.getItem("vanti_epics");
    const savedHUs = localStorage.getItem("vanti_hus");
    const savedSim = localStorage.getItem("vanti_simulation");

    if (savedProjects && savedEpics && savedHUs) {
        state.projects = JSON.parse(savedProjects);
        state.epics = JSON.parse(savedEpics);
        state.hus = JSON.parse(savedHUs);
        if (savedSim) {
            state.simulation = JSON.parse(savedSim);
        }
        syncSimulatorDOM();
    } else {
        try {
            const response = await fetch("data.json");
            if (response.ok) {
                const data = await response.json();
                state.projects = data.projects;
                state.epics = data.epics;
                state.hus = data.hus;
            } else {
                throw new Error();
            }
        } catch (e) {
            state.projects = JSON.parse(JSON.stringify(BACKUP_DATA.projects));
            state.epics = JSON.parse(JSON.stringify(BACKUP_DATA.epics));
            state.hus = JSON.parse(JSON.stringify(BACKUP_DATA.hus));
        }
        saveData();
    }
}

function syncSimulatorDOM() {
    document.getElementById("sim-capacity").value = state.simulation.capacity;
    document.getElementById("sim-capacity-val").textContent = `${state.simulation.capacity}% (${getCapacityLabel(state.simulation.capacity)})`;
    document.getElementById("sim-biometrics-delay").checked = state.simulation.biometricsDelay;
    document.getElementById("sim-biometrics-text").textContent = state.simulation.biometricsDelay ? "Sí (+21 días)" : "No (+0 días)";
    document.getElementById("sim-scope-cut").checked = state.simulation.scopeCutMVP;
    document.getElementById("sim-scope-text").textContent = state.simulation.scopeCutMVP ? "Sí (Filtrado a Historias Esenciales MVP)" : "No (Alcance Completo)";
}

function saveData() {
    localStorage.setItem("vanti_projects", JSON.stringify(state.projects));
    localStorage.setItem("vanti_epics", JSON.stringify(state.epics));
    localStorage.setItem("vanti_hus", JSON.stringify(state.hus));
    localStorage.setItem("vanti_simulation", JSON.stringify(state.simulation));
}

function getCapacityLabel(capacity) {
    if (capacity < 80) return "Crítica / Escasez de Talento";
    if (capacity < 100) return "Reducida";
    if (capacity === 100) return "Normal";
    if (capacity < 120) return "Optimista";
    return "Máxima / Sobretiempo";
}

function switchTab(tabId) {
    state.activeTab = tabId;
    document.querySelectorAll(".sidebar-nav li").forEach(li => li.classList.remove("active"));
    
    const simSection = document.getElementById("simulator-section");
    const persistenceSection = document.getElementById("persistence-section");
    
    if (tabId === "dashboard") {
        document.getElementById("nav-dashboard").classList.add("active");
        simSection.style.display = "none";
        persistenceSection.style.display = "none";
    } else if (tabId === "simulator") {
        document.getElementById("nav-simulator").classList.add("active");
        simSection.style.display = "block";
        persistenceSection.style.display = "none";
    } else if (tabId === "data-manager") {
        document.getElementById("nav-data-manager").classList.add("active");
        simSection.style.display = "none";
        persistenceSection.style.display = "block";
    }
}

/* ==========================================================================
   ALGORITHMS: CALENDAR-BASED TIMELINE & DELAY PROPAGATION
   ========================================================================== */

let activeHUs = []; // Global calculated state

function runCalculationsAndRender() {
    // 1. Calculate progress % on HUs based on checklists completion
    state.hus.forEach(hu => {
        const totalItems = (hu.acceptanceCriteria ? hu.acceptanceCriteria.length : 0) + 
                           (hu.technicalTasks ? hu.technicalTasks.length : 0);
        
        if (totalItems > 0) {
            const completedItems = (hu.acceptanceCriteria ? hu.acceptanceCriteria.filter(ac => ac.completed).length : 0) +
                                   (hu.technicalTasks ? hu.technicalTasks.filter(ht => ht.completed).length : 0);
            hu.progress = Math.round((completedItems / totalItems) * 100);
            
            if (hu.progress === 100) {
                hu.state = "Done";
            } else if (hu.progress > 0) {
                hu.state = "In Progress";
            } else {
                hu.state = "To Do";
            }
        }
    });

    // 2. Apply Simulation environment variables
    activeHUs = state.hus.map(hu => {
        let copy = JSON.parse(JSON.stringify(hu));

        // MVP filter
        if (state.simulation.scopeCutMVP && !hu.isMVP) {
            copy.state = "Done";
            copy.progress = 100;
            copy.plannedCost = 0;
            copy.actualCost = 0;
            copy.actualEndDate = copy.actualStartDate;
            copy.plannedEndDate = copy.plannedStartDate;
        }

        // Apply capacity factor: expands/shrinks duration of active/pending tasks
        const capacityFactor = 100 / state.simulation.capacity;
        if (copy.state !== "Done") {
            const pStart = new Date(copy.plannedStartDate);
            const pEnd = new Date(copy.plannedEndDate);
            const pDuration = Math.max(1, Math.ceil((pEnd - pStart) / (1000 * 60 * 60 * 24)));
            
            const adjustedPDuration = Math.ceil(pDuration * capacityFactor);
            pEnd.setTime(pStart.getTime() + (adjustedPDuration * 24 * 60 * 60 * 1000));
            copy.plannedEndDate = formatDateISO(pEnd);

            const aStart = new Date(copy.actualStartDate);
            const aEnd = new Date(copy.actualEndDate);
            let aDuration = Math.max(1, Math.ceil((aEnd - aStart) / (1000 * 60 * 60 * 24)));
            
            if (copy.state === "In Progress") {
                const today = new Date("2026-07-05"); // Simulate current date
                const elapsedDays = Math.max(0, Math.ceil((today - aStart) / (1000 * 60 * 60 * 24)));
                const remainingDays = Math.max(0, aDuration - elapsedDays);
                const adjustedRemaining = Math.ceil(remainingDays * capacityFactor);
                aDuration = elapsedDays + adjustedRemaining;
            } else {
                aDuration = Math.ceil(aDuration * capacityFactor);
            }
            aEnd.setTime(aStart.getTime() + (aDuration * 24 * 60 * 60 * 1000));
            copy.actualEndDate = formatDateISO(aEnd);
        }

        // Biometrics Delay (+21 days)
        if (copy.id === "BIOM-HU-01" && state.simulation.biometricsDelay) {
            const aEnd = new Date(copy.actualEndDate);
            aEnd.setDate(aEnd.getDate() + 21);
            copy.actualEndDate = formatDateISO(aEnd);
            copy.isCritical = true;
        }

        return copy;
    });

    // 3. Cascade timelines: updates dependent actual start dates based on dependency completion dates
    activeHUs = propagateCalendarTimelines(activeHUs);

    // Find extreme dates of all HUs to bound Gantt timeline scale
    const allStarts = activeHUs.map(h => new Date(h.actualStartDate).getTime()).concat(activeHUs.map(h => new Date(h.plannedStartDate).getTime()));
    const allEnds = activeHUs.map(h => new Date(h.actualEndDate).getTime()).concat(activeHUs.map(h => new Date(h.plannedEndDate).getTime()));
    portfolioMinDate = new Date(Math.min(...allStarts));
    portfolioMaxDate = new Date(Math.max(...allEnds));

    renderTimelineScaleLabels(portfolioMinDate, portfolioMaxDate);

    // 4. Roll up to Epic level
    let computedEpics = state.epics.map(epic => {
        const epicHUs = activeHUs.filter(h => h.epicId === epic.id);
        
        if (epicHUs.length === 0) {
            return { ...epic, progress: 0, cost: 0, start: "", end: "" };
        }
        
        const totalProg = epicHUs.reduce((sum, h) => sum + h.progress, 0) / epicHUs.length;
        const totalCost = epicHUs.reduce((sum, h) => sum + h.actualCost, 0);
        
        const startTimes = epicHUs.map(h => new Date(h.actualStartDate).getTime());
        const endTimes = epicHUs.map(h => new Date(h.actualEndDate).getTime());
        const minStart = new Date(Math.min(...startTimes));
        const maxEnd = new Date(Math.max(...endTimes));

        // Use database configured start/end dates if available, otherwise fallback to calculated ones
        const displayStart = epic.actualStartDate || formatDateISO(minStart);
        const displayEnd = epic.actualEndDate || formatDateISO(maxEnd);

        return {
            ...epic,
            progress: Math.round(totalProg),
            cost: totalCost,
            start: formatDate(new Date(displayStart)),
            end: formatDate(new Date(displayEnd))
        };
    });

    // 5. Roll up to Project level
    let computedProjects = state.projects.map(proj => {
        const projHUs = activeHUs.filter(h => h.projectId === proj.id);
        
        if (projHUs.length === 0) {
            return {
                ...proj,
                progress: 0,
                plannedCost: 0,
                actualCost: 0,
                plannedStartDate: proj.plannedStartDate || "",
                plannedEndDate: proj.plannedEndDate || "",
                actualStartDate: proj.actualStartDate || "",
                actualEndDate: proj.actualEndDate || "",
                slippageDays: 0
            };
        }

        const totalProgress = projHUs.reduce((sum, h) => sum + h.progress, 0) / projHUs.length;
        const totalPlannedCost = projHUs.reduce((sum, h) => sum + h.plannedCost, 0);
        const totalActualCost = projHUs.reduce((sum, h) => sum + h.actualCost, 0);
        
        const pStarts = projHUs.map(h => new Date(h.plannedStartDate).getTime());
        const pEnds = projHUs.map(h => new Date(h.plannedEndDate).getTime());
        const aStarts = projHUs.map(h => new Date(h.actualStartDate).getTime());
        const aEnds = projHUs.map(h => new Date(h.actualEndDate).getTime());
        
        const plannedStart = pStarts.length > 0 ? formatDateISO(new Date(Math.min(...pStarts))) : (proj.plannedStartDate || "");
        const plannedEnd = pEnds.length > 0 ? formatDateISO(new Date(Math.max(...pEnds))) : (proj.plannedEndDate || "");
        const actualStart = aStarts.length > 0 ? formatDateISO(new Date(Math.min(...aStarts))) : (proj.actualStartDate || "");
        const actualEnd = aEnds.length > 0 ? formatDateISO(new Date(Math.max(...aEnds))) : (proj.actualEndDate || "");
        
        const slippageDays = Math.max(0, Math.ceil((new Date(actualEnd) - new Date(plannedEnd)) / (1000 * 60 * 60 * 24)));

        return {
            ...proj,
            progress: Math.round(totalProgress),
            plannedCost: totalPlannedCost,
            actualCost: totalActualCost,
            plannedStartDate: plannedStart,
            plannedEndDate: plannedEnd,
            actualStartDate: actualStart,
            actualEndDate: actualEnd,
            slippageDays
        };
    });

    // 6. Global Portfolio KPIs
    const totalPlannedCost = computedProjects.reduce((sum, p) => sum + p.plannedCost, 0);
    const totalActualCost = computedProjects.reduce((sum, p) => sum + p.actualCost, 0);
    const costVariance = totalActualCost - totalPlannedCost;
    const costExecutionPercent = totalPlannedCost > 0 ? Math.round((totalActualCost / totalPlannedCost) * 100) : 0;
    
    const criticalHUs = activeHUs.filter(h => h.isCritical);
    const maxPlannedCriticalEnd = criticalHUs.length > 0 ? Math.max(...criticalHUs.map(h => new Date(h.plannedEndDate).getTime())) : 0;
    const maxProjectedCriticalEnd = criticalHUs.length > 0 ? Math.max(...criticalHUs.map(h => new Date(h.actualEndDate).getTime())) : 0;
    const globalSlippageDays = Math.max(0, Math.ceil((maxProjectedCriticalEnd - maxPlannedCriticalEnd) / (1000 * 60 * 60 * 24)));
    const finalLaunchDate = new Date(maxProjectedCriticalEnd || portfolioMaxDate.getTime());

    const totalHUsCount = state.hus.length;
    const completedHUsCount = state.hus.filter(h => h.state === "Done").length;
    const huCompletionPercent = totalHUsCount > 0 ? Math.round((completedHUsCount / totalHUsCount) * 100) : 0;

    // 7. Update KPIs in DOM
    document.getElementById("val-budget-percent").textContent = `${costExecutionPercent}%`;
    document.getElementById("val-budget-absolute").textContent = `$${totalActualCost.toFixed(1)}M / $${totalPlannedCost.toFixed(1)}M`;
    const fillBudget = document.getElementById("fill-budget");
    fillBudget.style.width = `${Math.min(100, costExecutionPercent)}%`;
    
    if (costExecutionPercent > 105) {
        fillBudget.style.backgroundColor = "var(--color-danger)";
        document.getElementById("desc-budget-variance").innerHTML = `Desviación: <span class="cost-overrun">+$${costVariance.toFixed(1)}M COP</span>`;
    } else if (costExecutionPercent < 95) {
        fillBudget.style.backgroundColor = "var(--color-success)";
        document.getElementById("desc-budget-variance").innerHTML = `Desviación: <span class="cost-underrun">-$${Math.abs(costVariance).toFixed(1)}M COP</span>`;
    } else {
        fillBudget.style.backgroundColor = "var(--vanti-yellow)";
        document.getElementById("desc-budget-variance").textContent = `Desviación: $${costVariance.toFixed(1)}M COP`;
    }

    document.getElementById("val-time-deviation").textContent = `${globalSlippageDays} días`;
    document.getElementById("val-time-date").textContent = `Lanzamiento: ${formatDate(finalLaunchDate)}`;
    const timeStatusDesc = document.getElementById("desc-time-status");
    if (globalSlippageDays > 14) {
        timeStatusDesc.innerHTML = `<span class="cost-overrun">Crítico: Retraso en Ruta Crítica (+${globalSlippageDays}d)</span>`;
    } else if (globalSlippageDays > 0) {
        timeStatusDesc.innerHTML = `<span class="text-warning">Desviación menor (+${globalSlippageDays}d)</span>`;
    } else {
        timeStatusDesc.textContent = "Cronograma general al día";
    }

    document.getElementById("val-hu-completion").textContent = `${huCompletionPercent}%`;
    document.getElementById("val-hu-ratio").textContent = `${completedHUsCount} / ${totalHUsCount} HUs`;
    document.getElementById("fill-hu").style.width = `${huCompletionPercent}%`;

    const healthText = document.getElementById("val-health");
    const healthIndicator = document.getElementById("indicator-health");
    if (globalSlippageDays > 14 || costExecutionPercent > 110) {
        healthText.textContent = "Crítico";
        healthText.style.color = "var(--color-danger)";
        healthIndicator.className = "status-indicator status-red";
    } else if (globalSlippageDays > 0 || costExecutionPercent > 102) {
        healthText.textContent = "Riesgo";
        healthText.style.color = "var(--color-warning)";
        healthIndicator.className = "status-indicator status-yellow";
    } else {
        healthText.textContent = "Saludable";
        healthText.style.color = "var(--color-success)";
        healthIndicator.className = "status-indicator status-green";
    }

    // 8. Render subpanels
    renderAccordion(computedProjects, computedEpics, activeHUs);
    renderTimelineGantt(computedProjects);
    renderCostControl(computedProjects, totalPlannedCost, costExecutionPercent);
    renderSimulationAnalysis(globalSlippageDays, totalActualCost, totalPlannedCost, costVariance, costExecutionPercent);
    
    populateProjectSelect();
    updateBurndownChart();
    updateSCurveChart();
}

function propagateCalendarTimelines(husList) {
    let computed = husList.map(h => ({
        ...h,
        pStart: new Date(h.plannedStartDate),
        pEnd: new Date(h.plannedEndDate),
        aStart: new Date(h.actualStartDate),
        aEnd: new Date(h.actualEndDate)
    }));

    for (let i = 0; i < husList.length * 2; i++) {
        let changed = false;
        for (let hu of computed) {
            // 1. HU-level dependency
            if (hu.dependency) {
                const dep = computed.find(h => h.id === hu.dependency);
                if (dep) {
                    if (hu.pStart.getTime() < dep.pEnd.getTime()) {
                        const originalDuration = hu.pEnd.getTime() - hu.pStart.getTime();
                        hu.pStart.setTime(dep.pEnd.getTime());
                        hu.pEnd.setTime(hu.pStart.getTime() + originalDuration);
                        hu.plannedStartDate = formatDateISO(hu.pStart);
                        hu.plannedEndDate = formatDateISO(hu.pEnd);
                        changed = true;
                    }
                    if (hu.aStart.getTime() < dep.aEnd.getTime()) {
                        const originalDuration = hu.aEnd.getTime() - hu.aStart.getTime();
                        hu.aStart.setTime(dep.aEnd.getTime());
                        hu.aEnd.setTime(hu.aStart.getTime() + originalDuration);
                        hu.actualStartDate = formatDateISO(hu.aStart);
                        hu.actualEndDate = formatDateISO(hu.aEnd);
                        changed = true;
                    }
                }
            }

            // 2. Project-level dependency
            const proj = state.projects.find(p => p.id === hu.projectId);
            if (proj && proj.dependency) {
                const parentHUs = computed.filter(h => h.projectId === proj.dependency);
                if (parentHUs.length > 0) {
                    const maxPlannedEnd = Math.max(...parentHUs.map(h => h.pEnd.getTime()));
                    const maxActualEnd = Math.max(...parentHUs.map(h => h.aEnd.getTime()));

                    if (hu.pStart.getTime() < maxPlannedEnd) {
                        const originalDuration = hu.pEnd.getTime() - hu.pStart.getTime();
                        hu.pStart.setTime(maxPlannedEnd);
                        hu.pEnd.setTime(hu.pStart.getTime() + originalDuration);
                        hu.plannedStartDate = formatDateISO(hu.pStart);
                        hu.plannedEndDate = formatDateISO(hu.pEnd);
                        changed = true;
                    }
                    if (hu.aStart.getTime() < maxActualEnd) {
                        const originalDuration = hu.aEnd.getTime() - hu.aStart.getTime();
                        hu.aStart.setTime(maxActualEnd);
                        hu.aEnd.setTime(hu.aStart.getTime() + originalDuration);
                        hu.actualStartDate = formatDateISO(hu.aStart);
                        hu.actualEndDate = formatDateISO(hu.aEnd);
                        changed = true;
                    }
                }
            }
        }
        if (!changed) break;
    }
    return computed;
}

/* ==========================================================================
   RENDER ACCORDION WITH INTEGRATED PROJECTS/EPICS EDIT TRIGGERS
   ========================================================================== */

function renderAccordion(projects, epics, HUs) {
    const accordion = document.getElementById("projects-accordion");
    accordion.innerHTML = "";

    projects.forEach(proj => {
        const isProjExpanded = expandedProjectIds.includes(proj.id);
        const card = document.createElement("div");
        card.className = `project-card ${isProjExpanded ? "expanded" : ""}`;
        card.dataset.id = proj.id;

        const projectEpics = epics.filter(e => e.projectId === proj.id);

        card.innerHTML = `
            <div class="project-summary-header" onclick="toggleProjectExpanded('${proj.id}')">
                <div class="project-title-wrapper">
                    <span class="proj-title">${proj.name}</span>
                    <span class="proj-code">${proj.code || proj.id}</span>
                    ${proj.dependency ? `<span class="proj-dep-badge" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; margin-top: 4px; font-weight: 600; align-self: flex-start;">Dep: ${proj.dependency}</span>` : ""}
                </div>
                <div class="project-progress-wrapper">
                    <div class="proj-progress-label">
                        <span>Avance</span>
                        <span>${proj.progress}%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill progress-blue" style="width: ${proj.progress}%"></div>
                    </div>
                </div>
                <div class="project-cost-wrapper">
                    <span class="proj-label">Costo R / P</span>
                    <span class="proj-value">$${proj.actualCost.toFixed(1)}M / $${proj.plannedCost.toFixed(1)}M</span>
                </div>
                <div class="project-time-wrapper">
                    <span class="proj-label">Calendario Real</span>
                    <span class="proj-value">${formatDateCompact(new Date(proj.actualStartDate))} - ${formatDateCompact(new Date(proj.actualEndDate))}</span>
                    <span class="proj-deviation-text ${proj.slippageDays > 0 ? "cost-overrun" : "cost-underrun"}">
                        ${proj.slippageDays > 0 ? `Desv: +${proj.slippageDays} días` : "A tiempo"}
                    </span>
                </div>
                <div class="project-header-actions">
                    <button class="proj-edit-btn" onclick="event.stopPropagation(); openProjectModal('${proj.id}')" title="Configurar Fechas del Proyecto">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                    </button>
                    <svg class="proj-chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>
                </div>
            </div>
            <div class="project-detail-body">
                <div class="epics-container">
                    ${projectEpics.map(epic => {
                        const isEpicExpanded = expandedEpicIds.includes(epic.id);
                        const epicHUs = HUs.filter(h => h.epicId === epic.id);
                        
                        return `
                            <div class="epic-card ${isEpicExpanded ? 'expanded' : ''}" data-epic-id="${epic.id}">
                                <div class="epic-summary-header" onclick="event.stopPropagation(); toggleEpicExpanded('${epic.id}')">
                                    <div class="epic-title-wrapper">
                                        <span class="epic-title">⚡ Épica: ${epic.name}</span>
                                    </div>
                                    <div class="epic-progress-wrapper">
                                        <div class="epic-progress-label">
                                            <span>Progreso</span>
                                            <span>${epic.progress}%</span>
                                        </div>
                                        <div class="progress-bar-container">
                                            <div class="progress-bar-fill progress-blue" style="width: ${epic.progress}%"></div>
                                        </div>
                                    </div>
                                    <div class="epic-cost">
                                        Período: <strong>${epic.start ? `${epic.start} - ${epic.end}` : '--'}</strong>
                                    </div>
                                    <div class="epic-header-actions">
                                        <button class="epic-edit-btn" onclick="event.stopPropagation(); openEpicModal('${epic.id}')" title="Configurar Fechas de la Épica">
                                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                        </button>
                                        <svg class="epic-chevron" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>
                                    </div>
                                </div>
                                <div class="epic-detail-body">
                                    <div class="hus-table-wrapper">
                                        <table class="hus-list-table">
                                            <thead>
                                                <tr>
                                                    <th>HU / Requerimiento</th>
                                                    <th>Estado</th>
                                                    <th>Progreso</th>
                                                    <th>Costo</th>
                                                    <th>Calendario Real</th>
                                                    <th style="width: 70px;">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                ${epicHUs.map(hu => {
                                                    const isHUExpanded = expandedHUIds.includes(hu.id);
                                                    return `
                                                        <tr class="hu-row ${isHUExpanded ? 'expanded' : ''}" onclick="event.stopPropagation(); toggleHUExpanded('${hu.id}')">
                                                            <td>
                                                                <div class="hu-name-cell">
                                                                    <span class="hu-desc">${hu.name}</span>
                                                                    <span class="hu-id-tag">
                                                                        ${hu.id} 
                                                                        ${hu.isCritical ? '<span class="badge badge-critical">Crítico</span>' : ''} 
                                                                        ${hu.isMVP ? '<span class="badge badge-todo">MVP</span>' : ''}
                                                                        <span style="color:var(--vanti-blue);">(${hu.acceptanceCriteria.length + hu.technicalTasks.length} criterios/tareas)</span>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span class="badge badge-${hu.state.toLowerCase().replace(" ", "")}">${hu.state}</span>
                                                            </td>
                                                            <td>
                                                                <strong>${hu.progress}%</strong>
                                                            </td>
                                                            <td>
                                                                $${hu.actualCost}M / $${hu.plannedCost}M
                                                            </td>
                                                            <td>
                                                                ${formatDateCompact(new Date(hu.actualStartDate))} al ${formatDateCompact(new Date(hu.actualEndDate))}
                                                            </td>
                                                            <td>
                                                                <div class="hu-actions">
                                                                    <button class="action-icon-btn edit-btn" onclick="event.stopPropagation(); openHUModal('${hu.id}')" title="Editar Historia y Fechas">
                                                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                                                    </button>
                                                                    <button class="action-icon-btn delete-btn" onclick="event.stopPropagation(); deleteHU('${hu.id}')" title="Eliminar">
                                                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        
                                                        <!-- Expanded Checklist sub-row -->
                                                        <tr class="hu-subdetails-row">
                                                            <td colspan="6" onclick="event.stopPropagation();">
                                                                <div class="hu-subdetails-container">
                                                                    <!-- Column 1: Acceptance Criteria -->
                                                                    <div class="checklists-column">
                                                                        <div class="checklist-title">Criterios de Aceptación</div>
                                                                        <ul class="checklist-items">
                                                                            ${hu.acceptanceCriteria.map(ac => `
                                                                                <li class="checklist-item ${ac.completed ? 'completed-task' : ''}">
                                                                                    <label class="checkbox-container">
                                                                                        <input type="checkbox" ${ac.completed ? 'checked' : ''} onchange="toggleCriteriaStatus('${hu.id}', '${ac.id}', this.checked)">
                                                                                        <span class="checkmark"></span>
                                                                                        <span class="item-text">${ac.text}</span>
                                                                                    </label>
                                                                                    ${ac.plannedStartDate ? `<span class="task-date-badge" title="Período planificado">${formatDateCompact(new Date(ac.plannedStartDate))} - ${formatDateCompact(new Date(ac.plannedEndDate))}</span>` : ''}
                                                                                </li>
                                                                            `).join("")}
                                                                            ${hu.acceptanceCriteria.length === 0 ? '<span style="color:var(--text-muted); font-size:0.75rem;">No hay criterios asignados.</span>' : ''}
                                                                        </ul>
                                                                    </div>
                                                                    <!-- Column 2: Technical Tasks -->
                                                                    <div class="checklists-column">
                                                                        <div class="checklist-title">Historias Técnicas (HTs)</div>
                                                                        <ul class="checklist-items">
                                                                            ${hu.technicalTasks.map(ht => `
                                                                                <li class="checklist-item ${ht.completed ? 'completed-task' : ''}">
                                                                                    <label class="checkbox-container">
                                                                                        <input type="checkbox" ${ht.completed ? 'checked' : ''} onchange="toggleTechnicalTaskStatus('${hu.id}', '${ht.id}', this.checked)">
                                                                                        <span class="checkmark"></span>
                                                                                        <span class="item-text">${ht.text}</span>
                                                                                    </label>
                                                                                    ${ht.plannedStartDate ? `<span class="task-date-badge" title="Período planificado">${formatDateCompact(new Date(ht.plannedStartDate))} - ${formatDateCompact(new Date(ht.plannedEndDate))}</span>` : ''}
                                                                                </li>
                                                                            `).join("")}
                                                                            ${hu.technicalTasks.length === 0 ? '<span style="color:var(--text-muted); font-size:0.75rem;">No hay tareas técnicas registradas.</span>' : ''}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    `;
                                                }).join("")}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join("")}
                </div>
            </div>
        `;
        accordion.appendChild(card);
    });
}

function toggleProjectExpanded(projId) {
    if (expandedProjectIds.includes(projId)) {
        expandedProjectIds = expandedProjectIds.filter(id => id !== projId);
    } else {
        expandedProjectIds.push(projId);
    }
    runCalculationsAndRender();
}

function toggleEpicExpanded(epicId) {
    if (expandedEpicIds.includes(epicId)) {
        expandedEpicIds = expandedEpicIds.filter(id => id !== epicId);
    } else {
        expandedEpicIds.push(epicId);
    }
    runCalculationsAndRender();
}

function toggleHUExpanded(huId) {
    if (expandedHUIds.includes(huId)) {
        expandedHUIds = expandedHUIds.filter(id => id !== huId);
    } else {
        expandedHUIds.push(huId);
    }
    runCalculationsAndRender();
}

function toggleCriteriaStatus(huId, acId, isChecked) {
    const huObj = state.hus.find(h => h.id === huId);
    if (huObj && huObj.acceptanceCriteria) {
        const acObj = huObj.acceptanceCriteria.find(ac => ac.id === acId);
        if (acObj) acObj.completed = isChecked;
    }
    saveData();
    runCalculationsAndRender();
}

function toggleTechnicalTaskStatus(huId, htId, isChecked) {
    const huObj = state.hus.find(h => h.id === huId);
    if (huObj && huObj.technicalTasks) {
        const htObj = huObj.technicalTasks.find(ht => ht.id === htId);
        if (htObj) htObj.completed = isChecked;
    }
    saveData();
    runCalculationsAndRender();
}

function renderTimelineScaleLabels(minDate, maxDate) {
    const scale = document.getElementById("timeline-scale-labels");
    scale.innerHTML = "";
    
    const totalTime = maxDate.getTime() - minDate.getTime();
    for (let i = 0; i <= 5; i++) {
        const tickTime = minDate.getTime() + (totalTime * (i / 5));
        const tickDate = new Date(tickTime);
        const span = document.createElement("span");
        span.textContent = formatDateCompact(tickDate);
        scale.appendChild(span);
    }
}

// 4.2 Render Gantt
function renderTimelineGantt(projects) {
    const container = document.getElementById("timeline-container");
    container.innerHTML = "";

    const totalPortfolioTime = portfolioMaxDate.getTime() - portfolioMinDate.getTime();
    
    projects.forEach(proj => {
        const row = document.createElement("div");
        row.className = "timeline-row";

        const pStart = new Date(proj.plannedStartDate).getTime();
        const pEnd = new Date(proj.plannedEndDate).getTime();
        const aStart = new Date(proj.actualStartDate).getTime();
        const aEnd = new Date(proj.actualEndDate).getTime();

        const plannedLeft = ((pStart - portfolioMinDate.getTime()) / totalPortfolioTime) * 100;
        const plannedWidth = ((pEnd - pStart) / totalPortfolioTime) * 100;

        const actualLeft = ((aStart - portfolioMinDate.getTime()) / totalPortfolioTime) * 100;
        const actualWidth = ((aEnd - aStart) / totalPortfolioTime) * 100;

        const isCritical = proj.id === "CORE" || proj.id === "RIES" || proj.id === "BIOM" || proj.id === "INTE";

        row.innerHTML = `
            <div class="timeline-proj-name" title="${proj.name}">${proj.name}</div>
            <div class="timeline-bar-wrapper">
                <div class="timeline-bar planned" style="left: ${plannedLeft}%; width: ${plannedWidth}%"></div>
                <div class="timeline-bar actual ${isCritical ? 'critical' : ''}" style="left: ${actualLeft}%; width: ${actualWidth}%"></div>
            </div>
        `;
        container.appendChild(row);
    });
}

// 4.3 Render Cost Control
// 4.3 Render Cost Control (Enhanced EVM and Health Radar)
function renderCostControl(projects, totalPlanned, costPercent) {
    // 1. Calculate Portfolio EVM
    let portfolioPV = 0;
    let portfolioEV = 0;
    let portfolioAC = 0;

    activeHUs.forEach(hu => {
        portfolioPV += hu.plannedCost;
        portfolioEV += (hu.progress / 100) * hu.plannedCost;
        portfolioAC += hu.actualCost;
    });

    const portfolioCPI = portfolioAC > 0 ? (portfolioEV / portfolioAC) : 1.0;
    const portfolioSPI = portfolioPV > 0 ? (portfolioEV / portfolioPV) : 1.0;

    // 2. Render Gauge
    const gaugeFill = document.getElementById("cost-gauge-fill");
    const gaugeVal = document.getElementById("cost-gauge-value");
    const strokeDash = 125.6;
    
    // Budget execution is AC / PV
    const executionPercent = portfolioPV > 0 ? Math.round((portfolioAC / portfolioPV) * 100) : 0;
    const executionRate = Math.min(1.5, executionPercent / 100);
    const offset = strokeDash - (executionRate * strokeDash / 2);

    if (gaugeFill && gaugeVal) {
        gaugeFill.style.strokeDashoffset = offset;
        gaugeVal.textContent = `${executionPercent}%`;
        
        if (executionPercent > 105) {
            gaugeFill.style.stroke = "var(--color-danger)";
            gaugeVal.style.color = "var(--color-danger)";
        } else if (executionPercent < 95) {
            gaugeFill.style.stroke = "var(--color-success)";
            gaugeVal.style.color = "var(--color-success)";
        } else {
            gaugeFill.style.stroke = "var(--vanti-yellow)";
            gaugeVal.style.color = "var(--text-main)";
        }
    }

    // Budget Status Text
    const statusTextEl = document.getElementById("evm-budget-status-text");
    if (statusTextEl) {
        if (executionPercent > 105) {
            statusTextEl.textContent = `Sobre Presupuesto (+${(executionPercent - 100)}%)`;
            statusTextEl.style.color = "var(--color-danger)";
        } else if (executionPercent < 95) {
            statusTextEl.textContent = `Bajo Presupuesto (${executionPercent}%)`;
            statusTextEl.style.color = "var(--color-success)";
        } else {
            statusTextEl.textContent = "Presupuesto Ajustado al Plan";
            statusTextEl.style.color = "var(--vanti-yellow)";
        }
    }

    // 3. Populate EVM Cards
    document.getElementById("evm-val-pv").textContent = `$${portfolioPV.toFixed(1)}M`;
    document.getElementById("evm-val-ev").textContent = `$${portfolioEV.toFixed(1)}M`;
    document.getElementById("evm-val-ac").textContent = `$${portfolioAC.toFixed(1)}M`;
    
    const cpiEl = document.getElementById("evm-val-cpi");
    const spiEl = document.getElementById("evm-val-spi");
    cpiEl.textContent = portfolioCPI.toFixed(2);
    spiEl.textContent = portfolioSPI.toFixed(2);

    // CPI/SPI Colors
    cpiEl.className = "evm-card-value " + (portfolioCPI >= 1.0 ? "cpi-good" : (portfolioCPI >= 0.9 ? "cpi-alert" : "cpi-bad"));
    spiEl.className = "evm-card-value " + (portfolioSPI >= 1.0 ? "spi-good" : (portfolioSPI >= 0.9 ? "spi-alert" : "spi-bad"));

    // 4. Render Health Radar Table Rows (Panel 4.4)
    const radarTbody = document.getElementById("evm-radar-tbody");
    if (radarTbody) {
        radarTbody.innerHTML = "";
        
        projects.forEach(proj => {
            const projHUs = activeHUs.filter(h => h.projectId === proj.id);
            let projPV = 0;
            let projEV = 0;
            let projAC = 0;
            
            projHUs.forEach(hu => {
                projPV += hu.plannedCost;
                projEV += (hu.progress / 100) * hu.plannedCost;
                projAC += hu.actualCost;
            });
            
            const projCPI = projAC > 0 ? (projEV / projAC) : 1.0;
            const projSPI = projPV > 0 ? (projEV / projPV) : 1.0;
            
            let healthText = "";
            let healthClass = "";
            
            if (projCPI >= 0.98 && projSPI >= 0.98) {
                healthText = "Saludable (Bajo Presupuesto & A tiempo)";
                healthClass = "success";
            } else if (projCPI >= 0.9 && projSPI >= 0.9) {
                healthText = "En Rango (Fricción Menor)";
                healthClass = "warning";
            } else if (projCPI < 0.9 && projSPI < 0.9) {
                healthText = "Crítico (Sobre costo & Atrasado)";
                healthClass = "danger";
            } else if (projCPI < 0.9) {
                healthText = "Alerta (Sobre costo)";
                healthClass = "danger";
            } else {
                healthText = "Alerta (Atrasado)";
                healthClass = "warning";
            }
            
            const devText = proj.slippageDays > 0 ? `+${proj.slippageDays} días` : "A tiempo";
            const devClass = proj.slippageDays > 0 ? "cost-overrun" : "cost-underrun";
            
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>
                    <strong style="color:var(--text-main); font-size:0.85rem;">${proj.name}</strong>
                    <div style="font-size:0.7rem; color:var(--text-muted);">${proj.code}</div>
                </td>
                <td>
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                        <span style="font-weight:600;">${proj.progress}%</span>
                        <div class="progress-bar-container" style="height:4px; max-width:80px; margin:0;">
                            <div class="progress-bar-fill progress-blue" style="width: ${proj.progress}%"></div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="${devClass}" style="font-weight:600;">${devText}</span>
                </td>
                <td>
                    <span style="color:var(--text-muted); font-size:0.75rem;">$${projAC.toFixed(1)}M / $${projPV.toFixed(1)}M</span>
                </td>
                <td>
                    <span style="font-weight:600; color:${projCPI >= 1.0 ? 'var(--color-success)' : (projCPI >= 0.9 ? 'var(--vanti-yellow)' : 'var(--color-danger)')};">${projCPI.toFixed(2)}</span>
                </td>
                <td>
                    <span style="font-weight:600; color:${projSPI >= 1.0 ? 'var(--color-success)' : (projSPI >= 0.9 ? 'var(--vanti-yellow)' : 'var(--color-danger)')};">${projSPI.toFixed(2)}</span>
                </td>
                <td>
                    <span class="health-badge ${healthClass}">${healthText}</span>
                </td>
            `;
            radarTbody.appendChild(tr);
        });
    }
}

// Draw S-Curve Chart (EVM Trend)
function updateSCurveChart() {
    const canvas = document.getElementById("sCurveChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Sample points from minDate to maxDate
    const minTime = portfolioMinDate.getTime();
    const maxTime = portfolioMaxDate.getTime();
    const totalDuration = maxTime - minTime;
    const stepCount = 12; // 12 sampling points for smooth curve
    
    let labels = [];
    let pvData = [];
    let evData = [];
    let acData = [];
    
    for (let i = 0; i <= stepCount; i++) {
        const sampleTime = minTime + (totalDuration * (i / stepCount));
        const sampleDate = new Date(sampleTime);
        labels.push(formatDateCompact(sampleDate));

        let cumPV = 0;
        let cumEV = 0;
        let cumAC = 0;

        activeHUs.forEach(hu => {
            const pStart = new Date(hu.plannedStartDate).getTime();
            const pEnd = new Date(hu.plannedEndDate).getTime();
            const pDuration = Math.max(1 * 24 * 60 * 60 * 1000, pEnd - pStart);

            const aStart = new Date(hu.actualStartDate).getTime();
            const aEnd = new Date(hu.actualEndDate).getTime();
            const aDuration = Math.max(1 * 24 * 60 * 60 * 1000, aEnd - aStart);

            // PV Cumulative
            if (sampleTime >= pEnd) {
                cumPV += hu.plannedCost;
            } else if (sampleTime > pStart) {
                const ratio = (sampleTime - pStart) / pDuration;
                cumPV += ratio * hu.plannedCost;
            }

            // AC Cumulative
            if (sampleTime >= aEnd) {
                cumAC += hu.actualCost;
            } else if (sampleTime > aStart) {
                const ratio = (sampleTime - aStart) / aDuration;
                cumAC += ratio * hu.actualCost;
            }

            // EV Cumulative
            const earnedTotal = (hu.progress / 100) * hu.plannedCost;
            if (sampleTime >= aEnd) {
                cumEV += earnedTotal;
            } else if (sampleTime > aStart) {
                const ratio = (sampleTime - aStart) / aDuration;
                cumEV += ratio * earnedTotal;
            }
        });

        pvData.push(parseFloat(pvData.length === 0 ? "0" : cumPV.toFixed(1)));
        evData.push(parseFloat(evData.length === 0 ? "0" : cumEV.toFixed(1)));
        acData.push(parseFloat(acData.length === 0 ? "0" : cumAC.toFixed(1)));
    }

    if (window.mySCurveChart) {
        window.mySCurveChart.destroy();
    }

    window.mySCurveChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Planificado (PV)',
                    data: pvData,
                    borderColor: 'rgba(2, 132, 199, 0.7)',
                    borderDash: [4, 4],
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    tension: 0.2,
                    pointRadius: 2
                },
                {
                    label: 'Ganado (EV)',
                    data: evData,
                    borderColor: 'rgba(16, 185, 129, 1)',
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    tension: 0.2,
                    pointRadius: 3
                },
                {
                    label: 'Ejecutado (AC)',
                    data: acData,
                    borderColor: 'rgba(251, 192, 45, 1)',
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    tension: 0.2,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 10,
                        font: { size: 8 },
                        color: '#94a3b8'
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.02)' },
                    ticks: { color: '#94a3b8', font: { size: 7 } }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.02)' },
                    ticks: { color: '#94a3b8', font: { size: 7 } },
                    title: {
                        display: true,
                        text: 'Presupuesto Acumulado ($M COP)',
                        color: '#94a3b8',
                        font: { size: 8 }
                    }
                }
            }
        }
    });
}

function renderSimulationAnalysis(slippageDays, actualCost, plannedCost, variance, costPercent) {
    const resultsPanel = document.getElementById("simulation-results-panel");
    const analysisText = document.getElementById("sim-analysis-text");
    const simResDays = document.getElementById("sim-res-days");
    const simResCost = document.getElementById("sim-res-cost");
    
    resultsPanel.style.display = "block";
    simResDays.textContent = `+${slippageDays} días`;
    simResCost.textContent = `$${actualCost.toFixed(1)}M COP`;

    if (slippageDays > 0) {
        simResDays.className = "res-value cost-overrun";
    } else {
        simResDays.className = "res-value cost-underrun";
    }

    let text = "";
    if (state.simulation.capacity < 100) {
        text += `<p>⚠️ <strong>Crisis de Capacidad Activa:</strong> Células operando al ${state.simulation.capacity}% de su capacidad.</p>`;
    }
    if (state.simulation.biometricsDelay) {
        text += `<p>🔗 <strong>Fricción Proveedor Biométrico:</strong> Cuello de botella inyecta +21 días en ruta crítica.</p>`;
    }
    if (state.simulation.scopeCutMVP) {
        text += `<p>⚡ <strong>Filtro MVP Activado:</strong> Mitigación de retraso por reducción de alcance (descartando HUs no críticas).</p>`;
    }

    if (slippageDays === 0 && variance <= 0) {
        text += `
            <p>✅ El portafolio financiero se encuentra <strong>saludable</strong>. Las células capturan valor contable real y de negocio sin deuda técnica significante.</p>
            <blockquote>"Recomendación para el CTO: Continuar de acuerdo con el plan inicial de arquitectura. Iniciar despliegue de validaciones biométricas."</blockquote>
        `;
    } else {
        text += `
            <p>🔍 <strong>Análisis consolidado para la CTO:</strong></p>
            <ul>
                <li>Retraso en la fecha de despliegue general: <strong>${slippageDays} días</strong>.</li>
                <li>Presupuesto de portafolio desviado en: <strong>$${variance.toFixed(1)}M COP (${costPercent}%)</strong>.</li>
            </ul>
            <blockquote>
                <strong>Alternativa ejecutiva recomendada:</strong><br>
                ${state.simulation.scopeCutMVP ? 
                    'El plan de contingencia MVP ha sido activado. Logramos salvar la fecha de lanzamiento posponiendo la interfaz contable avanzada.' : 
                    'Se aconseja activar la <strong>Estrategia MVP (Recorte de Alcance)</strong> en el panel de simulación para reducir el desfase de días.'}
            </blockquote>
        `;
    }
    analysisText.innerHTML = text;
}

/* ==========================================================================
   DYNAMIC BURNDOWN CHART IMPLEMENTATION WITH DATE X-AXIS (CHART.JS)
   ========================================================================== */

function populateProjectSelect() {
    const projSelect = document.getElementById("burndown-project-select");
    if (projSelect.options.length === 0) {
        projSelect.innerHTML = state.projects.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
        projSelect.value = selectedBurndownProj;
        populateEpicSelect();
    }
}

function populateEpicSelect() {
    const epicSelect = document.getElementById("burndown-epic-select");
    const projEpics = state.epics.filter(e => e.projectId === selectedBurndownProj);
    
    epicSelect.innerHTML = '<option value="ALL">Todas las Épicas</option>' +
        projEpics.map(e => `<option value="${e.id}">${e.name}</option>`).join("");
        
    selectedBurndownEpic = "ALL";
    epicSelect.value = "ALL";
}

function updateBurndownChart() {
    const ctx = document.getElementById("burndownChart").getContext("2d");

    let selectedHUs = activeHUs.filter(h => h.projectId === selectedBurndownProj);
    if (selectedBurndownEpic !== "ALL") {
        selectedHUs = selectedHUs.filter(h => h.epicId === selectedBurndownEpic);
    }

    const titleEl = document.getElementById("burndown-chart-title");
    if (titleEl) {
        titleEl.textContent = "Burndown de Esfuerzo";
    }

    if (selectedHUs.length === 0) {
        if (window.myBurndownChart) window.myBurndownChart.destroy();
        return;
    }

    const startTimes = selectedHUs.map(h => new Date(h.plannedStartDate).getTime());
    const endTimes = selectedHUs.map(h => new Date(h.actualEndDate).getTime());
    const minStart = new Date(Math.min(...startTimes));
    const maxEnd = new Date(Math.max(...endTimes));
    
    const daysTotal = Math.ceil((maxEnd - minStart) / (1000 * 60 * 60 * 24));
    const weeksTotal = Math.ceil(daysTotal / 7);

    const totalPlannedDays = selectedHUs.reduce((sum, h) => {
        const start = new Date(h.plannedStartDate);
        const end = new Date(h.plannedEndDate);
        return sum + Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    }, 0);

    let labels = [];
    let idealData = [];
    let actualData = [];

    const maxPlannedEnd = new Date(Math.max(...selectedHUs.map(h => new Date(h.plannedEndDate).getTime())));
    const plannedDaysTotal = Math.ceil((maxPlannedEnd - minStart) / (1000 * 60 * 60 * 24));

    for (let w = 0; w <= weeksTotal; w++) {
        const wDate = new Date(minStart.getTime() + (w * 7 * 24 * 60 * 60 * 1000));
        labels.push(formatDateCompact(wDate));

        const elapsedDays = w * 7;
        if (elapsedDays <= plannedDaysTotal) {
            const idealVal = totalPlannedDays * (1 - (elapsedDays / plannedDaysTotal));
            idealData.push(Math.round(Math.max(0, idealVal)));
        } else {
            idealData.push(0);
        }

        let remainingDays = 0;
        selectedHUs.forEach(hu => {
            const huStart = new Date(hu.actualStartDate);
            const huEnd = new Date(hu.actualEndDate);
            const huDuration = Math.max(1, Math.ceil((huEnd - huStart) / (1000 * 60 * 60 * 24)));

            if (hu.state === "Done" && huEnd.getTime() <= wDate.getTime()) {
                // completed
            } else if (hu.state === "To Do" && huStart.getTime() >= wDate.getTime()) {
                remainingDays += huDuration;
            } else {
                let compRatio = 0;
                if (huEnd.getTime() <= wDate.getTime()) {
                    compRatio = 1.0;
                } else if (huStart.getTime() >= wDate.getTime()) {
                    compRatio = 0.0;
                } else {
                    compRatio = hu.progress / 100;
                }
                remainingDays += huDuration * (1 - compRatio);
            }
        });
        actualData.push(Math.round(remainingDays));
    }

    if (window.myBurndownChart) {
        window.myBurndownChart.destroy();
    }

    window.myBurndownChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Esfuerzo Ideal (Plan)',
                    data: idealData,
                    borderColor: 'rgba(2, 132, 199, 0.6)',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    tension: 0.1,
                    pointRadius: 3
                },
                {
                    label: 'Restante Real / Proyectado',
                    data: actualData,
                    borderColor: 'rgba(251, 192, 45, 1)',
                    backgroundColor: 'rgba(251, 192, 45, 0.05)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.2,
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        font: { size: 9 },
                        color: '#94a3b8'
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.03)' },
                    ticks: { color: '#94a3b8', font: { size: 8 } }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.03)' },
                    ticks: { color: '#94a3b8', font: { size: 8 } },
                    title: {
                        display: true,
                        text: 'Esfuerzo Restante (Días)',
                        color: '#94a3b8',
                        font: { size: 9 }
                    }
                }
            }
        }
    });
}

/* ==========================================================================
   PROJECT & EPIC EDIT TRIGGER & FORM SAVE HANDLERS
   ========================================================================== */

function openProjectModal(projId = null) {
    const idGroup = document.getElementById("form-project-id-group");
    const titleEl = document.getElementById("project-modal-title");
    const idInput = document.getElementById("form-project-id-edit");
    const depSelect = document.getElementById("form-project-dependency");
    
    // Fill dependencies dropdown
    const availableProjects = state.projects.filter(p => !projId || p.id !== projId);
    depSelect.innerHTML = `<option value="">(Ninguno)</option>` + 
        availableProjects.map(p => `<option value="${p.id}">${p.name} (${p.id})</option>`).join("");

    if (projId) {
        // EDIT MODE
        const proj = state.projects.find(p => p.id === projId);
        if (!proj) return;

        titleEl.textContent = "Editar Configuración de Proyecto";
        idGroup.style.display = "none";
        idInput.value = proj.id;
        idInput.removeAttribute("required");

        document.getElementById("form-project-name-edit").value = proj.name;
        document.getElementById("form-project-desc-edit").value = proj.desc || "";
        depSelect.value = proj.dependency || "";
        
        document.getElementById("form-project-planned-start").value = proj.plannedStartDate || "2026-07-01";
        document.getElementById("form-project-planned-end").value = proj.plannedEndDate || "2026-11-15";
        document.getElementById("form-project-actual-start").value = proj.actualStartDate || "2026-07-01";
        document.getElementById("form-project-actual-end").value = proj.actualEndDate || "2026-11-20";
    } else {
        // CREATE MODE
        titleEl.textContent = "Agregar Nuevo Proyecto";
        idGroup.style.display = "block";
        idInput.value = "";
        idInput.setAttribute("required", "true");

        document.getElementById("form-project-name-edit").value = "";
        document.getElementById("form-project-desc-edit").value = "";
        depSelect.value = "";
        
        document.getElementById("form-project-planned-start").value = "2026-07-01";
        document.getElementById("form-project-planned-end").value = "2026-11-15";
        document.getElementById("form-project-actual-start").value = "2026-07-01";
        document.getElementById("form-project-actual-end").value = "2026-11-20";
    }

    document.getElementById("project-modal").classList.add("active");
}

function closeProjectModal() {
    document.getElementById("project-modal").classList.remove("active");
}

function saveProjectForm(e) {
    e.preventDefault();
    const idInput = document.getElementById("form-project-id-edit").value.trim().toUpperCase();
    if (!idInput) {
        alert("El código del proyecto es obligatorio.");
        return;
    }

    let proj = state.projects.find(p => p.id === idInput);
    const isCreate = !proj;

    if (isCreate) {
        // Check for duplicate ID
        if (state.projects.some(p => p.id === idInput)) {
            alert("Este código de proyecto ya existe.");
            return;
        }

        proj = {
            id: idInput,
            code: idInput,
            name: "",
            desc: "",
            progress: 0,
            plannedCost: 0,
            actualCost: 0,
            plannedStartDate: "",
            plannedEndDate: "",
            actualStartDate: "",
            actualEndDate: "",
            dependency: "",
            slippageDays: 0
        };
    }

    proj.name = document.getElementById("form-project-name-edit").value;
    proj.desc = document.getElementById("form-project-desc-edit").value;
    proj.plannedStartDate = document.getElementById("form-project-planned-start").value;
    proj.plannedEndDate = document.getElementById("form-project-planned-end").value;
    proj.actualStartDate = document.getElementById("form-project-actual-start").value;
    proj.actualEndDate = document.getElementById("form-project-actual-end").value;
    proj.dependency = document.getElementById("form-project-dependency").value;

    if (isCreate) {
        state.projects.push(proj);
    }

    saveData();
    closeProjectModal();
    runCalculationsAndRender();
}

function openEpicModal(epicId = null) {
    const projectSelect = document.getElementById("form-epic-project-id");
    projectSelect.innerHTML = state.projects.map(p => `<option value="${p.id}">${p.name}</option>`).join("");

    const titleEl = document.getElementById("epic-modal-title");
    const projectGroup = document.getElementById("form-epic-project-group");

    if (epicId) {
        // Mode: EDIT
        const epic = state.epics.find(e => e.id === epicId);
        if (!epic) return;

        titleEl.textContent = "Editar Configuración de Épica";
        projectGroup.style.display = "none";

        document.getElementById("form-epic-id-edit").value = epic.id;
        document.getElementById("form-epic-name-edit").value = epic.name;
        document.getElementById("form-epic-desc-edit").value = epic.desc || "";
        
        document.getElementById("form-epic-planned-start").value = epic.plannedStartDate || "2026-07-01";
        document.getElementById("form-epic-planned-end").value = epic.plannedEndDate || "2026-10-20";
        document.getElementById("form-epic-actual-start").value = epic.actualStartDate || "2026-07-01";
        document.getElementById("form-epic-actual-end").value = epic.actualEndDate || "2026-10-27";
    } else {
        // Mode: CREATE
        titleEl.textContent = "Agregar Nueva Épica";
        projectGroup.style.display = "block";

        document.getElementById("form-epic-id-edit").value = "";
        document.getElementById("form-epic-name-edit").value = "";
        document.getElementById("form-epic-desc-edit").value = "";

        const todayStr = formatDateISO(new Date());
        document.getElementById("form-epic-planned-start").value = todayStr;
        document.getElementById("form-epic-planned-end").value = todayStr;
        document.getElementById("form-epic-actual-start").value = todayStr;
        document.getElementById("form-epic-actual-end").value = todayStr;
    }

    document.getElementById("epic-modal").classList.add("active");
}

function closeEpicModal() {
    document.getElementById("epic-modal").classList.remove("active");
}

function saveEpicForm(e) {
    e.preventDefault();
    const id = document.getElementById("form-epic-id-edit").value;

    const epicData = {
        name: document.getElementById("form-epic-name-edit").value,
        desc: document.getElementById("form-epic-desc-edit").value,
        plannedStartDate: document.getElementById("form-epic-planned-start").value,
        plannedEndDate: document.getElementById("form-epic-planned-end").value,
        actualStartDate: document.getElementById("form-epic-actual-start").value,
        actualEndDate: document.getElementById("form-epic-actual-end").value
    };

    if (id) {
        // Mode: EDIT
        const epic = state.epics.find(e => e.id === id);
        if (epic) {
            Object.assign(epic, epicData);
        }
    } else {
        // Mode: CREATE
        const projId = document.getElementById("form-epic-project-id").value;
        const newId = `${projId}-EP-${String(state.epics.filter(e => e.projectId === projId).length + 1).padStart(2, "0")}`;
        
        const newEpic = {
            id: newId,
            projectId: projId,
            ...epicData
        };
        state.epics.push(newEpic);
    }

    saveData();
    closeEpicModal();
    runCalculationsAndRender();
}

/* ==========================================================================
   HU FORM DYNAMIC ROW GENERATION WITH plannedStartDate & plannedEndDate
   ========================================================================== */

function openHUModal(huId = null) {
    const modal = document.getElementById("hu-modal");
    const form = document.getElementById("hu-form");
    const title = document.getElementById("modal-title");
    
    const projectSelect = document.getElementById("form-project-id");
    projectSelect.innerHTML = state.projects.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
    projectSelect.onchange = () => syncModalEpicDropdown(projectSelect.value);

    const depSelect = document.getElementById("form-hu-dependency");
    const filterHUs = huId ? state.hus.filter(h => h.id !== huId) : state.hus;
    depSelect.innerHTML = '<option value="">Ninguna</option>' + 
        filterHUs.map(h => `<option value="${h.id}">${h.id} - ${h.name}</option>`).join("");

    document.getElementById("form-ac-list").innerHTML = "";
    document.getElementById("form-ht-list").innerHTML = "";

    if (huId) {
        const hu = state.hus.find(h => h.id === huId);
        if (hu) {
            title.textContent = `Editar Historia de Usuario (${hu.id})`;
            document.getElementById("form-hu-id").value = hu.id;
            projectSelect.value = hu.projectId;
            projectSelect.disabled = true;
            
            syncModalEpicDropdown(hu.projectId);
            document.getElementById("form-epic-id").value = hu.epicId;
            
            document.getElementById("form-hu-name").value = hu.name;
            document.getElementById("form-hu-state").value = hu.state;
            
            document.getElementById("form-hu-planned-start").value = hu.plannedStartDate;
            document.getElementById("form-hu-planned-end").value = hu.plannedEndDate;
            document.getElementById("form-hu-actual-start").value = hu.actualStartDate;
            document.getElementById("form-hu-actual-end").value = hu.actualEndDate;

            document.getElementById("form-hu-planned-cost").value = hu.plannedCost;
            document.getElementById("form-hu-actual-cost").value = hu.actualCost;
            
            depSelect.value = hu.dependency || "";
            document.getElementById("form-hu-is-critical").checked = hu.isCritical || false;
            document.getElementById("form-hu-is-mvp").checked = hu.isMVP || false;

            if (hu.acceptanceCriteria) {
                hu.acceptanceCriteria.forEach(ac => addACFormRow(ac.text, ac.completed, ac.id, ac.plannedStartDate, ac.plannedEndDate));
            }
            if (hu.technicalTasks) {
                hu.technicalTasks.forEach(ht => addHTFormRow(ht.text, ht.completed, ht.id, ht.plannedStartDate, ht.plannedEndDate));
            }
        }
    } else {
        title.textContent = "Agregar Historia de Usuario";
        form.reset();
        document.getElementById("form-hu-id").value = "";
        projectSelect.disabled = false;
        syncModalEpicDropdown(projectSelect.value);
        
        const todayStr = formatDateISO(new Date());
        document.getElementById("form-hu-planned-start").value = todayStr;
        document.getElementById("form-hu-planned-end").value = todayStr;
        document.getElementById("form-hu-actual-start").value = todayStr;
        document.getElementById("form-hu-actual-end").value = todayStr;

        addACFormRow("", false);
        addHTFormRow("", false);
    }
    modal.classList.add("active");
}

function syncModalEpicDropdown(projId) {
    const epicSelect = document.getElementById("form-epic-id");
    const projEpics = state.epics.filter(e => e.projectId === projId);
    epicSelect.innerHTML = projEpics.map(e => `<option value="${e.id}">${e.name}</option>`).join("");
}

function closeHUModal() {
    document.getElementById("hu-modal").classList.remove("active");
}

function addACFormRow(text = "", completed = false, id = null, start = "", end = "") {
    const container = document.getElementById("form-ac-list");
    const rowId = id || `ac-temp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    
    const startVal = start || formatDateISO(new Date());
    const endVal = end || formatDateISO(new Date());

    const row = document.createElement("div");
    row.className = "form-item-row";
    row.dataset.id = rowId;
    
    row.innerHTML = `
        <input type="checkbox" ${completed ? 'checked' : ''} class="ac-checkbox">
        <input type="text" value="${text}" placeholder="Ej. Cumplir con latencias base" required class="ac-text">
        <input type="date" value="${startVal}" class="ac-start" required title="Inicio Criterio">
        <input type="date" value="${endVal}" class="ac-end" required title="Fin Criterio">
        <button type="button" class="action-icon-btn delete-btn" onclick="this.parentElement.remove()" title="Eliminar Criterio">&times;</button>
    `;
    container.appendChild(row);
}

function addHTFormRow(text = "", completed = false, id = null, start = "", end = "") {
    const container = document.getElementById("form-ht-list");
    const rowId = id || `ht-temp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    
    const startVal = start || formatDateISO(new Date());
    const endVal = end || formatDateISO(new Date());

    const row = document.createElement("div");
    row.className = "form-item-row";
    row.dataset.id = rowId;
    
    row.innerHTML = `
        <input type="checkbox" ${completed ? 'checked' : ''} class="ht-checkbox">
        <input type="text" value="${text}" placeholder="Ej. Desarrollar store procedures" required class="ht-text">
        <input type="date" value="${startVal}" class="ht-start" required title="Inicio Tarea">
        <input type="date" value="${endVal}" class="ht-end" required title="Fin Tarea">
        <button type="button" class="action-icon-btn delete-btn" onclick="this.parentElement.remove()" title="Eliminar Tarea">&times;</button>
    `;
    container.appendChild(row);
}

function saveHUForm(e) {
    e.preventDefault();

    const huId = document.getElementById("form-hu-id").value;
    const projId = document.getElementById("form-project-id").value;
    const epicId = document.getElementById("form-epic-id").value;

    const acList = [];
    document.querySelectorAll("#form-ac-list .form-item-row").forEach((row, index) => {
        const textVal = row.querySelector(".ac-text").value.trim();
        if (textVal) {
            acList.push({
                id: row.dataset.id.startsWith("ac-temp-") ? `${huId || 'HU'}-AC${index + 1}` : row.dataset.id,
                text: textVal,
                completed: row.querySelector(".ac-checkbox").checked,
                plannedStartDate: row.querySelector(".ac-start").value,
                plannedEndDate: row.querySelector(".ac-end").value,
                actualStartDate: row.querySelector(".ac-start").value,
                actualEndDate: row.querySelector(".ac-end").value
            });
        }
    });

    const htList = [];
    document.querySelectorAll("#form-ht-list .form-item-row").forEach((row, index) => {
        const textVal = row.querySelector(".ht-text").value.trim();
        if (textVal) {
            htList.push({
                id: row.dataset.id.startsWith("ht-temp-") ? `${huId || 'HU'}-HT${index + 1}` : row.dataset.id,
                text: textVal,
                completed: row.querySelector(".ht-checkbox").checked,
                plannedStartDate: row.querySelector(".ht-start").value,
                plannedEndDate: row.querySelector(".ht-end").value,
                actualStartDate: row.querySelector(".ht-start").value,
                actualEndDate: row.querySelector(".ht-end").value
            });
        }
    });

    const targetHUID = huId || generateNewHUID(projId);

    const plannedStart = document.getElementById("form-hu-planned-start").value;
    const plannedEnd = document.getElementById("form-hu-planned-end").value;
    const actualStart = document.getElementById("form-hu-actual-start").value;
    const actualEnd = document.getElementById("form-hu-actual-end").value;

    if (new Date(plannedEnd) < new Date(plannedStart)) {
        alert("Error: Fin planificado no anterior a inicio.");
        return;
    }
    if (new Date(actualEnd) < new Date(actualStart)) {
        alert("Error: Fin real no anterior a inicio.");
        return;
    }

    const huData = {
        id: targetHUID,
        projectId: projId,
        epicId: epicId,
        name: document.getElementById("form-hu-name").value,
        state: document.getElementById("form-hu-state").value,
        progress: 0,
        plannedCost: parseFloat(document.getElementById("form-hu-planned-cost").value),
        actualCost: parseFloat(document.getElementById("form-hu-actual-cost").value),
        plannedStartDate: plannedStart,
        plannedEndDate: plannedEnd,
        actualStartDate: actualStart,
        actualEndDate: actualEnd,
        dependency: document.getElementById("form-hu-dependency").value,
        isCritical: document.getElementById("form-hu-is-critical").checked,
        isMVP: document.getElementById("form-hu-is-mvp").checked,
        acceptanceCriteria: acList,
        technicalTasks: htList
    };

    if (huId) {
        const idx = state.hus.findIndex(h => h.id === huId);
        if (idx !== -1) state.hus[idx] = huData;
    } else {
        state.hus.push(huData);
    }

    saveData();
    closeHUModal();
    runCalculationsAndRender();
}

function deleteHU(huId) {
    if (confirm(`¿Eliminar la HU ${huId}?`)) {
        state.hus = state.hus.filter(h => h.id !== huId);
        state.hus.forEach(h => { if (h.dependency === huId) h.dependency = ""; });
        saveData();
        runCalculationsAndRender();
    }
}

function generateNewHUID(projectId) {
    const projHUs = state.hus.filter(h => h.projectId === projectId);
    const count = projHUs.length + 1;
    return `${projectId}-HU-${String(count).padStart(2, "0")}`;
}

/* ==========================================================================
   JSON PERSISTENCE EXPORT / IMPORT
   ========================================================================== */

function exportDataAsJSON() {
    const payload = {
        projects: state.projects,
        epics: state.epics,
        hus: state.hus
    };
    const dataStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `vanti_full_calendar_portfolio_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function handleImportJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const importedData = JSON.parse(evt.target.result);
            if (importedData.projects && importedData.epics && importedData.hus) {
                state.projects = importedData.projects;
                state.epics = importedData.epics;
                state.hus = importedData.hus;
                saveData();
                runCalculationsAndRender();
                alert("¡Avances y cronogramas con fechas del portafolio cargados con éxito!");
            } else {
                alert("Error: El archivo JSON debe contener 'projects', 'epics' y 'hus'.");
            }
        } catch (err) {
            alert("Error al parsear el archivo JSON: " + err.message);
        }
    };
    reader.readAsText(file);
    e.target.value = "";
}

function downloadTemplateJSON() {
    const template = {
        projects: BACKUP_DATA.projects,
        epics: BACKUP_DATA.epics,
        hus: BACKUP_DATA.hus
    };
    const dataStr = JSON.stringify(template, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "plantilla_vanti_fechas.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function formatDateCompact(date) {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function formatDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
