import { Request, Response } from 'express';
import { CreateContractUseCase } from '../../../use-cases/contract/CreateContractUseCase';

export class ContractController {
  async create(request: Request, response: Response): Promise<Response> {
    const { clientId, contractNumber, contractDate, value, status } = request.body;

    const createContractUseCase = new CreateContractUseCase();
    await createContractUseCase.execute({ clientId, contractNumber, contractDate, value, status });

    return response.status(201).send();
  }
}
