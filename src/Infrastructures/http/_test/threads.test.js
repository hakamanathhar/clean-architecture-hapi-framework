const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');


const addUser = async ()=>{
    // Arrange
    const requestPayload = {
        username: 'hakaman',
        password: 'secret',
    };
    // eslint-disable-next-line no-undef
    const server = await createServer(container);

    // add user
    await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
            username: requestPayload.username,
            password: requestPayload.password,
            fullname: 'Hakaman Forever',
        },
    });
    return requestPayload
}

authLogin = async()=>{
    const requestPayload = await addUser()
    // Auth
    const server = await createServer(container);
    const responseAuth = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
    });
    return responseAuth
}

describe('/thread endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  describe('when POST /threads', () => {
    it('should response 201 and persisted user', async () => {
        const responseAuth = await authLogin()

        const requestPayloadThread = {
            title: 'Thread Pertama',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            owner: 'user-123',
        };      
        const server = await createServer(container);
        // Action
        const response = await server.inject({
            method: 'POST',
            url: '/threads',
            payload: requestPayloadThread,
            headers: {
                authorization: responseAuth.result.data.accessToken
            }
        });

        // Assert
        const responseJson = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(201);
        expect(responseJson.status).toEqual('success');
        expect(responseJson.data.addedThread).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const responseAuth = await authLogin()
      const requestPayload = {
        title: 'Thread Pertama',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
            authorization: responseAuth.result.data.accessToken
        }
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('pastikan data thread yang dikirimkan sudah benar');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const responseAuth = await authLogin()
      const requestPayload = {
        title: 'Thread Pertama',
        body: true,
        owner: 'user-123',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
            authorization: responseAuth.result.data.accessToken
        }
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread karena tipe data tidak sesuai');
    });
  });
});