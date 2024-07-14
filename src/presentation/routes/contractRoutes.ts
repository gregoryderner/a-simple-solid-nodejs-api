import { Router } from 'express';
import { ContractController } from '../../application/interfaces/http/controllers/ContractController';

/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: Contract management
 */

/**
 * @swagger
 * /api/contracts:
 *   post:
 *     summary: Create a new contract
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - contractNumber
 *               - contractDate
 *               - value
 *               - status
 *             properties:
 *               clientId:
 *                 type: integer
 *               contractNumber:
 *                 type: string
 *               contractDate:
 *                 type: string
 *                 format: date
 *               value:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [PENDING, PAID, CANCELLED, LATE]
 *     responses:
 *       201:
 *         description: Contract created
 *       400:
 *         description: Bad request
 */

const contractRoutes = Router();
const contractController = new ContractController();

contractRoutes.post('/contracts', contractController.create);

export { contractRoutes };
