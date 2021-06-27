import Tag from '../model/tagDB';
import { TagType } from '../types/modelType';
import { sequelize } from '../db/database';
import { QueryTypes } from 'sequelize';

export async function createTag(tagInfo: TagType) {
  return Tag.create(tagInfo);
}

export async function getTagById(id: number) {
  return Tag.findByPk(id);
}

export async function updateTagArray(
  userId: number,
  tagId: number,
  column: string,
  update: string
) {
  return sequelize.query(
    `
  UPDATE tags
  SET ${column} = array_${update}(${column}, ${userId})
  WHERE id = ${tagId}
  `,
    { type: QueryTypes.UPDATE }
  );
}
