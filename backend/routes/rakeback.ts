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

// Update rakeback data with dynamic start date
router.post('/rakeback/updateStartDate', async (req, res) => {
  const { userId, totalWagered } = req.body;

  try {
    const userRakeback = await prisma.activeRakeback.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (!userRakeback) {
      // Initialize rakeback data if not present
      await prisma.activeRakeback.create({
        data: {
          userId: parseInt(userId),
          rakebackStartDate: new Date(),
          totalWageredAtLastRedemption: totalWagered,
        },
      });
    } else if (userRakeback.rakebackStartDate === null && totalWagered >= 1000) {
      // Set start date when user reaches Iron tier
      await prisma.activeRakeback.update({
        where: { userId: parseInt(userId) },
        data: {
          rakebackStartDate: new Date(),
        },
      });
    }

    res.status(200).json({ message: 'Rakeback start date updated successfully!' });
  } catch (error) {
    console.error('Error updating rakeback start date:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
