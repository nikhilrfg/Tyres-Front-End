import { API_URL } from '../environment';
import { getJwt } from './JwtService';

export const createTyre = async(body: any) => {
  const response = await fetch(`${API_URL}/tyres`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwt()}`
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return data;
}

export const getUserTyres = async() => {
    const response = await fetch(`${API_URL}/tyres`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getJwt()}`
        },
        
      });
    
      const data = await response.json();
    
      return data;
}

export const deleteTyre = async(tyreId: any) => {
    const response = await fetch(`${API_URL}/tyres/${tyreId}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getJwt()}`
        },
        
      });
    
      const data = await response.json();
    
      return data;
}

export const updateTyre = async(body: any) => {
    const response = await fetch(`${API_URL}/tyres`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getJwt()}`
      },
      body: JSON.stringify(body)
    });
  
    const data = await response.json();
  
    return data;
  }



