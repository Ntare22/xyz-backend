import { UserRoles } from '../../user.roles.enum';
import { User } from '../../schema/user.schema';
import { Types } from 'mongoose';

const obejctId: any = Types.ObjectId;

export const userStub = (): User => {
    return {
        id: obejctId,
        firstName: 'Jim',
        lastName: 'Ntare',
        email: 'jim@gmail.com',
        nidNumber: '1234567890123456',
        phoneNumber: '12343524',
        password: 'ntad#r4hfasNds',
        role: UserRoles.OWNER,
        companies: [],
        verifiedEmail: true,
        normalUsers: [],
        company: []
    }
}

  