import { expect, test, describe, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import LoginForm from './LoginForm';
import { BrowserRouter } from 'react-router-dom';
import { loginUser } from '../hooks/loginUser';

describe('LoginForm', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the form correctly', async () => {
    const screen = render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    // Debug the rendered component
    // screen.debug();

    //Check for labels
    await expect.element(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    await expect.element(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Check for the submit button
    await expect.element(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows validation messages on submitting empty form', async () => {
    const screen = render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    // Trigger form submission
    await screen.getByRole('button', { name: /login/i }).click();

    // Check for error messages
    await expect.element(screen.getByText(/Please enter your email address/i)).toBeVisible();
    await expect.element(screen.getByText(/Enter your password/i)).toBeVisible();
  });

  test('validates email and password format', async () => {
    const screen = render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    await screen.getByLabelText(/Email/i).fill('foo');
    await screen.getByLabelText(/Password/i).fill('1234');

    await screen.getByRole('button', { name: /login/i }).click();

    await expect.element(screen.getByText('Please enter a valid email address')).toBeVisible();
    await expect.element(screen.getByText('Password must be at least 8 characters')).toBeVisible();
  });

  test('submits form with valid data', async () => {
    vi.mock('../hooks/loginUser', () => {
      return {
        loginUser: vi.fn().mockResolvedValueOnce({ success: true, error: null }),
      };
    });

    const screen = render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    // Fill in the form fields with valid data
    await screen.getByLabelText(/Email/i).fill('harry@stud.noroff.no');
    await screen.getByLabelText(/Password/i).fill('12345678');

    // Trigger form submission
    await screen.getByRole('button', { name: /login/i }).click();

    // Ensure loginUser has been called with the correct data
    await vi.waitFor(() => {
      expect(loginUser).toHaveBeenCalledTimes(1);
    });
  });

  test('submits form with invalid data', async () => {
    vi.mock('../hooks/loginUser', () => {
      return {
        loginUser: vi.fn().mockResolvedValueOnce({ success: false, error: null }),
      };
    });

    const screen = render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );

    // Fill in the form fields with invalid data
    await screen.getByLabelText(/Email/i).fill('harry@.noroff.no');
    await screen.getByLabelText(/Password/i).fill('123');

    // Trigger form submission
    await screen.getByRole('button', { name: /login/i }).click();

    // Ensure loginUser has been called with the incorrect data
    await vi.waitFor(() => {
      expect(loginUser).toHaveBeenCalledTimes(0);
    });
  });
});
