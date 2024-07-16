import { Prisma, PrismaClient } from '@prisma/client';

interface UpdateContractRequest {
  contractId: number;
  contractNumber?: string;
  contractDate?: string; // TODO: string para facilitar a entrada de dados ou forçar o padrão correto?
  value?: number;
  status?: string;
}

export class UpdateContractUseCase {
  private prisma = new PrismaClient();

  async execute({ contractId, contractNumber, contractDate, value, status }: UpdateContractRequest): Promise<void> {
    const data: any = {};

    if (contractNumber) data.contractNumber = contractNumber;
    // FIXME: em algum outro ponto isso está sendo feito tambem, criar um util
    // para maner o DRY
    if (contractDate) data.contractDate = new Date(contractDate);
    if (value) data.value = value;
    if (status) data.status = status;

    try {
      await this.prisma.contract.update({
        where: { id: contractId },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new Error('Unique constraint failed on the fields: (`contractNumber`)');
      }
      throw error;
    }
  }
}
