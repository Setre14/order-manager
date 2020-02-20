import mongo from 'mongodb';
import { Config } from './config/config';

export abstract class MongoDB {
  static URL = `mongodb://${Config.getMongoDBUser()}:${Config.getMongoDBPassword()}@${Config.getMongoDBUrl()}`;
  static DB = Config.getMongoDBName();
  static COLLECTION_NAME = 'colName';
  static INDEX: string[] | null = null;
  // static PROJECTION = { _id: 0 };
  static PROJECTION = {};

  static collection: mongo.Collection;

  static async getClient(): Promise<mongo.MongoClient> {
    return await mongo.connect(MongoDB.URL, {
      useUnifiedTopology: true,
    });
  }

  static async getDb(): Promise<mongo.Db> {
    const client = await MongoDB.getClient();
    return client.db(MongoDB.DB);
  }

  static async getCollection(): Promise<mongo.Collection> {
    if (this.collection !== undefined) {
      return this.collection;
    }

    const db = await MongoDB.getDb();
    const collection = await db.createCollection(this.COLLECTION_NAME);

    await this.updateIndex(collection);

    this.collection = collection;
    return this.collection;
  }

  static async getAll<T>(): Promise<T[]> {
    return await this.get<T>({});
  }

  static async get<T>(filter: any): Promise<T[]> {
    filter.disabled = false;
    console.log(this.COLLECTION_NAME + ': Get ', filter);
    const collection = await this.getCollection();

    return collection.find(filter, { projection: this.PROJECTION }).toArray();
  }

  static async insert(obj: Object) {
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

  static async updateIndex(collection: mongo.Collection) {
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

  static async insertOrUpdate(filter: Object, obj: Object) {
    console.log(this.COLLECTION_NAME + ': Filter: ', filter, ', update: ', obj);
    const collection = await this.getCollection();

    const item = await this.get(filter);

    if (item.length === 0) {
      await collection.insertOne(obj);
    } else {
      await collection.updateOne(filter, { $set: obj });
    }
  }

  static async update(filter: Object, obj: Object) {
    console.log(this.COLLECTION_NAME + ': Filter: ', filter, ', update: ', obj);
    const collection = await this.getCollection();

    await collection.updateMany(filter, { $set: obj });
  }

  static async delete(filter: Object) {
    console.log(this.COLLECTION_NAME + ': Delete: ', filter);
    const collection = await this.getCollection();

    await this.update(filter, { disabled: true });
  }
}
