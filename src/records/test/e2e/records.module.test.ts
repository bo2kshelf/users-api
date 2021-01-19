import {INestApplication} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {Test} from '@nestjs/testing';
import {gql} from 'apollo-server-express';
import {ApolloServerTestClient, createTestClient} from 'apollo-server-testing';
import {RecordsModule} from '../../records.module';
import {RecordsService} from '../../records.service';

jest.mock('../../records.service');

describe(`${RecordsModule.name} w/o DB Access`, () => {
  let app: INestApplication;

  let apolloClient: ApolloServerTestClient;

  let recordsService: RecordsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [GraphQLModule.forRoot({autoSchemaFile: true}), RecordsModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const {apolloServer} = module.get<GraphQLModule>(GraphQLModule);
    apolloClient = createTestClient(apolloServer as any);

    recordsService = module.get<RecordsService>(RecordsService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('application should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('record()', () => {
    describe('validate', () => {
      const QueryGetRecord = gql`
        query($id: ID!) {
          record(id: $id) {
            id
            have
            read
            reading
            book {
              id
            }
          }
        }
      `;

      it.each([{id: '1'}])('正常系 %#', async (variables) => {
        const mock = jest.fn();
        jest.spyOn(recordsService, 'getRecord').mockImplementation(mock);
        await apolloClient.query({
          query: QueryGetRecord,
          variables,
        });
        expect(mock).toHaveBeenCalled();
      });

      it.each(['a', '12.34'])(
        'idにIntに変換不可能な文字列%sを渡すと弾く',
        async (id) => {
          const mock = jest.fn();
          jest.spyOn(recordsService, 'getRecord').mockImplementation(mock);
          await apolloClient.query({query: QueryGetRecord, variables: {id}});
          expect(mock).not.toHaveBeenCalled();
        },
      );
    });
  });

  describe('createRecord()', () => {
    describe('validate', () => {
      const QueryCreateRecord = gql`
        mutation(
          $bookId: ID!
          $read: Boolean!
          $reading: Boolean!
          $have: Boolean!
          $userShortName: ID!
        ) {
          createRecord(
            data: {
              bookId: $bookId
              read: $read
              reading: $reading
              have: $have
              user: {shortName: $userShortName}
            }
          ) {
            id
            have
            read
            reading
            book {
              id
            }
          }
        }
      `;

      it.each([
        {
          bookId: '5ff7f15c40011f189e76ec22',
          read: true,
          reading: true,
          have: true,
          userShortName: 'testuser',
        },
      ])('正常系 %#', async (variables) => {
        const mock = jest.fn();
        jest.spyOn(recordsService, 'createRecord').mockImplementation(mock);
        await apolloClient.mutate({
          mutation: QueryCreateRecord,
          variables,
        });
        expect(mock).toHaveBeenCalled();
      });

      it.each(['1'])(
        'data.bookIdにMongoDB ObjectIdでない%sを渡すと弾く',
        async (bookId) => {
          const mock = jest.fn();
          jest.spyOn(recordsService, 'createRecord').mockImplementation(mock);
          await apolloClient.mutate({
            mutation: QueryCreateRecord,
            variables: {
              bookId,
              read: true,
              reading: true,
              have: true,
              userShortName: 'testuser',
            },
          });
          expect(mock).not.toHaveBeenCalled();
        },
      );

      it.each(['a'])(
        'data.user.shortNameにUserIdでない%sを渡すと弾く',
        async (shortName) => {
          const mock = jest.fn();
          jest.spyOn(recordsService, 'createRecord').mockImplementation(mock);
          await apolloClient.mutate({
            mutation: QueryCreateRecord,
            variables: {
              bookId: '1',
              read: true,
              reading: true,
              have: true,
              userShortName: shortName,
            },
          });
          expect(mock).not.toHaveBeenCalled();
        },
      );
    });
  });

  describe('updateRecord()', () => {
    describe('validate', () => {
      const QueryDeleteRecord = gql`
        mutation(
          $id: ID!
          $bookId: ID
          $read: Boolean
          $reading: Boolean
          $have: Boolean
        ) {
          updateRecord(
            where: {id: $id}
            data: {bookId: $bookId, read: $read, reading: $reading, have: $have}
          ) {
            id
            read
            reading
            have
            book {
              id
            }
          }
        }
      `;

      it.each([
        {
          id: '1',
          bookId: '5ff7f15c40011f189e76ec22',
          read: true,
          reading: true,
          have: true,
        },
      ])('正常系 %#', async (variables) => {
        const mock = jest.fn();
        jest.spyOn(recordsService, 'updateRecord').mockImplementation(mock);
        await apolloClient.query({
          query: QueryDeleteRecord,
          variables,
        });
        expect(mock).toHaveBeenCalled();
      });

      it.each(['a', '12.34'])(
        'where.idにIntに変換不可能な文字列%sを渡すと弾く',
        async (id) => {
          const mock = jest.fn();
          jest.spyOn(recordsService, 'updateRecord').mockImplementation(mock);
          await apolloClient.query({
            query: QueryDeleteRecord,
            variables: {id},
          });
          expect(mock).not.toHaveBeenCalled();
        },
      );

      it.each(['1'])(
        'data.bookIdにMongoDB ObjectIdでない%sを渡すと弾く',
        async (bookId) => {
          const mock = jest.fn();
          jest.spyOn(recordsService, 'updateRecord').mockImplementation(mock);
          await apolloClient.query({
            query: QueryDeleteRecord,
            variables: {
              id: '1',
              bookId,
            },
          });
          expect(mock).not.toHaveBeenCalled();
        },
      );
    });
  });

  describe('deleteRecord()', () => {
    describe('validate', () => {
      const QueryDeleteRecord = gql`
        mutation($id: ID!) {
          deleteRecord(where: {id: $id}) {
            id
          }
        }
      `;

      it.each([{id: '1'}])('正常系 %#', async (variables) => {
        const mock = jest.fn();
        jest.spyOn(recordsService, 'deleteRecord').mockImplementation(mock);
        await apolloClient.query({
          query: QueryDeleteRecord,
          variables,
        });
        expect(mock).toHaveBeenCalled();
      });

      it.each(['a', '12.34'])(
        'where.idにIntに変換不可能な文字列%sを渡すと弾く',
        async (id) => {
          const mock = jest.fn();
          jest.spyOn(recordsService, 'deleteRecord').mockImplementation(mock);
          await apolloClient.query({
            query: QueryDeleteRecord,
            variables: {id},
          });
          expect(mock).not.toHaveBeenCalled();
        },
      );
    });
  });
});
