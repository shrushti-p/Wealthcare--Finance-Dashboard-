import BoxHeader from '@/Components/BoxHeader';
import DashboardBox from '@/Components/DashboardBox';
import { useGetKpisQuery } from '@/State/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart, Legend, Bar, BarChart } from 'recharts';

const Row1 = () => {

  const { data } = useGetKpisQuery();
  const { palette } = useTheme();
  
  console.log(data);
  
  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name : month.substring(0, 3),
          revenue : revenue,
          expenses : expenses
        }
      })
    );
  }, [data]);
  
  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name : month.substring(0, 3),
          revenue : revenue
        }
      })
    );
  }, [data]);
  
  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name : month.substring(0, 3),
          revenue : revenue,
          profit : (revenue - expenses).toFixed(2)
        }
      })
    );
  }, [data]);
  
  
  return (
    <>
        <DashboardBox gridArea={"a"}>
          <BoxHeader
            title='Revenue and Expenses'
            subtitle='Top line represents revenue and bottom line represents expenses'
            sidetext='+4%'
          />
            <ResponsiveContainer width="100%" height={window.innerWidth > 600 ? "100%" : "95%" }>
              <AreaChart
                width={500}
                height={400}
                data={revenueExpenses}
                margin={{
                  top: 25,
                  right: 25,
                  left: -2.5,
                  bottom: 60,
                }}
              >
                <defs>
                 <linearGradient id='colorRevenue' x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
                    <stop
                      offset={'5%'}
                      stopColor={palette.primary[300]} 
                      stopOpacity={0.5}
                    />
                    <stop
                      offset={'95%'}
                      stopColor={palette.primary[300]} 
                      stopOpacity={0}
                    />
                 </linearGradient> 
              </defs>
              <XAxis 
                dataKey = "name" 
                tickLine = {false}
                style={{ fontSize : "10px", fontWeight : 600 }}
              />
              <YAxis 
                tickLine = {false}
                axisLine = {{ strokeWidth : "0" }}
                style={{ fontSize : "10px", fontWeight : 600 }}
                domain={[ 8000, 23000 ]}
              />
              <Tooltip wrapperStyle={{ color : "black", fontWeight : 600 }} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                dot = {true}
                stroke= {palette.primary.main} 
                fillOpacity={1}
                fill="url(#colorRevenue)" 
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                dot = {true}
                stroke= {palette.primary.main} 
                fillOpacity={1}
                fill="url(#colorRevenue)" 
                // This colorRevenue gradient or pattern defined in <defs> section of svg document,
                // and it is used to fill the area under the line chart and referencing color defined under defs tag.
              />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardBox>
        
        <DashboardBox gridArea={"b"}>
        <BoxHeader
            title='Revenue and Profit'
            subtitle='Top line represents revenue with respect profit as bottom line'
            sidetext='+4%'
          />
            <ResponsiveContainer width="100%" height={window.innerWidth > 600 ? "100%" : "95%" }>
              <LineChart
                width={500}
                height={400}
                data={revenueProfit}
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
              
              <Legend height={20} wrapperStyle={{ fontSize : "11px" }} />
              
              <Line 
                type="monotone" 
                dataKey="profit" 
                yAxisId={"left"}
                stroke={palette.tertiary[500]}
                strokeWidth={1}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                yAxisId={"right"}
                stroke={palette.primary.main}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardBox>
        
        <DashboardBox gridArea={"c"}>
          <BoxHeader
              title='Monthly Revenue'
              subtitle='Following graph represents revenue month by month'
              sidetext='+4%'
            />
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={revenue}
              margin={{
                top: 17,
                right: 15,
                left: -5,
                bottom: 58,
              }}
            >
              <defs>
                  <linearGradient id='colorSingleRevenue' x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
                        <stop
                          offset={'15%'}
                          stopColor={palette.yellow[300]} 
                          stopOpacity={0.8}
                        />
                        <stop
                          offset={'95%'}
                          stopColor={palette.yellow[300]} 
                          stopOpacity={0}
                        />
                    </linearGradient> 
              </defs>
                  
              <CartesianGrid vertical = {false} stroke={palette.grey[800]} />
              <XAxis 
                dataKey="name" 
                axisLine = {false} 
                tickLine = {false} 
                style={{ fontSize : "10px", fontWeight : 600 }} 
              />
              <YAxis
                axisLine = {false} 
                tickLine = {false} 
                style={{ fontSize : "10px", fontWeight : 600 }} 
              />
              <Tooltip wrapperStyle={{ color : "black", fontWeight : 600 }} />
              <Bar dataKey="revenue" fill="url(#colorSingleRevenue)"  />
            </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row1;