import BoxHeader from '@/Components/BoxHeader';
import DashboardBox from '@/Components/DashboardBox';
import FlexBetween from '@/Components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery } from '@/State/api';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';

const pieData  = [
  { name : 'Group A', value : 600 },
  { name : 'Group B', value : 400 }
];

const Row2 = () => {
  
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data : productData } = useGetProductsQuery();
  const { data : operationalData } = useGetKpisQuery()
  console.log(productData);
  
  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name : month.substring(0, 3),
          "Operational Expenses" : operationalExpenses,
          "Non Operational Expenses" : nonOperationalExpenses
        }
      })
    );
  }, [operationalData]);
  
  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id : _id,
          price, expense
        }
      })
    );
  }, [productData]);
  
  return (
    <>
        <DashboardBox gridArea={"d"}>
        <BoxHeader
            title='Operational vs non Operational Expenses'
            subtitle='Graph will show difference between their growth'
            sidetext='+4%'
          />
            <ResponsiveContainer width="100%" height={window.innerWidth > 600 ? "100%" : "95%" }>
              <LineChart
                width={500}
                height={400}
                data={operationalExpenses}
                margin={{
                  top: 25,
                  right: 25,
                  left: -2.5,
                  bottom: 60,
                }}
              >
              
              <CartesianGrid vertical = {false} stroke={palette.grey[800]} />
              
              <XAxis 
                dataKey = "name" 
                tickLine = {false}
                style={{ fontSize : "10px", fontWeight : 600 }}
              />
              <YAxis 
                yAxisId={"left"}
                tickLine = {false}
                axisLine = {false}
                style={{ fontSize : "10px", fontWeight : 600 }}
              />
              <YAxis 
                yAxisId={"right"}
                orientation='right'
                tickLine = {false}
                axisLine = {false}
                style={{ fontSize : "10px", fontWeight : 600 }}
              />
             
              <Tooltip wrapperStyle={{ fontWeight : 600 }} />
                            
              <Line
                type="monotone" 
                orientation={"left"}
                dataKey="Operational Expenses" 
                yAxisId={"left"}
                stroke={palette.tertiary[500]}
                strokeWidth={1}
              />
              <Line 
                type="monotone" 
                dataKey="Non Operational Expenses" 
                yAxisId={"right"}
                stroke={palette.red[400]}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardBox>
        <DashboardBox gridArea={"e"}>
          <BoxHeader title='Campaigns and Targets' sidetext='+3%' />
          <FlexBetween mt={"0.25rem"} gap={"0.5rem"} pr={'1rem'} >
          <PieChart
            width={110}
            height={100}
            margin={{
              top : 0,
              right : -10,
              left : 10,
              bottom : 0
            }}
          >
            <Pie
              stroke='none'
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
        </PieChart>
        <Box ml={"0.7rem"} flexBasis={"40%"} textAlign={"center"} >
          <Typography variant='h5' fontWeight={500}> Target Sales </Typography>
          <Typography m={"0.3rem 0"} variant='h3' color={palette.primary[300]}>
            83
          </Typography>
          <Typography variant='h6'>
            Final goal compaign, that is desired!
          </Typography>
        </Box>
        <Box flexBasis={"40%"} textAlign={"left"} >
          <Typography variant='h5' fontSize={".75rem"} fontWeight={500}> Losses in Revenue </Typography>
          <Typography variant='h6'> Losses are down 25% </Typography>
          <Typography mt={"0.4rem"} fontWeight={500} variant='h5' fontSize={".75rem"}> Profit margins </Typography>
          <Typography variant='h6'> Margins are up by 30% from last month. </Typography>
        </Box>
        </FlexBetween>
        </DashboardBox>
        <DashboardBox gridArea={"f"}>
        <BoxHeader title="Product Prices vs Expenses" sidetext="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px", fontWeight : 600 }}
              tickFormatter={(v) => `₹${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px", fontWeight : 600 }}
              tickFormatter={(v) => `₹${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip wrapperStyle={{ fontWeight : 600, fontSize : "13px" }} formatter ={(v) => {
              const temp : any = v;
              return `₹${temp}`;
            }} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.blue[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
        </DashboardBox>
    </>
  )
}

export default Row2;