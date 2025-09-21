"use client"
import { Box, Card, CardContent, CardHeader, Container, Paper, Select, MenuItem, TextField, Typography, FormControl, InputLabel, Button, Grid, GridBaseProps, Switch, FormControlLabel } from "@mui/material";
const size: GridBaseProps['size'] = {
	xs: 12,
	sm: 6,
	md: 4,
	lg: 3,
	xl: 2,
}

export default function Form() {
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(e.currentTarget);
		const formData = new FormData(e.currentTarget);
		console.log(formData.get('dnsLog'));

	}
	return <Box sx={{ flexGrow: 1 }}>
		<Container>
			<Paper>
				<Card
				>
					<CardHeader title='log' />
					<CardContent>
						<form onSubmit={onSubmit}>
							<Grid container spacing={2}>
								<Grid size={size}>
									<Box sx={{ width: '100%' }}>
										<TextField
											fullWidth
											label="访问日志地址"
											name="access"
											variant="outlined"
										/>
									</Box>
								</Grid>
								<Grid size={size}>
									<TextField
										fullWidth
										label="错误日志地址"
										name="error"
										variant="outlined"
									/>
								</Grid>
								<Grid size={size}>
									<TextField select fullWidth name='logLevel' label='日志级别' defaultValue={'error'}>
										<MenuItem value="debug">全部记录</MenuItem>
										<MenuItem value="info">信息记录</MenuItem>
										<MenuItem value="warning">警告记录</MenuItem>
										<MenuItem value="error">错误记录</MenuItem>
										<MenuItem value="none">不记录</MenuItem>
									</TextField>
								</Grid>
								<Grid size={size}>
									<FormControlLabel label='启用 DNS 查询日志' name='dnsLog' control={<Switch />} labelPlacement="start" />
								</Grid>

								<Grid size={size}>
									<TextField select label='ip地址遮罩' name='maskAddress' fullWidth defaultValue={''}>
										<MenuItem value='quarter'>开启</MenuItem>
										<MenuItem value='half'>开启</MenuItem>
										<MenuItem value='full'>开启</MenuItem>
										<MenuItem value=''>关闭</MenuItem>
									</TextField>
								</Grid>

								<Grid size={size}>
									<Button type="submit" variant="contained" fullWidth>提交</Button>
								</Grid>
							</Grid>
						</form>

					</CardContent>

				</Card>
			</Paper>
		</Container>
	</Box>
}