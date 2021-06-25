import { ArgumentsHost, Catch, ConflictException, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongoose/node_modules/mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch (exception: MongoError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        switch (exception.code) {
            case 11000:
                return response.status(400).json({
                    message: 'phone number or email already exists'
                });
            default:
                response.status(500).json({
                    message: 'server error'
                }) 
        }
    }
}