import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
    Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem,
    Link // <-- Importe também o Link do MUI
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Interface atualizada com novos campos
interface Colaborador {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    redeSocial: string;
    cargo: string;
    status: 'ativo' | 'inativo';
}

const dadosIniciais: Colaborador[] = [
    { id: 1, nome: 'Ana Silva', email: 'ana.silva@empresa.com', telefone: '(11) 98765-4321', redeSocial: 'linkedin.com/in/ana', cargo: 'Desenvolvedora Frontend', status: 'ativo' },
    { id: 2, nome: 'Bruno Costa', email: 'bruno.costa@empresa.com', telefone: '(21) 91234-5678', redeSocial: '', cargo: 'Designer UX/UI', status: 'ativo' },
];

// Estado inicial do formulário atualizado
const initialStateForm = {
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    redeSocial: '',
    cargo: '',
    status: 'ativo' as 'ativo' | 'inativo'
};

const ColaboradoresPage = () => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>(dadosIniciais);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [formData, setFormData] = useState<Colaborador>(initialStateForm);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [colaboradorParaDeletar, setColaboradorParaDeletar] = useState<Colaborador | null>(null);

  const handleOpenAdd = () => { setFormData(initialStateForm); setOpenAddEditModal(true); };
  const handleOpenEdit = (colaborador: Colaborador) => { setFormData(colaborador); setOpenAddEditModal(true); };
  const handleCloseAddEdit = () => setOpenAddEditModal(false);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = () => {
    if (formData.id) {
        setColaboradores(lista => lista.map(c => c.id === formData.id ? formData : c));
    } else {
        setColaboradores(lista => [ ...lista, { ...formData, id: Date.now() } ]);
    }
    handleCloseAddEdit();
  };

  const handleOpenDelete = (colaborador: Colaborador) => { setColaboradorParaDeletar(colaborador); setOpenDeleteConfirm(true); };
  const handleCloseDelete = () => { setColaboradorParaDeletar(null); setOpenDeleteConfirm(false); };
  const handleConfirmDelete = () => { if (colaboradorParaDeletar) { setColaboradores(lista => lista.filter(c => c.id !== colaboradorParaDeletar.id)); } handleCloseDelete(); };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1"> Colaboradores </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}> Adicionar Colaborador </Button>
      </Box>
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {colaboradores.map((colaborador) => (
                <TableRow hover key={colaborador.id}>
                  <TableCell>
                    <Link 
                        component={RouterLink} 
                        to={`/admin/rh/colaboradores/${colaborador.id}`} 
                        underline="hover"
                        sx={{ fontWeight: 'bold' }}
                    >
                        {colaborador.nome}
                    </Link>
                  </TableCell>
                  <TableCell>{colaborador.email}</TableCell>
                  <TableCell>{colaborador.telefone}</TableCell>
                  <TableCell>{colaborador.cargo}</TableCell>
                  <TableCell><Chip label={colaborador.status} color={colaborador.status === 'ativo' ? 'success' : 'default'} size="small" /></TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="editar" size="small" color="primary" onClick={() => handleOpenEdit(colaborador)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton aria-label="deletar" size="small" color="error" onClick={() => handleOpenDelete(colaborador)}><DeleteIcon fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openAddEditModal} onClose={handleCloseAddEdit}>
        <DialogTitle>{formData.id ? 'Editar Colaborador' : 'Adicionar Novo Colaborador'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}> Preencha os dados abaixo. </DialogContentText>
          <TextField autoFocus margin="dense" name="nome" label="Nome Completo" type="text" fullWidth variant="outlined" value={formData.nome} onChange={handleInputChange} />
          <TextField margin="dense" name="email" label="Email" type="email" fullWidth variant="outlined" value={formData.email} onChange={handleInputChange} />
          <TextField margin="dense" name="telefone" label="Telefone / WhatsApp" type="tel" fullWidth variant="outlined" value={formData.telefone} onChange={handleInputChange} />
          <TextField margin="dense" name="redeSocial" label="Rede Social (Ex: LinkedIn)" type="text" fullWidth variant="outlined" value={formData.redeSocial} onChange={handleInputChange} />
          <TextField margin="dense" name="cargo" label="Cargo" type="text" fullWidth variant="outlined" value={formData.cargo} onChange={handleInputChange} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={formData.status} label="Status" onChange={handleInputChange as any} >
              <MenuItem value="ativo">Ativo</MenuItem>
              <MenuItem value="inativo">Inativo</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddEdit}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteConfirm} onClose={handleCloseDelete}>
        <DialogTitle> Confirmar Exclusão </DialogTitle>
        <DialogContent><DialogContentText> Tem certeza que deseja excluir o colaborador **{colaboradorParaDeletar?.nome}**? </DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus> Excluir </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ColaboradoresPage;