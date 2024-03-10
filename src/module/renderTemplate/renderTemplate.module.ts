import { Module } from "@nestjs/common";
import { RenderTemplateService } from "./renderTemplate.service";
import { TableSchemaModule } from "../tableSchema/tableSchema.module";
import { MysqldbModule } from "../mysql/mysqldb.module";

@Module({
  imports: [TableSchemaModule],
  controllers: [],
  providers: [RenderTemplateService],
  exports: [RenderTemplateService]
})
export class RenderTemplateModule {

}