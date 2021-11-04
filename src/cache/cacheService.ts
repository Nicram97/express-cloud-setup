import * as NodeCache from 'node-cache';

export class Cache {
    cache: NodeCache;

    constructor(ttlSeconds) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
      }

    async get(key: string, functionToStore: Function): Promise<any> {
        const value = this.cache.get(key);
        if (value) {
            return value;
        }  else {
            const result = await functionToStore();
            this.cache.set(key, result);
            return result;
        }
    }

    del(keys): number {
        return this.cache.del(keys);
    }

    flush(): void {
        this.cache.flushAll();
    }
}