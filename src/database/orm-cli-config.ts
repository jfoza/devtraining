import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCoursesTable1721947512822 } from '../migrations/1721947512822-CreateCoursesTable';
import { CreateDbStructure1721946858929 } from '../migrations/1721946858929-CreateDbStructure';
import { CreateTagsTable1721948387241 } from '../migrations/1721948387241-CreateTagsTable';
import { CreateCoursesTagsTable1721949702639 } from '../migrations/1721949702639-CreateCoursesTagsTable';
import { AddCourseIdAndTagIdToCoursesTags1721950140040 } from '../migrations/1721950140040-AddCourseIdAndTagIdToCoursesTags';
import { Course } from '../courses/entities/courses.entity';
import { Tag } from '../tags/entities/tags.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateDbStructure1721946858929,
    CreateCoursesTable1721947512822,
    CreateTagsTable1721948387241,
    CreateCoursesTagsTable1721949702639,
    AddCourseIdAndTagIdToCoursesTags1721950140040,
  ],
});
