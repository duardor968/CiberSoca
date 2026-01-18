export default function Home() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-card reveal">
          <p className="eyebrow">IPVCE PREUNIVERSITARIO</p>
          <h1 className="hero-title">
            Un portal claro para estudiar, informar y decidir.
          </h1>
          <p className="hero-text">
            Noticias, calendario, horarios y seguimiento academico en un solo
            lugar. Disenado para estudiantes, profesores y administracion.
          </p>
          <div className="hero-actions">
            <button className="solid-button" type="button">
              Entrar al portal
            </button>
            <button className="ghost-button" type="button">
              Ver calendario
            </button>
          </div>
          <div className="metric-grid">
            <div className="metric-card">
              <p className="eyebrow">Promedio</p>
              <strong>86.4</strong>
              <p className="hero-text">Ultimo trimestre</p>
            </div>
            <div className="metric-card">
              <p className="eyebrow">Avisos</p>
              <strong>6</strong>
              <p className="hero-text">Esta semana</p>
            </div>
            <div className="metric-card">
              <p className="eyebrow">Calendario</p>
              <strong>4</strong>
              <p className="hero-text">Eventos activos</p>
            </div>
          </div>
        </div>
        <div className="hero-card reveal delay-1">
          <p className="eyebrow">Vista rapida</p>
          <h2 className="section-title">Panel institucional</h2>
          <p className="section-subtitle">
            Un resumen visual con prioridades del dia, accesos rapidos y estado
            academico general.
          </p>
          <div className="card-grid">
            <div className="info-card">
              <p className="eyebrow">Grupo 12mo4</p>
              <p className="hero-text">Horario ajustado por matutino</p>
            </div>
            <div className="info-card">
              <p className="eyebrow">Noticias</p>
              <p className="hero-text">Convocatoria de olimpiadas</p>
            </div>
            <div className="info-card">
              <p className="eyebrow">Escalafon</p>
              <p className="hero-text">Top 10 actualizado hoy</p>
            </div>
          </div>
        </div>
      </section>

      <section id="noticias" className="reveal delay-1">
        <h2 className="section-title">Noticias principales</h2>
        <p className="section-subtitle">
          Comunicados oficiales y avisos de alto impacto para toda la comunidad.
        </p>
        <div className="card-grid">
          <article className="info-card">
            <p className="eyebrow">Institucional</p>
            <h3>Semana de sociedades cientificas</h3>
            <p className="hero-text">
              Calendario general y lineamientos para los proyectos.
            </p>
          </article>
          <article className="info-card">
            <p className="eyebrow">Eventos</p>
            <h3>Simulacro de ingreso</h3>
            <p className="hero-text">
              Cronograma por grupos y recursos disponibles.
            </p>
          </article>
          <article className="info-card">
            <p className="eyebrow">Aviso</p>
            <h3>Actualizacion de horario</h3>
            <p className="hero-text">
              Nuevo bloque de matutino agregado en primer turno.
            </p>
          </article>
        </div>
      </section>

      <section id="atajos" className="reveal delay-2">
        <h2 className="section-title">Accesos rapidos</h2>
        <p className="section-subtitle">
          Modulos clave para mantener todo ordenado desde el primer ingreso.
        </p>
        <div className="card-grid">
          <div className="info-card">
            <h3>Calendario del mes</h3>
            <p className="hero-text">Eventos institucionales y por grupo.</p>
          </div>
          <div className="info-card">
            <h3>Horario</h3>
            <p className="hero-text">Turnos personalizables y aulas.</p>
          </div>
          <div className="info-card">
            <h3>Escalafon</h3>
            <p className="hero-text">Ranking por aula con cortes y tendencia.</p>
          </div>
          <div className="info-card">
            <h3>Notas</h3>
            <p className="hero-text">Historico por periodos y asignaturas.</p>
          </div>
        </div>
      </section>

      <section id="calendario" className="reveal delay-3">
        <h2 className="section-title">Calendario institucional</h2>
        <p className="section-subtitle">
          Vista simple para revisar lo urgente sin saturar el inicio.
        </p>
        <div className="calendar-list">
          <div className="calendar-item">
            <div className="calendar-date">14</div>
            <div>
              <strong>Entrega de proyectos</strong>
              <p className="hero-text">Cierre de postulaciones internas</p>
            </div>
          </div>
          <div className="calendar-item">
            <div className="calendar-date">18</div>
            <div>
              <strong>Reunion docente</strong>
              <p className="hero-text">Planificacion del cierre de semestre</p>
            </div>
          </div>
          <div className="calendar-item">
            <div className="calendar-date">24</div>
            <div>
              <strong>Festival cientifico</strong>
              <p className="hero-text">Exposiciones en el aula magna</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
