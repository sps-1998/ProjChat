import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { users, createUser, validateUser } from '../models/user';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET!;

// Sign Up
router.post(
  '/signup',
  async (
    req: Request<object, object, { username?: string; password?: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, password } = req.body;
      // Validate Inputs
      if (!username || !password) {
        res.status(400).json({ error: 'Username or Password is required' });
        return;
      }

      // Check if the user already exists
      const existing = users.find(u => u.username === username);
      if (existing) {
        res.status(409).json({ error: 'Username already exists.' });
        return;
      }

      const user = await createUser(username, password); // Create and hash
      console.log('JWT_SECRET is:', JSON.stringify(JWT_SECRET));
      const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1h' }); // Issue a JWT
      res.status(201).json({ token, user: { id: user.id, username } }); // Return token and save user info
    } catch (err) {
      next(err);
    }
  }
);

// Log In
router.post(
  '/login',
  async (
    req: Request<object, object, { username?: string; password?: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({ error: 'Username and password required' });
        return;
      }

      const user = await validateUser(username, password);
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, username } });
    } catch (err) {
      next(err);
    }
  }
);

// Middleware to protect routes
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Token missing' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
    // attach userId to the request for downstream handlers
    ;(req as any).userId = payload.sub;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

export default router;

