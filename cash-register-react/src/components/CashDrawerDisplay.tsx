'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f8f9fa',
  border: '1px solid #dee2e6',
}));

const DenominationItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: '#fff',
  borderRadius: theme.spacing(0.5),
  border: '1px solid #e9ecef',
  textAlign: 'center',
}));

export const CashDrawerDisplay: React.FC = () => {
  const { cashInDrawer } = useSelector((state: RootState) => state.cashRegister);

  const currencyNameMap: Record<string, string> = {
    PENNY: 'PENNIES',
    NICKEL: 'NICKELS',
    DIME: 'DIMES',
    QUARTER: 'QUARTERS',
    ONE: 'ONES',
    FIVE: 'FIVES',
    TEN: 'TENS',
    TWENTY: 'TWENTIES',
    'ONE HUNDRED': 'HUNDREDS',
  };

  const formatCurrency = (amount: number): string => `$${amount.toFixed(2)}`;

  const totalAmount = cashInDrawer.reduce((total, denomination) => total + denomination.amount, 0);

  return (
    <StyledPaper elevation={1}>
      <Box mb={2}>
        <Typography variant="h6" component="h2" gutterBottom color="primary">
          Cash Drawer Contents
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Total in Drawer: {formatCurrency(totalAmount)}
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={1}>
        {cashInDrawer.map(({ name, amount }) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={name}>
            <DenominationItem>
              <Typography variant="body2" fontWeight="bold" color="primary">
                {currencyNameMap[name]}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatCurrency(amount)}
              </Typography>
            </DenominationItem>
          </Grid>
        ))}
      </Grid>
    </StyledPaper>
  );
}; 