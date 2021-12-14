import {
    GetResponseDataTypeFromEndpointMethod,
    GetResponseTypeFromEndpointMethod,
} from '@octokit/types';

import { octokitClient } from '../../config/octokit';

type UserSearchType = typeof octokitClient.rest.search.users;
export type UserSearchResponseType =
    GetResponseTypeFromEndpointMethod<UserSearchType>;
export type UserSearchResponseDataType =
    GetResponseDataTypeFromEndpointMethod<UserSearchType>;

export type UserProfileResponseDataType = GetResponseDataTypeFromEndpointMethod<
    typeof octokitClient.rest.users.getByUsername
>;

export type UserReposResponseDataType = GetResponseDataTypeFromEndpointMethod<
    typeof octokitClient.rest.repos.listForUser
>;
