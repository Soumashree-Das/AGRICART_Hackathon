import { Router } from 'express';
import { subscriptionNew , getAllPlansByFarmerId , getAllSubscription , subscribeToCSA  } from '../controllers/subscriptionCSA.controller.js';

const router = Router();

// Route to add a new subscription by farmer
router.post('/addSubscription', subscriptionNew );
//http://localhost:3026/api/v1/subscriptions/addSubscription

// Route to get all subscriptions by under a farmer
router.post('/:farmerId', getAllPlansByFarmerId );
//http://localhost:3026/api/v1/subscriptions/:farmerId

// Route to get all subscriptions by under a farmer
router.post('/', getAllSubscription );
//http://localhost:3026/api/v1/subscriptions/

// Route to get all subscriptions by under a farmer
router.post('/subscribe/:planId', subscribeToCSA );
//http://localhost:3026/api/v1/subscriptions/susbcribe/:planId

export default router;
