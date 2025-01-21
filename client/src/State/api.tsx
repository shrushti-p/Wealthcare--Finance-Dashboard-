import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse, GetTranscationResponse } from "./types";

/*
    This code creates an API client using Redux Toolkit's createApi function. 
    It configures the base query, defines the reducer path,
    tag types, and defines a query endpoint for fetching KPIs. 
    This API client can be used to make API requests and manage data in a Redux store.
*/

export const api = createApi({
    baseQuery : fetchBaseQuery({ baseUrl : "https://wealthcare-finance-dashboard.onrender.com" }),
    reducerPath : "main",
    tagTypes : ["Kpis", "Products", "Transcations"],
    endpoints : (build) => ({
        getKpis : build.query <Array<GetKpisResponse>, void> ({
            query : () => "kpi/kpis/",
            providesTags : ["Kpis"]
        }),
        getProducts : build.query <Array<GetProductsResponse>, void> ({
            query : () => "product/products/",
            providesTags : ["Products"]
        }),
        getTranscations : build.query <Array<GetTranscationResponse>, void> ({
            query : () => "transaction/transactions/",
            providesTags : ["Transcations"]
        })
    })
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTranscationsQuery } = api;
