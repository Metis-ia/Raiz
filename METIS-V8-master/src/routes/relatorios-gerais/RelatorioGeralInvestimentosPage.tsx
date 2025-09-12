import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Chip, Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const mockPerformanceMensal = [
    { mes: 'Jan', 'Retorno (R$)': 500, 'Investimento': 10000 },
    { mes: 'Fev', 'Retorno (R$)': 700, 'Investimento': 11000 },
    { mes: 'Mar', 'Retorno (R$)': -200, 'Investimento': 10500 },
    { mes: 'Abr', 'Retorno (R$)': 1200, 'Investimento': 12000 },
    { mes: 'Mai', 'Retorno (R$)': 1500, 'Investimento': 13000 },
    { mes: 'Jun', 'Retorno (R$)': 1800, 'Investimento': 14000 },
];

const mockPortfolio = [
    { ativo: 'Mini Índice', alocacao: '45%', tipo: 'Automação IA' },
    { ativo: 'Mini Dólar', alocacao: '30%', tipo: 'Automação IA' },
    { ativo: 'Ações BR', alocacao: '25%', tipo: 'Manual' },
];

const RelatorioGeralInvestimentosPage = () => {
    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Relatório Geral de Investimentos
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Uma visão detalhada do portfólio de investimentos e da performance das estratégias.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography color="text.secondary" variant="subtitle1" sx={{mb: 1}}>Retorno Total (Mês)</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>+ R$ 1.800</Typography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 2}}>
                                <TrendingUpIcon color="success" />
                                <Typography variant="body2" color="text.secondary">Lucro consolidado em Junho</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography color="text.secondary" variant="subtitle1" sx={{mb: 1}}>Alocação IA</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>75%</Typography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 2}}>
                                <Chip label="Maior parte em Mini Índice" color="primary" size="small" />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography color="text.secondary" variant="subtitle1" sx={{mb: 1}}>Estratégias Ativas</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>2</Typography>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 2}}>
                                <Chip label="Day Trade (WINM) e Day Trade (WDOM)" color="success" size="small" />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Paper sx={{ p: 2, height: '400px' }}>
                <Typography variant="h6" gutterBottom>Retorno e Capital por Mês</Typography>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockPerformanceMensal} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="Retorno (R$)" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="Investimento" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
};

export default RelatorioGeralInvestimentosPage;