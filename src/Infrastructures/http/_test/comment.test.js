const pool = require('../../database/postgres/pool');
const container = require('../../container');
const createServer = require('../createServer');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');


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

addThreadData = async() => {
  const data = {
    id: '123',
    title: 'AddThread Test',
    body: 'Lorem Ipsum is simply',
    owner: 'user-kIb7RsEyKODmRoFT22FSR',
    username: 'hakaman',
  }
  await ThreadsTableTestHelper.addThread(data)
  return data
}

describe('/comment endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
  });

  describe('when POST /comments', () => {
    it('should response 201 and persisted user', async () => {
        const responseAuth = await authLogin()
        const responseThread = await addThreadData()
        const threadId = responseThread.id
        const requestPayloadComment = {
            content: 'Keren',
            threadId: threadId
        };      
        const server = await createServer(container);
        // Action
        const response = await server.inject({
            method: 'POST',
            url: `/threads/${threadId}/comments`,
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
      const responseThread = await addThreadData()
      const requestPayload = {
      };
      const threadId = responseThread.id
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
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
      const responseThread = await addThreadData()
      const threadId = responseThread.id
      const requestPayload = {
        content: true,
        threadId: threadId
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
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