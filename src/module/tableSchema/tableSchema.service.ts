import { Injectable } from "@nestjs/common";
import { MysqldbAls } from "../mysql/mysqldbAls";
import {
  IColumn,
  IOriginColumn, IOriginColumnComment,
  IOriginTableComment,
  ITable,
  ITemplateData,
} from '../../types/tableSchema.interface';
import { getCamelCaseTableName, getJavaTypeBySqlType, getPascalCaseTableName } from '../../utils';
import { config } from '../../config/config';

@Injectable()
export class TableSchemaService {

  constructor(
    private readonly mysqldbAls: MysqldbAls
  ) {
  }

  public async getTable(tableNameList:string[] = []): Promise<ITable[]> {
    const conn = this.mysqldbAls.getConnectionInAls();
    const sql = `
        SELECT TABLE_NAME,
               TABLE_COMMENT
        FROM information_schema.tables
        WHERE table_schema = 'java_erp'
              ${tableNameList.length === 0 ? '' :
      `AND TABLE_NAME IN (${tableNameList.map((tableName) => `'${tableName}'`).join(',')})`
    }
    `;
    const [rows] = await conn.query(sql);

    const originTableSchemaList: IOriginTableComment[] = JSON.parse(JSON.stringify(rows));
    return originTableSchemaList.map((originTableSchema: IOriginTableComment) => {
      return {
        tableName: originTableSchema.TABLE_NAME,
        tableComment: originTableSchema.TABLE_COMMENT,
        camelCaseTableName: getCamelCaseTableName(originTableSchema.TABLE_NAME),
        pascalCaseTableName: getPascalCaseTableName(originTableSchema.TABLE_NAME),
      };
    });
  }

  public async getColumnComment(tableName:string):Promise<IOriginColumnComment[]>{
    const conn = this.mysqldbAls.getConnectionInAls();
    const sql = `
      SELECT COLUMN_NAME,
             COLUMN_COMMENT
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${config.databaseName}'
        AND TABLE_NAME = '${tableName}'
    `;
    const [rows] = await conn.query(sql);
    return JSON.parse(JSON.stringify(rows));
  }

  public async getColumnsByTableName(tableName: string): Promise<IColumn[]> {
    const conn = this.mysqldbAls.getConnectionInAls();
    const [rows] = await conn.query(`
      DESC ${tableName}
    `);
    const originTableSchemaList: IOriginColumn[] = JSON.parse(JSON.stringify(rows));
    //获取备注
    const columnCommentList = await this.getColumnComment(tableName);

    return originTableSchemaList.map((originColumnDESC) => {
      return {
        field: originColumnDESC.Field,
        type: originColumnDESC.Type,
        null: originColumnDESC.Null,
        key: originColumnDESC.Key,
        default: originColumnDESC.Default,
        extra: originColumnDESC.Extra,
        camelCaseColumnName: getCamelCaseTableName(originColumnDESC.Field),
        pascalCaseColumnName: getPascalCaseTableName(originColumnDESC.Field),
        javaType: getJavaTypeBySqlType(originColumnDESC.Type),
        comment:columnCommentList.find((columnComment) => columnComment.COLUMN_NAME === originColumnDESC.Field)?.COLUMN_COMMENT || '',
      };
    });
  }

  public async getTemplateData(tableNameList:string[] = []): Promise<ITemplateData[]>{
    const tableList = await this.getTable(tableNameList);
    const tableSchemaList: ITemplateData[] = [];
    for (const table of tableList) {
      const columns = await this.getColumnsByTableName(table.tableName);
      //是否有多个主键
      const isMultiPrimaryKey = columns.filter((column) => column.key === 'PRI').length > 1;
      tableSchemaList.push({
        ...table,
        isMultiPrimaryKey,
        columns,
        primaryKeyColumns: columns.filter((column) => column.key === 'PRI'),
        insertColumns: this.getInsertColumns(columns),
        updateColumns: this.getUpdateDtoColumns(columns),
      });
    }
    return tableSchemaList;
  }

  private getInsertColumns(columns:IColumn[]):IColumn[]{
    //过滤掉主键
    const filterPRIColumns = columns.filter((column) => column.key !== 'PRI');
    //过滤掉不需要的字段
    return filterPRIColumns.filter(
      (column) =>
        column.field !== "updater"
        && column.field !== "updater_id"
        && column.field !== "updated_time"
        && column.field !== "delete_review"
        && column.field !== "deleter"
        && column.field !== "deleter_id"
        && column.field !== "deleted_time"
        && column.field !== "l1_review"
        && column.field !== "l1_reviewer_id"
        && column.field !== "l1_reviewer"
        && column.field !== "l1_review_time"
        && column.field !== "l2_review"
        && column.field !== "l2_reviewer_id"
        && column.field !== "l2_reviewer"
        && column.field !== "l2_review_time"
        && column.field !== "void_review"
        && column.field !== "void_review_user_id"
        && column.field !== "void_review_username"
        && column.field !== "void_review_time"
        && column.field !== "print_count"
    );

  }

  private getUpdateDtoColumns(columns:IColumn[]):IColumn[]{
    //过滤掉主键
    const filterPRIColumns = columns.filter((column) => column.key !== 'PRI');
    //过滤掉不需要的字段
    return filterPRIColumns.filter(
      (column) =>
        column.field !== "creator"
        && column.field !== "creator_id"
        && column.field !== "created_time"
        && column.field !== "delete_review"
        && column.field !== "deleter"
        && column.field !== "deleter_id"
        && column.field !== "deleted_time"
        && column.field !== "l1_review"
        && column.field !== "l1_reviewer_id"
        && column.field !== "l1_reviewer"
        && column.field !== "l1_review_time"
        && column.field !== "l2_review"
        && column.field !== "l2_reviewer_id"
        && column.field !== "l2_reviewer"
        && column.field !== "l2_review_time"
        && column.field !== "void_review"
        && column.field !== "void_review_user_id"
        && column.field !== "void_review_username"
        && column.field !== "void_review_time"
        && column.field !== "print_count"
    );
  }
}