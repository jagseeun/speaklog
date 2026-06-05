function AudienceVideo({ audience, className = '' }) {
  if (!audience?.videoSrc) {
    return <span className={`audience-fallback ${className}`}>{audience?.name ?? '청중'}</span>;
  }

  return (
    <video
      className={`audience-video ${className}`}
      src={audience.videoSrc}
      aria-label={audience.name.replace('\n', ' ')}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}

export default AudienceVideo;
