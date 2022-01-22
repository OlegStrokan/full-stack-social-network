import { UserService } from '../user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { MailService } from '../../mail/mail.service';
import { RoleService } from '../../role/role.service';
import { RoleModel } from '../../role/models/role.model';
import { createRequest, createResponse } from './user.controller.spec';


describe('UserService', () => {
    let service: UserService;

    const mockUserRepository = {
        create: jest.fn((dto) => dto),
        save: jest.fn((user) => Promise.resolve(createResponse))
    };

    const mockRoleRepository = {
            findOne: jest.fn((id) => {
                return {
                    id,
                    value: 'USER',
                    description: 'User permission'
                } as RoleModel
            })
    }

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                MailService,
                RoleService,
                {
                    provide: getModelToken(UserModel),
                    useValue: mockUserRepository,
                },
                {
                    provide: getModelToken(RoleModel),
                    useValue: mockRoleRepository,
                },

            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new user and return that', async() => {
        expect(await service.create(createRequest)).toEqual(createResponse);
    });

});
