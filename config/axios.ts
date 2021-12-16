import { StatusCodes } from 'http-status-codes';
import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

axiosClient.defaults.headers = {
    //@ts-ignore
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

export const axiosGetRequest = async (url: string) => {
    const { data, statusText, status } = await axiosClient.get(`/${url}`);
    if (status !== StatusCodes.OK) throw new Error(statusText);
    return data;
};

export const axiosPostRequest = async (
    url: string,
    payload: Record<string, any>,
) => {
    const { data, statusText, status } = await axiosClient.post(
        `/${url}`,
        payload,
    );
    if (
        status === StatusCodes.NO_CONTENT ||
        status === StatusCodes.CREATED ||
        status === StatusCodes.OK
    )
        return data;

    throw new Error(statusText);
};

export const axiosPatchRequest = async (
    url: string,
    payload: Record<string, any>,
) => {
    const { data, statusText, status } = await axiosClient.patch(
        `/${url}`,
        payload,
    );
    if (
        status === StatusCodes.NO_CONTENT ||
        status === StatusCodes.CREATED ||
        status === StatusCodes.OK
    )
        return data;

    throw new Error(statusText);
};

export const axiosPutRequest = async (
    url: string,
    payload: Record<string, any>,
) => {
    const { data, statusText, status } = await axiosClient.put(
        `/${url}`,
        payload,
    );
    if (
        status === StatusCodes.NO_CONTENT ||
        status === StatusCodes.CREATED ||
        status === StatusCodes.OK
    ) {
        return data;
    }

    throw new Error(statusText);
};

export const axiosDeleteRequest = async (url: string) => {
    const { data, statusText, status } = await axiosClient.delete(`/${url}`);
    if (status !== StatusCodes.NO_CONTENT) throw new Error(statusText);
    return data;
};
