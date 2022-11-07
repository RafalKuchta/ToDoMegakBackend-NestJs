import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from '../user/user.entity';
import { hashPwd } from '../utils/hash-pwd';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import configuration from 'src/utils/config/configuration';

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    // const expiresIn = 60 * 60 * 24;
    const expiresIn = 60 * 60 * 8;
    const accessToken = sign(
      payload,
        configuration().server.secretKey,
      { expiresIn },
    );
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOne({
        where: {
          currentTokenId: token,
        },
      });
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await User.findOne({
        where: {
          email: req.email,
          pwdHash: hashPwd(req.pwd),
        },
      });

      if (!user) {
        return res.json({ error: 'Invalid login data!' });
      }

      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false /* na https ustawiamy true */,
          // domain: 'nest.networkmanager.pl',
          domain: 'localhost',
          sameSite: 'strict',
          httpOnly: true,
        })
        .json({
          ok: true,
          email: user.email,
          message: 'Udało się zalogować!',
        });
    } catch (e) {
      return res.json({
        ok: false,
        error: e.message,
      });
    }
  }

  async check(user: User, res: Response) {
    try {
      if (user.currentTokenId)
        return res.json({
          ok: true,
          email: user.email,
          roles: user.roles,
        });
    } catch (e) {
      return res.json({
        ok: false,
        error: e.message,
      });
    }
  }

  async logout(user: User, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: true,
        domain: 'nest.networkmanager.pl',
        sameSite: 'none',
        httpOnly: true,
      });
      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
