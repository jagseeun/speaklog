import { useMemo } from 'react';
import RecordGrid from './RecordGrid';

function HomeScreen({ records, onRecords, onSelectRecord, onStart }) {
  const recentRecords = useMemo(() => records.slice().reverse().slice(0, 3), [records]);

  return (
    <section className="screen home-screen" aria-labelledby="home-title">
      <p className="hero-text">오늘 배운 내용을 설명하듯 말해보세요.</p>
      <h1 className="hero-head" id="home-title">
        말하고, 정리하고, 기록하며
        <br />
        <b>지식을 내 것으로</b> 만드는 학습 공간입니다.
      </h1>
      <button className="btn" type="button" onClick={onStart}>
        <span aria-hidden="true">▷</span>
        학습 시작하기
      </button>

      <div className="sec-row">
        <span className="sec-label">최근 학습 기록</span>
        <button className="sec-more" type="button" onClick={onRecords}>
          전체 보기 →
        </button>
      </div>
      <RecordGrid
        records={recentRecords}
        onSelect={onSelectRecord}
        emptyMessage={
          <>
            아직 학습 기록이 없어요.
            <br />
            첫 번째 설명을 시작해보세요!
          </>
        }
      />
    </section>
  );
}

export default HomeScreen;
