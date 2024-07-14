import { Request, Response } from 'express';
import { CreateClientUseCase } from '../../../use-cases/client/CreateClientUseCase';

export class ClientController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, cpfCnpj, phone } = request.body;

    const createClientUseCase = new CreateClientUseCase();
    await createClientUseCase.execute({ name, cpfCnpj, phone });

    return response.status(201).send();
  }
}
