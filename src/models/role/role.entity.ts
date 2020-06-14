import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { RoleMapping } from '../role-mapping/role-mapping.entity';
import { Name } from './role.enum';

@Entity()
export class Role {

  @PrimaryGeneratedColumn({ unsigned: true, })
  @Unique('role_id_uidx', ['id'])
  id: number;

  @Column(
    { type: 'enum', enum: ['user', 'admin'] }
  )
  @Index('role_name_uidx', { unique: true })
  name: Name;

  @Column(
    { type: 'datetime', name: 'created_at' }
  )
  @CreateDateColumn()
  createdAt: Date;

  @Column(
    { type: 'datetime', name: 'updated_at', nullable: true }
  )
  @UpdateDateColumn()
  updatedAt: Date;

  @Column(
    { name: 'is_deleted', default: false }
  )
  isDeleted: boolean;

  @OneToMany(type => RoleMapping, roleMapping => roleMapping.role)
  roleMapping: RoleMapping[]
}