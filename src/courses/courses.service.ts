import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tags/entities/tags.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async findOne(id: string): Promise<Course> {
    const course: Course = await this.courseRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const tags: Tag[] = await Promise.all(
      createCourseDto.tags.map((name: string) => this.preloadTagByName(name)),
    );

    const courseCreated = this.courseRepository.create({
      ...createCourseDto,
      tags,
    });

    return this.courseRepository.save(courseCreated);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const tags: Tag[] =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((name: string) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      ...updateCourseDto,
      id,
      tags,
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: string): Promise<void> {
    const course = await this.courseRepository.findOne({
      where: { id },
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    await this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag: Tag = await this.tagRepository.findOne({
      where: { name },
    });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
