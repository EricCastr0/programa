import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Box,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getServiceRecords } from '../services/api';

const ServiceRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedRecords, setGroupedRecords] = useState({});

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getServiceRecords();
        setRecords(data);
        
        // Group records by customer name
        const grouped = data.reduce((acc, record) => {
          if (!acc[record.customerName]) {
            acc[record.customerName] = [];
          }
          acc[record.customerName].push(record);
          return acc;
        }, {});
        
        setGroupedRecords(grouped);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Registros de Serviço
      </Typography>
      
      {Object.entries(groupedRecords).map(([customerName, customerRecords]) => (
        <Accordion key={customerName} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {customerName} ({customerRecords.length} registros)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {customerRecords.map((record) => (
                <Grid item xs={12} key={record.id}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Serviço
                          </Typography>
                          <Typography variant="body1">{record.service}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Data da Solicitação
                          </Typography>
                          <Typography variant="body1">
                            {new Date(record.requestDate).toLocaleDateString('pt-BR')}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Solicitação
                          </Typography>
                          <Typography variant="body1">{record.request}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="textSecondary">
                            Status
                          </Typography>
                          <Chip
                            label={record.serviceSolved ? "Solucionado" : "Em Andamento"}
                            color={record.serviceSolved ? "success" : "warning"}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                        </Grid>
                        {record.serviceSolved && (
                          <Grid item xs={12}>
                            <Typography variant="subtitle2" color="textSecondary">
                              Solução
                            </Typography>
                            <Typography variant="body1">{record.solution}</Typography>
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default ServiceRecords; 