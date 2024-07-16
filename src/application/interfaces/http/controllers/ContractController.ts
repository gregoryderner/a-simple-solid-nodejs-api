import { Request, Response } from 'express';
import { CancelContractUseCase } from '../../../use-cases/contract/CancelContractUseCase';
import { CreateContractUseCase } from '../../../use-cases/contract/CreateContractUseCase';
import { DeleteContractUseCase } from '../../../use-cases/contract/DeleteContractUseCase';
import { UpdateContractUseCase } from '../../../use-cases/contract/UpdateContractUseCase';

export class ContractController {
  async create(request: Request, response: Response): Promise<Response> {
    const { clientId, contractNumber, contractDate, value, status } = request.body;

    const createContractUseCase = new CreateContractUseCase();
    await createContractUseCase.execute({ clientId, contractNumber, contractDate, value, status });

    return response.status(201).send();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { contractId } = request.params;
    const { contractNumber, contractDate, value, status } = request.body;

    const updateContractUseCase = new UpdateContractUseCase();

    try {
      await updateContractUseCase.execute({ contractId: Number(contractId), contractNumber, contractDate, value, status });
      return response.status(200).send();
    } catch (error) {
      if (error.message.includes('Unique constraint failed on the fields: (`contractNumber`)')) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { contractId } = request.params;

    const deleteContractUseCase = new DeleteContractUseCase();

    try {
      await deleteContractUseCase.execute({ contractId: Number(contractId) });
      return response.status(204).send();
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  async cancel(request: Request, response: Response): Promise<Response> {
    const { contractId } = request.params;

    const cancelContractUseCase = new CancelContractUseCase();
    try {
      await cancelContractUseCase.execute({ contractId: Number(contractId) });
      return response.status(200).send();
    } catch (error) {
      console.log(error)
      return response.status(404).json({ message: error.message });
    }
  }
}
