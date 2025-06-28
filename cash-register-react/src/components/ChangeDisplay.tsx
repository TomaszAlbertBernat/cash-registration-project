'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Alert,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: 120,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid #eee',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
}));

const SuccessPaper = styled(StyledPaper)(() => ({
  borderColor: '#28a745',
  backgroundColor: '#f8fff9',
}));

const ErrorPaper = styled(StyledPaper)(() => ({
  borderColor: '#dc3545',
  backgroundColor: '#fff5f5',
}));

const ProcessingPaper = styled(StyledPaper)(() => ({
  borderColor: '#007bff',
  backgroundColor: '#f8f9ff',
}));

export const ChangeDisplay: React.FC = () => {
  const { lastTransaction, isLoading } = useSelector((state: RootState) => state.cashRegister);

  const formatCurrency = (amount: number): string => `$${amount.toFixed(2)}`;

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'OPEN':
        return 'success';
      case 'CLOSED':
        return 'warning';
      case 'INSUFFICIENT_FUNDS':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'Transaction Complete';
      case 'CLOSED':
        return 'Drawer Closed';
      case 'INSUFFICIENT_FUNDS':
        return 'Insufficient Funds';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <ProcessingPaper>
        <Typography variant="body1" color="primary">
          Calculating change...
        </Typography>
      </ProcessingPaper>
    );
  }

  if (!lastTransaction) {
    return (
      <StyledPaper>
        <Typography variant="body1" color="textSecondary">
          Enter cash amount and click Calculate Change
        </Typography>
      </StyledPaper>
    );
  }

  if (lastTransaction.status === 'INSUFFICIENT_FUNDS') {
    return (
      <ErrorPaper>
        <Alert severity="error" sx={{ border: 'none', backgroundColor: 'transparent' }}>
          <Typography variant="h6">Status: INSUFFICIENT_FUNDS</Typography>
        </Alert>
      </ErrorPaper>
    );
  }

  // Handle exact cash scenario
  if (lastTransaction.change.length === 0 && lastTransaction.status === 'OPEN') {
    return (
      <SuccessPaper>
        <Alert severity="success" sx={{ border: 'none', backgroundColor: 'transparent' }}>
          <Typography variant="h6">No change due - customer paid with exact cash</Typography>
        </Alert>
      </SuccessPaper>
    );
  }

  return (
    <SuccessPaper>
      <Box width="100%" textAlign="center">
        <Chip 
          label={getStatusText(lastTransaction.status)} 
          color={getStatusColor(lastTransaction.status)}
          sx={{ mb: 2, fontWeight: 'bold' }}
        />
        
        {lastTransaction.change.length > 0 && (
          <Grid container spacing={1} justifyContent="center">
            {lastTransaction.change.map(({ name, amount }) => (
              <Grid size={{ xs: 12, sm: 6 }} key={name}>
                <Typography variant="body1" sx={{ 
                  backgroundColor: 'rgba(40, 167, 69, 0.1)', 
                  padding: 1, 
                  borderRadius: 1,
                  border: '1px solid rgba(40, 167, 69, 0.3)'
                }}>
                  {name}: {formatCurrency(amount)}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </SuccessPaper>
  );
}; 