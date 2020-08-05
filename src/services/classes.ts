import api from './api'

const createClasses = async (data: object) => {
  return await api.post('classes', data);
}

const searchClasses = async (data: object) => {
  return await api.get('classes', {
    params: data
  });
}

export {
  createClasses,
  searchClasses
}