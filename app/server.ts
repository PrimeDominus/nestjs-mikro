import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';

// import { AuthorController, BookController } from './controllers';
import { MainController } from './controllers';
import { User, Shop, Product } from './entities';

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<User>,
  shopRepository: EntityRepository<Shop>,
  productRepository: EntityRepository<Product>,
};

export const app = express();
const port = process.env.PORT || 3000;

export const init = (async () => {
  DI.orm = await MikroORM.init();
  // DI.orm.getMigrator().up();
  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.shopRepository = DI.orm.em.getRepository(Shop);
  DI.productRepository = DI.orm.em.getRepository(Product);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!' }));
  // app.use('/author', AuthorController);
  // app.use('/book', BookController);
  app.use('/main', MainController);

  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
})();
