import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CashRegisterForm } from '../CashRegisterForm';

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </Provider>
  );
};

describe('CashRegisterForm', () => {
  it('renders the cash register form', () => {
    renderWithProviders(<CashRegisterForm />);
    
    expect(screen.getByText('Cash Register')).toBeInTheDocument();
    expect(screen.getByText('Item Price: $1.87')).toBeInTheDocument();
    expect(screen.getByLabelText('Cash from Customer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate change/i })).toBeInTheDocument();
  });

  it('validates cash input', async () => {
    renderWithProviders(<CashRegisterForm />);
    
    const cashInput = screen.getByLabelText('Cash from Customer');
    const submitButton = screen.getByRole('button', { name: /calculate change/i });

    // Test with insufficient funds
    fireEvent.change(cashInput, { target: { value: '1.00' } });
    
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('allows valid cash amounts', async () => {
    renderWithProviders(<CashRegisterForm />);
    
    const cashInput = screen.getByLabelText('Cash from Customer');
    const submitButton = screen.getByRole('button', { name: /calculate change/i });

    // Test with valid amount
    fireEvent.change(cashInput, { target: { value: '5.00' } });
    
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('shows loading state when calculating', async () => {
    renderWithProviders(<CashRegisterForm />);
    
    const cashInput = screen.getByLabelText('Cash from Customer');
    const submitButton = screen.getByRole('button', { name: /calculate change/i });

    fireEvent.change(cashInput, { target: { value: '5.00' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
}); 