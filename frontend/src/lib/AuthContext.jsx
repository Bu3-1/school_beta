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
      if (error.status === 401 || error.status === 403) {
        setAuthError({ type: "auth_required" });
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

  // Evita el loop de recargas: solo redirige si NO estamos ya en una
  // página pública (login, register, etc.). Sin esto, cada vez que la
  // página se recarga en /login, vuelve a detectar "sin sesión" y
  // fuerza otra recarga a /login, infinitamente.
  const navigateToLogin = () => {
    const publicPaths = [
      "/login",
      "/register",
      "/forgot-password",
      "/reset-password",
    ];
    if (!publicPaths.includes(window.location.pathname)) {
      apiClient.auth.redirectToLogin();
    }
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
