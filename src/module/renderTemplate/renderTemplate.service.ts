import { Injectable } from '@nestjs/common';
import { Eta } from 'eta';
import * as path from 'path';
import { ITemplateData } from '../../types/tableSchema.interface';
import * as fs from 'fs';
import { config } from '../../config/config';

@Injectable()
export class RenderTemplateService {

  constructor() {
  }

  public async renderTemplate(templateDataList: ITemplateData[]): Promise<void> {
    const eta = new Eta({
      views: path.resolve(__dirname, '..', '..', 'templates'),
      useWith: true,
      autoTrim: 'nl',
    });
    for (const templateData of templateDataList) {

      if (config.generateFile.entity) {
        const renderedContent = eta.render(`./entity`, { templateData, config });
        const outputPath = path.resolve(__dirname, '..', '..', 'templates', 'entity', `${templateData.pascalCaseTableName}.java`);
        const outputDir = path.dirname(outputPath);
        fs.mkdirSync(outputDir, { recursive: true });
        await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
      }

      if (config.generateFile.createDto) {
        const renderedContent = eta.render(`./createDto`, { templateData, config });
        const outputPath = path.resolve(__dirname, '..', '..', 'templates', `dto`, `${templateData.pascalCaseTableName}`, `${templateData.pascalCaseTableName}CreateDto.java`);
        const outputDir = path.dirname(outputPath);
        fs.mkdirSync(outputDir, { recursive: true });
        await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
      }

      if (config.generateFile.updateDto && !templateData.isMultiPrimaryKey) {
        const renderedContent = eta.render(`./updateDto`, { templateData, config });
        const outputPath = path.resolve(__dirname, '..', '..', 'templates', `dto`, `${templateData.pascalCaseTableName}`, `${templateData.pascalCaseTableName}UpdateDto.java`);
        const outputDir = path.dirname(outputPath);
        fs.mkdirSync(outputDir, { recursive: true });
        await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
      }

      const needGenerateL1ReviewDto = templateData.columns.some(column => column.field === 'l1_review');

      if (config.generateFile.l1ReviewDto && needGenerateL1ReviewDto && !templateData.isMultiPrimaryKey) {
        const renderedContent = eta.render(`./l1ReviewDto`, { templateData, config });
        const outputPath = path.resolve(__dirname, '..', '..', 'templates', `dto`, `${templateData.pascalCaseTableName}`, `${templateData.pascalCaseTableName}L1ReviewDto.java`);
        const outputDir = path.dirname(outputPath);
        fs.mkdirSync(outputDir, { recursive: true });
        await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
      }

      const needGenerateL2ReviewDto = templateData.columns.some(column => column.field === 'l2_review');

      if (config.generateFile.l2ReviewDto && needGenerateL2ReviewDto && !templateData.isMultiPrimaryKey) {
        const renderedContent = eta.render(`./l2ReviewDto`, { templateData, config });
        const outputPath = path.resolve(__dirname, '..', '..', 'templates', `dto`, `${templateData.pascalCaseTableName}`, `${templateData.pascalCaseTableName}L2ReviewDto.java`);
        const outputDir = path.dirname(outputPath);
        fs.mkdirSync(outputDir, { recursive: true });
        await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
      }

      const needGenerateDeleteDto = templateData.columns.some(column => column.field === 'delete_review');

      if (config.generateFile.deleteDto && needGenerateDeleteDto) {
        const renderedContent = eta.render(`./deleteDto`, { templateData, config });
        const outputPath = path.resolve(__dirname, '..', '..', 'templates', `dto`, `${templateData.pascalCaseTableName}`, `${templateData.pascalCaseTableName}DeleteDto.java`);
        const outputDir = path.dirname(outputPath);
        fs.mkdirSync(outputDir, { recursive: true });
        await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
      }

      if (config.generateFile.mapperXml) {
        if (templateData.isMultiPrimaryKey) {
          const renderedContent = eta.render(`./multiPrimaryKeyMapperXml`, { templateData, config });
          const outputPath = path.resolve(__dirname, '..', '..', 'templates', `mapperXml`, `${templateData.pascalCaseTableName}Mapper.xml`);
          const outputDir = path.dirname(outputPath);
          fs.mkdirSync(outputDir, { recursive: true });
          await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
        } else {
          const renderedContent = eta.render(`./singlePrimaryKeyMapperXml`, { templateData, config });
          const outputPath = path.resolve(__dirname, '..', '..', 'templates', `mapperXml`, `${templateData.pascalCaseTableName}Mapper.xml`);
          const outputDir = path.dirname(outputPath);
          fs.mkdirSync(outputDir, { recursive: true });
          await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
        }
      }

      if (config.generateFile.mapper) {
        if (templateData.isMultiPrimaryKey) {
          const renderedContent = eta.render(`./multiPrimaryKeyMapper`, { templateData, config });
          const outputPath = path.resolve(__dirname, '..', '..', 'templates', `mapper`, `${templateData.pascalCaseTableName}Mapper.java`);
          const outputDir = path.dirname(outputPath);
          fs.mkdirSync(outputDir, { recursive: true });
          await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
        } else {
          const renderedContent = eta.render(`./singlePrimaryKeyMapper`, { templateData, config });
          const outputPath = path.resolve(__dirname, '..', '..', 'templates', `mapper`, `${templateData.pascalCaseTableName}Mapper.java`);
          const outputDir = path.dirname(outputPath);
          fs.mkdirSync(outputDir, { recursive: true });
          await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
        }
      }

      if (config.generateFile.serviceImpl) {
        if (templateData.isMultiPrimaryKey) {
          const renderedContent = eta.render(`./multiPrimaryKeyService`, { templateData, config });
          const outputPath = path.resolve(__dirname, '..', '..', 'templates', `serviceImpl`, `${templateData.pascalCaseTableName}ServiceImpl.java`);
          const outputDir = path.dirname(outputPath);
          fs.mkdirSync(outputDir, { recursive: true });
          await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
        } else {
          const renderedContent = eta.render(`./singlePrimaryKeyService`, { templateData, config });
          const outputPath = path.resolve(__dirname, '..', '..', 'templates', `serviceImpl`, `${templateData.pascalCaseTableName}ServiceImpl.java`);
          const outputDir = path.dirname(outputPath);
          fs.mkdirSync(outputDir, { recursive: true });
          await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
        }
      }

      if (config.generateFile.controller) {
        if (templateData.isMultiPrimaryKey) {

        } else {
          const renderedContent = eta.render(`./controller`, { templateData, config });
          const outputPath = path.resolve(__dirname, '..', '..', 'templates', `controller`, `${templateData.pascalCaseTableName}Controller.java`);
          const outputDir = path.dirname(outputPath);
          fs.mkdirSync(outputDir, { recursive: true });
          await fs.promises.writeFile(outputPath, renderedContent, 'utf-8');
        }
      }
    }
  }


}