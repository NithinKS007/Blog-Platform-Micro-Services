import { User } from "src/generated/prisma";

import { IBaseRepository } from "@blog-platform-micro-services/common";

export interface IUserRepository extends IBaseRepository<User> {}
