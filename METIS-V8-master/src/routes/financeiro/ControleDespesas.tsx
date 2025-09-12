import React, { useState } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
    Button, Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl,
    InputLabel, Select, MenuItem, DialogContentText, SelectChangeEvent
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from '@mui/icons-material/Category';

interface Despesa { id: number; descricao: string; categoria: string; data: string; valor: number; status: 'Pendente' | 'Paga'; }
const dadosIniciais: Despesa[] = [
    { id: 1, descricao: 'Compra de matéria-prima (caixas)', categoria: 'Suprimentos', data: '2025-09-08', valor: 1250.75, status: 'Paga' },
    { id: 2, descricao: 'Pagamento de fornecedor (Gráfica de Rótulos)', categoria: 'Fornecedores', data: '2025-09-05', valor: 850.00, status: 'Paga' },
    { id: 3, descricao: 'Conta de Energia Elétrica', categoria: 'Utilities', data: '2025-09-10', valor: 2300.50, status: 'Pendente' },
    { id: 4, descricao: 'Aluguel do galpão', categoria: 'Fixo', data: '2025-09-05', valor: 5500.00, status: 'Paga' },
];
const initialStateForm = { id: 0, descricao: '', categoria: 'Outros', data: new Date().toISOString().split('T')[0], valor: 0, status: 'Pendente' as 'Pendente' | 'Paga' };

const ControleDespesasPage = () => {
    const [despesas, setDespesas] = useState<Despesa[]>(dadosIniciais);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState<Despesa>(initialStateForm);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [despesaParaDeletar, setDespesaParaDeletar] = useState<Despesa | null>(null);

    const totalDespesasMes = despesas.reduce((acc, item) => acc + item.valor, 0);
    const despesasPagas = despesas.filter(d => d.status === 'Paga').reduce((acc, item) => acc + item.valor, 0);
    const despesasPendentes = totalDespesasMes - despesasPagas;

    const handleOpenAdd = () => { setFormData(initialStateForm); setOpenModal(true); };
    const handleOpenEdit = (despesa: Despesa) => { setFormData(despesa); setOpenModal(true); };
    const handleCloseModal = () => setOpenModal(false);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => { const { name, value } = event.target; setFormData({ ...formData, [name as string]: value }); };

    const handleSubmit = () => { if (formData.id) { setDespesas(lista => lista.map(d => d.id === formData.id ? formData : d)); } else { setDespesas(lista => [...lista, { ...formData, id: Date.now() }]); } handleCloseModal(); };
    const handleOpenDelete = (despesa: Despesa) => { setDespesaParaDeletar(despesa); setOpenDeleteConfirm(true); };
    const handleCloseDelete = () => { setDespesaParaDeletar(null); setOpenDeleteConfirm(false); };
    const handleConfirmDelete = () => { if(despesaParaDeletar) { setDespesas(lista => lista.filter(d => d.id !== despesaParaDeletar.id)); } handleCloseDelete(); };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box><Typography variant="h4" component="h1">Controle de Despesas</Typography><Typography color="text.secondary">Período: Setembro/2025</Typography></Box>
                <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={handleOpenAdd}>Adicionar Despesa</Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 300px' }}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">Total no Mês</Typography><Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>{totalDespesasMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Box>
                <Box sx={{ flex: '1 1 300px' }}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">Pagas</Typography><Typography variant="h4" color="success.main" sx={{ mt: 1, fontWeight: 'bold' }}>{despesasPagas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Box>
                <Box sx={{ flex: '1 1 300px' }}><Paper sx={{ p: 2, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">Pendentes</Typography><Typography variant="h4" color="warning.main" sx={{ mt: 1, fontWeight: 'bold' }}>{despesasPendentes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography></Paper></Box>
            </Box>
            <Paper>
                <TableContainer><Table><TableHead><TableRow><TableCell>Descrição</TableCell><TableCell>Categoria</TableCell><TableCell>Data</TableCell><TableCell align="right">Valor</TableCell><TableCell align="center">Status</TableCell><TableCell align="center">Ações</TableCell></TableRow></TableHead>
                    <TableBody>
                        {despesas.map((item) => (<TableRow hover key={item.id}><TableCell>{item.descricao}</TableCell><TableCell><Chip icon={<CategoryIcon />} label={item.categoria} size="small" variant="outlined" /></TableCell><TableCell>{new Date(item.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell><TableCell align="center"><Chip label={item.status} color={item.status === 'Paga' ? 'success' : 'warning'} size="small" /></TableCell><TableCell align="center"><Tooltip title="Editar"><IconButton size="small" color="primary" onClick={() => handleOpenEdit(item)}><EditIcon /></IconButton></Tooltip><Tooltip title="Excluir"><IconButton size="small" color="error" onClick={() => handleOpenDelete(item)}><DeleteIcon /></IconButton></Tooltip></TableCell></TableRow>))}
                    </TableBody>
                </Table></TableContainer>
            </Paper>
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{formData.id ? 'Editar Despesa' : 'Adicionar Despesa'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" name="descricao" label="Descrição" type="text" fullWidth variant="outlined" value={formData.descricao} onChange={handleInputChange} />
                    <FormControl fullWidth margin="dense"><InputLabel>Categoria</InputLabel><Select name="categoria" value={formData.categoria} label="Categoria" onChange={(event) => handleInputChange(event as SelectChangeEvent<string>)}><MenuItem value="Suprimentos">Suprimentos</MenuItem><MenuItem value="Fornecedores">Fornecedores</MenuItem><MenuItem value="Utilities">Utilities</MenuItem><MenuItem value="Fixo">Fixo</MenuItem><MenuItem value="Outros">Outros</MenuItem></Select></FormControl>

                    <TextField margin="dense" name="data" label="Data" type="date" fullWidth variant="outlined" value={formData.data} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                    <TextField margin="dense" name="valor" label="Valor" type="number" fullWidth variant="outlined" value={formData.valor} onChange={handleInputChange} />
                    <FormControl fullWidth margin="dense"><InputLabel>Status</InputLabel><Select name="status" value={formData.status} label="Status" onChange={(event) => handleInputChange(event as SelectChangeEvent<string>)}><MenuItem value="Pendente">Pendente</MenuItem><MenuItem value="Paga">Paga</MenuItem></Select></FormControl>

                </DialogContent>
                <DialogActions><Button onClick={handleCloseModal}>Cancelar</Button><Button onClick={handleSubmit} variant="contained">Salvar</Button></DialogActions>
            </Dialog>
            <Dialog open={openDeleteConfirm} onClose={handleCloseDelete}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent><DialogContentText>Excluir a despesa **{despesaParaDeletar?.descricao}**?</DialogContentText></DialogContent>
                <DialogActions><Button onClick={handleCloseDelete}>Cancelar</Button><Button onClick={handleConfirmDelete} color="error" variant="contained">Excluir</Button></DialogActions>
            </Dialog>
        </Box>
    );
};
export default ControleDespesasPage;
