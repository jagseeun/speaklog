import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('renders the Speaklog home screen', () => {
  render(<App />);

  expect(screen.getByText('Speaklog')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /학습 시작하기/i })).toBeInTheDocument();
});
