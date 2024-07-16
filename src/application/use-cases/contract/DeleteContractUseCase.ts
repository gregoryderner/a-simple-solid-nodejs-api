import { PrismaClient } from '@prisma/client';

interface DeleteContractRequest {
  contractId: number;
}

export class DeleteContractUseCase {
  private prisma = new PrismaClient();

  async execute({ contractId }: DeleteContractRequest): Promise<void> {
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
    });

    if (!contract) {
      throw new Error('Contract not found');
    }

    await this.prisma.contract.delete({
      where: { id: contractId },
    });
  }
}
