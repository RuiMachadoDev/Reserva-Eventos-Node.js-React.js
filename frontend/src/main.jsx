import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <App />
  </AuthProvider>
);
