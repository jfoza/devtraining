import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from '../../tags/entities/tags.entity';
import { JoinTable } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinTable()
  @ManyToMany(() => Tag, (tag: Tag) => tag.courses, {
    cascade: true,
  })
  tags: Tag[];
}
