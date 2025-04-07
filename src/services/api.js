import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sheetdb.io/api/v1/edjc7jw6prq8k',
});

export const getCustomerServiceData = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

export const createCustomerService = async (data) => {
  try {
    const response = await api.post('/', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar novo registro:', error);
    throw error;
  }
};

export const updateCustomerService = async (id, data) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar registro:', error);
    throw error;
  }
};

export const deleteCustomerService = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar registro:', error);
    throw error;
  }
};

export default api; 