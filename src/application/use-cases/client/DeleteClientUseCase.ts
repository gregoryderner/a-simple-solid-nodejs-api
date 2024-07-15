import { PrismaClient } from '@prisma/client';

interface DeleteClientRequest {
  clientId: number;
}

export class DeleteClientUseCase {
  private prisma = new PrismaClient();

  async execute({ clientId }: DeleteClientRequest): Promise<void> {
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
      include: { contracts: true },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    await this.prisma.contract.deleteMany({
      where: { clientId },
    });

    await this.prisma.client.delete({
      where: { id: clientId },
    });
  }
}
