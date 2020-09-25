import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from 'nestjs-objection';
import { User } from './models/user.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  public async authorize(login: string, password: string): Promise<string> {
    const user = await this.validateUser(login, password);

    if (!user) {
      throw new RpcException('User not found.');
    }

    return this.createToken(user);
  }

  public validateToken(token: string): boolean {
    try {
      return Boolean(this.jwtService.verify(token));
    } catch (error) {
      return false;
    }
  }

  private createToken({ id, login }: User): string {
    return this.jwtService.sign({ id, login });
  }

  private async validateUser(
    login: string,
    password: string,
  ): Promise<User | undefined> {
    return this.userModel.query().findOne<User>({ login, password });
  }
}
