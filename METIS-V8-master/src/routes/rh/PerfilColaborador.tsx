import React, { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
    Box, Typography, Paper, Grid, Avatar, Chip, Tabs, Tab,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SchoolIcon from '@mui/icons-material/School'; 

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TrainingProgress from './TrainingProgress';
import { useTrainingContext } from '../../contexts/TrainingContext';

const mockColaboradorProfile = { id: 1, nome: 'Ana Silva', cargo: 'Desenvolvedora Frontend', fotoPerfilUrl: 'https://i.pravatar.cc/150?u=ana', email: 'ana.silva@empresa.com', telefone: '(11) 98765-4321', redeSocial: 'linkedin.com/in/ana', status: 'ativo', departamento: 'Tecnologia', dataAdmissao: '2023-01-15' };
const mockHistoricoPonto = { pontualidadeMedia: 95, totalAtrasosMes: 2, totalHorasExtrasMes: '3h 45m', registrosRecentes: [ { id: 1, data: '2025-09-09', entrada: '08:55', saida: '18:05', status: 'Hora Extra' }, { id: 2, data: '2025-09-08', entrada: '09:00', saida: '18:01', status: 'Pontual' }, { id: 3, data: '2025-09-07', entrada: '09:15', saida: '18:00', status: 'Atrasado' }, { id: 4, data: '2025-09-06', entrada: '08:59', saida: '17:58', status: 'Pontual' }, ] };
const mockHistoricoDesempenho = [
    { mes: 'Maio', pontuacao: 82, foco: 75 },
    { mes: 'Junho', pontuacao: 85, foco: 80 },
    { mes: 'Julho', pontuacao: 91, foco: 88 },
    { mes: 'Agosto', pontuacao: 89, foco: 85 },
    { mes: 'Setembro', pontuacao: 95, foco: 92 },
];
const mockMetricasDesempenho = [
  { title: 'Produtividade Média', value: '92%', detail: 'Atingiu a meta', icon: <TrendingUpIcon color="success" sx={{ fontSize: 40 }}/> },
  { title: 'Tempo de Resposta', value: '4h', detail: 'Melhora de 15% neste mês', icon: <AutoStoriesIcon color="info" sx={{ fontSize: 40 }}/> },
  { title: 'Taxa de Conclusão de Tarefas', value: '98%', detail: 'Acima da média do setor', icon: <ThumbUpIcon color="primary" sx={{ fontSize: 40 }}/> },
  { title: 'Satisfação do Colaborador', value: '4.5/5', detail: 'Feedback positivo', icon: <QueryStatsIcon color="secondary" sx={{ fontSize: 40 }}/> },
];

const TabPanel = (props: { children?: React.ReactNode; index: number; value: number }) => { const { children, value, index } = props; return (<div role="tabpanel" hidden={value !== index}>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div>); };

const PerfilColaboradorPage = () => {
    const { colaboradorId } = useParams();
    const { trainings, employeeProgress } = useTrainingContext();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const collaboratorTrainings = trainings.filter(t => t.assignedTo.includes(parseInt(colaboradorId)));
    const collaboratorProgress = employeeProgress[parseInt(colaboradorId)] || [];

    return (
        <Box>
            <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar alt={mockColaboradorProfile.nome} src={mockColaboradorProfile.fotoPerfilUrl} sx={{ width: 80, height: 80 }} />
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{mockColaboradorProfile.nome}</Typography>
                    <Typography variant="h6" color="text.secondary">{mockColaboradorProfile.cargo}</Typography>
                    <Chip label={mockColaboradorProfile.status} color="success" size="small" sx={{ mt: 1 }} />
                </Box>
            </Paper>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="abas do perfil do colaborador">
                    <Tab label="Informações" icon={<ContactMailIcon />} iconPosition="start" />
                    <Tab label="Histórico de Ponto" icon={<BusinessCenterIcon />} iconPosition="start" />
                    <Tab label="Desempenho (IA)" icon={<AnalyticsIcon />} iconPosition="start" />
                    <Tab label="Treinamentos" icon={<SchoolIcon />} iconPosition="start" />
                </Tabs>
            </Box>

            <Paper>
                <TabPanel value={tabValue} index={0}>
                    <Typography variant="h6" gutterBottom>Dados de Contato e Profissionais</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}><Typography><strong>Email:</strong> {mockColaboradorProfile.email}</Typography></Grid>
                        <Grid item xs={6}><Typography><strong>Departamento:</strong> {mockColaboradorProfile.departamento}</Typography></Grid>
                        <Grid item xs={6}><Typography><strong>Telefone:</strong> {mockColaboradorProfile.telefone}</Typography></Grid>
                        <Grid item xs={6}><Typography><strong>Data de Admissão:</strong> {new Date(mockColaboradorProfile.dataAdmissao).toLocaleDateString('pt-BR')}</Typography></Grid>
                        <Grid item xs={6}><Typography><strong>Rede Social:</strong> {mockColaboradorProfile.redeSocial}</Typography></Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={3} sx={{ mb: 3}}>
                        <Grid item xs={12} md={4}>
                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                <QueryStatsIcon color="primary" sx={{ fontSize: 40 }}/>
                                <Typography variant="h6" sx={{ mt: 1 }}>{mockHistoricoPonto.pontualidadeMedia}%</Typography>
                                <Typography color="text.secondary">Pontualidade Média</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                <TimerOffIcon color="warning" sx={{ fontSize: 40 }}/>
                                <Typography variant="h6" sx={{ mt: 1 }}>{mockHistoricoPonto.totalAtrasosMes}</Typography>
                                <Typography color="text.secondary">Total de Atrasos (Mês)</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                                <MoreTimeIcon color="success" sx={{ fontSize: 40 }}/>
                                <Typography variant="h6" sx={{ mt: 1 }}>{mockHistoricoPonto.totalHorasExtrasMes}</Typography>
                                <Typography color="text.secondary">Total Horas Extras (Mês)</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Typography variant="h6" gutterBottom>Registros Recentes</Typography>
                    <TableContainer component={Paper} variant="outlined">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Data</TableCell>
                                    <TableCell>Entrada</TableCell>
                                    <TableCell>Saída</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mockHistoricoPonto.registrosRecentes.map((registro) => (
                                    <TableRow hover key={registro.id}>
                                        <TableCell>{registro.data}</TableCell>
                                        <TableCell>{registro.entrada}</TableCell>
                                        <TableCell>{registro.saida}</TableCell>
                                        <TableCell>
                                            <Chip label={registro.status} size="small" color={registro.status === 'Pontual' ? 'success' : registro.status === 'Atrasado' ? 'warning' : 'info'} variant="outlined" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                      {mockMetricasDesempenho.map((metric, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                          <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                            {metric.icon}
                            <Typography variant="h6" sx={{ mt: 1 }}>{metric.value}</Typography>
                            <Typography color="text.secondary">{metric.title}</Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>

                    <Typography variant="h6" gutterBottom>Evolução de Desempenho (Últimos 5 meses)</Typography>
                    <Box sx={{ height: 400 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={mockHistoricoDesempenho}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pontuacao" name="Pontuação da IA" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="foco" name="Nível de Foco (%)" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    <Typography variant="h6" gutterBottom>Treinamentos Atribuídos</Typography>
                    <Grid container spacing={2}>
                        {collaboratorTrainings.map((treinamento) => {
                            const progress = collaboratorProgress.find(p => p.trainingId === treinamento.id)?.progress || 0;
                            return (
                                <Grid item xs={12} key={treinamento.id}>
                                    <RouterLink to={`/admin/rh/treinamento/${treinamento.id}`} style={{ textDecoration: 'none' }}>
                                      <TrainingProgress title={treinamento.title} progress={progress} />
                                    </RouterLink>
                                </Grid>
                            );
                        })}
                    </Grid>
                </TabPanel>
            </Paper>
        </Box>
    );
};

export default PerfilColaboradorPage;