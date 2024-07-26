import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }

  async findOne(id: string): Promise<Tag> {
    const tag: Tag = await this.tagRepository.findOne({
      where: { id },
    });

    if (!tag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }

    return tag;
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag: Tag = this.tagRepository.create(createTagDto);

    return this.tagRepository.save(tag);
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag: Tag = await this.tagRepository.preload({
      ...updateTagDto,
      id,
    });

    if (!tag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }

    return this.tagRepository.save(tag);
  }

  async remove(id: string): Promise<void> {
    const tag: Tag = await this.tagRepository.findOne({
      where: { id },
    });

    if (!tag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }

    await this.tagRepository.remove(tag);
  }
}
