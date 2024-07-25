import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './courses.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'test',
      description: 'test',
      tags: ['test'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find((course) => course.id === id);

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  create(createCourseDto: CreateCourseDto) {
    let id = 1;

    if (this.courses.length > 0) {
      id = this.courses.reduce((maxId, obj) => {
        return obj.id > maxId ? obj.id : maxId;
      }, this.courses[0].id + 1);
    }

    const courseCreated = {
      id,
      name: createCourseDto.name,
      description: createCourseDto.description,
      tags: createCourseDto.tags,
    };

    this.courses.push(courseCreated);

    return courseCreated;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    const existingCourse = this.courses.find((course) => course.id === id);

    if (!existingCourse) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const index = this.courses.findIndex((course) => course.id === id);

    const updatedCourse = {
      name: updateCourseDto.name,
      description: updateCourseDto.description,
      tags: updateCourseDto.tags,
    };

    this.courses[index] = { ...updatedCourse, id: this.courses[index].id };

    return this.courses[index];
  }

  remove(id: number) {
    const existingCourse = this.courses.find((course) => course.id === id);

    if (!existingCourse) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const index = this.courses.findIndex((course) => course.id === id);

    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}
