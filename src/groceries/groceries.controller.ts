/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Query,
} from "@nestjs/common";

import { GroceriesService } from "./groceries.service";

@Controller("groceries")
export class GroceriesController {
  constructor(
    private readonly groceriesService:
      GroceriesService
  ) {}

  @Get()
  findAll(
    @Query("search")
    search?: string
  ) {
    return this.groceriesService.findAll(
      search
    );
  }

  @Get(":slug")
  findOne(
    @Param("slug")
    slug: string
  ) {
    return this.groceriesService.findOneBySlug(
      slug
    );
  }
}