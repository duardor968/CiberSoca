# Documentacion de Base de Datos (IPVCE)

## 1. Objetivo
Definir la estructura logica de datos para el portal educativo. Este documento es base de trabajo y puede ajustarse durante la implementacion.

## 2. Convenciones
- IDs: enteros autoincrementables
- Fechas: `DateTime` en UTC
- Soft delete: no se aplica por ahora (se evalua luego)
- Roles: un usuario puede tener varios roles (ej. ADMIN + TEACHER)
- Permisos internos de admin: se manejan como permisos adicionales por usuario
- Formato de curso: `academicYear` usa formato fijo `YYYY-YYYY` (ej. 2025-2026)

## 3. Entidades principales

### 3.1 Usuarios y roles
- **User**: cuenta de acceso (username, passwordHash, fullName, email opcional)
- **UserRole**: roles asignados al usuario (STUDENT, TEACHER, ADMIN)
- **AdminPermission**: permisos finos dentro del rol admin
- **AdminPermissionAssignment**: permisos asignados a usuarios admin

### 3.2 Perfiles
- **StudentProfile**: datos academicos del estudiante (grado, aula, numero)
- **TeacherProfile**: datos del profesor (departamento, telefono)

### 3.3 Academico
- **Group**: grupo (codigo tipo 10mo1, 11no3, 12mo4)
- **AcademicPeriodType**: tipo de periodo configurable (semestre, trimestre, etc.)
- **AcademicPeriod**: periodo academico concreto
- **Subject**: asignatura
- **GroupSubject**: asignacion de asignatura a grupo y profesor
- **ScheduleBlockType**: bloque de horario configurable (clase, recreo, matutino, almuerzo, etc.)
- **ScheduleEntry**: horario diario con bloque + hora
- **Enrollment**: matricula del estudiante por grupo y periodo
- **GradeScale**: escala configurable (20, 50, 100, etc.)
- **AssessmentType**: tipo de evaluacion con escala (pregunta escrita, TCP, etc.)
- **Grade**: calificaciones con tipo y escala
- **Attendance**: asistencia

### 3.4 Comunicacion
- **News**: noticias institucionales
- **Calendar**: calendario (institucional, grupo, personal)
- **CalendarEvent**: eventos de calendario

### 3.5 Acceso a datos
- Las noticias se exponen al frontend via GraphQL (consultas flexibles por campos).

## 4. Relaciones clave
- Un **User** puede tener multiples **UserRole**.
- Un **User** puede tener **StudentProfile** y/o **TeacherProfile**.
- Un **StudentProfile** puede tener multiples **Enrollment**, **Grade**, **Attendance**.
- Un **Group** tiene multiples **GroupSubject**.
- Un **GroupSubject** relaciona Group + Subject + Teacher.
- Un **ScheduleEntry** siempre apunta a un **ScheduleBlockType** y puede tener o no materia.
- Un **Grade** referencia un **AssessmentType** que a su vez referencia una **GradeScale**.

## 5. Periodos configurables
- **AcademicPeriodType** permite definir semestres, trimestres u otros tipos.

## 6. Escalas configurables
- **GradeScale** permite definir maximos como 20, 50, 100, etc.
- **AssessmentType** decide que escala usa cada tipo de evaluacion.

## 7. Horario personalizable
- **ScheduleBlockType** define bloques (ej. Clase, Recreo, Matutino, Almuerzo).
- `isFixed=true` para bloques obligatorios (ej. Turno de clases).
- `kind=CLASS` para bloques que deben tener asignatura.
- **ScheduleEntry** guarda el horario en minutos desde 00:00 (`startMinute`, `endMinute`).

## 8. Pendientes por definir
- Estandar exacto para calificaciones (promedios y redondeo)
- Politica de asistencia (ausente, tarde, justificada)
- Reglas del horario (si se permite solapamiento o no)
- Politica de publicacion de noticias

## 9. Archivo base Prisma
El esquema inicial esta en:
- `apps/backend/prisma/schema.prisma`

La configuracion de datasource vive en:
- `apps/backend/prisma.config.ts`
