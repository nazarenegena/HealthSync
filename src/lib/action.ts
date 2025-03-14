"use server";

import receipeAxiosClient from "@/app/services/receipeAxiosInstance";
import axios from "axios";
const headers = {
  "x-rapidapi-key": "HkIPT1OuewEOoa+SXPP8Ew==fnFWYJe8ptK5KLxJ",
  "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com",
};

const client = axios.create({
  baseURL: "https://api.api-ninjas.com",
  headers,
  timeout: 60000,
});

export async function fetchRecipes() {
  console.log("calleds", "results");

  try {
    const results = await client.get(`/v1/nutrition`);
    console.log(results, "results");
    return results;
  } catch (error) {
    console.log(error, "erro");
  }
}
