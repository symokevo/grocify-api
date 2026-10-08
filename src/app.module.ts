import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroceriesModule } from './groceries/groceries.module';

@Module({
  imports: [PrismaModule, GroceriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
