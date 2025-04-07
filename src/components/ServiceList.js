import React, { useState, useEffect } from 'react';
import { 
  Paper,
  Box,
  Typography,
  Divider
} from '@mui/material';
import { getCustomerServiceData } from '../services/api';

const ServiceDetails = ({ service }) => (
  <Box sx={{ margin: 1, backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}>
    <Typography variant="h6" component="div" gutterBottom>
      Detalhes do Atendimento
    </Typography>
    <Typography variant="body2" gutterBottom>
      <strong>Cliente:</strong> {service["Cliente:"]}
    </Typography>
    <Typography variant="body2" gutterBottom>
      <strong>Serviço:</strong> {service["Serviço:"]}
    </Typography>
    <Typography variant="body2" gutterBottom>
      <strong>Data:</strong> {service["Data:"]}
    </Typography>
    <Typography variant="body2" gutterBottom>
      <strong>Tipo de atendimento:</strong> {service["Tipo de atendimento:"]}
    </Typography>
    <Typography variant="body2">
      <strong>Descrição:</strong> {service["Descrição:"]}
    </Typography>
  </Box>
);

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getCustomerServiceData();
      setServices(data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    }
  };

  // Agrupar serviços por nome do cliente
  const groupedServices = services.reduce((acc, service) => {
    const clientName = service["Cliente:"];
    if (!acc[clientName]) {
      acc[clientName] = [];
    }
    acc[clientName].push(service);
    return acc;
  }, {});

  return (
    <div>
      <Paper sx={{ p: 2 }}>
        {Object.entries(groupedServices).map(([clientName, clientServices]) => (
          <Box key={clientName} sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ 
                color: 'primary.main',
                borderBottom: '2px solid',
                borderColor: 'primary.main',
                pb: 1,
                mb: 2
              }}
            >
              {clientName}
            </Typography>
            {clientServices.map((service, index) => (
              <React.Fragment key={service.id}>
                <ServiceDetails service={service} />
                {index < clientServices.length - 1 && (
                  <Divider sx={{ my: 2 }} />
                )}
              </React.Fragment>
            ))}
          </Box>
        ))}
      </Paper>
    </div>
  );
};

export default ServiceList; 