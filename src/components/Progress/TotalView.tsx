import { Card, CardContent, Typography } from "@mui/material";

export function TotalView(props: any) {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="h2">{props.value}</Typography>
      </CardContent>
    </Card>
  );
}
