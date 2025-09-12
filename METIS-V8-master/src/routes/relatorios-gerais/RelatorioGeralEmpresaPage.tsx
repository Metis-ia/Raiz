import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockReceitaDespesa = [
    { mes: 'Jan', receita: 50000, despesa: 35000 },
    { mes: 'Fev', receita: 55000, despesa: 38000 },
    { mes: 'Mar', receita: 48000, despesa: 40000 },
    { mes: 'Abr', receita: 62000, despesa: 45000 },
    { mes: 'Mai', receita: 65000, despesa: 42000 },
    { mes: 'Jun', receita: 70000, despesa: 48000 },
];

const mockVendasPorDepartamento = [
    { departamento: 'Vendas', valor: 25000 },
    { departamento: 'Consultoria', valor: 15000 },
    { departamento: 'Serviços', valor: 10000 },
];

const RelatorioGeralEmpresaPage = () => {
    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Relatório Geral da Empresa
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Uma visão consolidada do desempenho financeiro e operacional da empresa.
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: '400px' }}>
                        <Typography variant="h6" gutterBottom>Receita vs. Despesa (Últimos 6 Meses)</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockReceitaDespesa} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="receita" stroke="#82ca9d" name="Receita" />
                                <Line type="monotone" dataKey="despesa" stroke="#f44336" name="Despesa" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: '400px' }}>
                        <Typography variant="h6" gutterBottom>Resumo de Vendas por Departamento</Typography>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Departamento</TableCell>
                                        <TableCell align="right">Valor de Vendas</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mockVendasPorDepartamento.map((venda, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{venda.departamento}</TableCell>
                                            <TableCell align="right">
                                                {venda.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip label="Meta Atingida" color="success" size="small" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RelatorioGeralEmpresaPage;