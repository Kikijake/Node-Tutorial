import bcrypt from "bcrypt"

const SALTROUNDS = 10;

export const hashPassword = (password) => { 
  return bcrypt.hashSync(password, SALTROUNDS);
}

export const checkPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}