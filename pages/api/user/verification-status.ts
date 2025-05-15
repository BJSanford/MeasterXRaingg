import { NextApiRequest, NextApiResponse } from 'next';

// Mock verification status for demonstration purposes
let isVerified = false;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simulate verification status check
    res.status(200).json({ verified: isVerified });
  } else if (req.method === 'POST') {
    // Simulate updating verification status
    isVerified = true;
    res.status(200).json({ message: 'Verification status updated.' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
