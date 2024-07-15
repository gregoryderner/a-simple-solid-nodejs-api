import { PrismaClient } from '@prisma/client';

interface CancelContractRequest {
  contractId: number;
}

export class CancelContractUseCase {
  private prisma = new PrismaClient();

  async execute({ contractId }: CancelContractRequest): Promise<void> {
    await this.prisma.contract.update({
      where: { id: contractId },
      data: { status: 'CANCELLED' },
    });
  }
}
