import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Admin from './pages/Admin';
import Patient from './pages/Patient';
import Doctor from './pages/Doctor';
import Home from './pages/Home';
import { AuthProvider } from './hooks/useAuthContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/patient" element={<Patient />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
