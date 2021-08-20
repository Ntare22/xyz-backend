import { UserRoles } from '../../user.roles.enum';
import { User } from '../../schema/user.schema';

export const userStub = (): User => {
    return {
        companies: [],
        id: 'dfadadfwefadf',
        firstName: 'Jim',
        lastName: 'Ntare',
        email: 'jim@gmail.com',
        nidNumber: '1234567890123456',
        phoneNumber: '12343524',
        password: 'ntad#r4hfasNds',
        role: UserRoles.OWNER,
        verifiedEmail: true
    }
}

  