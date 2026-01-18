export function SiteFooter() {
  return (
    <footer className="site-footer" id="info">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <div className="footer-mark" aria-hidden="true" />
          <div>
            <p className="footer-title">IPVCE Portal</p>
            <p className="footer-text">
              Plataforma academica para noticias, horarios y seguimiento
              institucional.
            </p>
          </div>
        </div>
        <div>
          <p className="footer-label">Mapa</p>
          <ul className="footer-list">
            <li><a href="#noticias">Noticias</a></li>
            <li><a href="#calendario">Calendario</a></li>
            <li><a href="#atajos">Atajos</a></li>
            <li><a href="#info">Informacion</a></li>
          </ul>
        </div>
        <div>
          <p className="footer-label">Soporte</p>
          <ul className="footer-list">
            <li>Secretaria Academica</li>
            <li>Horario: 8:00 - 16:00</li>
            <li>Telefono: +53 00 000000</li>
            <li>Correo: soporte@ipvce.edu.cu</li>
          </ul>
        </div>
        <div>
          <p className="footer-label">Comunidad</p>
          <ul className="footer-list">
            <li>Reglamento interno</li>
            <li>Calendario general</li>
            <li>Guia para profesores</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>IPVCE (c) 2026</span>
        <span>Portal Educativo - Version interna 0.1</span>
      </div>
    </footer>
  );
}
