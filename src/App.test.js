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

test('alerts after saving a record and removes the home action', () => {
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

  expect(alertSpy).toHaveBeenCalledWith('기록이 완료되었습니다.');
  expect(screen.getByRole('button', { name: /학습 시작하기/i })).toBeInTheDocument();

  alertSpy.mockRestore();
});

test('renders the Speaklog home screen', () => {
  render(<App />);

  expect(screen.getByText('Speaklog')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /학습 시작하기/i })).toBeInTheDocument();
});
