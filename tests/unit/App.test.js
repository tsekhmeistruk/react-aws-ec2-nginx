/**
 * Unit tests for App component
 * Testing component rendering and user interactions
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../src/App';

describe('App Component', () => {
  describe('Rendering', () => {
    test('should render the main heading', () => {
      render(<App />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toContain('Welcome to');
      expect(heading.textContent).toContain('CodeWithMuh');
    });

    test('should render the React logo', () => {
      render(<App />);
      const logo = screen.getByAltText('logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveClass('App-logo');
    });

    test('should render YouTube video iframe', () => {
      render(<App />);
      const iframe = screen.getByTitle('YouTube video');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed'));
    });

    test('should render video description text', () => {
      render(<App />);
      const description = screen.getByText(/You are watching my latest video on/i);
      expect(description).toBeInTheDocument();
      expect(description.textContent).toContain('AWS EC2');
    });

    test('should render LinkedIn Connection Game section', () => {
      render(<App />);
      const heading = screen.getByRole('heading', { name: /LinkedIn Connection Game/i });
      expect(heading).toBeInTheDocument();
      
      const question = screen.getByText(/Are you connected with me on LinkedIn/i);
      expect(question).toBeInTheDocument();
    });

    test('should render all three action buttons', () => {
      render(<App />);
      
      const checkConnectionBtn = screen.getByRole('button', { name: /Check Connection/i });
      expect(checkConnectionBtn).toBeInTheDocument();
      
      const subscribeBtn = screen.getByRole('button', { name: /Subscribe to my channel/i });
      expect(subscribeBtn).toBeInTheDocument();
      
      const githubBtn = screen.getByRole('button', { name: /Github Repo/i });
      expect(githubBtn).toBeInTheDocument();
    });

    test('should render footer with copyright', () => {
      render(<App />);
      const footer = screen.getByText(/© 2024/i);
      expect(footer).toBeInTheDocument();
      expect(footer.textContent).toContain('CodeWithMuh');
    });
  });

  describe('LinkedIn Connection Functionality', () => {
    test('should display result when Check Connection button is clicked', async () => {
      render(<App />);
      
      const checkButton = screen.getByRole('button', { name: /Check Connection/i });
      fireEvent.click(checkButton);
      
      await waitFor(() => {
        const result = document.getElementById('result');
        expect(result).toBeInTheDocument();
        expect(result.innerHTML).toBeTruthy();
      });
    });

    test('should show not connected message (0% probability)', async () => {
      render(<App />);
      
      const checkButton = screen.getByRole('button', { name: /Check Connection/i });
      fireEvent.click(checkButton);
      
      await waitFor(() => {
        const result = document.getElementById('result');
        expect(result.innerHTML).toContain('No, you are not connected with me on LinkedIn');
      });
    });

    test('should update result on multiple clicks', async () => {
      render(<App />);
      
      const checkButton = screen.getByRole('button', { name: /Check Connection/i });
      
      // First click
      fireEvent.click(checkButton);
      await waitFor(() => {
        const result = document.getElementById('result');
        expect(result.innerHTML).toBeTruthy();
      });
      
      // Second click
      fireEvent.click(checkButton);
      await waitFor(() => {
        const result = document.getElementById('result');
        expect(result.innerHTML).toBeTruthy();
      });
    });
  });

  describe('External Link Buttons', () => {
    test('should have subscribe button that opens new window', () => {
      // Mock window.open
      const mockOpen = jest.fn();
      window.open = mockOpen;
      
      render(<App />);
      
      const subscribeBtn = screen.getByRole('button', { name: /Subscribe to my channel/i });
      fireEvent.click(subscribeBtn);
      
      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining('youtube.com/@codewithmuh'),
        '_blank'
      );
    });

    test('should have github repo button that opens new window', () => {
      // Mock window.open
      const mockOpen = jest.fn();
      window.open = mockOpen;
      
      render(<App />);
      
      const githubBtn = screen.getByRole('button', { name: /Github Repo/i });
      fireEvent.click(githubBtn);
      
      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining('github.com'),
        '_blank'
      );
    });
  });

  describe('Component Structure', () => {
    test('should have proper semantic HTML structure', () => {
      const { container } = render(<App />);
      
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
      
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    test('should have App class on root div', () => {
      const { container } = render(<App />);
      const appDiv = container.querySelector('.App');
      expect(appDiv).toBeInTheDocument();
    });
  });
});
