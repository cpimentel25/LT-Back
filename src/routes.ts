import { Application } from 'express';
import user from './api/user/index';
import company from './api/company/index';
import inventory from './api/inventory/index';
import healthCheck from './api/healthCheckServer/index';
import authLocal from './auth/local/index';
import pdfServices from './pdfService/index';

function routes(app: Application) {
  // -> User
  app.use('/api/users', user);
  // -> Company
  app.use('/api/company', company);
  // -> Inventory
  app.use('/api/inventory', inventory);
  // -> check health server
  app.use('/hc', healthCheck);
  // -> login user
  app.use('/auth/local', authLocal);
  // -> pdfService
  app.use('/pdf', pdfServices);
};

export default routes;
