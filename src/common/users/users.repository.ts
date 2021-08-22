import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { NormalUser, NormalUserDocument } from "./schema/users.schema";
import { EntityRepository } from "src/db/entity.repository";

@Injectable()
export class NormalUserRepository extends EntityRepository<NormalUserDocument> {
    constructor(@InjectModel(NormalUser.name) normalUserModel: Model<NormalUserDocument>) {
        super(normalUserModel)
    }
}