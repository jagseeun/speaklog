function AudienceVideo({ audience, className = '', playing = false }) {
  if (!audience?.videoSrc) {
    return <span className={`audience-fallback ${className}`}>{audience?.name ?? '청중'}</span>;
  }

  const source = playing ? audience.videoSrc : `${audience.videoSrc}#t=0.1`;

  return (
    <video
      className={`audience-video ${className} ${playing ? 'is-playing' : 'is-preview'}`}
      src={source}
      aria-label={audience.name.replace('\n', ' ')}
      autoPlay={playing}
      loop={playing}
      muted
      playsInline
      preload="metadata"
    />
  );
}

export default AudienceVideo;
