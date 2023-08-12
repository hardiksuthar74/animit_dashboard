import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import NewUsers from "./pages/NewUsers";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import UsersList from "./pages/UsersList";
import AnimeList from "./pages/AnimeList";
import NewAnimes from "./pages/NewAnimes";

function App() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create_users" element={<NewUsers />} />
        <Route path="users" element={<UsersList />} />
        <Route path="animes" element={<AnimeList />} />
        <Route path="create_animes" element={<NewAnimes />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
