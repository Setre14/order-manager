import mongo from 'mongodb';
import { Config } from '../config/config';

export abstract class BaseController {
  URL = `mongodb://${Config.getMongoDBUser()}:${Config.getMongoDBPassword()}@${Config.getMongoDBUrl()}`;
  DB = Config.getMongoDBName();
  COLLECTION_NAME = 'colName';
  INDEX: string[] | null = null;
  // PROJECTION = { _id: 0 };
  PROJECTION = {};

  collection: mongo.Collection;

  async getClient(): Promise<mongo.MongoClient> {
    return await mongo.connect(this.URL, {
      useUnifiedTopology: true,
    });
  }

  async getDb(): Promise<mongo.Db> {
    const client = await this.getClient();
    return client.db(this.DB);
  }

  async getCollection(): Promise<mongo.Collection> {
    if (this.collection !== undefined) {
      return this.collection;
    }

    const db = await this.getDb();
    const collection = await db.createCollection(this.COLLECTION_NAME);

    await this.updateIndex(collection);

    this.collection = collection;
    return this.collection;
  }

  async getAll<T>(): Promise<T[]> {
    return await this.get<T>({});
  }

  async get<T>(filter: any): Promise<T[]> {
    filter.disabled = false;
    console.log(this.COLLECTION_NAME + ': Get ', filter);
    const collection = await this.getCollection();

    return collection.find(filter, { projection: this.PROJECTION }).toArray();
  }

  async insert(obj: Object) {
    console.log(this.COLLECTION_NAME + ': Insert: ', obj);
    const collection = await this.getCollection();

    await collection
      .insertOne(obj)
      .catch()
      .catch(err => {
        console.log(
          this.COLLECTION_NAME + ': elem with index',
          this.INDEX,
          'already exists'
        );
        console.log(this.COLLECTION_NAME + ': Tried to insert', obj);
      });
  }

  async updateIndex(collection: mongo.Collection) {
    console.log(this.COLLECTION_NAME + ': Create index: ', this.INDEX);
    const exists = await collection.indexExists(this.INDEX + '_index');

    if (exists) {
      return;
    }
    await collection.dropIndexes();
    if (this.INDEX !== null && this.INDEX.length > 0) {
      await collection.createIndex(this.INDEX, {
        name: this.INDEX + '_index',
        partialFilterExpression: { disabled: false },
        unique: true,
      });
    }
  }

  async insertOrUpdate(filter: Object, obj: Object) {
    console.log(this.COLLECTION_NAME + ': Filter: ', filter, ', update: ', obj);
    const collection = await this.getCollection();

    const item = await this.get(filter);

    if (item.length === 0) {
      await collection.insertOne(obj);
    } else {
      await collection.updateOne(filter, { $set: obj });
    }
  }

  async update(filter: Object, obj: Object) {
    console.log(this.COLLECTION_NAME + ': Filter: ', filter, ', update: ', obj);
    const collection = await this.getCollection();

    await collection.updateMany(filter, { $set: obj });
  }

  async disable(filter: Object) {
    console.log(this.COLLECTION_NAME + ': disable: ', filter);

    await this.update(filter, { disabled: true });
  }

  async disableAll() {
    console.log(this.COLLECTION_NAME + ': disable all');

    await this.update({}, { disabled: true });
  }
}
