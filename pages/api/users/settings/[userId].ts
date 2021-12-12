import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../config/mongodbClient';
import { RequestMethods } from '../../../../lib/constants/httpRequestMethods';
import ObjectID from 'bson-objectid';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { mockUserPageSettings } from '../../../../mock/userPageSettings';
import { userPageSettingsCollection } from '../../../../entities/UserPageSettings';
import {
    createRootHandler,
    CreateRootHandlerParams,
} from '../../../../lib/types/requests';

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query;
    const resolvedUserId = typeof userId === 'string' ? userId : userId[0];
    try {
        const { db } = await connectToDatabase();
        const result = await db
            .collection(userPageSettingsCollection)
            .findOne({ userId: new ObjectID(resolvedUserId) });
        // const result = mockUserSettings.find(
        //     us => us.userId === resolvedUserId,
        // );

        if (!result) res.status(StatusCodes.NOT_FOUND).json(null);
        else res.status(StatusCodes.OK).json(result);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        });
    }
};

const requestMethodHandlers: CreateRootHandlerParams = {
    [RequestMethods.GET]: handleGetRequest,
};

export default createRootHandler(requestMethodHandlers);
