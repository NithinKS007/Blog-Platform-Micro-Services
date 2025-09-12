import { PrismaClient } from "@prisma/client";
import { SqlBaseRepository } from "@blog-platform-micro-services/common";

const prisma = new PrismaClient()

export class UserRepository extends SqlBaseRepository<PrismaClient> {
    constructor() {
        super(prisma.user);
    }
}