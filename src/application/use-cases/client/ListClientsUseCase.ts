import { PrismaClient } from '@prisma/client';

export class ListClientsUseCase {
  private prisma = new PrismaClient();

  async execute(): Promise<any> {
    const clients = await this.prisma.client.findMany({
      include: {
        contracts: true,
      },
    });

    return clients;
  }
}
