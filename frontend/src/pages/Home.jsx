import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/api/apiClient";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AlumnoCard from "@/components/AlumnoCard";
import Logo from "@/assets/Logo.png";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export default function Home() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadAlumnos();
  }, []);

  const loadAlumnos = async () => {
    try {
      const data = await apiClient.entities.Alumno.list("-created_date");
      setAlumnos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAlumnoEliminado = (idEliminado) => {
    setAlumnos((prevAlumnos) =>
      prevAlumnos.filter((alumno) => alumno.id !== idEliminado),
    );
  };

  const handleAlumnoActualizado = (alumnoActualizado) => {
    setAlumnos((prevAlumnos) =>
      prevAlumnos.map((alumno) =>
        alumno.id === alumnoActualizado.id ? alumnoActualizado : alumno,
      ),
    );
  };

  const filteredAlumnos = alumnos.filter((alumno) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      alumno.nombre_anonimizado?.toLowerCase().includes(q) ||
      alumno.condiciones?.some((c) => c.toLowerCase().includes(q)) ||
      String(alumno.grado).includes(q) ||
      alumno.grupo?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
          Mis alumnos
        </h1>
        <p className="text-muted-foreground mt-1">
          Selecciona un alumno para comenzar a trabajar
        </p>
      </motion.div>

      {!loading && alumnos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-6 relative"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por nombre, condición, grado o grupo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </motion.div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-card border border-border animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {alumnos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-center py-12"
            >
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 bg-[#3B0A5E]/15 rounded-2xl blur-xl" />
                <img
                  src={Logo}
                  alt=""
                  className="relative w-20 h-20 rounded-2xl opacity-90"
                />
              </div>
              <h2 className="text-lg font-heading font-semibold text-foreground">
                Aún no tienes alumnos
              </h2>
              <p className="text-sm text-muted-foreground mt-1 mb-6">
                Agrega tu primer alumno para comenzar
              </p>
              <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/registro-alumno")}
                className="border-2 border-dashed border-border rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors min-h-32 mx-auto max-w-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="font-medium text-sm">Agregar alumno</span>
              </motion.button>
            </motion.div>
          ) : filteredAlumnos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-4xl mb-3">🔍</div>
              <h2 className="text-lg font-heading font-semibold text-foreground">
                No se encontraron alumnos
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Prueba con otro término de búsqueda
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredAlumnos.map((alumno, i) => (
                <AlumnoCard
                  key={alumno.id}
                  alumno={alumno}
                  index={i}
                  onClick={() => navigate(`/seleccion-nivel/${alumno.id}`)}
                  onAlumnoEliminado={handleAlumnoEliminado}
                  onAlumnoActualizado={handleAlumnoActualizado}
                />
              ))}
              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 22,
                    },
                  },
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/registro-alumno")}
                className="border-2 border-dashed border-border rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors min-h-32"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="font-medium text-sm">Agregar alumno</span>
              </motion.button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
