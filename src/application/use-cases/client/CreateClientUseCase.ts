import { PrismaClient } from '@prisma/client';

interface CreateClientRequest {
  name: string;
  cpfCnpj: string;
  phone: string;
}

export class CreateClientUseCase {
  private prisma = new PrismaClient();

  async execute({ name, cpfCnpj, phone }: CreateClientRequest): Promise<void> {
    await this.prisma.client.create({
      data: {
        name,
        cpfCnpj,
        phone,
      },
    });
  }
}
