import { Container } from 'typedi';
import config from '../../../config';
import IUserRepo from '../../services/IRepos/IUserRepo';
import winston from 'winston';

const guarder = async (req, res, next, requiredRole: string[]) => {
  const Logger = Container.get('logger') as winston.Logger;

  try {
    const userRepo = Container.get(config.repos.user.name) as IUserRepo;
    const user = await userRepo.findById(req.token.id);

    if (!requiredRole.some(role => user.role.name === role)) {
      next(new Error('User not allowed to do the operation'));
    }
    next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default guarder;
