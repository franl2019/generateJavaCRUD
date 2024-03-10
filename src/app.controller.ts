import { Controller, Post } from "@nestjs/common";
import { TableSchemaService } from "./module/tableSchema/tableSchema.service";
import { config } from './config/config';
import { RenderTemplateService } from './module/renderTemplate/renderTemplate.service';

@Controller("/app")
export class AppController {

  constructor(
    private readonly tableSchemaService: TableSchemaService,
    private readonly renderTemplateService:RenderTemplateService
  ) {
  }

  @Post("/test")
  async test() {
    const templateDataList = await this.tableSchemaService.getTemplateData(config.tableNameList);
    await this.renderTemplateService.renderTemplate(templateDataList);
    return templateDataList;
  }
}