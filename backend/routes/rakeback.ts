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

// Calculate rakeback based on wagered data
router.get('/calculateRakeback', async (req, res) => {
  const { userId } = req.query;

  try {
    const userRakeback = await prisma.activeRakeback.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (!userRakeback || !userRakeback.rakebackStartDate) {
      return res.status(400).json({ message: 'Rakeback start date not set for user.' });
    }

    const wageredSinceStart = await fetchRainGGWageredData(userId, userRakeback.rakebackStartDate);

    const rakebackRate = calculateRakebackRate(wageredSinceStart);
    const rakebackAmount = (wageredSinceStart * rakebackRate) / 100;

    res.status(200).json({ rakebackAmount });
  } catch (error) {
    console.error('Error calculating rakeback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Helper function to fetch wagered data from Rain.gg API
async function fetchRainGGWageredData(userId, startDate) {
  try {
    const response = await fetch(`https://api.rain.gg/wagered?userId=${userId}&startDate=${startDate.toISOString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch wagered data from Rain.gg API');
    }

    return data.wageredSinceStart;
  } catch (error) {
    console.error('Error fetching wagered data:', error);
    throw error;
  }
}

// Helper function to calculate rakeback rate
function calculateRakebackRate(wageredSinceStart) {
  if (wageredSinceStart >= 10000) return 0.5;
  if (wageredSinceStart >= 5000) return 0.4;
  if (wageredSinceStart >= 1000) return 0.3;
  return 0.2;
}

export default router;
