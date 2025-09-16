import { PrismaClient } from "@prisma/client";
import { SqlBaseRepository } from "@blog-platform-micro-services/common/index";
import { prisma } from "src/utils/prisma";
import { IUserRepository } from "src/interface/IUser.repository";

export class UserRepository
  extends SqlBaseRepository<PrismaClient>
  implements IUserRepository
{
  constructor() {
    super(prisma.user);
  }
}
