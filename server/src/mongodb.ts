import mongo from 'mongodb';

export abstract class MongoDB {
    static URL = "mongodb://localhost:27017/";
    static DB = 'order-manager';
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

    static async getAll(): Promise<any[]> {
        return await this.get({})
    }

    static async get(filter: Object) {
        const collection = await this.getCollection();

        return collection.find(filter, { projection: this.PROJECTION }).toArray();
    }

    static async insert(obj: Object) {
        const collection = await this.getCollection();

        await collection.insertOne(obj).catch()
    }

    static async updateIndex(collection: mongo.Collection) {
        const exists = await collection.indexExists(this.INDEX + '_index');

        console.log(this.INDEX + '_index exists');

        if (exists) {
            return;
        }
        await collection.dropIndexes();
        if (this.INDEX !== null) {
            await collection.createIndex(this.INDEX, { name: this.INDEX + '_index', unique: true });
        }
    }

    static async update(filter: Object, obj: Object) {
        const collection = await this.getCollection();

        await collection.updateOne(filter, { $set: obj })
    }
}
