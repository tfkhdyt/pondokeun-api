import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import type { Link } from './entities/link.entity';

@Injectable()
export class LinksService {
  private readonly links: Link[] = [];

  create(createLinkDto: CreateLinkDto) {
    const id = crypto.randomUUID();
    const date = new Date().toISOString();
    const slug = createLinkDto.slug ?? crypto.randomUUID().slice(0, 6);

    this.verifySlug(slug);

    const newLink: Link = {
      id,
      link: createLinkDto.link,
      slug,
      createdDate: date,
      updatedDate: date,
    };

    this.links.push(newLink);

    return {
      status: 'success',
      shortenedLink: newLink,
    };
  }

  findAll() {
    return this.links;
  }

  findOne(id: string) {
    const index = this.links.findIndex((link) => link.id === id);
    if (index === -1) {
      throw new NotFoundException('Link not found');
    }
    return this.links[index];
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }

  verifySlug(slug: string) {
    const data = this.links.find((link) => link.slug === slug);

    if (data) {
      throw new BadRequestException('Slug already in use');
    }
  }
}
