import { Request, Response } from 'express';
import { LoginUserUseCase } from '../../../use-cases/user/LoginUserUseCase';

export class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const loginUserUseCase = new LoginUserUseCase();
    const result = await loginUserUseCase.execute({ email, password });

    return response.status(200).json(result);
  }
}
