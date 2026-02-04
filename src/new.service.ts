import { ServerError, Status } from 'nice-grpc';
import {
  NewServiceImplementation,
  GetUserRequest,
  GetUserResponse,
} from './_gen/grpc/grpc/new';

export class NewServiceImpl implements NewServiceImplementation {
  async getUser(request: GetUserRequest): Promise<GetUserResponse> {
    console.log(`[Identity] GetUser called for: ${request.id}`);

    if (request.id === 'error') {
      throw new ServerError(Status.NOT_FOUND, 'User not found');
    }

    return {
      id: request.id,
      email: 'test@example.com',
      isActive: true,
    };
  }
}
