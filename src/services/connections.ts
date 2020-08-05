import api from './api'

const getTotalConnections = async () => {
  return await api.get('connections');
}

const createConnection = async (user_id: number) => {
  return await api.post('connections', {user_id});
}

export {
  getTotalConnections,
  createConnection
}