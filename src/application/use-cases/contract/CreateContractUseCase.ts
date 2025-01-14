import { ContractStatus, PrismaClient } from '@prisma/client';

interface CreateContractRequest {
  clientId: number;
  contractNumber: string;
  contractDate: Date;
  value: number;
  status: ContractStatus;
}

export class CreateContractUseCase {
  private prisma = new PrismaClient();

  async execute({
    clientId,
    contractNumber,
    contractDate,
    value,
    status,
  }: CreateContractRequest): Promise<void> {
    const isoDate = new Date(contractDate).toISOString();
    await this.prisma.contract.create({
      data: {
        clientId,
        contractNumber,
        contractDate: isoDate,
        value,
        status,
      },
    });
  }
}
