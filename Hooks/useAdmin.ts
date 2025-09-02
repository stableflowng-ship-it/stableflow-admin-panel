import { ApiResponse } from "@/types/response";
import { GetResquest, PatchRequest } from "@/utils/apiHelper"
import { useEffect, useState } from "react";

const useAdmin = () =>{
    const [res, setRes] = useState<ApiResponse>()
    const id = 6

    const getAllBusiness = async() =>{
        const response = await GetResquest('/admin/get-businesses')
        console.log(response);
        if ('data' in response) {
            setRes(response.data as ApiResponse)
        } else {
            setRes(undefined)
        }
    }

    const approveBussiness = async () =>{
        const response = await PatchRequest(`/admin/approve-business/${id}`, id)
    }

    

    useEffect(()=>{
        getAllBusiness()
    },[])
    
    return{
        res
    }
}

export default useAdmin