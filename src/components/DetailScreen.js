import { AVATARS } from '../data/avatars';
import { formatDuration } from '../utils/format';
import AudienceVideo from './AudienceVideo';

function DetailScreen({ record, onBack }) {
  const avatar = AVATARS[record.avatar] ?? { name: '청중' };

  return (
    <section className="screen" aria-labelledby="detail-title">
      <button className="back-btn" type="button" onClick={onBack}>
        ← 기록으로
      </button>
      <h1 className="det-topic" id="detail-title">
        {record.topic}
      </h1>
      <div className="det-date">{record.date}</div>

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
      <div className="det-sum">{record.summary || '(요약 없음)'}</div>
    </section>
  );
}

export default DetailScreen;
