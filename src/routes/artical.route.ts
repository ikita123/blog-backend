import { Router } from 'express';

import { ArticalController } from '../controllers';
import { RoutePath } from '../constants';


const { articalRoute } = RoutePath;
const router: Router = Router();


router.get(
	articalRoute.webAppList,
	ArticalController.webAppList
);


router.get(
	articalRoute.findOne,
	ArticalController.findOne
);

router.post(
	articalRoute.createNewOne,
	ArticalController.createNewOne
);


export default {
  mainRouter: router,
  path: articalRoute.root,
};