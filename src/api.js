var fly = require("flyio");
fly.config.timeout = 10000;

// 获取微视数据列表
export function getGameRules(advAddress) {
  return fly.get("/api/advertising/getRuleOfActivity", {
    advAddress
  });
}

// 查询广告主列表
export function qryAdDetail(advId) {
  return fly.get("/api/advertising/getAdvItem", {
    advId
  });
}

// 曝光数
export function qryAdExposure(businessId) {
  return fly.get("/api/advertising/addExposure", {
    businessId
  });
}

// 点击数
export function qryAdClick(businessId) {
  return fly.get("/api/advertising/addClick", {
    businessId
  });
}
