import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from '../../users.service';

describe(UsersService.name, () => {
  let module: TestingModule;

  let usersService: UsersService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('getUser()', () => {});

  describe('getUsers()', () => {});

  describe('createUser()', () => {});

  describe('updateUser()', () => {});

  describe('deleteUser()', () => {});
});
