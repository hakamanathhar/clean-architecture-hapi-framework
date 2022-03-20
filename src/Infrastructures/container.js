/* istanbul ignore file */
 
const { createContainer } = require('instances-container')
 
// external agency
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const Jwt = require('@hapi/jwt')
const pool = require('./database/postgres/pool')
const fs = require('fs')
 
// service (repository, helper, manager, etc)
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres')
const BcryptPasswordHash = require('./security/BcryptPasswordHash')
 
// use case
const AddUserUseCase = require('../Applications/use_case/users/AddUserUseCase')
const UserRepository = require('../Domains/users/UserRepository')
const PasswordHash = require('../Applications/security/PasswordHash')
const AuthTokenManager = require('../Applications/security/AuthTokenManager')
const JwtTokenManager = require('./security/JwtTokenManager')
const LoginUserUseCase = require('../Applications/use_case/authentication/LoginUserUseCase')
const AuthRepository = require('../Domains/authentications/AuthRepository')
const AuthRepositoryPostgres = require('./repository/AuthRepositoryPostgres')
const LogoutUserUseCase = require('../Applications/use_case/authentication/LogoutUserUseCase')
const RefreshAuthUseCase = require('../Applications/use_case/authentication/RefreshAuthUseCase')
const ThreadRepository = require('../Domains/threads/ThreadRepository')
const AddThreadUseCase = require('../Applications/use_case/threads/AddThreadUseCase')
const ThreadRepositoryPostgres = require('./repository/ThreadRepositoryPostgres')
 
// creating container
const container = createContainer()
 
// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: AuthRepository.name,
    Class: AuthRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: ThreadRepository.name,
    Class: ThreadRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: AuthTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
])
 
// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
        {
          name: 'authTokenManager',
          internal: AuthTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthUseCase.name,
    Class: RefreshAuthUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authRepository',
          internal: AuthRepository.name,
        },
        {
          name: 'authTokenManager',
          internal: AuthTokenManager.name,
        },
      ],
    },
  },
  {
    key: AddThreadUseCase.name,
    Class: AddThreadUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'threadRepository',
          internal: ThreadRepository.name,
        },
        {
          name: 'authTokenManager',
          internal: AuthTokenManager.name,
        },
      ],
    },
  },
])
 
module.exports = container