

import type { Metadata } from "next";
import Form from "./form";
export const metadata: Metadata = {
  title: "xtls",
  description: "xtls配置生成",
}
export default function Home() {

  return (
    <>
      <Form />


    </>
  );
}
