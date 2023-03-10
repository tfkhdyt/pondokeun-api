import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto, createLinkSchema } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createLinkSchema))
  async create(@Body() createLinkDto: CreateLinkDto) {
    if (createLinkDto.slug) {
      await this.linksService.verifySlug(createLinkDto.slug);
    }

    const link = await this.linksService.create(createLinkDto);

    return {
      status: 'success',
      shortenedLink: link,
    };
  }

  @Get()
  async findAll() {
    const data = await this.linksService.findAll();

    return {
      status: 'success',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.linksService.findOne(id);

    return {
      status: 'success',
      data,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    await this.linksService.findOne(id);
    const updatedLink = await this.linksService.update(id, updateLinkDto);

    return {
      status: 'success',
      updatedLink,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.linksService.findOne(id);
    const deletedLink = await this.linksService.remove(id);

    return {
      status: 'success',
      message: 'Link deleted successfully',
      deletedLink,
    };
  }
}
