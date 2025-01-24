import { createContext, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api/config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    const login = async (formData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
            const token = response.data.token;
            setUser({ token });
            localStorage.setItem('token', token);
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
