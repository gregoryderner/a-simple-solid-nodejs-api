import { ContractStatus } from '@prisma/client';
import { Request, Response } from 'express';
import { CreateClientUseCase } from '../../../use-cases/client/CreateClientUseCase';
import { FilterClientsUseCase } from '../../../use-cases/client/FilterClientsUseCase';

export class ClientController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, cpfCnpj, phone } = request.body;

    const createClientUseCase = new CreateClientUseCase();
    await createClientUseCase.execute({ name, cpfCnpj, phone });

    return response.status(201).send();
  }

  async filter(request: Request, response: Response): Promise<Response> {
    const { status } = request.query;

    const filterClientsUseCase = new FilterClientsUseCase();
    const clients = await filterClientsUseCase.execute({ status: String(status) });

    return response.status(200).json(clients);
  }
}
