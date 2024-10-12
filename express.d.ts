import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    body: any;  // Puedes cambiar 'any' por un tipo más específico si lo deseas
  }
}
