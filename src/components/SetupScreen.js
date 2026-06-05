import { useEffect, useRef } from 'react';
import { AVATARS } from '../data/avatars';
import AudienceVideo from './AudienceVideo';

function SetupScreen({
  selectedAvatar,
  topic,
  onBack,
  onSelectAvatar,
  onStartSession,
  onTopicChange,
}) {
  const topicInputRef = useRef(null);

  useEffect(() => {
    topicInputRef.current?.focus();
  }, []);

  return (
    <section className="screen setup-screen" aria-labelledby="setup-title">
      <button className="back-btn" type="button" onClick={onBack}>
        ← 홈으로
      </button>
      <h1 className="page-title" id="setup-title">
        오늘 설명할 내용을 준비해볼까요?
      </h1>
      <p className="page-sub">주제를 입력하고 청중을 선택해주세요</p>

      <label className="f-label" htmlFor="topic-input">
        학습 주제
      </label>
      <input
        className="f-input"
        id="topic-input"
        onChange={(event) => onTopicChange(event.target.value)}
        placeholder="예 : async/await / 이진 탐색 등"
        ref={topicInputRef}
        value={topic}
      />

      <span className="f-label">청중 선택</span>
      <div className="av-grid" aria-label="청중 선택">
        {AVATARS.map((avatar, index) => {
          const nameLines = avatar.name.split('\n');

          return (
            <button
              className={`av-card ${selectedAvatar === index ? 'sel' : ''}`}
              key={avatar.name}
              type="button"
              onClick={() => onSelectAvatar(index)}
              aria-pressed={selectedAvatar === index}
            >
              <AudienceVideo audience={avatar} className="av-video" />
              <span className="av-name">
                {nameLines.map((line, lineIndex) => (
                  <span key={`${line}-${lineIndex}`}>
                    {line}
                    {lineIndex < nameLines.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
      <button className="btn center" type="button" onClick={onStartSession}>
        <span aria-hidden="true">▷</span>
        설명 시작하기
      </button>
    </section>
  );
}

export default SetupScreen;
