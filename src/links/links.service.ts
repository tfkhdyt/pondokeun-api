import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import type { Link } from './entities/link.entity';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async create(createLinkDto: CreateLinkDto) {
    const id = crypto.randomUUID();
    const date = new Date().toISOString();
    const slug = createLinkDto.slug ?? crypto.randomUUID().slice(0, 6);

    const newLink: Link = {
      id,
      link: createLinkDto.link,
      slug,
      createdDate: date,
      updatedDate: date,
    };

    await this.prisma.link.create({ data: newLink });

    return newLink;
  }

  async findAll() {
    return await this.prisma.link.findMany();
  }

  async findOne(id: string) {
    const data = await this.prisma.link.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      throw new NotFoundException('Link not found');
    }

    return data;
  }

  async findOneBySlug(slug: string) {
    const data = await this.prisma.link.findUnique({
      where: {
        slug,
      },
    });

    if (!data) {
      throw new NotFoundException('Link not found');
    }

    return data;
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    const link = this.prisma.link.update({
      where: { id },
      data: {
        ...updateLinkDto,
        updatedDate: new Date().toISOString(),
      },
    });

    return link;
  }

  async remove(id: string) {
    return await this.prisma.link.delete({
      where: {
        id,
      },
    });
  }

  async verifySlug(slug: string) {
    const data = await this.prisma.link.findUnique({ where: { slug } });

    if (data) {
      throw new BadRequestException('Slug already in use');
    }
  }
}
