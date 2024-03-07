import { Router } from 'express';
import { register, login} from '../controllers/auth.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware.js'
import { checkRole, checkUser } from '../middleware/user.middleware.js';

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post('/register', [ checkUser, checkRole ], register);
router.post('/login', login);

router.post('/products', isAdmin, (req, res) => {
  // Solo los administradores pueden crear productos
  res.json({ message: 'Esta es una ruta protegida para crear productos', user: req.user });
});

router.put('/api/products/:id', isAdmin, (req, res) => {
  // Solo los administradores pueden actualizar productos
  res.json({ message: 'Esta es una ruta protegida para actualizar productos', user: req.user });
});

router.delete('/products/:id', isAdmin, (req, res) => {
  // Solo los administradores pueden eliminar productos
  res.json({ message: 'Esta es una ruta protegida para eliminar productos', user: req.user });
});

router.post('/chat', isAuthenticated, (req, res) => {
  // Solo los usuarios autenticados pueden enviar mensajes al chat
  res.json({ message: 'Esta es una ruta protegida para el chat', user: req.user });
});

router.post('/cart', isAuthenticated, (req, res) => {
  // Solo los usuarios autenticados pueden agregar productos a su carrito
  res.json({ message: 'Esta es una ruta protegida para el carrito', user: req.user });
});

export default router;
