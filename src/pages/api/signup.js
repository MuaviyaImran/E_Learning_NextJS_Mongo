import handler from '@utils/handler';

import User from '@/models/user/user.model';

import dbConnect from '../../database/conn';

async function createUser(req, res) {
  dbConnect();

  //@ts-ignore
  const newUser = await User.findOneOrCreate(req.body);

  if (newUser.alreadyExist === true) {
    return res.status(406).json({ message: 'User Already Exist!' });
  }

  return res.status(201).json({ message: 'Created user!' });
}

handler.post(createUser);

export default handler;
