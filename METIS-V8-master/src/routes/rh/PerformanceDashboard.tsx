import React from 'react';
import { Card, Grid, CardContent, Typography, Box } from '@mui/material';

const PerformanceDashboard = () => {
  // Dados de exemplo para o dashboard. No futuro, isso virá do backend.
  const metrics = [
    { title: 'Produtividade Média', value: '92%', detail: 'Atingiu a meta' },
    { title: 'Tempo de Resposta', value: '4h', detail: 'Melhora de 15% neste mês' },
    { title: 'Taxa de Conclusão de Tarefas', value: '98%', detail: 'Acima da média do setor' },
    { title: 'Satisfação do Colaborador', value: '4.5/5', detail: 'Feedback positivo' },
  ];

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', borderRadius: '8px' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
        Dashboard de Desempenho
      </Typography>
      <Grid container spacing={4}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
                boxShadow: 3, 
                transition: 'box-shadow 0.3s ease-in-out', 
                '&:hover': { boxShadow: 6 } 
            }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {metric.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'semibold' }}>
                  {metric.value}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {metric.detail}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PerformanceDashboard;