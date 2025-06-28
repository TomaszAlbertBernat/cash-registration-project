'use client';

import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { CashRegisterForm } from '@/components/CashRegisterForm';
import { ChangeDisplay } from '@/components/ChangeDisplay';
import { CashDrawerDisplay } from '@/components/CashDrawerDisplay';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Main Calculator Section */}
        <CashRegisterForm />
        
        {/* Change Results Display */}
        <ChangeDisplay />
        
        {/* Cash Drawer Display */}
        <CashDrawerDisplay />
        
        {/* Footer */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="textSecondary">
            Made by T-A-B | Modern React Cash Register
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
