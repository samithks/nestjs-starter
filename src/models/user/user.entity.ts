import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique, UpdateDateColumn, OneToMany } from 'typeorm';
import { Gender } from './user.enum';
import { RoleMapping } from '../role-mapping/role-mapping.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn({ unsigned: true, })
  @Unique('user_id_uidx', ['id'])
  id: number;

  @Column(
    { type: 'varchar', length: 254 }
  )
  @Index('user_email_uidx', { unique: true })
  email: string;

  @Column(
    { type: 'varchar', length: 20 }
  )
  @Index('user_username_uidx', { unique: true })
  username: string;

  @Column(
    { type: 'varchar', name: 'phone_number', length: 20 }
  )
  @Index('user_phone_number_uidx', { unique: true })
  phoneNumber: string;

  @Column(
    { type: 'varchar', length: 30, name: 'full_name' }
  )
  fullName: string;

  @Exclude()
  @Column(
    { type: 'varchar', length: 150, select: false }
  )
  password: string;

  @Column(
    { name: 'email_verified', default: false }
  )
  emailVerified: boolean;

  @Column(
    { type: 'varchar', name: 'verification_token', select: false, length: 150, nullable: true }
  )
  verificationToken?: string | null;

  @Column(
    { type: 'date', nullable: true }
  )
  dob?: Date | null;

  @Column(
    { type: 'enum', enum: ['male', 'female', 'transgender'], nullable: true }
  )
  gender?: Gender | null;

  @Column(
    { type: 'datetime', name: 'created_at' }
  )
  @CreateDateColumn()
  createdAt: Date;

  @Column(
    { type: 'datetime', name: 'updated_at', nullable: true }
  )
  @UpdateDateColumn()
  updatedAt?: Date | null;

  @Column(
    { name: 'is_deleted', default: false }
  )
  isDeleted: boolean;

  @OneToMany(type => RoleMapping, roleMapping => roleMapping.user)
  roleMapping: RoleMapping[]

}