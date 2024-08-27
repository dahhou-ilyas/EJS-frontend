"use client"
import axios from "axios";

export function DATA() {
      
    const fetch1=async()=>{
      const data=await axios(`http://localhost:7000/responsables/${1}/streams?phase=goingto`)
      const noanimated= data.data;
       return noanimated;
    } 
    const fetch2=async()=>{
      const data=await axios(`http://localhost:7000/responsables/${1}/streams?phase=animated`)
      const animated= data.data;
       return animated;
    }
    return{
      fetch1,
      fetch2
    }
    

}




