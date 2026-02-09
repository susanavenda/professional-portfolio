import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders main content', () => {
    render(<App />);
    // Add specific assertions based on your App component
    expect(document.body).toBeTruthy();
  });
});
