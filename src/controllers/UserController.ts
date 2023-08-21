import { Request, Response } from 'express';
import User from '../models/User';

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, username, photo, description } = req.body;

    try {
      const existsUserEmailOrUsername = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existsUserEmailOrUsername) {
        return res
          .status(400)
          .json({ message: 'E-mail ou nome de usuário já existe!' });
      }

      const newUser = await User.create({
        name,
        email,
        username,
        photo,
        description,
        isActive: true,
        isVerified: false,
        createdAt: new Date(),
      });

      return res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
