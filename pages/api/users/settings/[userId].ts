import {
    CreateRootHandlerParams,
    RequestMethodHandler,
    createMethodHandler,
    createRootHandler,
} from '../../../../lib/types/requests';

import ObjectID from 'bson-objectid';
import { RequestMethods } from '../../../../lib/constants/httpRequestMethods';
import { StatusCodes } from 'http-status-codes';
import clientPromise from '../../../../config/mongoAdapter';
import { userPageSettingsCollection } from '../../../../entities/UserPageSettings';

const handleGetRequest: RequestMethodHandler = async (req, res) =>
    createMethodHandler({
        requireToken: false,
        callback: async (request, response) => {
            const { userId } = request.query;
            const resolvedUserId =
                typeof userId === 'string' ? userId : userId[0];
            const db = (await clientPromise).db();
            const result = await db
                .collection(userPageSettingsCollection)
                .findOne({ userId: new ObjectID(resolvedUserId) });

            if (!result) response.status(StatusCodes.NOT_FOUND).json(null);
            else response.status(StatusCodes.OK).json(result);
        },
    })(req, res);

const requestMethodHandlers: CreateRootHandlerParams = {
    [RequestMethods.GET]: handleGetRequest,
};

export default createRootHandler(requestMethodHandlers);
