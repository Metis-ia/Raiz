import { useState } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
    Button, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider,
    Stack
} from '@mui/material';
import Grid from '@mui/material/Grid'; // <-- CORREÇÃO APLICADA AQUI

import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PrintIcon from '@mui/icons-material/Print';

interface LinhaFolhaPagamento { id: number; colaboradorId: number; nome: string; cargo: string; salarioBase: number; beneficios: number; descontos: number; salarioLiquido: number; status: 'Pendente' | 'Pago'; }
const mockFolhaPagamento: LinhaFolhaPagamento[] = [
    { id: 1, colaboradorId: 1, nome: 'Ana Silva', cargo: 'Desenvolvedora Frontend', salarioBase: 7500.00, beneficios: 850.00, descontos: 982.50, salarioLiquido: 7367.50, status: 'Pendente' },
    { id: 2, colaboradorId: 2, nome: 'Bruno Costa', cargo: 'Designer UX/UI', salarioBase: 6800.00, beneficios: 850.00, descontos: 856.00, salarioLiquido: 6794.00, status: 'Pendente' },
];

const getContrachequeDetalhado = (colaborador: LinhaFolhaPagamento | null) => {
    if (!colaborador) return null;
    const inss = colaborador.salarioBase * 0.12;
    const fgtsMes = colaborador.salarioBase * 0.08;
    const vencimentos = [ { cod: '101', desc: 'Salário Base', ref: '220:00', valor: colaborador.salarioBase }, { cod: '150', desc: 'Benefícios (Voucher)', ref: '30,00', valor: colaborador.beneficios }, ];
    const descontos = [ { cod: '201', desc: 'INSS sobre Salário', ref: '12,00%', valor: inss }, { cod: '205', desc: 'Adiantamento Salarial', ref: '', valor: colaborador.descontos - inss }, ];
    const totalVencimentos = vencimentos.reduce((acc, item) => acc + item.valor, 0);
    const totalDescontos = descontos.reduce((acc, item) => acc + item.valor, 0);
    const liquidoReceber = totalVencimentos - totalDescontos;
    return { ...colaborador, vencimentos, descontos, totalVencimentos, totalDescontos, liquidoReceber, baseINSS: colaborador.salarioBase, baseFGTS: colaborador.salarioBase, fgtsMes, baseIRRF: totalVencimentos - inss, };
};

const FolhaDePagamentoPage = () => {
    const [folha, setFolha] = useState<LinhaFolhaPagamento[]>(mockFolhaPagamento);
    const [openContracheque, setOpenContracheque] = useState(false);
    const [contrachequeData, setContrachequeData] = useState<any | null>(null);
    const [openProcessarModal, setOpenProcessarModal] = useState(false);
    const [senha, setSenha] = useState('');
    const [errorSenha, setErrorSenha] = useState('');

    const totalAPagar = folha.reduce((acc, item) => item.status === 'Pendente' ? acc + item.salarioLiquido : acc, 0);
    const totalSalarios = folha.reduce((acc, item) => acc + item.salarioBase, 0);
    const totalBeneficios = folha.reduce((acc, item) => acc + item.beneficios, 0);

    const handleOpenContracheque = (colaborador: LinhaFolhaPagamento) => { setContrachequeData(getContrachequeDetalhado(colaborador)); setOpenContracheque(true); };
    const handleCloseContracheque = () => setOpenContracheque(false);
    const handleActionContracheque = (action: string) => alert(`${action} para ${contrachequeData?.nome}`);
    const handleOpenProcessar = () => setOpenProcessarModal(true);
    const handleCloseProcessar = () => { setOpenProcessarModal(false); setSenha(''); setErrorSenha(''); };
    const handleConfirmarPagamento = () => {
        if (senha === "1234") {
            setFolha(folhaAtual => folhaAtual.map(item => item.status === 'Pendente' ? { ...item, status: 'Pago' } : item));
            handleCloseProcessar();
        } else { setErrorSenha('Senha incorreta. Tente novamente.'); }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box><Typography variant="h4" component="h1">Folha de Pagamento</Typography><Typography color="text.secondary">Período: Setembro/2025</Typography></Box>
                <Button variant="contained" size="large" startIcon={<PaymentsIcon />} onClick={handleOpenProcessar}>Processar Pagamentos do Mês</Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 300px' }}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">Total a Pagar (Pendente)</Typography><Typography variant="h4" color="primary.main" sx={{ mt: 1, fontWeight: 'bold' }}>{totalAPagar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Box>
                <Box sx={{ flex: '1 1 300px' }}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">Total Salários (Base)</Typography><Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>{totalSalarios.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Box>
                <Box sx={{ flex: '1 1 300px' }}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">Total Benefícios</Typography><Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>{totalBeneficios.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Box>
            </Box>
            
            <Paper>
                <TableContainer><Table><TableHead><TableRow><TableCell>Colaborador</TableCell><TableCell align="right">Salário Base</TableCell><TableCell align="right">Benefícios</TableCell><TableCell align="right">Descontos</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>Salário Líquido</TableCell><TableCell align="center">Status</TableCell><TableCell align="center">Ações</TableCell></TableRow></TableHead>
                    <TableBody>
                        {folha.map((item) => (<TableRow hover key={item.id}><TableCell component="th" scope="row"><Typography variant="subtitle1">{item.nome}</Typography><Typography variant="body2" color="text.secondary">{item.cargo}</Typography></TableCell><TableCell align="right">{item.salarioBase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell><TableCell align="right">{item.beneficios.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell><TableCell align="right" sx={{ color: 'error.main' }}>{item.descontos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{item.salarioLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell><TableCell align="center"><Chip label={item.status} color={item.status === 'Pago' ? 'success' : 'warning'} size="small" /></TableCell><TableCell align="center"><Tooltip title="Gerar Contracheque"><Button variant="outlined" size="small" onClick={() => handleOpenContracheque(item)}><ReceiptLongIcon /></Button></Tooltip></TableCell></TableRow>))}
                    </TableBody>
                </Table></TableContainer>
            </Paper>

            <Dialog open={openContracheque} onClose={handleCloseContracheque} maxWidth="md" fullWidth>
                <DialogTitle>Demonstrativo de Pagamento</DialogTitle>
                <DialogContent>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}><Box sx={{ flex: 2 }}><Typography variant="h6">Sua Empresa LTDA</Typography><Typography variant="body2">CNPJ: 00.000.000/0001-00</Typography></Box><Box sx={{ flex: 1, textAlign: 'right' }}><Typography variant="body1">Recibo de Pagamento de Salário</Typography><Typography variant="body2">Período: Setembro/2025</Typography></Box></Box>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}><Grid item xs={8}><Typography><strong>Funcionário:</strong> {contrachequeData?.nome}</Typography></Grid><Grid item xs={4}><Typography><strong>Função:</strong> {contrachequeData?.cargo}</Typography></Grid></Grid>
                        <TableContainer component={Paper} variant="outlined" sx={{ my: 2 }}>
                            <Table size="small"><TableHead><TableRow sx={{ bgcolor: 'action.hover' }}><TableCell>Código</TableCell><TableCell>Descrição</TableCell><TableCell>Referência</TableCell><TableCell align="right">Proventos</TableCell><TableCell align="right">Descontos</TableCell></TableRow></TableHead>
                                <TableBody>
                                    {contrachequeData?.vencimentos.map((item: any) => (<TableRow key={item.cod}><TableCell>{item.cod}</TableCell><TableCell>{item.desc}</TableCell><TableCell>{item.ref}</TableCell><TableCell align="right">{item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell><TableCell></TableCell></TableRow>))}
                                    {contrachequeData?.descontos.map((item: any) => (<TableRow key={item.cod}><TableCell>{item.cod}</TableCell><TableCell>{item.desc}</TableCell><TableCell>{item.ref}</TableCell><TableCell></TableCell><TableCell align="right">{item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell></TableRow>))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <Grid container spacing={1}>
                                    <Grid item xs={4}><Paper variant="outlined" sx={{ p: 1 }}><Typography variant="caption">Salário Base</Typography><Typography>{contrachequeData?.salarioBase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Grid>
                                    <Grid item xs={4}><Paper variant="outlined" sx={{ p: 1 }}><Typography variant="caption">Base Cálc. INSS</Typography><Typography>{contrachequeData?.baseINSS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Grid>
                                    <Grid item xs={4}><Paper variant="outlined" sx={{ p: 1 }}><Typography variant="caption">Base Cálc. FGTS</Typography><Typography>{contrachequeData?.baseFGTS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Grid>
                                    <Grid item xs={4}><Paper variant="outlined" sx={{ p: 1 }}><Typography variant="caption">FGTS do Mês</Typography><Typography>{contrachequeData?.fgtsMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Grid>
                                    <Grid item xs={4}><Paper variant="outlined" sx={{ p: 1 }}><Typography variant="caption">Base Cálc. IRRF</Typography><Typography>{contrachequeData?.baseIRRF.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack spacing={1}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2">Total Vencimentos:</Typography><Typography variant="body2">{contrachequeData?.totalVencimentos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography variant="body2">Total Descontos:</Typography><Typography variant="body2">{contrachequeData?.totalDescontos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography sx={{fontWeight: 'bold'}}>Líquido a Receber:</Typography><Typography sx={{fontWeight: 'bold'}}>{contrachequeData?.liquidoReceber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Box>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 4, textAlign: 'center' }}><Typography>_________________________________________</Typography><Typography>Assinatura do Empregado</Typography></Box>
                    </Paper>
                </DialogContent>
                <DialogActions sx={{ p: 2, justifyContent: 'center', gap: 2 }}>
                    <Button variant="contained" startIcon={<EmailIcon />} onClick={() => handleActionContracheque('Enviando por Email')}>Enviar por Email</Button>
                    <Button variant="contained" color="success" startIcon={<WhatsAppIcon />} onClick={() => handleActionContracheque('Enviando por WhatsApp')}>WhatsApp</Button>
                    <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => handleActionContracheque('Imprimindo')}>Imprimir</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openProcessarModal} onClose={handleCloseProcessar}>
                <DialogTitle>Processar Pagamentos</DialogTitle>
                <DialogContent><Typography gutterBottom>Para confirmar o pagamento, insira sua senha de segurança.</Typography><TextField autoFocus margin="dense" label="Senha" type="password" fullWidth variant="outlined" value={senha} onChange={(e) => setSenha(e.target.value)} error={!!errorSenha} helperText={errorSenha} /></DialogContent>
                <DialogActions><Button onClick={handleCloseProcessar}>Cancelar</Button><Button onClick={handleConfirmarPagamento} variant="contained">Confirmar Pagamento</Button></DialogActions>
            </Dialog>
        </Box>
    );
};

export default FolhaDePagamentoPage;