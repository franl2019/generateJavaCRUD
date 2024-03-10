export interface IOriginTableComment {
  TABLE_NAME: string;
  TABLE_COMMENT: string;
}

export interface IOriginColumnComment {
  COLUMN_NAME:string;
  COLUMN_COMMENT:string;
}

export interface IOriginColumn {
  Field: string;
  Type: string;
  Null: string;
  Key: string;
  Default: string;
  Extra: string;
}

export interface ITable {
  tableName: string;
  tableComment: string;
  //驼峰名称
  camelCaseTableName: string;
  pascalCaseTableName: string;
}

export interface IColumn {
  field: string;
  type: string;
  null: string;
  key: string;
  default: string;
  extra: string;
  //驼峰名称
  camelCaseColumnName: string;
  pascalCaseColumnName: string;
  //java类型
  javaType: string;
  //备注
  comment:string;
}

export interface ITemplateData extends ITable {
  //多主键
  isMultiPrimaryKey: boolean;
  primaryKeyColumns: IColumn[];
  //entity
  columns: IColumn[];
  //mapper
  insertColumns: IColumn[];
  updateColumns: IColumn[];
}