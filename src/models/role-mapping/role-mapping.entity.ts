import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { User } from '../user/user.entity';

@Entity()
@Index('role_mapping_role_uidx', ['userId', 'roleId'], { unique: true })
export class RoleMapping {

    @PrimaryGeneratedColumn({ unsigned: true, })
    @Unique('role_mapping_id_uidx', ['id'])
    id: number;

    @Column(
        { type: 'int', unsigned: true, name: 'user_id' }
    )
    userId: number;

    @Column(
        { type: 'int', unsigned: true, name: 'role_id' }
    )
    roleId: number;

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

    @ManyToOne(type => User, {
        cascade: ['remove']
    })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User

    @ManyToOne(type => Role, {
        cascade: ['remove']
    })
    @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
    role: Role;
}