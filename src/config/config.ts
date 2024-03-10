export const config = {
  databaseName:"java_erp",
  packageName:"com.erp.psi",
  tableNameList: [

  ],
  type:{
    varchar:"String",
    char:"String",
    json:"String",
    dateTime:"LocalDateTime",
    decimal:"BigDecimal",
    int:"Integer",
    tinyint:"Boolean",
  },
  generateFile:{
    controller:true,
    serviceInterface:true,
    serviceImpl:true,
    entity:true,
    mapper:true,
    mapperXml:true,
    findDto:true,
    createDto:true,
    updateDto:true,
    deleteDto:true,
    l1ReviewDto:true,
    l2ReviewDto:true,
    voidReviewDto:true,
  }
};