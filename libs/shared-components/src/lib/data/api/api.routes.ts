import {ApiSettings} from "./api.settings";

export const ApiRoutes = {
  ADMIN: {
    LOGIN: {
      LOGIN: ApiSettings.apiUrl + '/auth/login'
    },
    CATEGORY: {
      CREATE_CATEGORY: ApiSettings.apiUrl + '/categories',
      GET_ALL_CATEGORY: ApiSettings.apiUrl + '/categories',
      GET_CATEGORY_BY_ID: (categoryId: string) => ApiSettings.apiUrl + `/categories/${categoryId}`,
      UPDATE_CATEGORY: (categoryId: string) => ApiSettings.apiUrl + `/categories/${categoryId}`,
      DELETE_CATEGORY: (categoryId: string) => ApiSettings.apiUrl + `/categories/${categoryId}`,
      ADD_LOGO_CATEGORY: (categoryId: string) => ApiSettings.apiUrl + `/categories/${categoryId}/logo`,
      GET_CATEGORY_LOGO: (categoryId: string) => ApiSettings.apiUrl + `/categories/${categoryId}/logo`,
    },
    PARTNER: {
      CREATE_PARTNER: ApiSettings.apiUrl + '/auth/register',
      GET_ALL_PARTNERS: ApiSettings.apiUrl + '/auth/partners',
      UPDATE_PARTNER: (partnerId: string) => ApiSettings.apiUrl + `/auth/partners/${partnerId}`,
      DELETE_PARTNER: (partnerId: string) => ApiSettings.apiUrl + `/auth/partners/${partnerId}`,
    }
  }
};
