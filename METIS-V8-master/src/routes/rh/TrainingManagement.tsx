import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Paper, 
    TextField, 
    Modal, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    IconButton,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Chip,
    Link as MuiLink
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'; // Ícone para vincular
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTrainingContext } from '../../contexts/TrainingContext';
import { Link } from 'react-router-dom';

// Dados de exemplo para colaboradores
const mockColaboradores = [
    { id: 1, nome: 'Ana Silva' },
    { id: 2, nome: 'João Ferreira' },
    { id: 3, nome: 'Maria Souza' },
];

const TrainingManagement = () => {
    const { trainings, createTraining, updateAssignedTo } = useTrainingContext();
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openAssignModal, setOpenAssignModal] = useState(false);
    const [trainingTitle, setTrainingTitle] = useState('');
    const [selectedTrainingId, setSelectedTrainingId] = useState<number | null>(null);
    const [assignedEmployees, setAssignedEmployees] = useState<number[]>([]);

    const handleOpenCreateModal = () => {
        setOpenCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
        setTrainingTitle('');
    };

    const handleOpenAssignModal = (trainingId: number) => {
        setSelectedTrainingId(trainingId);
        const training = trainings.find(t => t.id === trainingId);
        if (training) {
            setAssignedEmployees(training.assignedTo);
        }
        setOpenAssignModal(true);
    };

    const handleCloseAssignModal = () => {
        setOpenAssignModal(false);
        setSelectedTrainingId(null);
        setAssignedEmployees([]);
    };

    const handleCreateTraining = () => {
        if (trainingTitle.trim()) {
            createTraining(trainingTitle, []);
            handleCloseCreateModal();
        }
    };
    
    const handleSaveAssignment = () => {
        if (selectedTrainingId !== null) {
            updateAssignedTo(selectedTrainingId, assignedEmployees);
            handleCloseAssignModal();
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Gestão de Treinamentos</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateModal}
                >
                    Novo Treinamento
                </Button>
            </Box>

            <Paper sx={{ p: 2, mb: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Título do Treinamento</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Atribuído a</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trainings.map((training) => (
                                <TableRow key={training.id}>
                                    <TableCell>
                                        <MuiLink 
                                            component={Link}
                                            to={`/admin/rh/treinamento/${training.id}`}
                                            style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                                        >
                                            {training.title}
                                        </MuiLink>
                                    </TableCell>
                                    <TableCell>
                                        {training.assignedTo.length > 0 ? (
                                            training.assignedTo.map(id => mockColaboradores.find(colab => colab.id === id)?.nome).join(', ')
                                        ) : (
                                            'Nenhum funcionário atribuído'
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpenAssignModal(training.id)}>
                                            <PersonAddAlt1Icon />
                                        </IconButton>
                                        <IconButton><EditIcon /></IconButton>
                                        <IconButton><DeleteIcon color="error" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Modal de Criação de Treinamento */}
            <Modal open={openCreateModal} onClose={handleCloseCreateModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Criar Novo Treinamento
                    </Typography>
                    <TextField
                        label="Título do Treinamento"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={trainingTitle}
                        onChange={(e) => setTrainingTitle(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={handleCreateTraining}
                        fullWidth
                    >
                        Criar Treinamento
                    </Button>
                </Box>
            </Modal>
            
            {/* Modal para Vincular Funcionários */}
            <Modal open={openAssignModal} onClose={handleCloseAssignModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Vincular Funcionários ao Treinamento
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Selecionar Funcionários</InputLabel>
                        <Select
                            multiple
                            value={assignedEmployees}
                            onChange={(e) => setAssignedEmployees(e.target.value as number[])}
                            label="Selecionar Funcionários"
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={mockColaboradores.find(colab => colab.id === value)?.nome} />
                                    ))}
                                </Box>
                            )}
                        >
                            {mockColaboradores.map((colab) => (
                                <MenuItem key={colab.id} value={colab.id}>
                                    {colab.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleSaveAssignment}>
                        Salvar Vínculos
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default TrainingManagement;