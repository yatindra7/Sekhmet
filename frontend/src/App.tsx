import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Admin from './pages/Admin';
import Patient from './pages/Patient';
import Doctor from './pages/Doctor';
import Home from './pages/Home';
import { AuthProvider } from './hooks/useAuthContext';
import Login from './pages/Login';
import AddPatient from './pages/AddPatient';
import PatientDetails from './pages/PatientDetails';
import AddUser from './pages/AddUser';
import Scheduler from './pages/Scheduler';

function App() {
  return (
    <div className="App">
      <Toaster />
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
                <Route path=":ssn">
                  <Route index element={<PatientDetails />} />
                  <Route path="schedule/:type" element={<Scheduler />} />
                </Route>
              </Route>
              <Route path="/admin">
                <Route index element={<Admin />} />
                <Route path="new" element={<AddUser />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
