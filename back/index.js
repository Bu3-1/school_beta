import "dotenv/config";
import express from "express";
import cors from "cors";

import actividadesRoutes from "./routes/actividades.routes.js";
import alumnosRoutes from "./routes/alumnos.routes.js";
import intentosRoutes from "./routes/intentosActividades.routes.js";
import maestrosRoutes from "./routes/maestros.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/actividades", actividadesRoutes);
app.use("/api/alumnos", alumnosRoutes);
app.use("/api/intentos-actividades", intentosRoutes);
app.use("/api/maestros", maestrosRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor backend corriendo en puerto ${PORT}`),
);
