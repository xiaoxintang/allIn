import {NextRequest, NextResponse} from "next/server";

const baseUrl = "https://lhtc.online";

function getHeader(request: NextRequest) {
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
    header.set("tenant-id", request.headers.get("tenant-id") || "");
    header.set("authorization", request.headers.get("authorization") || "");
    return header;
}
async function getTargetUrl(ctx:RouteContext<'/api/parking/[...path]'>){
    const { path } = await ctx.params;
    console.log(path);
    return new URL(`${baseUrl}/api/${path.join("/")}`);
}
export async function GET(
    request: NextRequest,
    ctx: RouteContext<'/api/parking/[...path]'>
) {
    const targetUrl = await getTargetUrl(ctx)
    const query = await request.nextUrl.searchParams;

    console.log("query==>", query);

    query.forEach((value, key) => {
        targetUrl.searchParams.append(key, value)
    })
    console.log('target url', targetUrl.toString())
    const response = await fetch(targetUrl.toString(), {
        method: "GET",
        headers: getHeader(request),
    });
    return NextResponse.json(await response.json());
    // return NextResponse.json({
    //   ok: 1,
    // });
}

export async function POST(request: NextRequest, ctx:RouteContext<'/api/parking/[...path]'>) {
    const targetUrl = await getTargetUrl(ctx)
    const bodyText = await request.text();
    console.log('body==>', bodyText)
    const resp = await fetch(targetUrl.toString(),{
        method:"POST",
        body:bodyText
    })
    return NextResponse.json(await resp.json())
}
