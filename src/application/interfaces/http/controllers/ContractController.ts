import { Request, Response } from 'express';
import { CancelContractUseCase } from '../../../use-cases/contract/CancelContractUseCase';
import { CreateContractUseCase } from '../../../use-cases/contract/CreateContractUseCase';

export class ContractController {
  async create(request: Request, response: Response): Promise<Response> {
    const { clientId, contractNumber, contractDate, value, status } = request.body;

    const createContractUseCase = new CreateContractUseCase();
    await createContractUseCase.execute({ clientId, contractNumber, contractDate, value, status });

    return response.status(201).send();
  }

  async cancel(request: Request, response: Response): Promise<Response> {
    const { contractId } = request.params;

    const cancelContractUseCase = new CancelContractUseCase();
    await cancelContractUseCase.execute({ contractId: Number(contractId) });

    return response.status(200).send();
  }
}
