import { ReasonPhrases } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import {
    RequestMethodType,
    RequestMethods,
} from '../constants/httpRequestMethods';

export type RequestMethodHandler = (
    req: NextApiRequest,
    res: NextApiResponse,
) => Promise<void>;

type RootHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export type CreateRootHandlerParams =
    | Record<string, RequestMethodHandler>
    | Record<string, undefined>;

type CreateRootHandlerType = (params: CreateRootHandlerParams) => RootHandler;
export const createRootHandler: CreateRootHandlerType =
    params => async (req, res) => {
        switch (req.method) {
            case RequestMethods.GET: {
                if (params.GET) return params.GET(req, res);
            }
            case RequestMethods.POST: {
                if (params.POST) return params.POST(req, res);
            }
            case RequestMethods.PATCH: {
                if (params.PATCH) return params.PATCH(req, res);
            }
            case RequestMethods.PUT: {
                if (params.PUT) return params.PUT(req, res);
            }
            case RequestMethods.DELETE: {
                if (params.DELETE) return params.DELETE(req, res);
            }
            default:
                throw new Error(ReasonPhrases.NOT_IMPLEMENTED);
        }
    };
