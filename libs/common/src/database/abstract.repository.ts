import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocumnet extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocumnet>) {}

  async create(document: Omit<TDocumnet, '_id'>): Promise<TDocumnet> {
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createDocument.save()).toJSON() as TDocumnet;
  }

  async findOne(filterQuery: FilterQuery<TDocumnet>): Promise<TDocumnet> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocumnet>(true);

    if (!document) {
      this.logger.warn('Document was not found with fillterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocumnet>,
    update: UpdateQuery<TDocumnet>,
  ): Promise<TDocumnet> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocumnet>(true);

    if (!document) {
      this.logger.warn('Document was not found with fillterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocumnet>): Promise<TDocumnet[]> {
    return this.model.find(filterQuery).lean<TDocumnet[]>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocumnet>,
  ): Promise<TDocumnet> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocumnet>(true);
  }
}
