const express = require('express');
const router = express.Router();
const { getUserWageredAmount, getUserRank, logClaimedRakeback } = require('../services/rakebackService');

// Endpoint to fetch active rakeback
router.get('/active', async (req, res) => {
    try {
        const userId = req.query.userId;
        const startDate = '2025-06-18T00:00:00.00Z';

        // Fetch wagered amount and user rank
        const wageredAmount = await getUserWageredAmount(userId, startDate);
        const userRank = await getUserRank(userId);

        // Calculate rakeback based on rank percentage
        const rakebackPercentage = userRank.activeRakebackPercentage;
        const rakebackAmount = wageredAmount * (rakebackPercentage / 100);

        res.json({
            rakebackAmount,
            wageredAmount,
            rakebackPercentage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch active rakeback' });
    }
});

// Endpoint to claim rakeback
router.post('/claim', async (req, res) => {
    try {
        const userId = req.body.userId;
        const claimedAmount = req.body.claimedAmount;

        // Log claimed rakeback and reset
        await logClaimedRakeback(userId, claimedAmount);

        res.json({ message: 'Rakeback claimed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to claim rakeback' });
    }
});

module.exports = router;