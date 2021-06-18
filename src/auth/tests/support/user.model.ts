import { User } from "../../schema/user.schema";
import { MockModel } from "../../../db/test/support/mock.model";
import { userStub } from "../stubs/user.stub";

export class UserModel extends MockModel<User> {
    protected entityStub = userStub();
} 