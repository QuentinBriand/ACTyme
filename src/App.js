import './App.css';
import AuthProvider from './Context/AuthContext';
import CustomRouter from './Routes/CustomRouter';

function App() {
  return (
    <AuthProvider>
      <CustomRouter />
    </AuthProvider>
  );
}

export default App;
