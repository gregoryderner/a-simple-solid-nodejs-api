import { ContractStatus, PrismaClient } from '@prisma/client';

interface FilterClientsRequest {
  status: ContractStatus;
}

export class FilterClientsUseCase {
  private prisma = new PrismaClient();

  async execute({ status }: FilterClientsRequest): Promise<any> {
    const clients = await this.prisma.client.findMany({
      where: {
        contracts: {
          some: {
            status,
          },
        },
      },
      include: {
        contracts: true,
      },
    });

    return clients;
  }
}
