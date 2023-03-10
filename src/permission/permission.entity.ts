import {
    Collection,
    Entity,
    EntityRepositoryType,
    Enum,
    JsonType,
    ManyToOne,
    OneToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { User } from 'src/user/user.entity';
import { PermissionRepository } from './permission.repository';

@Entity({ customRepository: () => PermissionRepository })
export class Permission {

    [EntityRepositoryType]?: PermissionRepository;

    @PrimaryKey()
    id!: number;

    @Property()
    module_name!: string;
    
    @Property()
    create_permission! : boolean;

    @Property()
    read_permission! : boolean;

    @Property()
    update_permission! : boolean;

    @Property()
    delete_permission! : boolean;

    @ManyToOne()
    user!: User;


    constructor( module_name : string, create_permission: boolean, read_permission: boolean, update_permission: boolean, delete_permission : boolean ) {
        this.module_name = module_name;
        this.create_permission = create_permission;
        this.read_permission = read_permission;
        this.update_permission = update_permission;
        this.delete_permission = delete_permission;
    }

}