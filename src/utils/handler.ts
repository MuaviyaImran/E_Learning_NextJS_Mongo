import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next/types';

function onError(err: any, req: NextApiRequest, res: NextApiResponse, next: any) {
  console.error(err);
  res.status(500).end(err.toString());
}

const handler = nc({
  onError,
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).send('Page is not found');
  },
});

export default handler;
