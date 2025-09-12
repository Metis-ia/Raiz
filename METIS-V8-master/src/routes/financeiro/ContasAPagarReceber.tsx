import React, { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

// Dados de exemplo para Contas a Pagar
const mockContasPagar = [
    { id: 1, descricao: 'Aluguel do Escritório', valor: 5000, vencimento: '2025-10-01', status: 'pendente' },
    { id: 2, descricao: 'Serviço de Internet', valor: 150, vencimento: '2025-09-20', status: 'pago' },
    { id: 3, descricao: 'Software de Gerenciamento', valor: 300, vencimento: '2025-09-15', status: 'pendente' },
];

// Dados de exemplo para Contas a Receber
const mockContasReceber = [
    { id: 1, descricao: 'Projeto Alpha - 1ª Parcela', valor: 15000, vencimento: '2025-09-25', status: 'pendente' },
    { id: 2, descricao: 'Consultoria Financeira', valor: 2500, vencimento: '2025-09-10', status: 'recebido' },
    { id: 3, descricao: 'Manutenção Mensal', valor: 800, vencimento: '2025-10-05', status: 'pendente' },
];

// Componente TabPanel (para as abas)
const TabPanel = (props: { children?: React.ReactNode; index: number; value: number }) => {
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const ContasAPagarReceber = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const getStatusChipColor = (status: string) => {
        switch (status) {
            case 'pago':
            case 'recebido':
                return 'success';
            case 'pendente':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <Paper sx={{ p: 3, m: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Contas a Pagar e Receber</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="abas de contas">
                    <Tab label="Contas a Pagar" />
                    <Tab label="Contas a Receber" />
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell>Vencimento</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockContasPagar.map((conta) => (
                                <TableRow key={conta.id}>
                                    <TableCell>{conta.descricao}</TableCell>
                                    <TableCell>R$ {conta.valor.toFixed(2)}</TableCell>
                                    <TableCell>{conta.vencimento}</TableCell>
                                    <TableCell>
                                        <Chip label={conta.status} color={getStatusChipColor(conta.status)} size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell>Vencimento</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockContasReceber.map((conta) => (
                                <TableRow key={conta.id}>
                                    <TableCell>{conta.descricao}</TableCell>
                                    <TableCell>R$ {conta.valor.toFixed(2)}</TableCell>
                                    <TableCell>{conta.vencimento}</TableCell>
                                    <TableCell>
                                        <Chip label={conta.status} color={getStatusChipColor(conta.status)} size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
        </Paper>
    );
};

export default ContasAPagarReceber;