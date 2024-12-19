import { Router } from 'express';
import {
    addDeliveryPartner,
    getDeliveryPartnerDetails,
    getAllDeliveryPartners,
    updateDeliveryPartner,
    deleteDeliveryPartner,
} from "../controllers/deliverypartner.controller.js";

const router = Router();

router.post('/register', addDeliveryPartner);
router.get('/', getAllDeliveryPartners);
router.get('/:partnerId', getDeliveryPartnerDetails);
router.patch('/:partnerId', updateDeliveryPartner);
router.delete('/:partnerId', deleteDeliveryPartner);

export default router;