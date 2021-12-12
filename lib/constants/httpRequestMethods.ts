export type RequestMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const RequestMethods: Record<RequestMethodType, RequestMethodType> = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};
