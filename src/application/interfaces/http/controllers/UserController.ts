import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../use-cases/user/CreateUserUseCase';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role } = request.body;

    const createUserUseCase = new CreateUserUseCase();
    await createUserUseCase.execute({ name, email, password, role });

    return response.status(201).send();
  }
}
