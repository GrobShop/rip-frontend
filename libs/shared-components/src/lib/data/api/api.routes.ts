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
      DELETE_LOGO_CATEGORY: (categoryId: string) => ApiSettings.apiUrl + `/categories/${categoryId}/logo`,
    },
    PARTNER: {
      CREATE_PARTNER: ApiSettings.apiUrl + '/auth/register',
      GET_ALL_PARTNERS: ApiSettings.apiUrl + '/auth/partners',
      UPDATE_PARTNER: (partnerId: string) => ApiSettings.apiUrl + `/auth/partners/${partnerId}`,
      DELETE_PARTNER: (partnerId: string) => ApiSettings.apiUrl + `/auth/partners/${partnerId}`,
    },
    // PRODUCT: {
    //   CREATE_PRODUCT: ApiSettings.apiUrl + '/products',
    //   GET_PRODUCT_BY_ID: (productId: string) => ApiSettings.apiUrl + `/products/${productId}`,
    //   GET_ALL_PRODUCTS: ApiSettings.apiUrl + '/product',
    //   UPDATE_PRODUCT: (productId: string) => ApiSettings.apiUrl + `/product/${productId}`,
    //   DELETE_PRODUCT: (productId: string) => ApiSettings.apiUrl + `/product/${productId}`,
    //   ADD_PRODUCT_IMAGE: ApiSettings.apiUrl + '/products/images',
    //   GET_IMAGE_BY_ID: (productId: string, imageId: string) => ApiSettings.apiUrl + `/products/images/${productId}/${imageId}`,
    //   GET_ALL_IMAGES: (productId: string) => ApiSettings.apiUrl + `/products/${productId}?include_images=true`,
    // }

    PRODUCT: {
      CREATE_PRODUCT: ApiSettings.apiUrl + '/products',
      GET_PRODUCT_BY_ID: (productId: string) => ApiSettings.apiUrl + `/products/${productId}`,
      // GET_ALL_PRODUCTS: (categoryId: string) => ApiSettings.apiUrl + `/products/category/${categoryId}`,
      GET_ALL_PRODUCTS: (creatorId: string) => ApiSettings.apiUrl + `/products/creator/${creatorId}`,
      UPDATE_PRODUCT: (productId: string) => ApiSettings.apiUrl + `/products/${productId}`,
      DELETE_PRODUCT: (productId: string) => ApiSettings.apiUrl + `/products/${productId}`,
      ADD_PRODUCT_IMAGE: ApiSettings.apiUrl + '/products/images',
      GET_IMAGE_BY_ID: (productId: string, imageId: string) => ApiSettings.apiUrl + `/products/images/${productId}/${imageId}`,
      GET_ALL_IMAGES: (productId: string) => ApiSettings.apiUrl + `/products/${productId}?include_images=true`,
      DELETE_PRODUCT_IMAGE:  (imageId: string) => ApiSettings.apiUrl + `/products/images/${imageId}`
    }
  },
  STANDARD: {
    LOGIN: {
      LOGIN: ApiSettings.apiUrl + '/auth/login'
    },
    CATEGORY: {
      GET_ALL: ApiSettings.apiUrl + '/categories',
      GET_BY_ID: (categoryId: string) => ApiSettings.apiUrl + `/categories/${categoryId}`,
      GET_LOGO: (categoryId: string) => ApiSettings.apiUrl + `/categories/${categoryId}/logo`
    },
    PRODUCT: {
      GET_ALL_BY_CATEGORY: (categoryId: string) => ApiSettings.apiUrl + `/products/category/${categoryId}`,
      GET_BY_ID: (categoryId: string) => ApiSettings.apiUrl + `/products/${categoryId}`,
      GET_IMAGE_BY_ID: (productId: string, imageId: string) => ApiSettings.apiUrl + `/products/images/${productId}/${imageId}`,
      GET_ALL_IMAGES: (productId: string) => ApiSettings.apiUrl + `/products/${productId}?include_images=true`,
    },
    WISHLIST: {
      GET_WISHLIST: ApiSettings.apiUrl + '/wishlists',
      ADD_ITEM: ApiSettings.apiUrl + '/wishlists/items',
      GET_ITEMS: (whishlistId: string) => ApiSettings.apiUrl + `/wishlists/items/wishlist/${whishlistId}`,
      DELETE_ITEM: (itemId: string) => ApiSettings.apiUrl + `/wishlists/items/${itemId}`,
    },
    CART: {
      GET_CART: ApiSettings.apiUrl + '/carts',
      ADD_ITEM: ApiSettings.apiUrl + '/carts/items',
      GET_ITEMS: (cartId: string) => ApiSettings.apiUrl + `/carts/items/cart/${cartId}`,
      UPDATE_ITEM: (itemId: string) => ApiSettings.apiUrl + `/carts/items/${itemId}`,
      DELETE_ITEM: (itemId: string) => ApiSettings.apiUrl + `/carts/items/${itemId}`,
      SUBMIT_ORDER: ApiSettings.apiUrl + '/carts/submit'
    }
  }
};
