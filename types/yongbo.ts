/**
 * 表示停车订单记录。
 */
export interface ParkingOrderItemI {
    /**
     * 用于停车交易的设备类型。
     * @example 0
     */
    deviceType: number;

    /**
     * 与停车服务提供商关联的企业代码。
     * @example "HBTC"
     */
    enterpriseCode: string;

    /**
     * 停车交易的唯一订单号。
     * @example "993810862366269440"
     */
    orderNo: string;

    /**
     * 停车场的地址。
     * @example "明都路"
     */
    parkAddress: string;

    /**
     * 停车场的名称。
     * @example "明都路3"
     */
    parkName: string;

    /**
     * 停车位置的纬度坐标。
     * @example 30.378840261956
     */
    latitude: number;

    /**
     * 折扣前总消费金额。
     * @example 300
     */
    consumptionAmount: number;

    /**
     * 应用于订单的折扣金额。
     * @example 0
     */
    discountAmount: number;

    /**
     * 停车费率计划的 ID。
     * @example 55
     */
    rateId: number;

    /**
     * 分配给车辆的停车车代码。
     * @example "505284"
     */
    parkCarCode: string;

    /**
     * 车辆的车牌号。
     * @example "05-浙AF86463"
     */
    licensePlate: string;

    /**
     * 车辆类型（例如，小汽车、卡车）。
     * @example 3
     */
    carType: number;

    /**
     * 折扣后最终支付金额。
     * @example 300
     */
    payAmount: number;

    /**
     * 计费期结束的 Unix 时间戳。
     * @example 1756687146
     */
    endBillingTime: number;

    /**
     * 与支付关联的 app 账户 ID（如果适用）。
     * @example ""
     */
    appAccount: string;

    /**
     * 停车场的代码。
     * @example "MINGDULU3"
     */
    parkCode: string;

    /**
     * 计费期开始的 Unix 时间戳。
     * @example 1756683709
     */
    startBillingTime: number;

    /**
     * 订单的当前阶段（例如，0=初始化，1=支付，2=完成）。
     * @example 2
     */
    orderStage: number;

    /**
     * 支付完成的 Unix 时间戳。
     * @example 1756687146
     */
    payCompleteTime: number;

    /**
     * 停车位置的经度坐标。
     * @example 120.235048918229
     */
    longitude: number;
}
