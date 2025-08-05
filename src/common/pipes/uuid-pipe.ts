import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate as isUUID } from 'uuid';

@Injectable()
export class CustomUUIDPipe implements PipeTransform {
  transform(value: string) {
    if (!isUUID(value)) {
      throw new BadRequestException({
        success: false,
        statusCode: 400,
        message: 'Invalid UUID format. Please provide a valid UUID.',
        error: 'Bad Request',
      });
    }
    return value;
  }
}
