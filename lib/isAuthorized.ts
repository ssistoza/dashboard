import { NextApiRequest, NextApiResponse } from 'next';
import { verifyIdToken } from 'next-firebase-auth';

export const isAuthorizedByApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!(req.headers && req.headers.authorization)) {
    return res
      .status(400)
      .json({ error: 'Missing Authorization header value' });
  }

  const token = req.headers.authorization;
  try {
    const user = await verifyIdToken(token);
    return user ? true : false;
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: 'Not authorized' });
  }
};
