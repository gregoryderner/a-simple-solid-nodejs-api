import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

interface UpdateUserRequest {
  userId: number;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  isAdmin: boolean;
}

export class UpdateUserUseCase {
  private prisma = new PrismaClient();

  async execute({ userId, name, email, password, role, isAdmin }: UpdateUserRequest): Promise<void> {
    const data: any = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 8);
      data.password = hashedPassword;
    }
    if (role && isAdmin) data.role = role;

    await this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}
