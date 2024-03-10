import { config } from '../config/config';

export function getCamelCaseTableName(originalName: string): string {
  return originalName
    .split('_')
    .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

export function getPascalCaseTableName(originalName: string): string {
  return originalName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

//sql类型转java类型
export function getJavaTypeBySqlType(sqlType: string): string {
  if(sqlType.includes('tinyint')){
    return config.type.tinyint;
  }

  if (sqlType.includes('int')) {
    return config.type.int;
  }

  if (sqlType.includes('decimal')) {
    return config.type.decimal;
  }

  if (sqlType.includes('varchar')) {
    return config.type.varchar;
  } else if (sqlType.includes('char')) {
    return config.type.char;
  }

  if (sqlType.includes('datetime')) {
    return config.type.dateTime;
  }

  if (sqlType.includes('json')) {
    return config.type.json;
  }

  throw new Error(`${sqlType}未确定类型`);
}