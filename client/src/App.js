import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './components/contacts/Contact';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import AddProject from './components/projects/AddProject';
import AllProjects from './components/projects/AllProjects';
import EditProject from './components/projects/EditProject';
import AddQualification from './components/qualifications/AddQualification';
import AllQualifications from './components/qualifications/AllQualifications';
import EditQualification from './components/qualifications/EditQualification';
import EditContact from './components/contacts/EditContact';
import AddContact from './components/contacts/AddContact';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/contacts/edit/:id" element={<EditContact />} />
        <Route path="/contacts/add" element={<AddContact />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/projects/new" element={<AddProject />} />
        <Route path="/projects/edit/:projectId" element={<EditProject />} />
        <Route path="/qualifications" element={<PrivateRoute />}>
          <Route path="" element={<AllQualifications />} />
          <Route path="new" element={<AddQualification />} />
          <Route path="edit/:id" element={<EditQualification />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
