import { ApiResponse, Business } from "@/types/response";
import { GetRequest, PatchRequest } from "@/utils/apiHelper";
import { useEffect, useState } from "react";

const useAdmin = () => {
    const [res, setRes] = useState<ApiResponse<Business[]> | undefined>();
    const id = 6;

    const getAllBusiness = async () => {
        const response = await GetRequest("admin/get-businesses?page=1&limit=100&state=ALL");
        console.log(response);

        if (response && "data" in response) {
            // response.data is already your ApiResponse
            setRes(response.data as ApiResponse<Business[]>);
        } else {
            setRes(undefined);
        }
    };

    const approveBussiness = async () => {
        const response = await PatchRequest(`/admin/approve-business/${id}`, id);
    };

    useEffect(() => {
        getAllBusiness();
    }, []);

    return {
        res,
    };
};

export default useAdmin;
