import {
    CreateRootHandlerParams,
    RequestMethodHandler,
    createMethodHandler,
    createRootHandler,
} from '../../../../lib/types/requests';
import {
    UserPageSettings,
    userPageSettingsCollection,
} from '../../../../entities/UserPageSettings';

import ObjectID from 'bson-objectid';
import { RequestMethods } from '../../../../lib/constants/httpRequestMethods';
import { StatusCodes } from 'http-status-codes';
import clientPromise from '../../../../config/mongoAdapter';
import { transformObjectIdFields } from '../../../../util/requests';

const handlePostRequest: RequestMethodHandler = async (req, res) =>
    createMethodHandler({
        requireToken: true,
        requiredUserId: req.body.userId,
        callback: async (request, response) => {
            const db = (await clientPromise).db();
            await db.collection(userPageSettingsCollection).insertOne({
                ...request.body,
                userId: new ObjectID(request.body.userId),
            });

            response.status(StatusCodes.CREATED).json(null);
        },
    })(req, res);

const handlePutRequest: RequestMethodHandler = async (req, res) =>
    createMethodHandler({
        requireToken: true,
        requiredUserId: req.body.userId,
        callback: async (request, response) => {
            if (!request.body._id)
                return response.status(StatusCodes.BAD_REQUEST).json(null);

            const transformedBody = transformObjectIdFields(
                request.body as UserPageSettings,
                ['_id', 'userId'],
            );

            const db = (await clientPromise).db();
            const result = await db
                .collection(userPageSettingsCollection)
                .findOneAndReplace(
                    { _id: transformedBody._id },
                    { ...transformedBody },
                );

            if (result.ok) response.status(StatusCodes.OK).json(result.value);
            else throw new Error();
        },
    })(req, res);

const requestMethodHandlers: CreateRootHandlerParams = {
    [RequestMethods.POST]: handlePostRequest,
    [RequestMethods.PUT]: handlePutRequest,
};
export default createRootHandler(requestMethodHandlers);
