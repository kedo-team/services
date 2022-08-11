import { Pool } from 'pg'

export class PostgresProvider{
    private _pool: Pool;

    constructor(cfg: IDBConfig) {
        // TODO: изменить на ssl
        this._pool = new Pool(cfg)
    }

    async query<T>(queryString: string, params: any[]): Promise<T> {
        await this._pool.query('BEGIN')
        const { rows } = await this._pool.query(queryString, params)
        await this._pool.query('COMMIT')

        // returning the first result of the first field
        // because pg shaping the result
        const retValue = rows[0][Object.keys(rows[0])[0]]

        // TODO: Дичайший хак из-за того что хранимки возвращают хуй знает что. Кто json, кто dataset с json
        if (retValue.length > 0)
            return retValue[0]
        else return retValue;
    }

    async pureQuery(queryString: string, params: any[]): Promise<any> {
        return await this._pool.query(queryString, params);
    }
}

interface IDBConfig {
    host: string
    port: number
    database: string
    user: string
    password: string
}