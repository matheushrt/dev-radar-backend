import devRoute from './dev-route';

export default app => {
  app.use('/dev', devRoute);
};
