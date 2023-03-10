import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { DI } from '../server';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const shop = await DI.shopRepository.find({},{
    populate: ['products', 'owner'],
  });
  res.json(shop);
});

export const MainController = router;
