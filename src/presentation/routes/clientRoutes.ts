import { Router } from 'express';
import { ClientController } from '../../application/interfaces/http/controllers/ClientController';

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cpfCnpj
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               cpfCnpj:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client created
 *       400:
 *         description: Bad request
 */

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.post('/clients', clientController.create);

export { clientRoutes };