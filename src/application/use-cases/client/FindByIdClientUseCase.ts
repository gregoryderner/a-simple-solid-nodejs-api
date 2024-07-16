import { PrismaClient } from '@prisma/client';

interface FilterClientRequest {
  clientId: number;
}

export class FindByIdClientUseCase {
  private prisma = new PrismaClient();

  async execute({ clientId }: FilterClientRequest) {
    const client = await this.prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });
    return client;
  }
}
