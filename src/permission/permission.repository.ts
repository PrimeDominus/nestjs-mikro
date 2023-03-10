import { EntityRepository } from '@mikro-orm/postgresql';
import { Permission } from './permission.entity';


export class PermissionRepository extends EntityRepository<Permission> {

}