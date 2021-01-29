import {NotFoundException} from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import {RecordEntity} from '../records/record.entity';
import {CreateProfileArgs} from './dto/create-profile.dto';
import {ProfileArgs} from './dto/profile.dto';
import {ProfileRecordsArgs} from './dto/records.dto';
import {ProfileEntity} from './profile.entity';
import {ProfilesService} from './profiles.service';

@Resolver(() => ProfileEntity)
export class ProfilesResolver {
  constructor(private readonly profileService: ProfilesService) {}

  @ResolveReference()
  resolveReference(reference: {__typename: string; id: string}) {
    return this.profile({id: reference.id});
  }

  @ResolveField(() => [RecordEntity])
  async records(
    @Parent() {id}: ProfileEntity,
    @Args({type: () => ProfileRecordsArgs})
    args: ProfileRecordsArgs,
  ) {
    return this.profileService.getRecords({id}, args);
  }

  @Query(() => ProfileEntity)
  async profile(@Args({type: () => ProfileArgs}) where: ProfileArgs) {
    const result = await this.profileService.getProfile(where);
    if (!result) throw new NotFoundException(where);
    return result;
  }

  @Mutation(() => ProfileEntity)
  async createProfile(
    @Args({type: () => CreateProfileArgs}) {data}: CreateProfileArgs,
  ) {
    return this.profileService.createProfile(data);
  }
}
