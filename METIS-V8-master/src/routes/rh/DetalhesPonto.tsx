import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Avatar, Breadcrumbs, Link, Chip, Card, CardContent, Stack, Dialog, DialogTitle, DialogContent, Skeleton, Tooltip } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, timelineOppositeContentClasses } from '@mui/lab';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useState, useEffect } from 'react';

// Interfaces e dados...
const mockDetalhesDoPonto = {
    id: 1,
    colaborador: { id: 1, nome: 'Ana Silva', cargo: 'Desenvolvedora Frontend', fotoPerfilUrl: 'https://i.pravatar.cc/150?u=ana', pontuacaoTotal: 1250, tendenciaPontuacao: "+25 pts na semana" },
    data: '2025-09-09',
    registros: [
        { tipo: 'Entrada', hora: '08:55:12', status: 'Pontual', fotoUrl: 'https://i.pravatar.cc/400?u=ponto_ana_entrada', localizacao: 'Escritório Principal' },
        { tipo: 'Início Almoço', hora: '12:30:05', status: '', fotoUrl: '', localizacao: '' },
        { tipo: 'Fim Almoço', hora: '13:30:50', status: '', fotoUrl: '', localizacao: '' },
        { tipo: 'Saída', hora: '18:05:20', status: 'Hora Extra', fotoUrl: 'https://i.pravatar.cc/400?u=ponto_ana_saida', localizacao: 'Escritório Principal' },
    ],
    statusGeral: 'Fechado', horasTrabalhadas: '8h 10m', horasExtras: '0h 10m',
    produtividade: { pontuacaoGeral: 'A+', analiseFoco: { produtivo: 85 }, tarefasConcluidas: 8 }
};

const DonutChart = ({ value, color }: { value: number, color: string }) => { const r = 40, c = 2 * Math.PI * r; return ( <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}> <svg width="100" height="100" viewBox="0 0 100 100"> <circle cx="50" cy="50" r={r} fill="transparent" stroke="#e0e0e0" strokeWidth="10" /> <circle cx="50" cy="50" r={r} fill="transparent" stroke={color} strokeWidth="10" strokeDasharray={c} strokeDashoffset={c - (value / 100) * c} strokeLinecap="round" transform="rotate(-90 50 50)" /> </svg> <Box sx={{ position: 'absolute' }}><Typography variant="h6">{`${value}%`}</Typography></Box> </Box> ); };
const PageSkeleton = () => ( <Box> <Typography variant="h4" width="40%"><Skeleton /></Typography> <Typography variant="body1" width="30%"><Skeleton /></Typography> <Grid container spacing={3} sx={{mt: 2}}> <Grid xs={12} md={6}><Skeleton variant="rectangular" height={400} /></Grid> <Grid xs={12} md={6}><Skeleton variant="rectangular" height={400} /></Grid> </Grid> </Box> );

const DetalhesPontoPage = () => {
    const { registroId } = useParams();
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [selectedRegistro, setSelectedRegistro] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { const timer = setTimeout(() => setIsLoading(false), 1500); return () => clearTimeout(timer); }, []);

    const handleOpenDetails = (registro: any) => { if(registro.fotoUrl) { setSelectedRegistro(registro); setOpenDetailModal(true); } };
    const handleCloseDetails = () => setOpenDetailModal(false);
    const getIcon = (t: string) => t === 'Entrada' ? <LoginIcon /> : t === 'Saída' ? <LogoutIcon /> : <RestaurantIcon />;
    const getProdutividadeColor = (prod: number) : "success" | "warning" | "error" => prod >= 80 ? "success" : prod >= 60 ? "warning" : "error";
    const getPontuacaoColor = (pont: string) : "success" | "primary" | "warning" | "error" => pont.startsWith('A') ? "success" : pont.startsWith('B') ? "primary" : pont.startsWith('C') ? "warning" : "error";
    const produtividadeColor = getProdutividadeColor(mockDetalhesDoPonto.produtividade.analiseFoco.produtivo);
    const pontuacaoColor = getPontuacaoColor(mockDetalhesDoPonto.produtividade.pontuacaoGeral);

    if (isLoading) return <PageSkeleton />;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                     <Avatar alt={mockDetalhesDoPonto.colaborador.nome} src={mockDetalhesDoPonto.colaborador.fotoPerfilUrl} sx={{ width: 56, height: 56 }} />
                     <Box>
                        <Typography variant="h4">{mockDetalhesDoPonto.colaborador.nome}</Typography>
                        <Breadcrumbs separator="•" sx={{ mb: 1 }}>
                            <Link component={RouterLink} underline="hover" color="inherit" to="/admin/rh/ponto">Controle de Ponto</Link>
                            <Typography color="text.primary">Detalhes #{registroId}</Typography>
                        </Breadcrumbs>
                     </Box>
                </Box>
                <Card variant="outlined">
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                         <Typography variant="subtitle2" color="text.secondary">PONTUAÇÃO GERAL</Typography>
                         {/* --- CORREÇÃO AQUI: Tag <Box> trocada por <Stack> para corresponder ao fechamento </Stack> --- */}
                         <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{mockDetalhesDoPonto.colaborador.pontuacaoTotal}</Typography>
                            <Chip 
                                icon={<ArrowUpwardIcon />} 
                                label={mockDetalhesDoPonto.colaborador.tendenciaPontuacao} 
                                color="success"
                                size="small"
                                variant="outlined"
                            />
                        </Stack>
                    </CardContent>
                </Card>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>Linha do Tempo</Typography>
                        <Timeline sx={{ [`& .${timelineOppositeContentClasses.root}`]: { flex: 0.2 } }}>
                            {mockDetalhesDoPonto.registros.map((reg, i) => (
                                <TimelineItem key={i}>
                                    <TimelineContent sx={{ color: 'text.secondary' }}>{reg.hora}</TimelineContent>
                                    <TimelineSeparator>
                                        <TimelineDot color={reg.tipo === 'Entrada' ? 'success' : reg.tipo === 'Saída' ? 'error' : 'grey'}>{getIcon(reg.tipo)}</TimelineDot>
                                        {i < mockDetalhesDoPonto.registros.length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <Tooltip title={reg.fotoUrl ? `Clique para ver detalhes de ${reg.tipo}` : ''} placement="top">
                                        <TimelineContent sx={{ py: '12px', px: 2, cursor: reg.fotoUrl ? 'pointer' : 'default', '&:hover': { bgcolor: reg.fotoUrl ? 'action.hover' : 'transparent', borderRadius: 1 } }} onClick={() => handleOpenDetails(reg)}>
                                            <Typography variant="h6" component="span">{reg.tipo}</Typography>
                                            {reg.status && <Chip label={reg.status} size="small" variant="outlined" color={reg.status === 'Hora Extra' ? 'warning' : 'success'} sx={{ ml: 1 }}/>}
                                        </TimelineContent>
                                    </Tooltip>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Resumo do Ponto</Typography>
                            <Stack spacing={1}><Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography>Status:</Typography><Chip label={mockDetalhesDoPonto.statusGeral} color="success" /></Box><Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography>Horas Trabalhadas:</Typography><Typography sx={{fontWeight: 'bold'}}>{mockDetalhesDoPonto.horasTrabalhadas}</Typography></Box><Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography>Horas Extras:</Typography><Typography sx={{fontWeight: 'bold'}}>{mockDetalhesDoPonto.horasExtras}</Typography></Box></Stack>
                        </Paper>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Análise de Produtividade (IA)</Typography>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={5} sx={{ textAlign: 'center' }}>
                                    <Typography variant="subtitle1" color="text.secondary">Foco</Typography>
                                    <Tooltip title={`Tempo produtivo: ${mockDetalhesDoPonto.produtividade.analiseFoco.produtivo}%`}><Box><DonutChart value={mockDetalhesDoPonto.produtividade.analiseFoco.produtivo} color={produtividadeColor === 'success' ? '#4caf50' : produtividadeColor === 'warning' ? '#ff9800' : '#f44336'} /></Box></Tooltip>
                                </Grid>
                                <Grid item xs={7}>
                                    <Stack spacing={2}>
                                        <Card variant="outlined"><CardContent><Stack direction="row" spacing={1} alignItems="center"><TrendingUpIcon color={pontuacaoColor}/><Typography>Pontuação:</Typography><Chip label={mockDetalhesDoPonto.produtividade.pontuacaoGeral} color={pontuacaoColor} sx={{fontWeight: 'bold'}}/></Stack></CardContent></Card>
                                        <Card variant="outlined"><CardContent><Stack direction="row" spacing={1} alignItems="center"><TaskAltIcon color="success"/><Typography>Tarefas:</Typography><Typography sx={{fontWeight: 'bold'}}>{mockDetalhesDoPonto.produtividade.tarefasConcluidas}</Typography></Stack></CardContent></Card>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
            <Dialog open={openDetailModal} onClose={handleCloseDetails}>
                <DialogTitle>Detalhes: {selectedRegistro?.tipo}</DialogTitle>
                <DialogContent>
                    {selectedRegistro?.fotoUrl && <Box component="img" sx={{ width: '100%', borderRadius: '8px', mb: 2 }} alt={`Foto de ${selectedRegistro?.tipo}`} src={selectedRegistro.fotoUrl} />}
                    <Typography variant="h6">Horário: {selectedRegistro?.hora}</Typography>
                    <Typography color="text.secondary">Localização: {selectedRegistro?.localizacao}</Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default DetalhesPontoPage;