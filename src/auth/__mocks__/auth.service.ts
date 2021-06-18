import { userStub } from "../tests/stubs/user.stub";

export const AuthService = jest.fn().mockReturnValue({
    signUp: jest.fn().mockResolvedValue(userStub())
})