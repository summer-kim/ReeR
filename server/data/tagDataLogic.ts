import Tag from '../model/tagDB';
import { TagType } from '../types/modelType';

export async function createTag(tagInfo: TagType) {
  return Tag.create(tagInfo);
}
