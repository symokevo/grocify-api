/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class GroceriesService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async findAll(search?: string) {
    const query = search?.trim();

    return this.prisma.grocery.findMany({
      where: {
        isPublished: true,
        productClass: "GROCERY",

        ...(query
          ? {
              OR: [
                {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },

                {
                  scientificName: {
                    contains: query,
                    mode: "insensitive",
                  },
                },

                {
                  aliases: {
                    some: {
                      name: {
                        contains: query,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              ],
            }
          : {}),
      },

      include: {
        aliases: true,

        images: {
          orderBy: {
            isPrimary: "desc",
          },
        },

        nutrition: true,
      },

      orderBy: {
        name: "asc",
      },
    });
  }

  async findOneBySlug(slug: string) {
    const grocery =
      await this.prisma.grocery.findFirst({
        where: {
          slug,
          isPublished: true,
          productClass: "GROCERY",
        },

        include: {
          aliases: true,

          images: {
            orderBy: {
              isPrimary: "desc",
            },
          },

          nutrition: true,
        },
      });

    if (!grocery) {
      throw new NotFoundException(
        "Grocery not found"
      );
    }

    return grocery;
  }
}