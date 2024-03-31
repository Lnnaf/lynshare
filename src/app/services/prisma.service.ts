import { PrismaClient } from "@prisma/client";


export class PrismaService {
  private static instance: PrismaService;

  private constructor() {
    // Private constructor to prevent instantiation outside the class
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  public init(): PrismaClient {
    return new PrismaClient()
  }
}