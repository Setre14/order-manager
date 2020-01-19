import mongo from 'mongodb';
import { Config } from "./config/config";

export abstract class MongoDB {
    static URL = Config.getMongoDBUrl();
    static DB = Config.getMongoDBName();
    static COLLECTION_NAME = 'colName';
    static INDEX: string[] | null = null;
    static PROJECTION = { _id: 0 };

    static collection: mongo.Collection;

    static async getClient(): Promise<mongo.MongoClient> {
        return await mongo.connect(MongoDB.URL, { useUnifiedTopology: true })
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
        return await this.get<T>({})
    }

    static async get<T>(filter: Object): Promise<T[]> {
        console.log(this.COLLECTION_NAME + ': Get ' + filter)
        const collection = await this.getCollection();

        return collection.find(filter, { projection: this.PROJECTION }).toArray();
    }

    static async insert(obj: Object) {
        console.log(this.COLLECTION_NAME + ': Insert: ' + obj)
        const collection = await this.getCollection();

        await collection.insertOne(obj).catch()
    }

    static async updateIndex(collection: mongo.Collection) {
        const exists = await collection.indexExists(this.INDEX + '_index');

        if (exists) {
            return;
        }
        await collection.dropIndexes();
        if (this.INDEX !== null) {
            await collection.createIndex(this.INDEX, { name: this.INDEX + '_index', unique: true });
        }
    }

    static async update(filter: Object, obj: Object) {
        console.log(this.COLLECTION_NAME + ': Filter: ' + filter + ', update: ' + obj)
        const collection = await this.getCollection();

        const item = await this.get(filter);

        if (item.length === 0) {
            await collection.insertOne(obj);
        } else {
            await collection.updateOne(filter, { $set: obj })
        }
    }

    static async delete(filter: Object) {
        await this.collection.deleteOne(filter);
    }
}
