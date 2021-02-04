/* eslint-disable class-methods-use-this */
import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const userFound = await this.usersRepository.findByEmail(email);

    if (!userFound) throw new AppError('User does not exist.');

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const { token } = await this.userTokensRepository.generate(userFound.id);

    await this.mailProvider.sendMail({
      to: {
        name: userFound.name,
        email: userFound.email,
      },
      subject: '[GoBarber] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: userFound.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
