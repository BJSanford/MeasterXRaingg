import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const router = express.Router();

// Fetch rakeback data for a user
router.get('/rakeback/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const rakeback = await prisma.activeRakeback.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (!rakeback) {
      return res.status(404).json({ message: 'Rakeback data not found' });
    }

    res.json(rakeback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update rakeback data after redemption
router.post('/rakeback/redeem', async (req, res) => {
  const { userId, redeemedAmount } = req.body;

  try {
    const rakeback = await prisma.activeRakeback.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (!rakeback) {
      return res.status(404).json({ message: 'Rakeback data not found' });
    }

    const updatedRakeback = await prisma.activeRakeback.update({
      where: { userId: parseInt(userId) },
      data: {
        totalWageredAtLastRedemption: rakeback.totalWageredAtLastRedemption + redeemedAmount,
        lastRedeemedDate: new Date(),
        activeRakeback: 0,
        redeemableRakeback: 0,
      },
    });

    res.json(updatedRakeback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
