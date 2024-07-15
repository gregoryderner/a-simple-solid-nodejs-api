import { PrismaClient } from '@prisma/client';

interface DeleteUserRequest {
  userId: number;
}

export class DeleteUserUseCase {
  private prisma = new PrismaClient();

  async execute({ userId }: DeleteUserRequest): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
