import { Module } from "@nestjs/common";
import { MysqldbModule } from "../mysql/mysqldb.module";
import { TableSchemaService } from "./tableSchema.service";

@Module({
  imports: [MysqldbModule],
  controllers: [],
  providers: [TableSchemaService],
  exports: [TableSchemaService]
})
export class TableSchemaModule {

}