import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksModule } from './links/links.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { LinksService } from './links/links.service';

@Module({
  imports: [LinksModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, LinksService],
})
export class AppModule {}
