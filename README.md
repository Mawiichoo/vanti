# Vanti - Dashboard de Gobierno y Control Estratégico de Portafolio (v3.0)

Este dashboard es una herramienta web de control y gobierno estratégico diseñada para la toma de decisiones del **CTO** de **Vanti S.A. ESP** sobre el portafolio del **Ecosistema Financiero Integral**. Integra en una sola interfaz las tres dimensiones clave de la gestión de proyectos: **Alcance (Avance Físico)**, **Tiempo (Cronograma y Fechas)** y **Costo (Presupuesto y Valor Ganado)**.

---

## 📖 1. Glosario de Abreviaciones de Negocio

El tablero utiliza términos del mundo del desarrollo ágil de software y la ingeniería de costos financieros:

### Terminología Ágil y de Negocio
*   **HU (Historia de Usuario)**: Unidad mínima de valor de negocio que describe un requerimiento funcional solicitado por el usuario o cliente.
*   **HT (Historia Técnica / Tarea Técnica)**: Tarea de infraestructura, base de datos, arquitectura o backend requerida para dar soporte a las HUs.
*   **AC (Criterio de Aceptación)**: Condiciones preestablecidas que debe cumplir una HU para que el área de negocio/QA la considere completada.
*   **MVP (Mínimo Producto Viable)**: Conjunto mínimo de funcionalidades esenciales requeridas para lanzar el producto al mercado. Las HUs no-MVP son complementarias y susceptibles a ser postergadas en caso de crisis.
*   **CTO (Chief Technology Officer)**: Director de Tecnología, usuario principal de este tablero de control ejecutivo.
*   **Backlog**: Lista priorizada de trabajo y requerimientos del portafolio que servirá para alimentar el sistema.

### Métricas de Valor Ganado (EVM)
*   **EVM (Earned Value Management)**: Gestión de Valor Ganado, metodología estándar para integrar alcance, tiempo y costos.
*   **PV (Planned Value / Valor Planificado)**: Presupuesto autorizado acumulado que se planificó gastar hasta una fecha determinada según el cronograma.
*   **EV (Earned Value / Valor Ganado)**: Presupuesto autorizado del trabajo que **realmente se ha completado** hasta la fecha ($EV = \% \text{ Avance Físico} \times \text{Presupuesto Planificado}$). Representa el valor capturado real.
*   **AC (Actual Cost / Costo Real)**: Dinero real gastado y contabilizado por las células de desarrollo en el trabajo completado hasta la fecha.
*   **IPC / CPI (Índice de Desempeño de Costos)**: Eficiencia financiera ($EV / AC$). Un valor $\ge 1.0$ indica que estamos por debajo del presupuesto planificado (óptimo).
*   **IPT / SPI (Índice de Desempeño de Cronograma)**: Eficiencia en tiempo ($EV / PV$). Un valor $\ge 1.0$ indica que vamos adelantados respecto al plan inicial (óptimo).

---

## 🚀 2. Funcionalidades del Tablero

1.  **KPIs Ejecutivos en Tiempo Real (Ribbon)**: Tarjetas de resumen en la parte superior que muestran el estado de salud del portafolio (Saludable, Riesgo, Crítico), el porcentaje de presupuesto ejecutado global, la desviación del calendario en días y el porcentaje total de HUs completadas.
2.  **4.1 Visibilidad de Avance de Portafolio**: Acordeón dinámico que despliega la jerarquía ágil en cascada: **Proyecto $\rightarrow$ Épicas $\rightarrow$ HUs $\rightarrow$ Criterios de Aceptación (AC) y Historias Técnicas (HT)**. Permite registrar avances interactivos mediante checkboxes y abrir modales de edición.
3.  **4.2 Cronograma y Ruta Crítica (Gantt)**: Mapeo de la escala temporal del portafolio que contrasta de manera visual las barras de fechas **Planificadas** (azul punteado) contra las fechas **Reales / Proyectadas** (sólido). Resalta en rojo los proyectos que forman la **Ruta Crítica** corporativa (CORE, RIES, BIOM, INTE).
4.  **4.3 Control Tridimensional de Costos (EVM & Curva-S)**:
    *   **Circular Gauge**: Medidor de la ejecución acumulada del presupuesto total.
    *   **EVM Cards**: Tarjetas ejecutivas que desglosan el PV, EV, AC del portafolio y calculan el IPC (CPI) e IPT (SPI) al instante.
    *   **Gráfico de Curva-S**: Grafica de manera acumulativa las curvas de PV, EV y AC sobre la línea de tiempo del calendario, mostrando visualmente la desviación financiera y el retraso del portafolio.
5.  **4.4 Radar de Salud y Valor Ganado Integrado**: Matriz unificada que consolida las tres dimensiones (4.1 Avance, 4.2 Desviación Tiempo y 4.3 Costos R/P) por cada proyecto individual junto a sus índices IPC e IPT, asignando un estado de salud tridimensional automático.
6.  **Simulador de Escenarios de Crisis (Trade-offs)**:
    *   *Desviación de Capacidad*: Simula células operando a menor capacidad (e.g. 70%), incrementando proporcionalmente la duración de las tareas pendientes.
    *   *Fricción Biométrica*: Inserta un cuello de botella fijo de +21 días en el proyecto biométrico.
    *   *Estrategia MVP (Mitigación)*: Recorta el alcance postergando HUs secundarias (no-MVP), convirtiendo automáticamente su costo a $0 y su progreso al 100% para salvar la fecha de lanzamiento del Core Financiero.
7.  **Carga y Persistencia Local / JSON**: Soporte de persistencia mediante almacenamiento local del navegador (`localStorage`) y exportación/importación del backlog completo como archivo `data.json`.
8.  **Minimización de Paneles**: Capacidad de contraer o expandir cada caja del tablero mediante un botón chevron interactivo para optimizar el área de visualización.

---

## 🧠 3. Lógica y Algoritmos de Negocio

### Algoritmo de Roll-up de Avance Físico
El porcentaje de progreso se calcula de abajo hacia arriba de la siguiente forma:
1.  **Avance de Historia de Usuario (HU)**: Es el número de ACs y HTs completados dividido entre la suma total de elementos:
    $$\% \text{ Avance HU} = \frac{\text{ACs Completados} + \text{HTs Completadas}}{\text{Total ACs} + \text{Total HTs}} \times 100$$
2.  **Avance de Épica**: Es el promedio simple del progreso de las HUs pertenecientes a dicha Épica.
3.  **Avance de Proyecto**: Es el promedio simple del progreso de las HUs asociadas a todo el Proyecto.

### Motor de Cronograma y Propagación de Retrasos
El cronograma dinámico del Gantt calcula de forma automática el desplazamiento en cascada cuando existen dependencias lógicas entre HUs:
1.  El motor analiza recursivamente las dependencias definidas (`dependency`).
2.  Si la fecha de finalización real calculada de una HU predecesora ($HU_A$) es mayor a la fecha de inicio real de la HU dependiente ($HU_B$), el motor **desplaza automáticamente** la fecha de inicio de $HU_B$ para que comience al día siguiente de la finalización de $HU_A$.
3.  El motor mantiene la duración original en días de la tarea dependiente, recalculando su nueva fecha de finalización real. Esta propagación continúa en cascada hacia las siguientes historias vinculadas, afectando las fechas finales del Proyecto y el lanzamiento general del portafolio.

### Lógica de Curva-S acumulativa (EVM)
Para graficar la tendencia financiera, la aplicación muestrea el rango de fechas del portafolio en intervalos semanales y distribuye los costos linealmente por día para cada HU:
*   **PV Diario de HU**: $Cost_{\text{Planned}} / \text{Duración Planificada}$
*   **AC Diario de HU**: $Cost_{\text{Actual}} / \text{Duración Real}$
*   **EV Diario de HU**: $(\% \text{ Avance} \times Cost_{\text{Planned}}) / \text{Duración Real}$

Al sumar estos valores día con día de forma acumulativa en el portafolio, se generan las tres curvas en forma de "S" que permiten al CTO diagnosticar si el ecosistema financiero está gastando de forma óptima respecto a la velocidad de entrega real del software.

---

## 📂 4. Gestión de Datos y Carga Masiva (Excel/CSV)

El dashboard cuenta con herramientas para alimentar el backlog de manera masiva fuera de la interfaz del usuario utilizando plantillas de Excel:

### Pasos para Carga Masiva:
1.  Abre el archivo [backlog_carga_masiva.csv](file:///c:/Users/crist/OneDrive/Escritorio/Vanti/backlog_carga_masiva.csv) en Excel.
2.  Agrega tus proyectos, épicas e historias en las filas correspondientes siguiendo el formato.
    *   *Nota*: Escribe los Criterios de Aceptación y las Tareas Técnicas en sus respectivas columnas como textos separados por el carácter **`|`** (Ej: `Tarea 1 | Tarea 2 | Tarea 3`). El convertidor creará automáticamente la estructura anidada y les asignará fechas de manera automática basadas en los límites de la HU.
3.  Guarda los cambios como archivo CSV (delimitado por comas).
4.  Transforma tu archivo CSV a JSON usando cualquiera de estas dos herramientas offline incluidas en tu carpeta:
    *   **Vía Web (Sin código)**: Abre el archivo [convertidor_masivo.html](file:///c:/Users/crist/OneDrive/Escritorio/Vanti/convertidor_masivo.html) con doble clic en tu explorador. Arrastra tu CSV al recuadro de carga, haz clic en **Convertir Datos** y presiona **Descargar data.json**.
    *   **Vía Consola (Python)**: Ejecuta el script `python convertir.py` en tu terminal de comandos para generar automáticamente el archivo `data.json`.
5.  Reemplaza el archivo `data.json` original en tu carpeta de proyecto.
6.  Abre el dashboard (`index.html`), ve a la pestaña **Carga y Persistencia** y presiona **Restablecer Datos de Fábrica** para actualizar los datos visualizados en el portal.
