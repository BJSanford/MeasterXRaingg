const db = require('../lib/db'); // Assuming a database connection utility
const axios = require('axios');

// Fetch user's wagered amount since a specific date using the API
async function getUserWageredAmount(userId, startDate) {
    const endDate = '2030-01-01T00:00:00.00Z';
    const apiUrl = `https://api.rain.gg/v1/affiliates/leaderboard?start_date=${startDate}&end_date=${endDate}&type=wagered`;

    const response = await axios.get(apiUrl, {
        headers: { 'Authorization': `Bearer ${process.env.API_KEY}` },
    });

    const userData = response.data.find(user => user.id === userId);
    return userData ? userData.wagered : 0;
}

// Fetch user's rank and active rakeback percentage
async function getUserRank(userId) {
    // Replace with actual API call or database query
    const response = await db.query('SELECT rank, active_rakeback_percentage FROM users WHERE id = ?', [userId]);
    return response[0];
}

// Log claimed rakeback and reset
async function logClaimedRakeback(userId, claimedAmount) {
    const currentWagered = await getUserWageredAmount(userId, '2025-06-18T00:00:00.00Z');

    // Log the current wagered amount at the time of claim
    await db.query('INSERT INTO rakeback_claims (user_id, claimed_amount, at_claim_time_wager, date) VALUES (?, ?, ?, NOW())', [userId, claimedAmount, currentWagered]);
}

// Fetch adjusted wagered amount
async function getAdjustedWageredAmount(userId, startDate) {
    const totalWagered = await getUserWageredAmount(userId, startDate);

    // Fetch the last claim's wagered amount
    const lastClaim = await db.query('SELECT at_claim_time_wager FROM rakeback_claims WHERE user_id = ? ORDER BY date DESC LIMIT 1', [userId]);

    const atClaimTimeWager = lastClaim.length > 0 ? lastClaim[0].at_claim_time_wager : 0;

    return totalWagered - atClaimTimeWager;
}

module.exports = {
    getUserWageredAmount,
    getUserRank,
    logClaimedRakeback,
    getAdjustedWageredAmount
};
