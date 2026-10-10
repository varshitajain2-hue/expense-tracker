import express from 'express';
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from '../controllers/budgetController.js';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

router.route('/')
  .get(getBudgets)
  .post(createBudget);

router.route('/:id')
  .put(validateObjectId, updateBudget)
  .delete(validateObjectId, deleteBudget);

export default router;
