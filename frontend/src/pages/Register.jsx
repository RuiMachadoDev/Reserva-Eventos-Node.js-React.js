import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert('Usuário registrado com sucesso!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Registrar</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                    >
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
