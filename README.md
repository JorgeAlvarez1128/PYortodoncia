## Odontotal

**Enlace aplicación:** https://odontotal.online <br/>
- **Usuario Administrador**<br/>
correo: admin@gmail.com<br/>
contraseña: 12345
- **Usuario Odontólogo**<br/>
correo: odontologo@gmail.com<br/>
contraseña: 12345
- **Usuario Paciente**<br/>
correo: paciente@gmail.com<br/>
contraseña: 12345
<br/>
# Ortodoncia The Arsenal

Sistema web para la gestión clínica y operativa de una clínica de ortodoncia.

El proyecto permite administrar pacientes, odontólogos, turnos, evolución clínica, inventario de insumos, consumo de materiales clínicos y reportes operativos. Fue adaptado y personalizado con una identidad visual alusiva a **Ortodoncia The Arsenal**, integrando una estética roja, dorada y blanca.

---

## Descripción general

**Ortodoncia The Arsenal** es una aplicación web desarrollada con fines académicos para apoyar la gestión de una clínica de ortodoncia.

El sistema permite centralizar procesos que normalmente pueden gestionarse de forma manual o dispersa, como la programación de citas, el registro de pacientes, el seguimiento clínico del tratamiento, el control de insumos y la generación de reportes administrativos.

La aplicación está compuesta por un **backend en Java con Spring Boot**, un **frontend en React con Vite** y una **base de datos MySQL**.

---

## Objetivo del sistema

Brindar una herramienta digital que permita mejorar la organización, trazabilidad y control operativo de una clínica de ortodoncia, facilitando la administración de pacientes, turnos, historia clínica, insumos y reportes.

---

## Funcionalidades principales

- Gestión de pacientes.
- Gestión de odontólogos.
- Gestión de turnos o citas.
- Registro de evolución clínica ortodóntica.
- Inventario de insumos clínicos.
- Registro de consumo de insumos por turno.
- Reportes operativos por rango de fechas.
- Control de acceso por roles.
- Interfaz personalizada con identidad visual de Ortodoncia The Arsenal.

---

## Módulos del sistema

### Pacientes

Permite registrar, consultar, listar, actualizar y eliminar pacientes.

Información manejada:

- Nombre.
- Apellido.
- Documento.
- Fecha de nacimiento.
- Género.
- Teléfono.
- Dirección.
- Correo electrónico.

---

### Odontólogos

Permite administrar los profesionales asociados a la clínica.

Información manejada:

- Nombre.
- Apellido.
- Documento.
- Matrícula profesional.
- Especialidad.
- Teléfono.
- Dirección.
- Correo electrónico.

---

### Turnos

Permite programar citas entre pacientes y odontólogos.

Información manejada:

- Paciente.
- Odontólogo.
- Especialidad.
- Fecha.
- Hora.
- Motivo de consulta.
- Trabajo realizado.

---

### Historia clínica / Evolución clínica

Permite registrar información clínica asociada a una cita o turno.

Información manejada:

- Turno asociado.
- Paciente.
- Odontólogo.
- Diagnóstico.
- Plan de tratamiento.
- Evolución.
- Observaciones.
- Fecha de registro.

---

### Inventario de insumos

Permite administrar los insumos utilizados en la atención ortodóntica.

Información manejada:

- Nombre del insumo.
- Categoría.
- Unidad de medida.
- Stock actual.
- Stock mínimo.
- Estado activo/inactivo.
- Alerta por bajo inventario.

---

### Consumo de insumos

Permite registrar los insumos utilizados durante una atención clínica.

Información manejada:

- Turno asociado.
- Insumo utilizado.
- Cantidad consumida.
- Observación.
- Fecha de registro.

---

### Reportes operativos

Permite generar reportes administrativos por rango de fechas.

Indicadores incluidos:

- Total de turnos.
- Turnos atendidos.
- Turnos pendientes.
- Turnos cancelados.
- Ausencias.
- Consumo consolidado de insumos.
- Productividad por odontólogo.

Nota: los indicadores de cancelaciones y ausencias se conservan en la estructura del reporte, pero dependen de la implementación de un estado formal de turno.

---

## Tecnologías utilizadas

### Backend

- Java 17.
- Spring Boot.
- Spring Security.
- Maven.
- JPA / Hibernate.
- MySQL Connector.
- JWT para autenticación.

### Frontend

- React.
- Vite.
- JavaScript.
- Bootstrap.
- CSS personalizado.
- SweetAlert2.
- FontAwesome.

### Base de datos

- MySQL Server 8.
- MySQL Workbench o consola MySQL.

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
└── ...


Créditos

Este proyecto fue desarrollado como una adaptación académica basada en el repositorio original:

Repositorio original: Clinica-Odontotal
Autor original: LucianoGelvez
URL: https://github.com/LucianoGelvez/Clinica-Odontotal

Se reconocen los créditos del repositorio base.
La adaptación funcional, personalización visual y adecuación al caso de estudio Ortodoncia The Arsenal fueron realizadas con fines académicos.