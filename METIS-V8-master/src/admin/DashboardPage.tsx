import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Avatar, Stack } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WarningIcon from '@mui/icons-material/Warning';

// --- Dados de Exemplo (Mock) que viriam da sua API ---

// KPIs / Cards de Resumo
const kpiData = {
    funcionariosAtivos: 5,
    totalDespesasMes: 9901.25,
    pagamentosPendentes: 1,
};

// Dados para o Gráfico de Despesas
const despesasPorCategoria = [
    { name: 'Suprimentos', value: 1250.75 },
    { name: 'Fornecedores', value: 850.00 },
    { name: 'Utilities', value: 2300.50 },
    { name: 'Fixo', value: 5500.00 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const DashboardPage = () => {
    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Dashboard Principal
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Bem-vindo! Aqui está um resumo da saúde da sua empresa.
            </Typography>

            {/* --- Cards de Resumo (KPIs) --- */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined">
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}><PeopleIcon /></Avatar>
                                <Box>
                                    <Typography variant="h6" color="text.secondary">Funcionários Ativos</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{kpiData.funcionariosAtivos}</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined">
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar sx={{ bgcolor: 'error.main', width: 56, height: 56 }}><AttachMoneyIcon /></Avatar>
                                <Box>
                                    <Typography variant="h6" color="text.secondary">Total Despesas (Mês)</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        {kpiData.totalDespesasMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card variant="outlined">
                        <CardContent>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}><WarningIcon /></Avatar>
                                <Box>
                                    <Typography variant="h6" color="text.secondary">Pagamentos Pendentes</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{kpiData.pagamentosPendentes}</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            {/* --- Seção de Gráficos --- */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: '400px' }}>
                        <Typography variant="h6" gutterBottom>Despesas por Categoria</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={despesasPorCategoria}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {despesasPorCategoria.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                     <Paper sx={{ p: 2, height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="text.secondary">(Aqui entrará outro gráfico, como Custo da Folha de Pagamento nos últimos meses)</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage;