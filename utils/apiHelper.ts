'use client'
import axios from "axios"
import { envHelper } from "@/config/env-helper"
import StableAxios from "@/lib/axios"

const server = envHelper.url.base_url


export const GetResquest = async (url: string) => {
    try {
        const response = await StableAxios.get(url);
        // console.log(response)
        return response
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return error
        }
        throw error;
    }
}

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

export const PostRequestForm = async (url: string, data: unknown) => {
    try {
        const response = await axios.post(`${server}${url}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return error
        }
        throw error;
    }
}

export const PatchRequest = async (url: string, data: unknown) => {
  try {
    const response = await axios.patch(`${server}${url}`, data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
    return response;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response) {
      return e.response;
    }
    throw e;
  }
};