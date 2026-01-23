# Portal Educativo IPVCE - Documento oficial del proyecto

## 1. Vision y alcance
Proyecto oficial para construir un portal educativo del IPVCE, enfocado en estudiantes y personal del centro. El sistema combina informacion institucional publica con acceso privado a datos academicos.

El portal debe:
- Centralizar noticias, calendario e informacion institucional.
- Proveer acceso seguro a notas, escalafon, asistencia y estadisticas.
- Facilitar el seguimiento academico por parte del profesorado.

## 2. Publico objetivo y acceso
- **Visitantes (publico):** acceso libre a landing, noticias, calendario institucional e informacion general.
- **Usuarios autenticados:** estudiantes, profesores y administradores con acceso a datos privados.

## 3. Decisiones cerradas
- **Stack:** Next.js + TailwindCSS v4 + HeroUI v3 (beta) + ECharts (frontend) y NestJS + Prisma + PostgreSQL + GraphQL (backend).
- **UI:** estilo moderno, limpio y coherente con HeroUI v3.
- **Idioma:** solo espanol.
- **Infraestructura:** sin decision de hosting/infra por ahora; se prioriza despliegue local/institucional.
- **Integraciones externas:** no previstas.

## 4. Roles y perfiles
- **ESTUDIANTE:** consulta de notas, asistencia, escalafon, horario, calendario y estadisticas personales.
- **PROFESOR:** acceso a grupos/asignaturas, revision de rendimiento y estadisticas por grupo.
- **ADMIN:** gestion de usuarios, grupos, asignaturas, periodos, noticias y calendarios.

Notas importantes:
- Un mismo usuario puede tener **mas de un perfil**. Un administrador puede tener perfil docente cuando sea necesario.
- Dentro de ADMIN habra **permisos internos** para controlar quien publica noticias u opera modulos sensibles.

## 5. Alcance funcional

### 5.1 Publico
- Landing (`/`) con noticias destacadas, breve descripcion y accesos rapidos.
- Noticias institucionales y calendario institucional en modo lectura.
- Informacion general del centro.
- Noticias en landing consumidas via GraphQL para consultas flexibles.

### 5.2 Estudiante
- Perfil academico con datos basicos, notas, asistencia y escalafon.
- Horario por grupo.
- Calendario personal y de grupo.
- Estadisticas academicas personales (promedios, tendencias, distribuciones).

### 5.3 Profesor
- Vista de grupos y asignaturas asignadas.
- Perfil academico del estudiante.
- Estadisticas por grupo/asignatura.
- Horario docente.

### 5.4 Administrador
- Gestion de usuarios, grupos, asignaturas y periodos.
- Administracion de noticias y calendarios.
- Estadisticas globales.
- Sistema de permisos internos para tareas sensibles.

## 6. Calendarios y horarios
- Se contemplan **calendarios multiples**: institucional, por grupo y personal.
- Pueden existir eventos comunes para todos los grupos.
- El horario principal del estudiante se organiza por grupo.

## 7. Analitica y visualizaciones
- Se utilizara ECharts para graficos de rendimiento.
- Indicadores base: promedios por periodo, tendencias, distribucion de notas, comparativas por grupo.

## 8. Autenticacion y seguridad
- Inicio de sesion con usuario/contrasena.
- Sesiones via JWT almacenado en cookie HTTP-only.
- Contrasenas con hashing seguro (bcrypt o equivalente).
- Datos academicos solo visibles para usuarios autenticados y autorizados.

## 9. Navegacion y rutas

### 9.1 Publicas
- `/` Landing publica.
- `/news` Noticias institucionales (lectura publica).
- `/calendar` Calendario institucional (lectura publica).
- `/info` Informacion general (dinamica).
- `/login` Acceso a usuarios.

### 9.6 API
- `/graphql` API GraphQL para consultas flexibles (por ahora noticias en landing).

### 9.2 Comunes autenticadas
- `/dashboard` Resumen general con atajos.
- `/profile` Perfil con nombre, grado, aula, numero, notas, asistencia y escalafon.

### 9.3 Estudiante
- `/student/overview` Resumen academico.
- `/student/grades` Notas por asignatura + escalafon.
- `/student/schedule` Horario por grupo.
- `/student/calendar` Calendario personal/grupo.
- `/student/statistics` Estadisticas academicas personales.

### 9.4 Profesor
- `/teacher/overview` Resumen docente.
- `/teacher/classes` Grupos/asignaturas asignadas.
- `/teacher/students/[id]` Perfil academico del estudiante.
- `/teacher/schedule` Horario docente.
- `/teacher/statistics` Estadisticas por grupo/asignatura.

### 9.5 Administrador
- `/admin/users`
- `/admin/subjects`
- `/admin/groups`
- `/admin/periods`
- `/admin/news`
- `/admin/calendar`
- `/admin/statistics`
- `/admin/permissions`

## 10. Modelo de datos (alto nivel)
Entidades principales (sujeto a refinamiento):
- User
- RoleAssignment / Permission
- StudentProfile
- TeacherProfile
- Group
- Subject
- AcademicPeriod
- Enrollment
- Grade
- Attendance
- News
- Calendar
- CalendarEvent
- ScheduleEntry

## 11. Estructura base del repositorio

```
/apps
  /frontend
    /app
  /backend
    /src
/docs
  /db
```

Notas:
- El backend NestJS vive en `apps/backend` y el frontend en `apps/frontend`.
- La documentacion de base de datos vivira en `docs/db`.

## 12. Estado del documento
Documento vivo y oficial del proyecto. Se actualiza conforme se definan detalles y se avance en el desarrollo.
