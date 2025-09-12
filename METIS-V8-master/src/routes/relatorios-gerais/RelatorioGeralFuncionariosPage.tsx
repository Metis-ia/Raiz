import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockAttendanceData = [
    { mes: 'Jan', presentes: 28, ausentes: 2 },
    { mes: 'Fev', presentes: 29, ausentes: 1 },
    { mes: 'Mar', presentes: 25, ausentes: 5 },
    { mes: 'Abr', presentes: 27, ausentes: 3 },
    { mes: 'Mai', presentes: 30, ausentes: 0 },
    { mes: 'Jun', presentes: 26, ausentes: 4 },
];

const mockEmployeeList = [
    { id: 1, nome: 'Ana Silva', cargo: 'Desenvolvedora', faltasMes: 0, atrasosMes: 1, status: 'Presente' },
    { id: 2, nome: 'Bruno Costa', cargo: 'Designer', faltasMes: 0, atrasosMes: 0, status: 'Presente' },
    { id: 3, nome: 'Carlos Pereira', cargo: 'Gerente', faltasMes: 1, atrasosMes: 2, status: 'Ausente' },
    { id: 4, nome: 'Daniela Souza', cargo: 'Analista', faltasMes: 0, atrasosMes: 0, status: 'Presente' },
];

const RelatorioGeralFuncionariosPage = () => {
    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Relatório de Funcionários
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Acompanhe o desempenho e a frequência dos colaboradores da sua equipe.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: '400px' }}>
                        <Typography variant="h6" gutterBottom>Frequência Mensal</Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockAttendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="presentes" fill="#82ca9d" name="Presentes" />
                                <Bar dataKey="ausentes" fill="#f44336" name="Ausentes" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: '400px' }}>
                        <Typography variant="h6" gutterBottom>Resumo de Ponto por Funcionário</Typography>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Cargo</TableCell>
                                        <TableCell align="right">Faltas (Mês)</TableCell>
                                        <TableCell align="right">Atrasos (Mês)</TableCell>
                                        <TableCell align="center">Status Hoje</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mockEmployeeList.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell>{employee.nome}</TableCell>
                                            <TableCell>{employee.cargo}</TableCell>
                                            <TableCell align="right">{employee.faltasMes}</TableCell>
                                            <TableCell align="right">{employee.atrasosMes}</TableCell>
                                            <TableCell align="center">
                                                <Chip label={employee.status} color={employee.status === 'Presente' ? 'success' : 'error'} size="small" />
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

export default RelatorioGeralFuncionariosPage;