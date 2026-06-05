import { AVATARS } from '../data/avatars';
import { formatDuration } from '../utils/format';
import AudienceVideo from './AudienceVideo';

function SessionScreen({ elapsed, selectedAvatar, topic, onFinish }) {
  const avatar = AVATARS[selectedAvatar] ?? AVATARS[0];

  return (
    <section className="screen" aria-label="설명 진행">
      <div className="sess-top">
        <span className="topic-pill">주제 : {topic}</span>
        <span className="timer-pill">{formatDuration(elapsed)}</span>
      </div>
      <div className="av-stage">
        <AudienceVideo audience={avatar} className="session-video" playing />
        <div className="dots" aria-hidden="true">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
      <p className="hint">화면 속 청중에게 설명하듯 오늘 배운 내용을 말해보세요.</p>
      <button className="btn center" type="button" onClick={onFinish}>
        <span aria-hidden="true">⊙</span>
        설명 완료
      </button>
    </section>
  );
}

export default SessionScreen;
