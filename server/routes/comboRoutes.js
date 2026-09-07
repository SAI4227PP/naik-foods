import express from 'express'

import {
  createCombo,
} from '../controllers/comboController.js'

const router = express.Router()

router.post('/', createCombo)

export default router