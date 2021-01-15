import {Test, TestingModule} from '@nestjs/testing';
import {UsersResolver} from '../../users.resolver';
import {UsersService} from '../../users.service';

jest.mock('../../users.service');

describe(UsersResolver.name, () => {
  let module: TestingModule;

  let usersService: UsersService;
  let usersResolver: UsersResolver;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [UsersService, UsersResolver],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersResolver = module.get<UsersResolver>(UsersResolver);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(usersResolver).toBeDefined();
  });

  describe('user()', () => {});

  describe('createUser()', () => {});

  describe('updateUser()', () => {});

  describe('deleteUser()', () => {});
});
