import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import PoliticasModal from "@/components/PoliticasModal";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalTipo, setModalTipo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiClient.auth.loginViaEmailPassword(email, password);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Correo o contraseña inválidos");
    } finally {
      setLoading(false);
    }
  };

  // Disparador del flujo OAuth con Google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError("");
      setLoading(true);
      try {
        await apiClient.auth.loginWithGoogleToken(tokenResponse.access_token);
        window.location.href = "/";
      } catch (err) {
        setError(err.message || "Error al iniciar sesión con Google");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError("No se pudo completar el inicio de sesión con Google");
    },
  });

  return (
    <>
      <AuthLayout
        title="Bienvenido a Booki"
        subtitle="Inicia sesión en tu cuenta de docente"
        footer={
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-muted-foreground dark:text-slate-300">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="font-bold text-[#3B0A5E] dark:text-purple-300 hover:underline"
              >
                Crea una aquí
              </Link>
            </span>

            <div className="flex items-center gap-3 text-xs text-muted-foreground/80 dark:text-slate-400 pt-1">
              <button
                type="button"
                onClick={() => setModalTipo("privacidad")}
                className="hover:text-foreground dark:hover:text-slate-200 hover:underline cursor-pointer transition-colors"
              >
                Política de Privacidad
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setModalTipo("terminos")}
                className="hover:text-foreground dark:hover:text-slate-200 hover:underline cursor-pointer transition-colors"
              >
                Términos de Servicio
              </button>
            </div>
          </div>
        }
      >
        {/* Botón original con GoogleIcon */}
        <Button
          variant="outline"
          type="button"
          className="w-full h-12 text-sm font-semibold rounded-2xl border-2 border-border dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-400 bg-white dark:bg-slate-900/80 text-foreground dark:text-slate-100 transition-all shadow-xs hover:shadow-md active:scale-[0.99] flex items-center justify-center gap-2 mb-6 cursor-pointer"
          onClick={() => handleGoogleLogin()}
          disabled={loading}
        >
          <GoogleIcon className="w-5 h-5 mr-1" />
          Continuar con Google
        </Button>

        {/* Separador */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border dark:border-slate-700/80" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card dark:bg-[#1a1f2c] px-4 font-bold text-muted-foreground dark:text-slate-400 tracking-wider">
              o con tu correo
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-destructive/10 dark:bg-red-950/40 border border-destructive/20 dark:border-red-800/50 text-destructive dark:text-red-300 text-sm font-medium animate-in fade-in-50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-foreground/80 dark:text-slate-300"
            >
              Correo electrónico
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-slate-400"
                aria-hidden="true"
              />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 rounded-2xl border-2 border-border dark:border-slate-700 bg-background dark:bg-slate-900/90 text-foreground dark:text-slate-100 placeholder:text-muted-foreground/60 dark:placeholder:text-slate-500 focus-visible:border-[#3B0A5E] dark:focus-visible:border-purple-400 focus-visible:ring-0 transition-all font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-xs font-bold uppercase tracking-wider text-foreground/80 dark:text-slate-300"
              >
                Contraseña
              </Label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-[#3B0A5E] dark:text-purple-300 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-slate-400"
                aria-hidden="true"
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 rounded-2xl border-2 border-border dark:border-slate-700 bg-background dark:bg-slate-900/90 text-foreground dark:text-slate-100 placeholder:text-muted-foreground/60 dark:placeholder:text-slate-500 focus-visible:border-[#3B0A5E] dark:focus-visible:border-purple-400 focus-visible:ring-0 transition-all font-medium"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-slate-400 hover:text-foreground dark:hover:text-slate-200 transition-colors cursor-pointer"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-2xl font-bold text-sm bg-[#3B0A5E] hover:bg-[#4A1D6D] dark:bg-purple-600 dark:hover:bg-purple-500 text-white border-0 shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              <>
                Iniciar sesión
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <p className="text-[11px] text-center text-muted-foreground/80 dark:text-slate-400 leading-relaxed pt-2">
            Al iniciar sesión, aceptas nuestros{" "}
            <button
              type="button"
              onClick={() => setModalTipo("terminos")}
              className="text-[#3B0A5E] dark:text-purple-300 font-semibold underline hover:opacity-80 cursor-pointer"
            >
              Términos
            </button>{" "}
            y{" "}
            <button
              type="button"
              onClick={() => setModalTipo("privacidad")}
              className="text-[#3B0A5E] dark:text-purple-300 font-semibold underline hover:opacity-80 cursor-pointer"
            >
              Política de Privacidad
            </button>
            .
          </p>
        </form>
      </AuthLayout>

      <PoliticasModal
        isOpen={!!modalTipo}
        onClose={() => setModalTipo(null)}
        tipo={modalTipo}
      />
    </>
  );
}
