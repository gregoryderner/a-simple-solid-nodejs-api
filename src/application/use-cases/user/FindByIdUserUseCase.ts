import { PrismaClient } from '@prisma/client';

interface FilterUserRequest {
  userId: number;
}

export class FindByIdUserUseCase {
  private prisma = new PrismaClient();

  async execute({ userId }: FilterUserRequest) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
