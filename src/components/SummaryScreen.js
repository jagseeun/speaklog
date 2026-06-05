import { formatDuration } from '../utils/format';

function SummaryScreen({ elapsed, summary, topic, onBackHome, onSave, onSummaryChange }) {
  return (
    <section className="screen summary-screen" aria-labelledby="summary-title">
      <div className="done-wrap">
        <span className="done-mark" aria-hidden="true">✓</span>
        <h1 className="done-title" id="summary-title">
          설명을 마쳤어요!
        </h1>
        <p className="done-sub">수고 했어요. 이제 기억나는대로 정리해봅시다.</p>
      </div>

      <div className="stat-row">
        <div className="stat-box">
          <div className="stat-v">{topic || '-'}</div>
          <div className="stat-l">학습 주제</div>
        </div>
        <div className="stat-box">
          <div className="stat-v">{formatDuration(elapsed)}</div>
          <div className="stat-l">설명 시간</div>
        </div>
      </div>

      <label className="f-label" htmlFor="summary-input">
        핵심 내용 정리 (백지 요약)
      </label>
      <textarea
        className="sum-area"
        id="summary-input"
        onChange={(event) => onSummaryChange(event.target.value)}
        placeholder="기억나는 대로 이해한 내용을 정리해보세요..."
        value={summary}
      />
      <div className="summary-actions">
        <button className="back-btn no-margin" type="button" onClick={onBackHome}>
          ← 홈으로
        </button>
        <button className="btn" type="button" onClick={onSave}>
          <span aria-hidden="true">✓</span>
          작성 완료
        </button>
      </div>
    </section>
  );
}

export default SummaryScreen;
