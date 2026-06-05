import { useEffect, useState } from 'react';
import DetailScreen from './components/DetailScreen';
import HomeScreen from './components/HomeScreen';
import Logo from './components/Logo';
import RecordsScreen from './components/RecordsScreen';
import SessionScreen from './components/SessionScreen';
import SetupScreen from './components/SetupScreen';
import SummaryScreen from './components/SummaryScreen';
import { STORAGE_KEY } from './data/avatars';
import { makeRecordDate } from './utils/format';
import './App.css';

function App() {
  const [screen, setScreen] = useState('home');
  const [records, setRecords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
      return [];
    }
  });
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [topic, setTopic] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [summary, setSummary] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  const selectedRecord = records.find((record) => record.id === selectedRecordId);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    if (screen !== 'session') {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setElapsed((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [screen]);

  useEffect(() => {
    if (screen === 'detail' && selectedRecordId && !selectedRecord) {
      setScreen('records');
    }
  }, [screen, selectedRecord, selectedRecordId]);

  const goHome = () => setScreen('home');

  const selectRecord = (id) => {
    setSelectedRecordId(id);
    setScreen('detail');
  };

  const startSession = () => {
    const trimmedTopic = topic.trim();

    if (!trimmedTopic) {
      window.alert('학습 주제를 입력해주세요.');
      document.getElementById('topic-input')?.focus();
      return;
    }

    setCurrentTopic(trimmedTopic);
    setElapsed(0);
    setSummary('');
    setScreen('session');
  };

  const finishSession = () => {
    setSummary('');
    setScreen('summary');
  };

  const saveRecord = () => {
    const trimmedSummary = summary.trim();

    if (!trimmedSummary) {
      window.alert('핵심 내용을 작성해주세요.');
      document.getElementById('summary-input')?.focus();
      return;
    }

    const record = {
      id: String(Date.now()),
      date: makeRecordDate(),
      topic: currentTopic,
      avatar: selectedAvatar,
      duration: elapsed,
      summary: trimmedSummary,
    };

    setRecords((items) => [...items, record]);
    setTopic('');
    setSummary('');
    window.alert('기록이 완료되었습니다.');
    setScreen('home');
  };

  return (
    <main className="app">
      <Logo onHome={goHome} />

      {screen === 'home' && (
        <HomeScreen
          records={records}
          onRecords={() => setScreen('records')}
          onSelectRecord={selectRecord}
          onStart={() => setScreen('setup')}
        />
      )}

      {screen === 'setup' && (
        <SetupScreen
          selectedAvatar={selectedAvatar}
          topic={topic}
          onBack={goHome}
          onSelectAvatar={setSelectedAvatar}
          onStartSession={startSession}
          onTopicChange={setTopic}
        />
      )}

      {screen === 'session' && (
        <SessionScreen
          elapsed={elapsed}
          selectedAvatar={selectedAvatar}
          topic={currentTopic}
          onFinish={finishSession}
        />
      )}

      {screen === 'summary' && (
        <SummaryScreen
          elapsed={elapsed}
          summary={summary}
          topic={currentTopic}
          onSave={saveRecord}
          onSummaryChange={setSummary}
        />
      )}

      {screen === 'records' && (
        <RecordsScreen records={records} onBack={goHome} onSelectRecord={selectRecord} />
      )}

      {screen === 'detail' && selectedRecord && (
        <DetailScreen record={selectedRecord} onBack={() => setScreen('records')} />
      )}
    </main>
  );
}

export default App;
