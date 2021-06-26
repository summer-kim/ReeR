export const S3_UPLOAD_FAIL = { msg: 'upload fail' };
export const USER_EXISTED = { msg: 'User already exists' };
export const INVALID_INPUT = { msg: 'Invalid email or password' };

export function NOT_FOUND(modelName: string) {
  return { msg: `${modelName} not found` };
}
export function ALREADY_ADDED(modelName: string) {
  return { msg: `${modelName} has been already added` };
}
export function NEVER_BEEN_ADDED(modelName: string) {
  return { msg: `${modelName} hasn't been added yet` };
}
