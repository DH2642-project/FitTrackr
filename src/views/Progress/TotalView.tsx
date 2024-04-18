import { Card, CardContent, Typography } from "@mui/material";

interface TotalViewProps {
  title: string;
  value: number | string;
}

export function TotalView(props: TotalViewProps) {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="h2">{props.value}</Typography>
      </CardContent>
    </Card>
  );
}
