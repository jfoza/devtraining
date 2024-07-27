import { randomUUID } from 'node:crypto';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/courses.entity';
import { Tag } from '../tags/entities/tags.entity';
import { UpdateCourseDto } from './dto/update-course.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let updated_at: Date;

  let expectOutTags: any[];
  let expectOutCourses: any[];

  let courseRepositoryMock: any;
  let tagRepositoryMock: any;

  let courseMock: Course;
  let tagMock: Tag;

  beforeEach(async () => {
    service = new CoursesService();

    id = randomUUID();
    created_at = new Date();
    updated_at = new Date();

    courseMock = {
      id,
      name: 'test',
      description: 'test',
      tags: expectOutTags,
      created_at,
      updated_at,
    };

    tagMock = {
      id,
      name: 'test',
      courses: [courseMock],
      created_at,
      updated_at,
    };

    expectOutTags = [tagMock];

    expectOutCourses = [courseMock];

    courseRepositoryMock = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(courseMock)),
      update: jest.fn().mockReturnValue(Promise.resolve(courseMock)),
      preload: jest.fn().mockReturnValue(Promise.resolve(courseMock)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(courseMock)),
      remove: jest.fn().mockReturnValue(Promise.resolve()),
    };

    tagRepositoryMock = {
      create: jest.fn().mockReturnValue(Promise.resolve(tagMock)),
      save: jest.fn().mockReturnValue(Promise.resolve(tagMock)),
      update: jest.fn().mockReturnValue(Promise.resolve(tagMock)),
      preload: jest.fn().mockReturnValue(Promise.resolve(tagMock)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutTags)),
      find: jest.fn().mockReturnValue(Promise.resolve(tagMock)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(tagMock)),
      remove: jest.fn().mockReturnValue(Promise.resolve()),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test should crete new course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = courseRepositoryMock;

    // @ts-expect-error defined part of methods
    service['tagRepository'] = tagRepositoryMock;

    const createCoursesDTO: CreateCourseDto = {
      name: 'test',
      description: 'test',
      tags: ['test'],
    };

    const created = await service.create(createCoursesDTO);

    expect(courseRepositoryMock.save).toHaveBeenCalled();
    expect(courseMock).toStrictEqual(created);
  });

  it('test should return courses list', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = courseRepositoryMock;

    // @ts-expect-error defined part of methods
    service['tagRepository'] = tagRepositoryMock;

    const courses = await service.findAll();

    expect(courseRepositoryMock.find).toHaveBeenCalled();
    expect(expectOutCourses).toStrictEqual(courses);
  });

  it('test should return unique course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = courseRepositoryMock;

    // @ts-expect-error defined part of methods
    service['tagRepository'] = tagRepositoryMock;

    const course = await service.findOne(id);

    expect(courseRepositoryMock.findOne).toHaveBeenCalled();
    expect(courseMock).toStrictEqual(course);
  });

  it('test should update unique course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = courseRepositoryMock;

    // @ts-expect-error defined part of methods
    service['tagRepository'] = tagRepositoryMock;

    const updateCoursesDTO: UpdateCourseDto = {
      name: 'test',
      description: 'test',
      tags: ['test'],
    };

    const updated = await service.update(id, updateCoursesDTO);

    expect(courseRepositoryMock.save).toHaveBeenCalled();
    expect(courseRepositoryMock.preload).toHaveBeenCalled();
    expect(courseMock).toStrictEqual(updated);
  });

  it('test should remove unique course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = courseRepositoryMock;

    // @ts-expect-error defined part of methods
    service['tagRepository'] = tagRepositoryMock;

    await service.remove(id);

    expect(courseRepositoryMock.findOne).toHaveBeenCalled();
    expect(courseRepositoryMock.remove).toHaveBeenCalled();
  });
});
