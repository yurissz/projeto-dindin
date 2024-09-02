import { Route, createBrowserRouter, createRoutesFromElements, Outlet, Navigate } from "react-router-dom";
import { Register } from "./pages/register/register";
import { Login } from "./pages/login/login";
import { Home } from "./pages/home/home";
import { createRequest } from "./utils/createRequest";

const ProtectedRoutes = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/" />
}

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home"
          loader={() => createRequest('/transacao', "GET")}
          element={<Home />} />
        </Route>
      </Route>
  )
)


