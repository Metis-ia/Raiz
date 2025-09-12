import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    Box, 
    Typography, 
    Paper, 
    IconButton, 
    Button, 
    Snackbar, 
    Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTrainingContext } from '../../contexts/TrainingContext';

const TrainingPage = () => {
    const { trainingId } = useParams();
    const { trainings, updateTrainingProgress } = useTrainingContext();
    const training = trainings.find(t => t.id === parseInt(trainingId || '0'));
    const collaboratorId = 1; // ID do colaborador logado, para demonstração

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleCompleteTraining = () => {
        if (training) {
            updateTrainingProgress(collaboratorId, training.id, 100);
            setOpenSnackbar(true);
        }
    };

    if (!training) {
        return (
            <Paper sx={{ p: 4, m: 2, textAlign: 'center' }}>
                <Typography variant="h5" color="error">Treinamento não encontrado.</Typography>
                <Box sx={{ mt: 2 }}>
                    <Link to="/admin/rh/colaboradores" style={{ textDecoration: 'none' }}>
                        <Button variant="contained">Voltar para Colaboradores</Button>
                    </Link>
                </Box>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 4, m: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton component={Link} to="/admin/rh/colaboradores" sx={{ mr: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{training.title}</Typography>
            </Box>
            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: '8px' }}>
                <Typography variant="body1">
                    Este curso cobre os fundamentos da análise de dados e como aplicar ferramentas de IA para otimizar processos. Assista ao vídeo para começar.
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Conteúdo de Treinamento"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </Box>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleCompleteTraining}
                    sx={{ mt: 3 }}
                >
                    Marcar como Concluído
                </Button>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Treinamento concluído com sucesso!
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default TrainingPage;