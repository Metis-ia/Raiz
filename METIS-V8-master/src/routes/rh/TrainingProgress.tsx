import React from 'react';
import { Box, Typography, LinearProgress, Paper } from '@mui/material';

interface TrainingProgressProps {
  title: string;
  progress: number; // Valor de 0 a 100
}

const TrainingProgress = ({ title, progress }: TrainingProgressProps) => {
  const isCompleted = progress >= 100;
  const progressText = isCompleted ? 'Concluído' : `Em andamento (${progress}%)`;

  return (
    <Paper sx={{ p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{title}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            color={isCompleted ? 'success' : 'primary'} 
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {progressText}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TrainingProgress;