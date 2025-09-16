import { IUserService } from "src/interface/interfaces";

export class UserService implements IUserService {
  async signUp(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> {
    
  }

  async signIn(data: { email: string; password: string }): Promise<void> {}
}
