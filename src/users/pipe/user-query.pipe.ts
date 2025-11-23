import { Injectable, PipeTransform } from '@nestjs/common';
import { UserQuery } from '../types/users-pagination.types';

@Injectable()
export class UserQueryPipe implements PipeTransform {
  transform(value: UserQuery): Partial<UserQuery> {
    const page = Number(value?.page) || 1;
    const limit = Number(value?.limit) || 10;
    const skip = (page - 1) * limit;
    return { ...value, page, limit, skip } as Partial<UserQuery>;
  }
}
