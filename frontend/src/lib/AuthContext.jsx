import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { apiClient } from "@/api/apiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  // Antes esta función primero consultaba "public settings" de la app en
  // una plataforma SaaS externa. Ese servicio no existe en este backend,
  // así que aquí simplemente comprobamos si hay una sesión (token JWT)
  // válida contra el servicio "alumnos" (apiClient.auth.me()).
  const checkUserAuth = useCallback(async () => {
    try {
      setIsLoadingAuth(true);
      const currentUser = await apiClient.auth.me();
      setUser(currentUser);
      setIsAuthenticated(true);
      setAuthError(null);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      // Sin sesión (401/403) no es un "error" que deba mostrarse: es el
      // estado normal antes de iniciar sesión. Cualquier otro problema
      // (por ejemplo el backend caído) sí se expone.
      if (error.status === 401 || error.status === 403) {
        setAuthError(null);
      } else if (error.status !== undefined) {
        setAuthError({
          type: error.status === 0 ? "network" : "unknown",
          message: error.message || "No se pudo verificar la sesión",
        });
      }
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  }, []);

  const checkAppState = useCallback(async () => {
    setIsLoadingPublicSettings(true);
    // No hay "public settings" reales que consultar en este backend.
    setAppPublicSettings(null);
    setIsLoadingPublicSettings(false);
    await checkUserAuth();
  }, [checkUserAuth]);

  useEffect(() => {
    checkAppState();
  }, [checkAppState]);

  const logout = (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);

    if (shouldRedirect) {
      apiClient.auth.logout();
    } else {
      // Solo limpiar el token, sin redirigir.
      localStorage.removeItem("booki_token");
      localStorage.removeItem("booki_maestro");
    }
  };

  const navigateToLogin = () => {
    apiClient.auth.redirectToLogin();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        authChecked,
        logout,
        navigateToLogin,
        checkUserAuth,
        checkAppState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
