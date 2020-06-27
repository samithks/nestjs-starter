import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isEmail, isString } from 'class-validator';

@Injectable()
export class EmailValidatePipe implements PipeTransform<string, string> {
    transform(value: string, metadata: ArgumentMetadata): string {
        if (!isString(value) || !isEmail(value)) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
}