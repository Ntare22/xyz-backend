import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { NormalUser, NormalUserDocument } from "./schema/reg-users.schema";
import { EntityRepository } from "src/db/entity.repository";
import { RegCompany, RegCompanyDocument } from "./schema/reg-company.schema";

@Injectable()
export class NormalUserRepository extends EntityRepository<NormalUserDocument> {
    constructor(@InjectModel(NormalUser.name) normalUserModel: Model<NormalUserDocument>) {
        super(normalUserModel)
    }
}

@Injectable()
export class CompanyRepository extends EntityRepository<RegCompanyDocument> {
    constructor(@InjectModel(RegCompany.name) companyModel: Model<RegCompanyDocument>) {
        super(companyModel)
    }
}