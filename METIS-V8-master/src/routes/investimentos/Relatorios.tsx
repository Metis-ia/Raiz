import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Chip, Stack, Button } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PrintIcon from '@mui/icons-material/Print';
import DescriptionIcon from '@mui/icons-material/Description';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Dados de exemplo para o gráfico (Mock)
const mockData = [
    { mes: 'Jan', 'Investimento IA': 200, 'Investimento Manual': 150 },
    { mes: 'Fev', 'Investimento IA': 300, 'Investimento Manual': 180 },
    { mes: 'Mar', 'Investimento IA': 400, 'Investimento Manual': 220 },
    { mes: 'Abr', 'Investimento IA': 550, 'Investimento Manual': 250 },
    { mes: 'Mai', 'Investimento IA': 600, 'Investimento Manual': 280 },
    { mes: 'Jun', 'Investimento IA': 750, 'Investimento Manual': 300 },
];

const RelatoriosInvestimentosPage = () => {
    const handlePrint = () => {
        alert("Funcionalidade de impressão em desenvolvimento.");
        // Implemente a lógica de impressão aqui
    };

    const handleExport = () => {
        alert("Funcionalidade de exportação para Excel em desenvolvimento.");
        // Implemente a lógica de exportação aqui
    };

    return (
        <Box sx={{ p: 3, bgcolor: 'background.default' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                Relatórios de Investimento
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}>
                <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
                    Imprimir Relatório
                </Button>
                <Button variant="outlined" startIcon={<DescriptionIcon />} onClick={handleExport}>
                    Exportar para Excel
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Total Investido (IA)</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>R$ 7.500</Typography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 2}}>
                                <TrendingUpIcon color="primary" />
                                <Typography variant="body2" color="text.secondary">Aumento de 20% no último trimestre</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Total de Retorno</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>R$ 1.500</Typography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 2}}>
                                <TrendingUpIcon color="success" />
                                <Typography variant="body2" color="text.secondary">Retorno total acumulado</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 2, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Diversificação</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>R$ 15.000</Typography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 2}}>
                                <TrendingUpIcon color="info" />
                                <Typography variant="body2" color="text.secondary">Total em ativos de tecnologia</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Paper sx={{ p: 4, height: '400px', boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>Comparativo de Investimentos (Últimos 6 Meses)</Typography>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={mockData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Investimento IA" fill="#8884d8" />
                        <Bar dataKey="Investimento Manual" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
};

export default RelatoriosInvestimentosPage;