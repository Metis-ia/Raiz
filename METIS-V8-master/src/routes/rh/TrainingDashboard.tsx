import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box, List, ListItem, ListItemText, LinearProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// Definindo o tipo para um treinamento
interface Training {
  id: number;
  title: string;
  progress: number; // 0-100
}

const TrainingDashboard = () => {
  const [trainings, setTrainings] = useState<Training[]>([
    { id: 1, title: 'Treinamento de Liderança', progress: 75 },
    { id: 2, title: 'Curso de Análise Financeira', progress: 50 },
    { id: 3, title: 'Workshop de Comunicação', progress: 100 },
  ]);
  const [newTrainingTitle, setNewTrainingTitle] = useState('');

  const handleAddTraining = () => {
    if (newTrainingTitle.trim() !== '') {
      const newTraining: Training = {
        id: Date.now(),
        title: newTrainingTitle,
        progress: 0,
      };
      setTrainings([...trainings, newTraining]);
      setNewTrainingTitle('');
    }
  };

  const handleDeleteTraining = (id: number) => {
    setTrainings(trainings.filter(training => training.id !== id));
  };

  return (
    <Card className="m-4 shadow-lg p-4">
      <CardContent>
        <Typography variant="h5" component="h2" className="font-bold mb-4">
          Treinamento & Desenvolvimento
        </Typography>

        <Box className="mb-4 flex items-center">
          <TextField
            label="Novo Treinamento"
            variant="outlined"
            fullWidth
            value={newTrainingTitle}
            onChange={(e) => setNewTrainingTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTraining()}
            className="mr-2"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTraining}
            startIcon={<AddIcon />}
          >
            Adicionar
          </Button>
        </Box>

        <List>
          {trainings.map(training => (
            <ListItem key={training.id} className="border-b border-gray-200 py-2">
              <ListItemText
                primary={training.title}
                secondary={`Progresso: ${training.progress}%`}
              />
              <Box className="w-1/2">
                <LinearProgress variant="determinate" value={training.progress} />
              </Box>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTraining(training.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TrainingDashboard;