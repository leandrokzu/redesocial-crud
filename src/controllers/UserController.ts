﻿import { Request, Response } from 'express';
import User from '../models/User';

export class UserController {
  async get(req: Request, res: Response) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

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

  async update(req: Request, res: Response) {
    const { name, email, username, photo, description } = req.body;
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const existsUserEmailOrUsername = await User.findOne({
        $or: [
          { email, _id: { $ne: id } },
          { username, _id: { $ne: id } },
        ],
      });

      if (existsUserEmailOrUsername) {
        return res
          .status(400)
          .json({ message: 'E-mail ou nome de usuário já existe!' });
      }

      await User.updateOne(
        { _id: id },
        {
          name,
          email,
          username,
          photo,
          description,
        }
      );

      return res.status(204).json();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async inactive(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await User.updateOne({ isActive: false });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor!' });
    }
  }
}
