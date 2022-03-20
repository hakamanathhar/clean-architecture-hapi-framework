const pool = require('../../database/postgres/pool');
const container = require('../../container');
const createServer = require('../createServer');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');


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

describe('/comment endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
  });

  describe('when POST /comments', () => {
    it('should response 201 and persisted user', async () => {
        const responseAuth = await authLogin()

        const requestPayloadComment = {
            content: 'Keren',
            threadId: 'thread-123',
        };      
        const server = await createServer(container);
        // Action
        const response = await server.inject({
            method: 'POST',
            url: '/comments',
            payload: requestPayloadComment,
            headers: {
                authorization: responseAuth.result.data.accessToken
            }
        });

        // Assert
        const responseJson = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(201);
        expect(responseJson.status).toEqual('success');
        expect(responseJson.data.addedComment).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const responseAuth = await authLogin()
      const requestPayload = {
        content: 'Keren',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/comments',
        payload: requestPayload,
        headers: {
            authorization: responseAuth.result.data.accessToken
        }
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('pastikan data comment yang dikirimkan sudah benar');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const responseAuth = await authLogin()
      const requestPayload = {
        content: 'Keren',
        threadId: 123,
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/comments',
        payload: requestPayload,
        headers: {
            authorization: responseAuth.result.data.accessToken
        }
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat comment karena tipe data tidak sesuai');
    });
  });
});