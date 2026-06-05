function Logo({ onHome }) {
  return (
    <>
      <button className="logo" type="button" onClick={onHome} aria-label="Speaklog 홈으로 이동">
        <div className="logo-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <ellipse cx="10" cy="8" rx="4" ry="5" stroke="white" strokeWidth="2.2" />
            <path
              d="M4 18c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="logo-text">Speaklog</span>
      </button>
      <div className="divider" />
    </>
  );
}

export default Logo;
