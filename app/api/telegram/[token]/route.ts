import { NextRequest, NextResponse } from "next/server";

function getTelegramBaseURL(token: string) {
  return `https://api.telegram.org/bot${token}`;
}
export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/telegram/[token]">
) {
  // 解析 Telegram 发送的 JSON 数据
  const update = await request.json();
  const params = await ctx.params;
  console.log("Received update:", update); // 调试用：打印收到的更新
  console.log("ctx", params.token);
  // 检查是否是消息更新，并提取消息内容
  if (update.message && update.message.text && update.message.chat) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    // 构造回复消息
    const replyText = `你的chatId：${chatId}`;

    // 调用 Telegram API 发送回复
    await fetch(`${getTelegramBaseURL(params.token)}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: replyText,
      }),
    });

    // 返回空响应（Telegram 要求 Webhook 返回 200 OK）
    return NextResponse.json({}, { status: 200 });
  }
}
export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/telegram/[token]">
) {
  const params = await ctx.params;
  return NextResponse.json(params);
}

// 添加 HEAD 支持 tg的快速验证
export async function HEAD() {
  return NextResponse.json({}, { status: 200 });
}
