import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { LinksService } from './links/links.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly linksService: LinksService,
  ) {}

  @Get(':slug')
  async redirect(@Res() res: Response, @Param('slug') slug: string) {
    const link = await this.linksService.findOneBySlug(slug);

    res.status(302).redirect(link.link);
  }
}
