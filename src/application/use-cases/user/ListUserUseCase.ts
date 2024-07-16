import { PrismaClient } from '@prisma/client';

export class ListUserUseCase {
  private prisma = new PrismaClient();

  async execute() {
    const users = await this.prisma.user.findMany({});
    return users;
  }
}
