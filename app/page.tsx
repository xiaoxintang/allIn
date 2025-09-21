import { Box, Card, CardContent, CardHeader, Container, Link, Paper } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "首页",
  description: "首页",
}
export default function Home() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <Paper>
            <Card
            >
              <CardHeader title='网络工具' />
              <CardContent>
                <Link href="/xtls">xtls</Link>
              </CardContent>
            </Card>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
