import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMapping } from './role-mapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleMapping])],
  providers: [],
  exports: []
})
export class RoleMappingModule { }