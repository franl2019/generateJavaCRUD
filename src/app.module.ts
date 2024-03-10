import { Module, OnModuleInit } from '@nestjs/common';
import { TableSchemaModule } from "./module/tableSchema/tableSchema.module";
import { AppController } from "./app.controller";
import { RenderTemplateModule } from "./module/renderTemplate/renderTemplate.module";
import { TableSchemaService } from './module/tableSchema/tableSchema.service';
import { RenderTemplateService } from './module/renderTemplate/renderTemplate.service';
import { config } from './config/config';

@Module({
  imports: [
    TableSchemaModule,
    RenderTemplateModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly tableSchemaService: TableSchemaService,
    private readonly renderTemplateService:RenderTemplateService
  ) {
  }

  async onModuleInit() {
    const templateDataList = await this.tableSchemaService.getTemplateData(config.tableNameList);
    await this.renderTemplateService.renderTemplate(templateDataList);
    console.dir(templateDataList);
  }
}
