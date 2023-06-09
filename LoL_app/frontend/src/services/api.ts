import axios from "axios";

export async function get(url:string){
  ///this probably needs a default URl
  const res = await axios.get(url);
  const data = res.data;
  return data
}