function Logo({ onHome }) {
  return (
    <>
      <button className="logo" type="button" onClick={onHome} aria-label="Speaklog 홈으로 이동">
        <div className="logo-icon" aria-hidden="true">
          <img className="logo-image" src="/logo.png" alt="" />
        </div>
        <span className="logo-text">Speaklog</span>
      </button>
      <div className="divider" />
    </>
  );
}

export default Logo;
