import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';

export const createRequest = {
    email: 'oleg14ua71@gmail.com',
    fullname: 'Oleh Strokan',
    username: 'stroka01',
    password: '88488848',
};
export const createResponse = {
    id: expect.any(Number),
    email: 'oleg18ua71@gmail.com',
    fullname: 'Oleh Strokan',
    username: 'stroka01',
    password: '88488848',
    activationLink: 'http://localhost:5000/290jrf-8203d9i-23jd8923j',
    isActivated: false,
    activated: false,
    banReason: null,
    about: null,
    blockedUsers: [],
    followers: [],
    follows: [],
    roles: [],
};

describe('UserController', () => {
    let controller: UserController;

    const mockUsersService = {
        create: jest.fn((dto) => {
            return {
                id: Date.now(),
                ...dto,
                activationLink:
                    'http://localhost:5000/290jrf-8203d9i-23jd8923j',
                isActivated: false,
                activated: false,
                banReason: null,
                about: null,
                blockedUsers: [],
                followers: [],
                follows: [],
                roles: [],
            } as UserModel;
        }),
        addRole: jest.fn((id, dto) => {
            return { id, dto };
        }),
    };

    const addRoleRequest = { id: Date.now(), dto: { value: 'USER' } };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideProvider(UserService)
            .useValue(mockUsersService)
            .compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    it('should create a user with corrent data', () => {
        expect(controller.create(createRequest)).toEqual(createResponse);
    });
    it('should be called with request data', () => {
        expect(mockUsersService.create).toHaveBeenCalledWith(createRequest);
    });
    it("should add user's role", () => {
        expect(
            controller.addRole(addRoleRequest.id, addRoleRequest.dto),
        ).toEqual({
            id: expect.any(Number),
            dto: { value: 'USER' },
        });
    });
    it('should be called with request data', () => {
        expect(mockUsersService.addRole).toHaveBeenCalledWith(
            addRoleRequest.id,
            addRoleRequest.dto,
        );
    });
});
