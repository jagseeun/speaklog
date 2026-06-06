import { useEffect, useMemo, useState } from 'react';
import RecordGrid from './RecordGrid';

const RECORDS_PER_PAGE = 6;

function RecordsScreen({ records, onBack, onSelectRecord }) {
  const [page, setPage] = useState(1);
  const allRecords = useMemo(() => records.slice().reverse(), [records]);
  const pageCount = Math.max(1, Math.ceil(allRecords.length / RECORDS_PER_PAGE));
  const hasPagination = allRecords.length > RECORDS_PER_PAGE;
  const pageRecords = useMemo(() => {
    const start = (page - 1) * RECORDS_PER_PAGE;

    return allRecords.slice(start, start + RECORDS_PER_PAGE);
  }, [allRecords, page]);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const goPage = (nextPage) => {
    setPage(Math.min(Math.max(nextPage, 1), pageCount));
  };

  return (
    <section
      className={`screen records-screen ${hasPagination ? 'has-pagination' : ''}`}
      aria-labelledby="records-title"
    >
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
        records={pageRecords}
        onSelect={onSelectRecord}
        emptyMessage="학습 기록이 없어요."
      />
      {hasPagination && (
        <nav className="pagination" aria-label="학습 기록 페이지">
          <button
            className="page-btn"
            type="button"
            onClick={() => goPage(page - 1)}
            disabled={page === 1}
          >
            이전
          </button>
          <div className="page-numbers">
            {Array.from({ length: pageCount }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  className={`page-num ${pageNumber === page ? 'active' : ''}`}
                  key={pageNumber}
                  type="button"
                  onClick={() => goPage(pageNumber)}
                  aria-current={pageNumber === page ? 'page' : undefined}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <button
            className="page-btn"
            type="button"
            onClick={() => goPage(page + 1)}
            disabled={page === pageCount}
          >
            다음
          </button>
        </nav>
      )}
    </section>
  );
}

export default RecordsScreen;
