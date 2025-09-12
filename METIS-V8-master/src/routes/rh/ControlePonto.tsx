import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
    Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
    Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField,
    FormControl, InputLabel, Select, MenuItem, Link
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Interfaces e dados...
interface Colaborador { id: number; nome: string; }
const mockColaboradores: Colaborador[] = [
    { id: 1, nome: 'Ana Silva' }, { id: 2, nome: 'Bruno Costa' }, { id: 3, nome: 'Carlos Pereira' },
    { id: 4, nome: 'Daniela Souza' }, { id: 5, nome: 'Eduardo Lima' },
];

interface RegistroPonto {
    id: number; colaboradorId: number; colaboradorNome: string; data: string;
    entrada: string; saida: string | null; status: 'Presente' | 'Atrasado' | 'Falta';
}
const dadosIniciaisPonto: RegistroPonto[] = [
    { id: 1, colaboradorId: 1, colaboradorNome: 'Ana Silva', data: '2025-09-09', entrada: '08:55', saida: '17:30', status: 'Presente' },
    { id: 2, colaboradorId: 2, colaboradorNome: 'Bruno Costa', data: '2025-09-09', entrada: '09:15', saida: '18:05', status: 'Atrasado' },
    { id: 4, colaboradorId: 4, colaboradorNome: 'Daniela Souza', data: '2025-09-09', entrada: '09:01', saida: null, status: 'Presente' },
    { id: 5, colaboradorId: 5, colaboradorNome: 'Eduardo Lima', data: '2025-09-09', entrada: '08:58', saida: '17:35', status: 'Presente' },
];

const initialStateForm = {
    id: 0, colaboradorId: 0, colaboradorNome: '',
    data: new Date().toISOString().split('T')[0],
    entrada: '', saida: '', status: 'Presente' as 'Presente' | 'Atrasado' | 'Falta'
};

const ControlePontoPage = () => {
    const [registros, setRegistros] = useState<RegistroPonto[]>(dadosIniciaisPonto);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState<any>(initialStateForm);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [registroParaDeletar, setRegistroParaDeletar] = useState<RegistroPonto | null>(null);

    const presentes = registros.filter(r => r.status === 'Presente' || r.status === 'Atrasado').length;
    const atrasados = registros.filter(r => r.status === 'Atrasado').length;
    
    const handleOpenAdd = () => { setFormData(initialStateForm); setOpenModal(true); };
    const handleOpenEdit = (registro: RegistroPonto) => { setFormData({ ...registro, saida: registro.saida || '' }); setOpenModal(true); };
    const handleCloseModal = () => setOpenModal(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        if (name === 'colaboradorId') {
            const selectedColaborador = mockColaboradores.find(c => c.id === value);
            setFormData({ ...formData, colaboradorId: value, colaboradorNome: selectedColaborador?.nome || '' });
        } else {
            setFormData({ ...formData, [name as string]: value });
        }
    };
    
    const handleSubmit = () => {
        if (formData.id) {
            setRegistros(lista => lista.map(r => r.id === formData.id ? { ...formData, saida: formData.saida || null } : r));
        } else {
            const novoRegistro = { ...formData, id: Date.now(), saida: formData.saida || null };
            setRegistros(lista => [...lista, novoRegistro]);
        }
        handleCloseModal();
    };

    const handleOpenDelete = (registro: RegistroPonto) => { setRegistroParaDeletar(registro); setOpenDeleteConfirm(true); };
    const handleCloseDelete = () => { setRegistroParaDeletar(null); setOpenDeleteConfirm(false); };
    const handleConfirmDelete = () => {
        if (registroParaDeletar) {
            setRegistros(lista => lista.filter(r => r.id !== registroParaDeletar.id));
        }
        handleCloseDelete();
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom> Controle de Ponto </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}> Adicionar Registro </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 300px' }}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" color="text.secondary">Presentes</Typography>
                        <Typography variant="h4" component="p" sx={{ mt: 1 }}>{presentes}</Typography>
                    </Paper>
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" color="text.secondary">Atrasos</Typography>
                        <Typography variant="h4" component="p" color="error" sx={{ mt: 1 }}>{atrasados}</Typography>
                    </Paper>
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" color="text.secondary">Horas Extras (Dia)</Typography>
                        <Typography variant="h4" component="p" sx={{ mt: 1 }}>0</Typography>
                    </Paper>
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" color="text.secondary">Faltas (Dia)</Typography>
                        <Typography variant="h4" component="p" sx={{ mt: 1 }}>1</Typography>
                    </Paper>
                </Box>
            </Box>

            <Typography variant="h5" component="h2" sx={{ mb: 2 }}> Registros de Hoje </Typography>
            <Paper>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead><TableRow><TableCell>Colaborador</TableCell><TableCell>Data</TableCell><TableCell>Entrada</TableCell><TableCell>Saída</TableCell><TableCell>Status</TableCell><TableCell align="right">Ações</TableCell></TableRow></TableHead>
                        <TableBody>
                            {registros.map((registro) => (
                                <TableRow hover key={registro.id}>
                                    <TableCell><Link component={RouterLink} to={`/admin/rh/ponto/${registro.id}`} underline="hover">{registro.colaboradorNome}</Link></TableCell>
                                    <TableCell>{new Date(registro.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                                    <TableCell>{registro.entrada}</TableCell>
                                    <TableCell>{registro.saida || '...'}</TableCell>
                                    <TableCell><Chip label={registro.status} color={registro.status === 'Presente' ? 'success' : 'warning'} size="small" /></TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" color="primary" onClick={() => handleOpenEdit(registro)}><EditIcon fontSize="small" /></IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleOpenDelete(registro)}><DeleteIcon fontSize="small" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{formData.id ? 'Editar Registro' : 'Adicionar Registro'}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense"><InputLabel>Colaborador</InputLabel><Select name="colaboradorId" value={formData.colaboradorId} label="Colaborador" onChange={handleInputChange as any}>{mockColaboradores.map(c => <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>)}</Select></FormControl>
                    <TextField margin="dense" name="data" label="Data" type="date" fullWidth value={formData.data} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                    <TextField margin="dense" name="entrada" label="Entrada" type="time" fullWidth value={formData.entrada} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                    <TextField margin="dense" name="saida" label="Saída" type="time" fullWidth value={formData.saida} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                    <FormControl fullWidth margin="dense"><InputLabel>Status</InputLabel><Select name="status" value={formData.status} label="Status" onChange={handleInputChange as any}><MenuItem value="Presente">Presente</MenuItem><MenuItem value="Atrasado">Atrasado</MenuItem><MenuItem value="Falta">Falta</MenuItem></Select></FormControl>
                </DialogContent>
                <DialogActions><Button onClick={handleCloseModal}>Cancelar</Button><Button onClick={handleSubmit} variant="contained">Salvar</Button></DialogActions>
            </Dialog>

            <Dialog open={openDeleteConfirm} onClose={handleCloseDelete}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent><DialogContentText>Tem certeza que deseja excluir este registro?</DialogContentText></DialogContent>
                <DialogActions><Button onClick={handleCloseDelete}>Cancelar</Button><Button onClick={handleConfirmDelete} color="error" variant="contained">Excluir</Button></DialogActions>
            </Dialog>
        </Box>
    );
};

export default ControlePontoPage;