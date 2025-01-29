import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api/config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redireciona para login se não estiver autenticado
        }
    }, [user, navigate]);

    const login = async (formData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
            const token = response.data.token;
            if (token) {
                setUser({ token });
                localStorage.setItem('token', token);
                navigate('/'); // Redireciona para Home após login bem-sucedido
            } else {
                throw new Error('Token inválido');
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login'); // Redireciona para o login após logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
