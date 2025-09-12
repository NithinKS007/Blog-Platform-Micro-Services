import { IBaseRepository } from "./Ibase.repository";
import { PrismaClient } from "@prisma/client";

export class SqlBaseRepository<T> implements IBaseRepository<T> {
  private readonly prismaModel: PrismaClient;

  constructor(prismaModel: PrismaClient) {
    this.prismaModel = prismaModel;
  }

  async create(entity: Partial<T>): Promise<T> {
    return this.prismaModel.create({ data: entity });
  }

  async findById(id: string): Promise<T | null> {
    return this.prismaModel.findUnique({ where: { id } });
  }

  async update(id: string, entity: Partial<T>): Promise<T | null> {
    return this.prismaModel.update({ where: { id }, data: entity });
  }

  async delete(id: string): Promise<T | null> {
    return this.prismaModel.delete({ where: { id } });
  }

  async findOne(conditions: Partial<T>): Promise<T | null> {
    return this.prismaModel.findFirst({ where: conditions });
  }

  async insertMany(entities: Partial<T>[]): Promise<T[]> {
    return this.prismaModel.createMany({ data: entities });
  }
}
