import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
// import { InferSubjects } from "nest-casl";
import { DefaultActions } from "src/app.action";
import { Roles } from "src/app.roles";
import { Shop } from "src/shop/shop.entity";
import { User } from "src/user/user.entity";


type Subjects = InferSubjects<typeof Shop | typeof User> | 'all';

export type AppAbility = Ability<[DefaultActions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForShop(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[DefaultActions, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
        
    if (user.role == Roles.SUPERADMIN) {

      can(DefaultActions.read, Shop);
      can(DefaultActions.create, Shop);
      can(DefaultActions.update, Shop);
      can(DefaultActions.delete, Shop);

    }else if (user.role == Roles.ADMIN) {

      can(DefaultActions.read, Shop);
      cannot(DefaultActions.create, Shop);
      cannot(DefaultActions.update, Shop);
      cannot(DefaultActions.delete, Shop);

    }else if (user.role == Roles.MEMBER) {
      // console.log(Shop);
      
      can(DefaultActions.read, Shop);
      can(DefaultActions.create, Shop);
      can(DefaultActions.update, Shop, {owner : user });
      can(DefaultActions.delete, Shop, {owner : user});      

    }else {

      can(DefaultActions.read, Shop);
      cannot(DefaultActions.create, Shop);
      cannot(DefaultActions.update, Shop);
      cannot(DefaultActions.delete, Shop);

    }

    
    // can(DefaultActions.read, Shop, { owner : user });
    // return build();

    // return build({
    //   // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
    //   detectSubjectType: (item) =>
    //     item.constructor as ExtractSubjectType<Subjects>,
    // });

    return build({
      // @ts-ignore
      detectSubjecType: type => type!.constructor
    })
  }
}
