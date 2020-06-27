import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { IGetRoles, IRole } from './interfaces';
import { Role } from './role.entity';
import { Name } from './role.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  /**
   * To find the user by user name
   *
   * @param {Name} name The
   * @returns {Promise<IRole>}
   * @memberof RoleService
   */
  async findByRole(name: Name): Promise<IRole> {
    return await this.roleRepository.findOne({ name: name }, { select: ['id', 'name'] });
  }

  /**
   * To find the roles aby array of ids
   *
   * @param {number[]} id The
   * @returns {Promise<IGetRoles>}
   * @memberof RoleService
   */
  async getRolesByIds(id: number[]): Promise<IGetRoles> {
    const roleData = await this.roleRepository.find({ where: { id: In(id) }, select: ['name'] });
    return {roles: roleData.map((role) => role.name)};
  }
}
