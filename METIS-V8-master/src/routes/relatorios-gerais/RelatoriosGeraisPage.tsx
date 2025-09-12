import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Icon, Stack, Chip, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Dados mockados para os cartões de resumo
const mockSummaryData = {
    aiPerformance: {
        title: 'Performance da IA',
        metric: '50 operações',
        description: 'Total de operações de compra/venda no dia',
        icon: <QueryStatsIcon />,
        color: 'primary',
        chipLabel: 'Mês de Setembro'
    },
    employeePerformance: {
        title: 'Performance de Funcionários',
        metric: '2 faltas hoje',
        description: 'Acompanhe a pontualidade e ausências da equipe',
        icon: <PersonIcon />,
        color: 'warning',
        chipLabel: 'Último mês'
    },
    financialHealth: {
        title: 'Saúde Financeira',
        metric: 'R$ 125.000',
        description: 'Fluxo de caixa positivo no trimestre',
        icon: <MonetizationOnIcon />,
        color: 'success',
        chipLabel: 'Último trimestre'
    }
};

// Dados mockados para o gráfico de área
const mockChartData = [
    { mes: 'Jul', 'Desempenho': 4000 },
    { mes: 'Ago', 'Desempenho': 3000 },
    { mes: 'Set', 'Desempenho': 2000 },
    { mes: 'Out', 'Desempenho': 2780 },
    { mes: 'Nov', 'Desempenho': 1890 },
    { mes: 'Dez', 'Desempenho': 2390 },
];

const RelatoriosGeraisPage = () => {
    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Relatórios Gerais
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Visão consolidada do desempenho e das métricas chave da empresa.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <Icon color={mockSummaryData.aiPerformance.color} sx={{ fontSize: 40 }}>
                                    {mockSummaryData.aiPerformance.icon}
                                </Icon>
                                <Box>
                                    <Typography variant="h6">{mockSummaryData.aiPerformance.title}</Typography>
                                    <Chip label={mockSummaryData.aiPerformance.chipLabel} size="small" />
                                </Box>
                            </Stack>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h3" sx={{ fontWeight: 'bold', color: `${mockSummaryData.aiPerformance.color}.main` }}>
                                {mockSummaryData.aiPerformance.metric}
                            </Typography>
                            <Typography color="text.secondary" variant="body2">{mockSummaryData.aiPerformance.description}</Typography>
                            <Box sx={{ mt: 3 }}>
                                <Link to="/admin/relatorios-gerais/investimentos" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" fullWidth>Ver Detalhes</Button>
                                </Link>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <Icon color={mockSummaryData.employeePerformance.color} sx={{ fontSize: 40 }}>
                                    {mockSummaryData.employeePerformance.icon}
                                </Icon>
                                <Box>
                                    <Typography variant="h6">{mockSummaryData.employeePerformance.title}</Typography>
                                    <Chip label={mockSummaryData.employeePerformance.chipLabel} size="small" />
                                </Box>
                            </Stack>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h3" sx={{ fontWeight: 'bold', color: `${mockSummaryData.employeePerformance.color}.main` }}>
                                {mockSummaryData.employeePerformance.metric}
                            </Typography>
                            <Typography color="text.secondary" variant="body2">{mockSummaryData.employeePerformance.description}</Typography>
                            <Box sx={{ mt: 3 }}>
                                <Link to="/admin/relatorios-gerais/funcionarios" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" fullWidth>Ver Detalhes</Button>
                                </Link>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <Icon color={mockSummaryData.financialHealth.color} sx={{ fontSize: 40 }}>
                                    {mockSummaryData.financialHealth.icon}
                                </Icon>
                                <Box>
                                    <Typography variant="h6">{mockSummaryData.financialHealth.title}</Typography>
                                    <Chip label={mockSummaryData.financialHealth.chipLabel} size="small" />
                                </Box>
                            </Stack>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h3" sx={{ fontWeight: 'bold', color: `${mockSummaryData.financialHealth.color}.main` }}>
                                {mockSummaryData.financialHealth.metric}
                            </Typography>
                            <Typography color="text.secondary" variant="body2">{mockSummaryData.financialHealth.description}</Typography>
                            <Box sx={{ mt: 3 }}>
                                <Link to="/admin/relatorios-gerais/empresa" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" fullWidth>Ver Detalhes</Button>
                                </Link>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            <Paper sx={{ p: 2, height: '400px' }}>
                <Typography variant="h6" gutterBottom>Visão Geral de Desempenho da Empresa (Últimos 6 Meses)</Typography>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={mockChartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="Desempenho" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
};

export default RelatoriosGeraisPage;