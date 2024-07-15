import { Prisma, PrismaClient } from '@prisma/client';

interface UpdateClientRequest {
  clientId: number;
  name?: string;
  cpfCnpj?: string;
  phone?: string;
}

export class UpdateClientUseCase {
  private prisma = new PrismaClient();

  async execute({ clientId, name, cpfCnpj, phone }: UpdateClientRequest): Promise<void> {
    const data: any = {};

    if (name) data.name = name;
    if (cpfCnpj) data.cpfCnpj = cpfCnpj;
    if (phone) data.phone = phone;

    try {
      await this.prisma.client.update({
        where: { id: clientId },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new Error('Unique constraint failed on the fields: (`cpfCnpj`)');
      }
      throw error;
    }
  }
}
