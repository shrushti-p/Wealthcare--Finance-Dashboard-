import BoxHeader from '@/Components/BoxHeader';
import DashboardBox from '@/Components/DashboardBox';
import FlexBetween from '@/Components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery, useGetTranscationsQuery } from '@/State/api';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';


const Row3 = () => {
  
  const { palette } = useTheme();
  const pieColors1 = [palette.red[700], palette.red[400]];  
  const pieColors2 = [palette.yellow[700], palette.yellow[400]];  
  const pieColors3 = [palette.white[700], palette.white[400]];  
  // Fetching data from backend
  const { data : kpiData } = useGetKpisQuery();
  const { data : productData } = useGetProductsQuery();
  const { data : transactionData } = useGetTranscationsQuery();
  
  const pieChartData = useMemo(() => {
    
    if(kpiData)
    {
      const totalExpenses = kpiData[0].totalExpenses;
      
      return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => {
        return [ 
          {
            name : key,
            value : value
          },
          {
            name : `${key} of Total`,
            value : totalExpenses - value
          }
      ]
      });
    }
  }, [kpiData]);
  
  console.log(pieChartData);
  
  const productColumns = [
    {
      field : "_id",
      headerName : "ID",
      flex : window.innerWidth > 600 ? 1 : 0.5, // takes less space on smaller screens
    },
    {
      field : "expense",
      headerName : "Expense",
      flex : window.innerWidth > 600 ? 0.5 : 0.25, // takes less space on smaller screens
      renderCell : (params : GridCellParams) => `₹${params.value}`,
    },
    {
      field : "price",
      headerName : "Price",
      flex : window.innerWidth > 600 ? 0.5 : 0.25, // takes less space on smaller screens
      renderCell : (params : GridCellParams) => `₹${params.value}`,
    },
  ];
  
  const transactionColumns = [
    {
      field : "_id",
      headerName : "ID",
      flex : window.innerWidth > 600 ? 0.75 : 0.5, // takes less space on smaller screens
    },
    {
      field : "buyer",
      headerName : "Buyer",
      flex : window.innerWidth > 600 ? 0.65 : 0.5, // takes less space on smaller screens
    },
    {
      field : "amount",
      headerName : "Amount",
      flex : window.innerWidth > 600 ? 0.35 : 0.25, // takes less space on smaller screens
      renderCell : (params : GridCellParams) => `₹${params.value}`,
    },
    {
      field : "productIds",
      headerName : "Count",
      flex : window.innerWidth > 600 ? 0.25 : 0.15, // takes less space on smaller screens
      renderCell : (params : GridCellParams) => (params.value as Array<string>)?.length
    }
  ];


  return (
    <>
        <DashboardBox gridArea={"g"}>
          <BoxHeader 
            title = "List of Products" 
            sidetext = {`${productData?.length} products`}
          />
          <Box
            mt={"0rem"}
            p={".75rem"}
            height={"85%"}
            width={"100%"}
            sx = {{
              "& .MuiDataGrid-root" : {
                color : palette.grey[300],
                border : "none"
              },
              "& .MuiDataGrid-row:nth-child(odd)" : {
                backgroundColor : "#2D2D34"
              },
              "& .MuiDataGrid-row:nth-child(even)" : {
                backgroundColor : "#23242a"
              },
              "& .MuiDataGrid-row" : {
                fontWeight : 500
              },
              "& .MuiDataGrid-root .MuiDataGrid-withBorderColor" : {
                borderColor : "transparent"
              },
              "& .MuiDataGrid-columnHeaders" : {
                color : "#FFF",
                backgroundColor : "#1b1b1b",
                marginTop : ".35rem"
              }
            }}
          >
            <DataGrid 
              rows={productData || []} 
              columns={productColumns} 
              hideFooter = {true}
              columnHeaderHeight={40}
              rowHeight={35}
            />
          </Box>
        </DashboardBox>
        <DashboardBox gridArea={"h"}>
        <BoxHeader 
            title = "List of Orders" 
            sidetext = {`${transactionData?.length} latest orders`}
          />
          <Box
            mt={"0rem"}
            p={".75rem"}
            height={"88%"}
            sx = {{
              "& .MuiDataGrid-root" : {
                color : palette.grey[300],
                border : "none"
              },
              "& .MuiDataGrid-row:nth-child(odd)" : {
                backgroundColor : "#2D2D34"
              },
              "& .MuiDataGrid-row:nth-child(even)" : {
                backgroundColor : "#23242a"
              },
              "& .MuiDataGrid-row" : {
                fontWeight : 500
              },
              "& .MuiDataGrid-root .MuiDataGrid-withBorderColor" : {
                borderColor : "transparent"
              },
              "& .MuiDataGrid-columnHeaders" : {
                color : "#FFF",
                backgroundColor : "#1b1b1b",
                marginTop : ".35rem"
              }
            }}
          >
            <DataGrid 
              rows={transactionData || []} 
              columns={transactionColumns} 
              hideFooter = {true}
              columnHeaderHeight={40}
              rowHeight={35}
            />
          </Box>
        </DashboardBox>
        <DashboardBox gridArea={"i"}>
          <BoxHeader title='Expenses breakdown by category' sidetext='+3%' />
            <FlexBetween mt={window.innerWidth > 600 ? "0.55rem" : "1.5rem"} gap={"1.5rem"}  justifyContent = {"space-around !important"} >
              {
                pieChartData?.map((data, i) => (
                  <Box key={`${data[0].name}-${i}`} display={"flex"} flexDirection={"column"} gap={"1px"} alignItems={"center"} justifyContent={"center"}>
                    <PieChart width={70} height={70}>
                        <Pie
                          stroke='none'
                          data={data}
                          innerRadius={14}
                          outerRadius={28}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                          {pieChartData?.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={i === 0 ? pieColors1[index] : (i === 1 ? pieColors2[index] : pieColors3[index])} />
                          ))}
                        </Pie>
                    </PieChart>
                    <Typography variant='h5' color={i === 0 ? palette.red[300] : (i === 1 ? palette.yellow[300] : palette.white[300])} fontWeight={500}> {data[0].name} </Typography>
                  </Box>
                ))  
              }
            </FlexBetween>
        </DashboardBox>
        <DashboardBox gridArea={"j"}>
          <BoxHeader title='Overall Summery and Explanation Data' sidetext='+15%' />
          <Box
            height={"20px"}
            width={"90%"}
            margin={"1.5rem 1rem .5rem 1rem"}
            bgcolor={palette.primary[800]}
            borderRadius={'1rem'}
          >
              <Box
              height={"20px"}
              width={"40%"}
              bgcolor={palette.primary[600]}
              borderRadius={'1rem'}
            >
            </Box>
          </Box>
          <Typography variant='h6' fontWeight={500} margin={"1rem"} textAlign={"left"}> Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Corporis dolor repellendus impedit ducimus, repudiandae aperiam earum at debitis </Typography>
        </DashboardBox>
    </>
  )
}

export default Row3;