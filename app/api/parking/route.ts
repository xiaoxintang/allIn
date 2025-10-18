import { ParkingOrderItemI } from "@/types/yongbo";
import { NextResponse } from "next/server";

const baseUrl = "https://lhtc.online";
const yongboBaseUrl = "https://yongbo.careyestech.com";
const yongboBaseBody = {
  account: "885472352442388480",
  enterpriseCode: "HBTC",
  mark: 2,
};
function getHeader() {
  const header = new Headers();
  header.set("host", "lhtc.online");
  header.set("Accept", "application/json, text/plain, */*");
  header.set(
    "User-Agent",
    "Mozilla/5.0 (Linux; Android 15; NX769J Build/AQ3A.240812.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160117 MMWEBSDK/20250802 MMWEBID/3695 MicroMessenger/8.0.62.2881(0x28003E41) WeChat/arm64 Weixin GPVersion/1 NetType/WIFI Language/zh_CN ABI/arm64"
  );
  header.set("Origin", "http://hbtc.wechat.lhtc.online");
  header.set("x-requested-with", "com.tencent.mm");
  header.set("sec-fetch-site", "cross-site");
  header.set("sec-fetch-mode", "cors");
  header.set("sec-fetch-dest", "empty");
  header.set("Referer", "http://hbtc.wechat.lhtc.online/");
  header.set("Accept-Encoding", "gzip, deflate");
  header.set("Accept-Language", "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7");
  header.set("tenant-id", "1");
  header.set(
    "authorization",
    "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Im9xVmdlMDlQYkxMZlkxQVVZR1FpRWQ1dU9hSlkifQ.GhBfmt8mGpcd7VPDZiIxllUAFzSzi-tz_7jScnnqkCvNVLj9BaUxPNllMcKJ8YCb-LAScMYvuH10q5eTc4vNcg"
  );
  return header;
}
function getYongBoHeader() {
  const headers = new Headers({
    "Accept-Charset": "utf-8",
    "Accept-Encoding": "gzip",
    alipayMiniMark:
      "EaZ/sLM1G4ZpuBBkRJGHC/C5MBcMTXdU38h+hR+rFSDwPDcnCm6+P4Rzrrc+QMcWBjW4kXu9KTrzlvqItvsRx9JGqxorL3ZfWQKOQm9aWDQ=",
    "content-type": "application/json",
    // "referer":"",
    "x-release-type": "ONLINE",
    "user-agent":
      "Dalvik/2.1.0 (Linux; U; Android 15; NX769J Build/AQ3A.240812.002) Chrome/105.0.5195.148 MYWeb/0.11.0.000000000000 UWS/3.22.2.9999 UCBS/3.22.2.9999_220000000000 Mobile Safari/537.36 AlipayChannelId/5136 NebulaSDK/1.8.100112 Nebula AlipayDefined(nt:UNKNOWN,ws:1116|2480|3.0) AliApp(AP/10.7.80.7000) AlipayClient/10.7.80.7000 Language/zh-Hans isConcaveScreen/false useStatusBar/true NebulaX/1.0.0 DTN/2.0",
    accept: "*/*",
    host: "yongbo.careyestech.com",
  });
  return headers;
}
const getMyCarList = async () => {
  const response = await fetch(`${baseUrl}/api/wx/park/car/binding/list`, {
    method: "GET",
    headers: getHeader(),
  });
  const data = await response.json();
  console.log("car list==>", data);
  const carList = data.data;
  return carList;
};
const getParkingRecord = async (cardItem: {
  carId: string;
  bindingId: string;
}) => {
  const response = await fetch(
    `${baseUrl}/api/wx/park/car/parking/list?pageNum=1&pageSize=999&bindingId=${cardItem.bindingId}&carId=${cardItem.carId}&geoId=`,
    {
      method: "GET",
      headers: getHeader(),
    }
  );
  const data = await response.json();
  console.log("parking record==>", data);
  return data.data;
};
const pay = async (payData: {
  carId: string;
  geoIds: string[];
  tollCheck?: string;
}) => {
  const response = await fetch(`${baseUrl}/api/wx/park/car/pay`, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify({
      tollCheck: "",
      ...payData,
    }),
  });
  const res = await response.json();
  console.log("pay==>", res);
  return res.data;
};
async function recordPay() {
  const carList = await getMyCarList();
  const car = carList[0];
  const parkingRecord = await getParkingRecord(car);
  if (parkingRecord.length > 0) {
    const geoIds = parkingRecord
      .filter((record: { geoId: string }) => record.geoId)
      .map((record: { geoId: string }) => record.geoId);
    const resp = await pay({
      geoIds,
      carId: car.carId,
    });
    return NextResponse.json(resp);
  }
  return NextResponse.json({
    code: 200,
    message: "无需缴费",
  });
}
const getOrder = async () => {
  const response = await fetch(`${yongboBaseUrl}/com/order/active/inquire`, {
    method: "POST",
    headers: getYongBoHeader(),
    body: JSON.stringify({ ...yongboBaseBody }),
  });
  const data: ParkingOrderItemI[] = await response.json();
  console.log("get order==>", data);
  return data;
};
export async function GET() {
  const orderList = await getOrder();
  console.log("orderList==>", orderList);
  if (orderList.length > 0) {
    const orderItem = orderList[0];
    const response = await fetch(
      `${baseUrl}/api/wx/mp/scan/hbtc/redirect?orderNo=${orderItem.orderNo}`,
      {
        method: "GET",
        headers: new Headers({
          host: "lhtc.online",
          "Upgrade-Insecure-Requests": "1",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 15; NX769J Build/AQ3A.240812.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160117 MMWEBSDK/20250802 MMWEBID/3695 MicroMessenger/8.0.62.2881(0x28003E41) WeChat/arm64 Weixin GPVersion/1 NetType/WIFI Language/zh_CN ABI/arm64",
        }),
      }
    );
    console.log("response==>", await response.text());
    return NextResponse.json({
      message: "快去看看是不是支付成功了",
    });
  }
  return NextResponse.json({
    message: "暂无订单",
  });
}
