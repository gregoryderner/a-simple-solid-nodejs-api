import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export class CreateUserUseCase {
  private prisma = new PrismaClient();

  async execute({ name, email, password, role = 'USER' }: CreateUserRequest): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
  }
}
