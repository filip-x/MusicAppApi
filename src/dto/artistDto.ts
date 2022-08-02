import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  starting_date: Date;
}
