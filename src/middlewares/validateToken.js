import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      // Agrega el usuario decodificado al objeto de solicitud (req)
      req.user = decodedToken;

      // Continúa con el siguiente middleware
      next();
    });
  } catch (error) {
    // Manejo de errores internos del servidor
    console.error('Error in authRequired middleware:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};