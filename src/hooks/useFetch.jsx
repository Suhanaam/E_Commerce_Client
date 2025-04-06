import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axiosInstance';

export const useFetch = (url) => {
    const [data,setData]=useState({});
    const [isLoading,setIsLoading]=useState(true);
      const [error,setError]=useState(null);

      //api call function
      const fetchData=async()=>{
        try {
         const response = await axiosInstance({ method :"GET",url:url,data: payload,
          withCredentials: true});
         setData(response?.data?.data);
         setIsLoading(false);                    
        } catch (error) {
            console.log(error);
            setError(error);
        }
      };

      //useEffect
      useEffect(()=>{
        fetchData();
      },[]);





  return [data,isLoading,error];
}
