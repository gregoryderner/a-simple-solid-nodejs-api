import { Request, Response } from 'express';
import { CreateClientUseCase } from '../../../use-cases/client/CreateClientUseCase';
import { DeleteClientUseCase } from '../../../use-cases/client/DeleteClientUseCase';
import { FilterClientsUseCase } from '../../../use-cases/client/FilterClientsUseCase';
import { UpdateClientUseCase } from '../../../use-cases/client/UpdateClientUseCase';

export class ClientController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, cpfCnpj, phone } = request.body;

    const createClientUseCase = new CreateClientUseCase();
    await createClientUseCase.execute({ name, cpfCnpj, phone });

    return response.status(201).send();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { clientId } = request.params;
    const { name, cpfCnpj, phone } = request.body;

    const updateClientUseCase = new UpdateClientUseCase();

    try {
      await updateClientUseCase.execute({ clientId: Number(clientId), name, cpfCnpj, phone });
      return response.status(200).send();
    } catch (error) {
      if (error.message.includes('Unique constraint failed on the fields: (`cpfCnpj`)')) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { clientId } = request.params;

    const deleteClientUseCase = new DeleteClientUseCase();

    try {
      await deleteClientUseCase.execute({ clientId: Number(clientId) });
      return response.status(204).send();
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  async filter(request: Request, response: Response): Promise<Response> {
    const { status } = request.query;

    const filterClientsUseCase = new FilterClientsUseCase();
    const clients = await filterClientsUseCase.execute({ status: String(status) });

    return response.status(200).json(clients);
  }
}
