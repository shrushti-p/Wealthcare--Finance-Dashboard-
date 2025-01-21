import DashboardBox from "@/Components/DashboardBox";
import FlexBetween from "@/Components/FlexBetween";
import { useGetKpisQuery } from "@/State/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";
import Loader from "../Loader";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];
      }
    );
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);
  

  return (
    kpiData ?
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 1.5rem" gap="1rem">
        <Box>
          <Typography variant="h4" fontWeight={700} fontSize={"1.25rem"} marginBottom={".25rem"}>Revenue and Predictions</Typography>
          <Typography variant="h6">
            Charted revenue and predicted revenue based on a simple linear
            regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.white[100],
            fontWeight: 600,
            backgroundColor: "purple",
            boxShadow: "0.12rem 0.12rem 0.1rem .1rem rgba(0,0,0,.1)",
          }}
        >
          Show Predicted Revenue for Next Year
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%" className={"predictions"}>
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} fontWeight={600} style={{ fontSize: "10px" }}>
            <Label value="month" fontWeight={600} fontSize={".75rem"} offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `₹${v}`}
            fontWeight={600}
          >
            <Label
              value="Revenue in USD"
              angle={-90}
              fontWeight={600} fontSize={".75rem"} offset={-15}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip wrapperStyle={{ fontWeight : 600 }} />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={"#1dd1a1"}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />
          {isPredictions && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox> : <Loader />
  );
};

export default Predictions;