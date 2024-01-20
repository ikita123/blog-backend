import { Router } from 'express';
import {default as ArticalRoute} from './artical.route'
import { RoutePath } from '../constants'


const { apiV1 } = RoutePath;
const routesList: any[] = [
    ArticalRoute,
]
const router: Router = Router()

routesList.forEach((route: any) => 
    router.use(`${apiV1}${route.path}`, route.mainRouter))

export default router;
