import { useMemo } from 'react';
import RecordGrid from './RecordGrid';

function RecordsScreen({ records, onBack, onSelectRecord }) {
  const allRecords = useMemo(() => records.slice().reverse(), [records]);

  return (
    <section className="screen" aria-labelledby="records-title">
      <button className="back-btn" type="button" onClick={onBack}>
        ← 홈으로
      </button>
      <div className="sec-row">
        <h1 className="sec-label" id="records-title">
          학습 기록
        </h1>
        <span className="rec-count">완료된 학습 수 : {allRecords.length}</span>
      </div>
      <RecordGrid
        records={allRecords}
        onSelect={onSelectRecord}
        emptyMessage="학습 기록이 없어요."
      />
    </section>
  );
}

export default RecordsScreen;
