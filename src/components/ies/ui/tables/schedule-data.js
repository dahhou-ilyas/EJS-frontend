"use client"
import axios from "axios";

export function DATA(token, id) {
  const fetch1 = async () => {
    const data = await axios(`http://localhost:8080/responsables/${id}/streams?phase=goingto`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const noanimated = data.data;
    return noanimated;
  }
  const fetch2 = async () => {
    const data = await axios(`http://localhost:8080/responsables/${id}/streams?phase=animated`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const animated = data.data;
    return animated;
  }
  return {
    fetch1,
    fetch2
  }


}




