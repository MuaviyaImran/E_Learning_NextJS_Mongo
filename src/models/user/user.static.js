

export async function findOneOrCreate(
  userData
){
  const { email } = userData;
  const record = await this.findOne({ email });
  if (record) {
    return { ...record, alreadyExist: true };
  }
  return this.create(userData);
}
