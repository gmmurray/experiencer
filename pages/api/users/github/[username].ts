import {
    CreateRootHandlerParams,
    RequestMethodHandler,
    createMethodHandler,
    createRootHandler,
} from '../../../../lib/types/requests';

import { RequestMethods } from '../../../../lib/constants/httpRequestMethods';
import { StatusCodes } from 'http-status-codes';
import clientPromise from '../../../../config/mongoAdapter';
import { githubUsersCollection } from '../../../../entities/GithubUser';
import { userPageSettingsCollection } from '../../../../entities/UserPageSettings';

const handleGetRequest: RequestMethodHandler = async (req, res) =>
    createMethodHandler({
        requireToken: false,
        callback: async (request, response) => {
            const { username } = request.query;
            const resolvedUsername =
                typeof username === 'string' ? username : username[0];
            const db = (await clientPromise).db();

            const aggPipeline = [
                {
                    $match: {
                        login: resolvedUsername,
                    },
                },
                {
                    $lookup: {
                        from: userPageSettingsCollection,
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'userPageSettings',
                    },
                },
            ];

            const aggCursor = db
                .collection(githubUsersCollection)
                .aggregate(aggPipeline);
            const aggResult: any[] = [];

            await aggCursor.forEach(item => {
                aggResult.push(item);
            });

            if (aggResult.length === 0) {
                response.status(StatusCodes.NOT_FOUND).json(null);
            } else {
                response.status(StatusCodes.OK).json({
                    ...aggResult[0],
                    userPageSettings: aggResult[0]?.userPageSettings[0] ?? null,
                });
            }
        },
    })(req, res);

const requestMethodHandlers: CreateRootHandlerParams = {
    [RequestMethods.GET]: handleGetRequest,
};

export default createRootHandler(requestMethodHandlers);
