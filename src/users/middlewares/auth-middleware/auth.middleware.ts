import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // const token = req.headers['authorization'];
    // if (!token) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }

    console.log(req, res);
    next();
  }
}
