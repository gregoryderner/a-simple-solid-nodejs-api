import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../use-cases/user/CreateUserUseCase';
import { DeleteUserUseCase } from '../../../use-cases/user/DeleteUserUseCase';
import { UpdateUserUseCase } from '../../../use-cases/user/UpdateUserUseCase';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role } = request.body;

    const createUserUseCase = new CreateUserUseCase();
    await createUserUseCase.execute({ name, email, password, role });

    return response.status(201).send();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { name, email, password, role } = request.body;
    const isAdmin = request.userRole === 'ADMIN';

    if(role && !isAdmin){
      return response.status(401).send("You do not have permission to modify the ROLE field")
    }

    const updateUserUseCase = new UpdateUserUseCase();
    await updateUserUseCase.execute({ userId: Number(userId), name, email, password, role, isAdmin });

    return response.status(200).send();
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const deleteUserUseCase = new DeleteUserUseCase();

    try {
      await deleteUserUseCase.execute({ userId: Number(userId) });
      return response.status(204).send();
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
}
