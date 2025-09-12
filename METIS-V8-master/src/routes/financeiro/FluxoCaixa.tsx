import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const mockFluxoMensal = [ { mes: 'Maio', receita: 40000, despesa: 29000 }, { mes: 'Junho', receita: 35000, despesa: 25000 }, { mes: 'Julho', receita: 52000, despesa: 38000 }, { mes: 'Agosto', receita: 48000, despesa: 31000 }, { mes: 'Setembro', receita: 55000, despesa: 34000 }, ];
const mockTransacoesRecentes = [ { id: 1, tipo: 'receita', descricao: 'Pagamento Cliente X', valor: 15000 }, { id: 2, tipo: 'despesa', descricao: 'Folha de Pagamento', valor: 8100 }, { id: 3, tipo: 'despesa', descricao: 'Aluguel do galpão', valor: 5500 }, { id: 4, tipo: 'receita', descricao: 'Pagamento Cliente Y', valor: 7500 }, { id: 5, tipo: 'despesa', descricao: 'Conta de Energia', valor: 2300.50 }, ];

const FluxoCaixaPage = () => {
    const receitaMesAtual = mockFluxoMensal.find(m => m.mes === 'Setembro')?.receita || 0;
    const despesaMesAtual = mockFluxoMensal.find(m => m.mes === 'Setembro')?.despesa || 0;
    const saldoMesAtual = receitaMesAtual - despesaMesAtual;

    return (
        <Box>
            <Box sx={{ mb: 3 }}><Typography variant="h4" component="h1">Fluxo de Caixa</Typography><Typography color="text.secondary">Análise de receitas e despesas</Typography></Box>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">Receita Total (Mês)</Typography><Typography variant="h4" color="success.main" sx={{ mt: 1, fontWeight: 'bold' }}>{receitaMesAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Grid>
                <Grid item xs={12} md={4}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">Despesa Total (Mês)</Typography><Typography variant="h4" color="error.main" sx={{ mt: 1, fontWeight: 'bold' }}>{despesaMesAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Grid>
                <Grid item xs={12} md={4}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">Saldo (Lucro/Prejuízo)</Typography><Typography variant="h4" color={saldoMesAtual >= 0 ? 'primary.main' : 'error.main'} sx={{ mt: 1, fontWeight: 'bold' }}>{saldoMesAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Grid>
            </Grid>
            <Paper sx={{ p: 2, height: '400px', mb: 4 }}>
                <Typography variant="h6" gutterBottom>Receitas vs. Despesas (Últimos 5 meses)</Typography>
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={mockFluxoMensal}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="mes" /><YAxis tickFormatter={(value) => `R$${value/1000}k`} /><Tooltip formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/><Legend /><Bar dataKey="receita" name="Receita" fill="#4caf50" /><Bar dataKey="despesa" name="Despesa" fill="#f44336" /></BarChart>
                </ResponsiveContainer>
            </Paper>
            <Paper>
                <Typography variant="h6" sx={{ p: 2 }}>Transações Recentes</Typography>
                <TableContainer><Table><TableHead><TableRow><TableCell>Descrição</TableCell><TableCell align="center">Tipo</TableCell><TableCell align="right">Valor</TableCell></TableRow></TableHead>
                    <TableBody>
                        {mockTransacoesRecentes.map((item) => (<TableRow hover key={item.id}><TableCell>{item.descricao}</TableCell><TableCell align="center"><Chip icon={item.tipo === 'receita' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} label={item.tipo} color={item.tipo === 'receita' ? 'success' : 'error'} size="small" variant="outlined" /></TableCell><TableCell align="right" sx={{ fontWeight: 'bold', color: item.tipo === 'receita' ? 'success.main' : 'error.main' }}>{item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell></TableRow>))}
                    </TableBody>
                </Table></TableContainer>
            </Paper>
        </Box>
    );
};
export default FluxoCaixaPage;