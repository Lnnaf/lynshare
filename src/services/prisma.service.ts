import { PrismaClient } from "@prisma/client";

export class PrismaService {
  private static instance: PrismaService;
  private prismaClient: PrismaClient;

  private constructor() {
    this.prismaClient = new PrismaClient();
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  public client(): PrismaClient {
    return this.prismaClient;
  }
}