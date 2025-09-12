import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Snackbar, Alert } from '@mui/material';

const FeedbackAnonimo = () => {
    const [feedback, setFeedback] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (feedback.trim() !== '') {
            console.log('Feedback anônimo enviado:', feedback);
            setOpenSnackbar(true);
            setFeedback(''); // Limpa o campo após o envio
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Paper sx={{ p: 4, m: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Canal de Feedback Anônimo</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Seu feedback é muito importante para nós. As mensagens enviadas por aqui são totalmente anônimas e nos ajudam a melhorar o ambiente de trabalho.
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Escreva seu feedback aqui..."
                    variant="outlined"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={feedback.trim() === ''}
                >
                    Enviar Feedback
                </Button>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Feedback enviado com sucesso! Agradecemos sua contribuição.
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default FeedbackAnonimo;