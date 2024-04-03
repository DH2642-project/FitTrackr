import { Card, CardContent } from "@mui/material";
import HeatMap from "@uiw/react-heat-map";



export function CalendarChart({ data }: { data: { date: string;  count: number}[]}){
    return (
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <HeatMap
            value={data}
            width={700}
            startDate={new Date("2024/01/01")}
            endDate={new Date("2024/12/31")}
            panelColors={{
              0: "#fff7ed",
              1: "#ffcf9e",
              2: "#ffa74d",
              3: "#ff7c00",
              4: "#e25606",
              5: "#a93200",
            }}
            rectProps={{
              rx: 2,
            }}
          />
        </CardContent>
      </Card>
    );
};
export default CalendarChart;
