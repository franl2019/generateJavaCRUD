import * as mysql from "mysql2/promise";
import {Pool, PoolOptions} from "mysql2/promise";
import {Injectable} from "@nestjs/common";

@Injectable()
export class Mysqldb {
    private readonly pool: Pool;

    private static config: PoolOptions = {
        connectionLimit: 50,
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "Aa123456",
        database: "java_erp",
        decimalNumbers: true,
        multipleStatements: false,
        dateStrings: true,
    };


    constructor() {
        this.pool = mysql.createPool(Mysqldb.config);
    }

    public getPool() {
        return this.pool;
    }

}