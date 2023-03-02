import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Admin from './pages/Admin';
import Patient from './pages/Patient';
import Doctor from './pages/Doctor';
import Home from './pages/Home';
import { AuthProvider } from './hooks/useAuthContext';
import Login from './pages/Login';
import AddPatient from './pages/AddPatient';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/patient">
                <Route index element={<Patient />} />
                <Route path="new" element={<AddPatient />} />
              </Route>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
