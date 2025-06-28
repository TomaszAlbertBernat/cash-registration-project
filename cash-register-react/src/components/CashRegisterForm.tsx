'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setLoading, calculateChange, clearError } from '@/store/slices/cashRegisterSlice';
import { FormData } from '@/types/cashRegister';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 500,
  margin: '0 auto',
  backgroundColor: '#fff',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const PriceDisplay = styled(Box)(({ theme }) => ({
  backgroundColor: '#e8f5e8',
  border: '2px solid #28a745',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  color: '#155724',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  fontSize: '1.1rem',
  fontWeight: 'bold',
  minWidth: 200,
  borderRadius: theme.spacing(1),
  '&:disabled': {
    backgroundColor: '#6c757d',
  },
}));

const schema = yup.object({
  cashAmount: yup
    .number()
    .required('Cash amount is required')
    .positive('Cash amount must be positive')
    .min(0.01, 'Cash amount must be at least $0.01'),
});

export const CashRegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const { price, isLoading, error } = useSelector((state: RootState) => state.cashRegister);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const cashAmount = watch('cashAmount');

  const onSubmit = async (data: FormData) => {
    if (data.cashAmount < price) {
      return;
    }

    dispatch(setLoading(true));
    
    // Simulate processing time for better UX
    setTimeout(() => {
      dispatch(calculateChange({ cashAmount: data.cashAmount }));
      reset();
    }, 300);
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const getButtonText = () => {
    if (isLoading) return '';
    if (!cashAmount || cashAmount < 0) return 'Invalid Amount';
    if (cashAmount < price) return 'Insufficient Cash';
    return 'Calculate Change';
  };

  const isButtonDisabled = !isValid || cashAmount < price || isLoading;

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center" color="primary">
        Cash Register
      </Typography>

      <PriceDisplay>
        <Typography variant="h6" component="strong">
          Item Price: ${price.toFixed(2)}
        </Typography>
      </PriceDisplay>

      {error && (
        <Alert 
          severity="error" 
          onClose={handleClearError}
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register('cashAmount')}
          label="Cash from Customer"
          type="number"
          inputProps={{
            step: 0.01,
            min: 0,
          }}
          placeholder="0.00"
          fullWidth
          margin="normal"
          error={!!errors.cashAmount}
          helperText={errors.cashAmount?.message}
          autoFocus
          disabled={isLoading}
          sx={{ mb: 3 }}
        />

        <Box display="flex" justifyContent="center">
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={isButtonDisabled}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {getButtonText()}
          </StyledButton>
        </Box>
      </Box>
    </StyledPaper>
  );
}; 