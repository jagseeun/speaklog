import { AVATARS } from '../data/avatars';
import { formatDuration } from '../utils/format';
import AudienceVideo from './AudienceVideo';

function DetailScreen({ record, onBack }) {
  const avatarIndex = Number(record.avatar);
  const avatar = AVATARS[avatarIndex] ?? AVATARS[0] ?? { name: '청중' };
  const topic = record.topic?.trim() || '제목 없는 기록';
  const date = record.date || '날짜 없음';
  const summary = record.summary?.trim() || '(요약 없음)';

  return (
    <section className="screen detail-screen" aria-labelledby="detail-title">
      <button className="back-btn" type="button" onClick={onBack}>
        ← 기록으로
      </button>
      <div className="detail-head">
        <h1 className="det-topic" id="detail-title">
          {topic}
        </h1>
        <div className="det-date">{date}</div>
      </div>

      <div className="stat-row">
        <div className="stat-box">
          <div className="stat-v">{formatDuration(record.duration)}</div>
          <div className="stat-l">설명 시간</div>
        </div>
        <div className="stat-box">
          <div className="detail-video-box">
            <AudienceVideo audience={avatar} className="detail-video" />
          </div>
          <div className="stat-l">청중</div>
        </div>
      </div>

      <span className="f-label">핵심 요약</span>
      <div className="det-sum">{summary}</div>
    </section>
  );
}

export default DetailScreen;
