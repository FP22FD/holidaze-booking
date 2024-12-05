import { expect, test, describe, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { PersistProvider } from '../../../store/PersistContext';
import { HelmetProvider } from 'react-helmet-async';
import { useLoginUser } from '../hooks/useLoginUser';

describe('LoginForm', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the form correctly', async () => {
    const screen = render(
      <PersistProvider>
        <HelmetProvider>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </HelmetProvider>
      </PersistProvider>,
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
      <PersistProvider>
        <HelmetProvider>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </HelmetProvider>
      </PersistProvider>,
    );

    // Trigger form submission
    await screen.getByRole('button', { name: /login/i }).click();

    // Check for error messages
    await expect.element(screen.getByText(/Please enter your email address/i)).toBeVisible();
    await expect.element(screen.getByText(/Please enter your password/i)).toBeVisible();
  });

  test('validates email and password format', async () => {
    const screen = render(
      <PersistProvider>
        <HelmetProvider>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </HelmetProvider>
      </PersistProvider>,
    );

    await screen.getByLabelText(/Email/i).fill('foo');
    await screen.getByLabelText(/Password/i).fill('1234');

    await screen.getByRole('button', { name: /login/i }).click();

    await expect.element(screen.getByText('Please enter a valid email address')).toBeVisible();
    await expect.element(screen.getByText('Password must be at least 8 characters')).toBeVisible();
  });

  test('submits form with valid data', async () => {
    vi.mock('../hooks/useLoginUser');

    const mockLoginUser = vi.fn().mockResolvedValueOnce({ success: true, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useLoginUser as any).mockReturnValue({ loginUser: mockLoginUser, loading: false, error: null });

    const screen = render(
      <PersistProvider>
        <HelmetProvider>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </HelmetProvider>
      </PersistProvider>,
    );

    // Fill in the form fields with valid data
    await screen.getByLabelText(/Email/i).fill('harry@stud.noroff.no');
    await screen.getByLabelText(/Password/i).fill('12345678');

    // Trigger form submission
    await screen.getByRole('button', { name: /login/i }).click();

    // Ensure loginUser has been called with the correct data
    await vi.waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledTimes(1);
      expect(mockLoginUser).toHaveBeenCalledWith('harry@stud.noroff.no', '12345678');
    });
  });

  test('submits form with invalid data', async () => {
    vi.mock('../hooks/useLoginUser');

    const mockLoginUser = vi.fn().mockResolvedValueOnce({ success: true, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useLoginUser as any).mockReturnValue({ loginUser: mockLoginUser, loading: false, error: null });

    const screen = render(
      <PersistProvider>
        <HelmetProvider>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </HelmetProvider>
      </PersistProvider>,
    );

    // Fill in the form fields with invalid data
    await screen.getByLabelText(/Email/i).fill('harry@.noroff.no');
    await screen.getByLabelText(/Password/i).fill('123');

    // Trigger form submission
    await screen.getByRole('button', { name: /login/i }).click();

    // Ensure loginUser has been called with the incorrect data
    await vi.waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledTimes(0);
    });
  });
});
