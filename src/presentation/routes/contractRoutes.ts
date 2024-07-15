import { Router } from 'express';
import { ContractController } from '../../application/interfaces/http/controllers/ContractController';
import { ensureAdmin } from '../../application/middleware/ensureAdmin';
import { ensureAuthenticated } from '../../application/middleware/ensureAuthenticated';

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

/**
 * @swagger
 * /api/contracts/{contractId}/cancel:
 *   patch:
 *     summary: Cancel a contract
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contractId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contract cancelled
 *       400:
 *         description: Bad request
 *       403:
 *         description: Access denied - Admins only
 */

const contractRoutes = Router();
const contractController = new ContractController();

contractRoutes.post('/contracts', ensureAuthenticated, contractController.create);
contractRoutes.patch('/contracts/:contractId/cancel', ensureAuthenticated, ensureAdmin, contractController.cancel);

export { contractRoutes };
