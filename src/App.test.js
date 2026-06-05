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

test('renders the Speaklog home screen', () => {
  render(<App />);

  expect(screen.getByText('Speaklog')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /학습 시작하기/i })).toBeInTheDocument();
});
