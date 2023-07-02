import bcrypt from 'bcrypt';

export async function comparePassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
}
