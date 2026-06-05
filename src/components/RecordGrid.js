import { AVATARS } from '../data/avatars';
import { formatDuration } from '../utils/format';
import AudienceVideo from './AudienceVideo';

function RecordGrid({ records, onSelect, emptyMessage }) {
  if (records.length === 0) {
    return <div className="empty">{emptyMessage}</div>;
  }

  return (
    <div className="rec-grid">
      {records.map((record) => {
        const avatar = AVATARS[record.avatar] ?? { name: '청중' };

        return (
          <button
            className="rec-card"
            key={record.id}
            type="button"
            onClick={() => onSelect(record.id)}
          >
            <div className="rec-top">
              <div className="rec-copy">
                <div className="rec-date">{record.date}</div>
                <div className="rec-topic">{record.topic}</div>
              </div>
              <AudienceVideo audience={avatar} className="rec-avatar" />
            </div>
            <div className="rec-bottom">
              <span className="rec-time">{formatDuration(record.duration)}</span>
              <span className="rec-link">자세히 보기 →</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default RecordGrid;
