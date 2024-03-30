import { Card, CardContent } from "@mui/material";
import HeatMap from "@uiw/react-heat-map";

const value = [
  { date: "2016/01/11", count: 2 },
  { date: "2016/04/12", count: 2 },
  { date: "2016/05/01", count: 1 },
  { date: "2016/05/02", count: 3 },
  { date: "2016/05/03", count: 1 },
  { date: "2016/05/04", count: 1 },
  { date: "2016/05/08", count: 2},
  { date: "2016/12/08", count: 3 },
];

const CalendarChart = () => {
    return (
      <Card sx={{ borderRadius: 4 }}>
        <CardContent>
          <HeatMap
            value={value}
            width={700}
            startDate={new Date("2016/01/01")}
            endDate={new Date("2016/12/31")}
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
