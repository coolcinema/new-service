import { ServerError, Status } from 'nice-grpc';
import {
  IdentityServiceImplementation,
  GetUserRequest,
  GetUserResponse,
} from './_gen/grpc/grpc/identity';

export class IdentityServiceImpl implements IdentityServiceImplementation {
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
