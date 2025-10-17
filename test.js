const axios = require("axios"); // 第三方库：HTTP 请求

async function testParkingPayment(
  token,
  tenantId,
  bindingId = "default_binding",
  carId = "default_car"
) {
  /**
   * 测试函数：查询停车记录，然后模拟一键缴费（无需支付情况）。
   *
   * @param {string} token - 认证 token
   * @param {string} tenantId - 租户 ID
   * @param {string} [bindingId="default_binding"] - 绑定 ID
   * @param {string} [carId="default_car"] - 车辆 ID
   * @returns {Promise<Object>} 模拟响应结果
   */
  const baseUrl = "https://lhtc.online";
  const headers = {
    Authorization: token,
    "tenant-id": tenantId,
    "Content-Type": "application/json",
  };

  try {
    // 步骤 1: 查询停车记录 (GET /api/wx/park/car/parking/list)
    const queryParams = {
      bindingId,
      carId,
      geoId: "", // 可选，默认为空
      pageNum: 1,
      pageSize: 999,
    };

    const parkingUrl = `${baseUrl}/api/wx/park/car/parking/list`;
    const parkingResponse = await axios.get(parkingUrl, {
      headers,
      params: queryParams,
    });

    if (parkingResponse.status !== 200) {
      return {
        error: `Query failed: ${parkingResponse.status}`,
        response: parkingResponse.data,
      };
    }

    const parkingData = parkingResponse.data.data || [];
    if (!parkingData.length) {
      return {
        message: "No parking records found",
        order_status: "no_payment_needed",
      };
    }

    // 步骤 2: 提取 geoIds (模拟全选)
    const geoIds = parkingData
      .filter((record) => record.geoId)
      .map((record) => record.geoId);

    if (!geoIds.length) {
      return { message: "No geoIds found", order_status: "no_payment_needed" };
    }

    // 步骤 3: 调用一键缴费 (POST /api/wx/park/car/pay)，模拟无需支付 (orderStatus != 0)
    const payUrl = `${baseUrl}/api/wx/park/car/pay`;
    const payData = {
      carId,
      geoIds,
      tollCheck: "", // 从 query 获取，默认为空
    };

    const payResponse = await axios.post(payUrl, payData, { headers });

    if (payResponse.status !== 200) {
      return {
        error: `Payment failed: ${payResponse.status}`,
        response: payResponse.data,
      };
    }

    const payResult = payResponse.data.data || {};
    const orderStatus = payResult.orderStatus || 1; // 假设 !=0 为无需支付

    if (orderStatus !== 0) {
      // 无需支付，直接 "跳转" 到成功页 (模拟返回成功)
      return {
        message: "Payment not needed, redirected to success",
        order_status: orderStatus,
        parking_records: parkingData.length,
        geo_ids: geoIds,
      };
    } else {
      return {
        message: "Payment required (skipped as per test)",
        order_status: orderStatus,
      };
    }
  } catch (error) {
    return { error: error.message, stack: error.stack };
  }
}

// 示例调用（测试用）
// testParkingPayment("your_token", "your_tenant_id").then(result => console.log(JSON.stringify(result, null, 2)));
