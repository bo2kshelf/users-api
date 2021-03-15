import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUser(
    @Query('id') id?: string,
    @Query('uniqueName') uniqueName?: string,
  ) {
    if (!id && !uniqueName) throw new BadRequestException();

    const user = await this.usersService.findUser({id, uniqueName});
    if (!user) throw new NotFoundException();

    return user;
  }
}
