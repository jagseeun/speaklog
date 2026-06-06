import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('alerts when starting without a topic', () => {
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  const { container } = render(<App />);

  fireEvent.click(container.querySelector('.home-screen > .btn'));
  fireEvent.click(container.querySelector('.setup-screen > .btn'));

  expect(alertSpy).toHaveBeenCalledWith('학습 주제를 입력해주세요.');
  expect(document.activeElement).toBe(container.querySelector('#topic-input'));

  alertSpy.mockRestore();
});

test('requires a summary and alerts after saving a record', () => {
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  const { container } = render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /학습 시작하기/i }));
  fireEvent.change(container.querySelector('#topic-input'), {
    target: { value: 'React 상태 관리' },
  });
  fireEvent.click(screen.getByRole('button', { name: /설명 시작하기/i }));
  fireEvent.click(screen.getByRole('button', { name: /설명 완료/i }));

  expect(screen.queryByRole('button', { name: /← 홈으로/i })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /작성 완료/i }));

  expect(alertSpy).toHaveBeenCalledWith('핵심 내용을 작성해주세요.');
  expect(document.activeElement).toBe(container.querySelector('#summary-input'));
  expect(screen.getByRole('button', { name: /작성 완료/i })).toBeInTheDocument();

  fireEvent.change(container.querySelector('#summary-input'), {
    target: { value: '상태 변경은 setter를 사용하고 effect로 부수 효과를 처리한다.' },
  });
  fireEvent.click(screen.getByRole('button', { name: /작성 완료/i }));

  expect(alertSpy).toHaveBeenCalledWith('기록이 완료되었습니다.');
  expect(screen.getByRole('button', { name: /학습 시작하기/i })).toBeInTheDocument();

  alertSpy.mockRestore();
});

test('opens a saved record detail view', () => {
  localStorage.setItem(
    'speaklog-v4',
    JSON.stringify([
      {
        id: 'record-1',
        date: '2026.06.06',
        topic: 'React 상태 관리',
        avatar: '1',
        duration: 125,
        summary: 'setter와 effect의 역할을 구분해서 설명했다.',
      },
    ])
  );

  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /자세히 보기/i }));

  expect(screen.getByRole('heading', { name: 'React 상태 관리' })).toBeInTheDocument();
  expect(screen.getByText('02:05')).toBeInTheDocument();
  expect(screen.getByText('setter와 effect의 역할을 구분해서 설명했다.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /← 기록으로/i })).toBeInTheDocument();
});

test('renders the Speaklog home screen', () => {
  render(<App />);

  expect(screen.getByText('Speaklog')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /학습 시작하기/i })).toBeInTheDocument();
});
