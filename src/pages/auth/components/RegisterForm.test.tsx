import { expect, test, describe, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import RegisterForm from './RegisterForm';
import { BrowserRouter } from 'react-router-dom';
import { registerUser } from '../hooks/registerUser';

describe('RegisterForm', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the form correctly', async () => {
    const screen = render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    // Debug the rendered component
    // screen.debug();

    //Check for labels
    await expect.element(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    await expect.element(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    await expect.element(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Check for the submit button
    await expect.element(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('shows validation messages on submitting empty form', async () => {
    const screen = render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    // Trigger form submission
    await screen.getByRole('button', { name: /register/i }).click();

    // Check for error messages
    await expect.element(screen.getByText(/Please enter your name/i)).toBeVisible();
    await expect.element(screen.getByText(/Please enter your email address/i)).toBeVisible();
    await expect.element(screen.getByText(/Enter your password/i)).toBeVisible();
  });

  test('validates name, email and password format', async () => {
    const screen = render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    await screen.getByLabelText(/Name/i).fill('fo');
    await screen.getByLabelText(/Email/i).fill('foo');
    await screen.getByLabelText(/Password/i).fill('1234');

    await screen.getByRole('button', { name: /register/i }).click();

    await expect.element(screen.getByText('Your first name should be at least 3 characters')).toBeVisible();
    await expect.element(screen.getByText('Please enter a valid email address')).toBeVisible();
    await expect.element(screen.getByText('Password must be at least 8 characters')).toBeVisible();
  });

  test('submits form with valid data', async () => {
    vi.mock('../hooks/registerUser', () => {
      return {
        registerUser: vi.fn().mockResolvedValueOnce({ success: true, error: null }),
      };
    });

    const screen = render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    // Fill in the form fields with valid data
    await screen.getByLabelText(/Name/i).fill('Harry');
    await screen.getByLabelText(/Email/i).fill('harry@stud.noroff.no');
    await screen.getByLabelText(/Password/i).fill('12345678');

    // Trigger form submission
    await screen.getByRole('button', { name: /register/i }).click();

    // Ensure registerUser has been called with the correct data
    await vi.waitFor(() => {
      expect(registerUser).toHaveBeenCalledTimes(1);
    });
  });

  test('submits form with invalid data', async () => {
    vi.mock('../hooks/registerUser', () => {
      return {
        registerUser: vi.fn().mockResolvedValueOnce({ success: false, error: null }),
      };
    });

    const screen = render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>,
    );

    // Fill in the form fields with invalid data
    await screen.getByLabelText(/Name/i).fill('Ha');
    await screen.getByLabelText(/Email/i).fill('harry@.noroff.no');
    await screen.getByLabelText(/Password/i).fill('123');

    // Trigger form submission
    await screen.getByRole('button', { name: /register/i }).click();

    // Ensure registerUser has been called with the incorrect data
    await vi.waitFor(() => {
      expect(registerUser).toHaveBeenCalledTimes(0);
    });
  });
});
