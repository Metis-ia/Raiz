import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, Chip, Stack, Divider, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem, Grow, Modal } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import GavelIcon from '@mui/icons-material/Gavel';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InsightsIcon from '@mui/icons-material/Insights';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // Ícone para compra
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // Ícone para venda
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Dados mockados para simular a API
const mockLogOperacoes = [
    { id: 1, data: '2025-09-10 09:30:15', ativo: 'WINM', tipo: 'Compra', entrada: '125.120', resultado: 50.75, status: 'Lucro' },
    { id: 2, data: '2025-09-10 09:35:40', ativo: 'WINM', tipo: 'Venda', entrada: '125.200', resultado: -20.50, status: 'Prejuízo' },
    { id: 3, data: '2025-09-10 09:45:00', ativo: 'WINM', tipo: 'Compra', entrada: '125.150', resultado: 80.00, status: 'Lucro' },
];
const mockHistoricoResultados = [
    { name: '09:00', lucro: 200, prejuizo: 100 },
    { name: '10:00', lucro: 300, prejuizo: 150 },
    { name: '11:00', lucro: 450, prejuizo: 200 },
    { name: '12:00', lucro: 500, prejuizo: 250 },
];
// Sinais iniciais para a simulação
const initialSinaisIA = [
    {
        id: 1,
        ativo: 'Mini Índice',
        periodo: '5 minutos',
        tipo: 'Compra',
        take: '126.500',
        backEven: '126.150',
        stopLoss: '125.900',
    },
    {
        id: 2,
        ativo: 'Mini Dólar',
        periodo: '15 minutos',
        tipo: 'Venda',
        take: '5.100',
        backEven: '5.120',
        stopLoss: '5.150',
    },
];

// Dados mockados para o histórico de sinais
const mockHistoricoSinais = [
    {
        id: 10,
        ativo: 'Mini Índice',
        data: '2025-09-09 10:15',
        tipo: 'Compra',
        take: '125.800',
        stopLoss: '125.650',
        resultado: 'Lucro'
    },
    {
        id: 9,
        ativo: 'PETR4',
        data: '2025-09-09 10:10',
        tipo: 'Venda',
        take: '28.10',
        stopLoss: '28.50',
        resultado: 'Prejuízo'
    },
    {
        id: 8,
        ativo: 'VALE3',
        data: '2025-09-09 10:05',
        tipo: 'Compra',
        take: '65.40',
        stopLoss: '65.00',
        resultado: 'Lucro'
    },
    {
        id: 7,
        ativo: 'Mini Dólar',
        data: '2025-09-09 10:00',
        tipo: 'Venda',
        take: '5.150',
        stopLoss: '5.200',
        resultado: 'Lucro'
    },
];

const AutomacaoIAPage = () => {
    const [status, setStatus] = useState<'stopped' | 'running' | 'paused'>('stopped');
    const [selectedStrategy, setSelectedStrategy] = useState('');
    const [sinais, setSinais] = useState(initialSinaisIA);
    // NOVO: Estado para controlar a abertura do modal
    const [openHistoricoModal, setOpenHistoricoModal] = useState(false);

    const handleStartStop = () => {
        setStatus(status === 'running' ? 'stopped' : 'running');
    };
    const handlePauseResume = () => {
        setStatus(status === 'paused' ? 'running' : 'paused');
    };
    // NOVO: Funções para abrir e fechar o modal
    const handleOpenHistoricoModal = () => setOpenHistoricoModal(true);
    const handleCloseHistoricoModal = () => setOpenHistoricoModal(false);

    useEffect(() => {
        const generateRandomSignal = () => {
            const ativos = ['Mini Índice', 'Mini Dólar', 'PETR4', 'VALE3'];
            const periodos = ['5 minutos', '15 minutos', '30 minutos'];
            const tipos = ['Compra', 'Venda'];

            const novoSinal = {
                id: Date.now(),
                ativo: ativos[Math.floor(Math.random() * ativos.length)],
                periodo: periodos[Math.floor(Math.random() * periodos.length)],
                tipo: tipos[Math.floor(Math.random() * tipos.length)],
                take: (Math.random() * 100 + 120000).toFixed(0),
                backEven: (Math.random() * 100 + 120000).toFixed(0),
                stopLoss: (Math.random() * 100 + 120000).toFixed(0),
            };

            setSinais(prevSinais => [novoSinal, ...prevSinais.slice(0, 4)]);
        };

        const interval = setInterval(generateRandomSignal, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ p: 3, bgcolor: 'background.default' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                Automação com IA
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Status do Robô</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
                                {status === 'running' && <CheckCircleOutlineIcon color="success" />}
                                {status === 'stopped' && <StopIcon color="error" />}
                                {status === 'paused' && <PauseCircleOutlineIcon color="warning" />}
                                <Typography variant="h5" component="div">
                                    {status === 'running' ? 'Executando' : status === 'stopped' ? 'Parado' : 'Pausado'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                    variant="contained"
                                    color={status === 'running' ? 'error' : 'success'}
                                    startIcon={status === 'running' ? <StopIcon /> : <PlayArrowIcon />}
                                    onClick={handleStartStop}
                                >
                                    {status === 'running' ? 'Parar' : 'Iniciar'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    startIcon={<PauseCircleOutlineIcon />}
                                    onClick={handlePauseResume}
                                    disabled={status === 'stopped'}
                                >
                                    {status === 'paused' ? 'Retomar' : 'Pausar'}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Estratégia</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
                                <GavelIcon color="primary" />
                                <Typography variant="h5" component="div">
                                    Estratégia Padrão
                                </Typography>
                            </Box>
                            <FormControl fullWidth size="small">
                                <InputLabel>Alterar Estratégia</InputLabel>
                                <Select
                                    value={selectedStrategy}
                                    label="Alterar Estratégia"
                                    onChange={(e) => setSelectedStrategy(e.target.value as string)}
                                >
                                    <MenuItem value="padrao">Estratégia Padrão</MenuItem>
                                    <MenuItem value="agressiva">Estratégia Agressiva</MenuItem>
                                    <MenuItem value="conservadora">Estratégia Conservadora</MenuItem>
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Resultado do Dia</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
                                <InsightsIcon color="info" />
                                <Typography variant="h5" component="div">
                                    R$ 150,25
                                </Typography>
                            </Box>
                            <Chip
                                icon={<TrendingUpIcon />}
                                label="Lucro"
                                color="success"
                                size="small"
                                variant="outlined"
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            <Paper sx={{ p: 4, mb: 4, boxShadow: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>Sinais de Operação da IA</Typography>
                    <Button onClick={handleOpenHistoricoModal} variant="outlined">
                        Histórico
                    </Button>
                </Box>
                <Grid container spacing={3}>
                    {sinais.map((sinal) => (
                        <Grid item xs={12} sm={6} key={sinal.id}>
                            <Grow in={true}>
                                <Card sx={{ 
                                    p: 2, 
                                    borderLeft: `5px solid ${sinal.tipo === 'Compra' ? '#4caf50' : '#f44336'}`, 
                                    boxShadow: 1,
                                    bgcolor: '#f5f5f5', 
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
                                }}>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                        {sinal.tipo === 'Compra' ? 
                                            <ArrowUpwardIcon color="success" /> : 
                                            <ArrowDownwardIcon color="error" />
                                        }
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            Entrada de {sinal.tipo}
                                        </Typography>
                                        <Chip 
                                            label={sinal.ativo} 
                                            size="small" 
                                            sx={{ ml: 'auto', bgcolor: '#e0e0e0' }} 
                                        />
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Próximo candle de {sinal.periodo}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="body2" color="text.secondary">Take Profit</Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.main' }}>{sinal.take}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="body2" color="text.secondary">Back Even</Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{sinal.backEven}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="body2" color="text.secondary">Stop Loss</Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'error.main' }}>{sinal.stopLoss}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grow>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Paper sx={{ p: 4, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>Histórico de Lucro e Prejuízo (Últimas Horas)</Typography>
                <Box sx={{ height: 300, width: '100%', mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockHistoricoResultados} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="lucro" stroke="#82ca9d" name="Lucro" />
                            <Line type="monotone" dataKey="prejuizo" stroke="#8884d8" name="Prejuízo" />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>

            <Paper sx={{ p: 4, mt: 4, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>Log de Operações Recentes</Typography>
                <List sx={{ mt: 2 }}>
                    {mockLogOperacoes.map((op, index) => (
                        <React.Fragment key={op.id}>
                            <ListItem sx={{ py: 2 }}>
                                <ListItemText
                                    primary={
                                        <Stack direction="row" spacing={2}>
                                            <Typography component="div" variant="body1" sx={{ fontWeight: 'bold' }}>{op.ativo}</Typography>
                                            <Chip label={op.tipo} size="small" color={op.tipo === 'Compra' ? 'primary' : 'secondary'} />
                                            <Typography component="div" variant="body2" color="text.secondary">{op.data}</Typography>
                                        </Stack>
                                    }
                                    secondary={
                                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                                            <Typography component="div" variant="body2">Preço de Entrada: {op.entrada}</Typography>
                                            <Chip
                                                icon={op.status === 'Lucro' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                                                label={op.status === 'Lucro' ? `+ R$ ${op.resultado.toFixed(2)}` : `- R$ ${Math.abs(op.resultado).toFixed(2)}`}
                                                size="small"
                                                color={op.status === 'Lucro' ? 'success' : 'error'}
                                                variant="outlined"
                                            />
                                        </Stack>
                                    }
                                />
                            </ListItem>
                            {index < mockLogOperacoes.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            {/* NOVO: Modal para Histórico de Sinais */}
            <Modal open={openHistoricoModal} onClose={handleCloseHistoricoModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 600,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" gutterBottom>Histórico de Sinais</Typography>
                    <List>
                        {mockHistoricoSinais.map((sinal) => (
                            <ListItem key={sinal.id} sx={{ bgcolor: 'background.paper', mb: 1, boxShadow: 1, borderRadius: '4px' }}>
                                <ListItemText
                                    primary={
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{sinal.ativo}</Typography>
                                            <Chip 
                                                label={sinal.tipo} 
                                                size="small" 
                                                color={sinal.tipo === 'Compra' ? 'success' : 'error'}
                                            />
                                            <Typography variant="body2" color="text.secondary" sx={{ml: 'auto'}}>{sinal.data}</Typography>
                                        </Stack>
                                    }
                                    secondary={
                                        <Stack direction="row" spacing={2} sx={{mt: 1}}>
                                            <Typography variant="body2">Take: {sinal.take}</Typography>
                                            <Typography variant="body2">Stop: {sinal.stopLoss}</Typography>
                                            <Chip 
                                                label={sinal.resultado} 
                                                size="small" 
                                                color={sinal.resultado === 'Lucro' ? 'success' : 'error'}
                                                variant="outlined"
                                            />
                                        </Stack>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
        </Box>
    );
}

export default AutomacaoIAPage;