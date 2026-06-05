function AudienceVideo({ audience, className = '' }) {
  if (!audience?.videoSrc) {
    return <span className={`audience-fallback ${className}`}>{audience?.name ?? '청중'}</span>;
  }

  return (
    <video
      className={`audience-video ${className}`}
      src={`${audience.videoSrc}#t=0.1`}
      aria-label={audience.name.replace('\n', ' ')}
      muted
      playsInline
      preload="metadata"
    />
  );
}

export default AudienceVideo;
