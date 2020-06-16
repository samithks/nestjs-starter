import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoleMapping, IRoleMappingCreate } from './interfaces';
import { RoleMapping } from './role-mapping.entity';

@Injectable()
export class RoleMappingService {
  constructor(
    @InjectRepository(RoleMapping)
    private readonly roleMappingRepository: Repository<RoleMapping>,
  ) { }

  /**
   * To create a role mapping
   *
   * @param {IRoleMappingCreate} createMapping
   * @returns {Promise<IRoleMapping>}
   * @memberof RoleMappingService
   */
  async create(createMapping: IRoleMappingCreate): Promise<IRoleMapping> {
    return await this.roleMappingRepository.save(createMapping);
  }
}
