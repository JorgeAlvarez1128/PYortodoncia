# Ortodoncia The Arsenal

Sistema web para la gestión clínica y operativa de una clínica de ortodoncia.

**Repositorio:** https://github.com/JorgeAlvarez1128/PYortodoncia

---

## Integrante

- Jorge Andres Alvarez

---

## Descripción general

**Ortodoncia The Arsenal** es una aplicación web desarrollada con fines académicos para apoyar la gestión de una clínica de ortodoncia.

El sistema permite centralizar procesos asociados a la atención clínica y operativa, tales como la administración de pacientes, odontólogos, turnos, evolución clínica, inventario de insumos, consumo de materiales clínicos y generación de reportes operativos.

La solución está compuesta por un **backend desarrollado en Java con Spring Boot**, un **frontend desarrollado en React con Vite** y una **base de datos MySQL**. La aplicación fue personalizada visualmente con una identidad alusiva a Ortodoncia The Arsenal, empleando una paleta roja, dorada, blanca y oscura.

---

## Objetivo del proyecto

Desarrollar un sistema web que permita mejorar la organización, trazabilidad y control operativo de una clínica de ortodoncia, facilitando la gestión de citas, pacientes, profesionales, historia clínica, insumos y reportes administrativos.

---

## Tecnologías utilizadas

### Backend

- Java 17
- Spring Boot
- Spring Web
- Spring Security
- JWT para autenticación
- Spring Data JPA
- Hibernate
- Maven
- MySQL Connector

### Frontend

- React
- Vite
- JavaScript
- React Router
- Bootstrap
- CSS personalizado
- SweetAlert2
- FontAwesome

### Base de datos

- MySQL Server 8
- MySQL Workbench o consola MySQL

### Control de versiones

- Git
- GitHub

---

## Funcionalidades implementadas

### Gestión de usuarios y autenticación

- Inicio de sesión.
- Control de acceso mediante roles.
- Manejo de token JWT.
- Roles principales: administrador, odontólogo y paciente.

### Gestión de pacientes

- Registro de pacientes.
- Consulta de pacientes.
- Actualización de información.
- Eliminación o gestión de registros.

### Gestión de odontólogos

- Registro de odontólogos.
- Consulta de profesionales.
- Asociación de especialidad.
- Administración de información básica del profesional.

### Gestión de turnos

- Creación de turnos o citas.
- Asociación de paciente y odontólogo.
- Selección de fecha y hora.
- Consulta de turnos registrados.
- Edición y gestión de turnos.

### Historia clínica / evolución clínica

- Registro de evolución clínica asociada a un turno.
- Registro de diagnóstico.
- Registro de plan de tratamiento.
- Registro de evolución.
- Registro de observaciones clínicas.
- Consulta de evoluciones por paciente o por turno.

### Inventario de insumos

- Registro de insumos clínicos.
- Consulta de inventario.
- Actualización de insumos.
- Control de stock actual.
- Control de stock mínimo.
- Alerta de bajo inventario.
- Inactivación de insumos.

### Consumo de insumos

- Registro de insumos utilizados durante una atención.
- Asociación del consumo a un turno.
- Descuento automático del stock.
- Consulta de consumos registrados.
- Consulta de consumos por turno.

### Reportes operativos

- Generación de reportes por rango de fechas.
- Total de turnos.
- Turnos atendidos.
- Turnos pendientes.
- Consumo consolidado de insumos.
- Productividad por odontólogo.

---

## Flujos alternativos y validaciones implementadas

El backend incorpora validaciones y manejo de errores para evitar registros inconsistentes. Entre los principales flujos alternativos se encuentran:

- Rechazo de insumos con nombre, categoría o unidad de medida vacíos.
- Rechazo de stock actual o stock mínimo negativo.
- Rechazo de insumos duplicados por nombre.
- Rechazo de consumo de insumos con cantidad menor o igual a cero.
- Rechazo de consumo cuando el turno no existe.
- Rechazo de consumo cuando el insumo no existe o está inactivo.
- Prevención de salidas de inventario que dejen el stock en valores negativos.
- Rechazo de evolución clínica sin diagnóstico, plan de tratamiento o evolución.
- Rechazo de evolución clínica cuando el turno asociado no existe.
- Rechazo de evolución clínica duplicada para un mismo turno.
- Rechazo de reportes con fecha final anterior a la fecha inicial.

---

## Estructura del proyecto

```text
Ortodoncia-The-Arsenal
├── backend
│   ├── src
│   ├── pom.xml
│   └── ...
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
├── schema-ortodoncia-the-arsenal.sql
├── README.md
├── .gitignore
└── ...
```

---

## Requisitos de instalación

Antes de ejecutar el proyecto se debe tener instalado:

- Git
- Node.js
- npm
- Java JDK 17
- Maven
- MySQL Server 8
- Visual Studio Code o un editor equivalente

Se puede verificar la instalación con los siguientes comandos:

```powershell
git --version
node -v
npm -v
java -version
javac -version
mvn -v
mysql --version
```

---

## Configuración de la base de datos

El backend está configurado para conectarse a una base de datos MySQL llamada:

```text
odontotal
```

Este nombre se conserva por compatibilidad con la estructura heredada del backend.

Para crear la base de datos:

```sql
CREATE DATABASE odontotal;
```

Para verificar que fue creada:

```sql
SHOW DATABASES;
```

---

## Ejecución del backend

Ingresar a la carpeta del backend:

```powershell
cd C:\Users\alvar\proyectos\Ortodoncia-The-Arsenal\backend
```

Configurar variables de entorno en PowerShell:

```powershell
$env:DB_PASSWORD="password"
$env:DDL_AUTO="update"
```

Donde:

- `DB_PASSWORD` corresponde a la contraseña del usuario de MySQL.
- `DDL_AUTO=update` permite que Hibernate actualice la estructura de la base de datos sin eliminar la información existente.

Compilar el proyecto:

```powershell
mvn clean install -DskipTests
```

Ejecutar el backend:

```powershell
mvn -DskipTests spring-boot:run
```

El backend queda disponible en:

```text
http://localhost:8080
```

---

## Ejecución del frontend

Ingresar a la carpeta del frontend:

```powershell
cd C:\Users\alvar\proyectos\Ortodoncia-The-Arsenal\frontend
```

Instalar dependencias:

```powershell
npm install
```

Ejecutar el frontend:

```powershell
npm run dev
```

El frontend queda disponible en:

```text
http://localhost:5173
```

---

## Usuario administrador de prueba

El sistema incluye un usuario administrador para pruebas locales:

```text
Correo: admin@gmail.com
Contraseña: 12345
```

Con este usuario se puede acceder a los módulos administrativos del sistema.

---

## Rutas principales del frontend

```text
/
 /Login
 /Registro
 /AgregarTurno
 /ListaDeTurnos
 /AgregarOdontologo
 /ListaDeOdontologos
 /AgregarPaciente
 /ListaDePacientes
 /AgregarInsumo
 /ListaDeInsumos
 /ConsumoInsumos
 /EvolucionClinica
 /ReporteOperativo
 /Servicios
 /Conocenos
```

---

## Endpoints principales del backend

### Autenticación

```http
POST /login
```

### Pacientes

```http
GET /pacientes/listAll
GET /pacientes/{id}
POST /pacientes
PUT /pacientes
DELETE /pacientes/{id}
```

### Odontólogos

```http
GET /odontologos/listAll
GET /odontologos/{id}
POST /odontologos
PUT /odontologos
DELETE /odontologos/{id}
```

### Turnos

```http
GET /turnos
GET /turnos/{id}
POST /turnos
PUT /turnos
DELETE /turnos/{id}
```

### Insumos

```http
GET /insumos
GET /insumos/{id}
POST /insumos
PUT /insumos
PUT /insumos/{id}/entrada
PUT /insumos/{id}/salida
DELETE /insumos/{id}
```

### Consumo de insumos

```http
GET /consumos-insumos
POST /consumos-insumos
GET /consumos-insumos/turno/{id}
```

### Evolución clínica

```http
GET /evoluciones-clinicas
POST /evoluciones-clinicas
GET /evoluciones-clinicas/paciente/{id}
GET /evoluciones-clinicas/turno/{id}
```

### Reportes operativos

```http
GET /reportes/operativo?fechaInicio=YYYY-MM-DD&fechaFin=YYYY-MM-DD
```

Ejemplo:

```http
GET /reportes/operativo?fechaInicio=2026-05-01&fechaFin=2026-05-31
```

---

## Enlace al despliegue

No aplica. La ejecución se realiza en entorno local mediante:

```text
Frontend: http://localhost:5173
Backend: http://localhost:8080
```

---

## Capturas o evidencias del MVP

Se pueden encontrar en la siguiente carpeta compartida
https://drive.google.com/drive/folders/1V7i9Jsk_m5KphZN2SPvhi_3_PVjqtYh3?usp=drive_link

---

## Buenas prácticas y patrones aplicados

El backend sigue una arquitectura por capas:

- Controladores REST.
- Servicios de negocio.
- Repositorios JPA.
- Entidades de dominio.
- DTOs para transferencia de datos.

También se evidencian patrones y prácticas como:

- **Controller:** exposición de endpoints REST.
- **Service Layer:** concentración de reglas de negocio.
- **Repository:** acceso a datos mediante Spring Data JPA.
- **DTO:** transferencia de datos entre frontend y backend.
- **Adapter:** conversión entre entidades y DTOs.
- **State:** manejo de estados como activo/inactivo y stock mínimo.
- **Strategy:** consultas y operaciones especializadas por módulo.
- **Template Method:** secuencia común de validación, consulta, persistencia y respuesta en servicios.
- **Observer conceptual:** actualización de datos derivados, como stock y reportes, a partir de eventos funcionales como el consumo de insumos.

---

## Créditos

Este proyecto fue desarrollado como una adaptación académica basada en el repositorio original:

```text
Repositorio original: Clinica-Odontotal
Autor original: LucianoGelvez
URL: https://github.com/LucianoGelvez/Clinica-Odontotal
```

Se reconocen los créditos del repositorio base. La adaptación funcional, personalización visual y adecuación al caso de estudio **Ortodoncia The Arsenal** fueron realizadas con fines académicos.

---

---

## nota
```text
El repositorio cambio en relacion al de la entrega anterior. el repositorio con los documentos para la entrega numero 2 aun esta disponible y es: https://github.com/JorgeAlvarez1128/Diseno-de-sistemas-de-informacion
```
---
