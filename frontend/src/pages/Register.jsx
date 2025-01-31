import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert('Usuário registrado com sucesso!');
            navigate('/login'); // Redireciona para o login após o registo
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Registar</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                        autoComplete="off"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                    >
                        Registar
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Faça login aqui
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
