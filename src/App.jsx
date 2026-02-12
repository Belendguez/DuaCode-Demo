import { Routes, Route } from "react-router-dom";
import UsersList from "./pages/UsersList";
import UserCreater from "./pages/UserCreate";
import UserForm from "./pages/UserForm";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import UserDetails from "./pages/UserDetail";



export default function App() {
  return (
    <Layout>
      <Routes>
      <Route path="/" element={<Home />} /> {/* Ahora Home es la página inicial */}
      <Route path="/users" element={<UsersList />} />
      <Route path="/createUser" element={<UserCreater />} />
      <Route path="/user/:id" element={<UserDetails />} />
      <Route path="/edit/:id" element={<UserForm isEdit={true} />} />
      </Routes>
    </Layout>
  );
}

