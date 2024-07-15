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

/**
 * @swagger
 * /api/clients/{clientId}:
 *   patch:
 *     summary: Update an existing client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cpfCnpj:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/clients/{clientId}:
 *   delete:
 *     summary: Delete an existing client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Client deleted
 *       400:
 *         description: Bad request
 *       404:
 *         description: Client not found
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Filter clients by contract status
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [PENDING, PAID, CANCELLED, LATE]
 *     responses:
 *       200:
 *         description: Clients filtered by contract status
 *       400:
 *         description: Bad request
 */

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.post('/clients', clientController.create);
clientRoutes.patch('/clients/:clientId', clientController.update);
clientRoutes.delete('/clients/:clientId', clientController.delete);
clientRoutes.get('/clients', clientController.filter);

export { clientRoutes };
