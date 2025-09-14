'use client'
import axios, { AxiosRequestConfig } from "axios"
import { envHelper } from "@/config/env-helper"
import StableAxios from "@/lib/axios"

const server = envHelper.url.base_url


export const GetRequest = async (url: string, config?: AxiosRequestConfig) => {
  try {
    const response = await StableAxios.get(url, config);
    return response;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response) {
      return e.response;
    }
    throw e;
  }

};

export const PostRequest = async (url: string, data: unknown) => {
  try {
    const response = await StableAxios.post(`${server}${url}`, JSON.stringify(data));
    return response;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response) {
      return e.response;
    }
    throw e;
  }
};

export const PatchRequest = async (url: string, data: unknown) => {
  try {
    const response = await StableAxios.patch(`${server}${url}`, data);
    return response;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response) {
      return e.response;
    }
    throw e;
  }
};