import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../config/mongodbClient';
import { RequestMethods } from '../../../../lib/constants/httpRequestMethods';
import ObjectID from 'bson-objectid';
import {
    UserPageSettings,
    userPageSettingsCollection,
} from '../../../../entities/UserPageSettings';
import { RequestMethodHandler } from '../../../../lib/types/requests';
import { transformObjectIdFields } from '../../../../util/requests';

// TODO: convert to function creator
const rootHandler = (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case RequestMethods.POST:
            return handlePostRequest(req, res);
        case RequestMethods.PUT:
            return handlePutRequest(req, res);
        default:
            throw new Error('not implemented');
    }
};

const handlePostRequest: RequestMethodHandler = async (req, res) => {
    // TODO: check for token here
    try {
        const { db } = await connectToDatabase();
        await db
            .collection(userPageSettingsCollection)
            .insertOne({ ...req.body, userId: new ObjectID(req.body.userId) });

        res.status(StatusCodes.CREATED).json(null);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        });
    }
};

const handlePutRequest: RequestMethodHandler = async (req, res) => {
    // TODO: check for token here
    try {
        if (!req.body._id)
            return res.status(StatusCodes.BAD_REQUEST).json(null);

        const transformedBody = transformObjectIdFields(
            req.body as UserPageSettings,
            ['_id', 'userId'],
        );

        const { db } = await connectToDatabase();
        const result = await db
            .collection(userPageSettingsCollection)
            .findOneAndReplace({ _id: transformedBody._id }, transformedBody);

        if (result.ok) res.status(StatusCodes.OK).json(result.value);
        else throw new Error();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        });
    }
};

export default rootHandler;
