import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';

// Mock all components that use import.meta before importing App
jest.mock('../components/Hero', () => ({
  Hero: () => <div data-testid="hero">Hero Component</div>
}));

jest.mock('../hooks/useResumeData', () => ({
  useResumeData: () => ({
    resumeData: null,
    loading: false,
    error: null
  })
}));

import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it('renders main content', () => {
    render(<App />);
    const main = document.querySelector('main');
    expect(main).toBeTruthy();
  });
});
