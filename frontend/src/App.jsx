import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import ScrollToTop from "./components/ScrollToTop";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import RegistroAlumno from "@/pages/RegistroAlumno";
import SeleccionNivel from "@/pages/SeleccionNivel";
import ActividadesPorNivel from "@/pages/ActividadesPorNivel";
import Configuracion from "@/pages/Configuracion";
import MotorActividades from "@/pages/MotorActividades";
import Perfil from "@/pages/Perfil";
import CrearActividad from "@/pages/CrearActividad";

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } =
    useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  const isPublicPath = PUBLIC_PATHS.includes(window.location.pathname);

  // Handle authentication errors (pero no si ya estamos en una página
  // pública como /login: ahí solo queremos que se renderice esa ruta).
  if (authError && !isPublicPath) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />;
    } else if (authError.type === "auth_required") {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Rutas con la barra de navegación (Layout) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/registro-alumno" element={<RegistroAlumno />} />
        <Route path="/seleccion-nivel/:alumnoId" element={<SeleccionNivel />} />
        <Route
          path="/actividades/:alumnoId/:nivel"
          element={<ActividadesPorNivel />}
        />
        <Route path="/crear-actividad" element={<CrearActividad />} />
        <Route path="/crear-actividad/:alumnoId" element={<CrearActividad />} />
        <Route
          path="/jugar/:alumnoId/:actividadId"
          element={<MotorActividades />}
        />
        <Route path="/configuracion" element={<Configuracion />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />

      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
