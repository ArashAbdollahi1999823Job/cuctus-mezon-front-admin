export const environment = {
  production: false,
  backendUrlAdmin: 'http://localhost:9001/Api/Admin',
  backendUrlUser: 'http://localhost:9001/Api/User',
  backendUrlPicture: 'http://localhost:9001',
  keyBasketLocalStorage: "customerBasketId",
  keyUserToken: "userToken",
  storeId: "storeId",
  productId: "productId",
  typeId: "typeId",
  productPicture:"productPicture",
  typeItemName:"typeItemName",
  messages: {
    color: {
      colorDeleteSuccess: "حذف رنگ با موفقیت انجام شد.",
      doYouWantDeleteColor: "ایا از حذف رنگ مطمعن هستید؟"
    },
    off: {
      offDeleteSuccess: "حذف تخفیف با موفقیت انجام شد.",
      doYouWantDeleteOff: "ایا از حذف تخفیف مطمعن هستید؟"
    },
    type: {
      typeDeleteSuccess: "حذف دسته با موفقیت انجام شد.",
      doYouWantDeleteType: "ایا از حذف دسته مطمعن هستید؟",
      typeAddSuccess: "دسته با موفقیت ثبت شد.",
    },
    typeItem: {
      typeItemDeleteSuccess: "حذف ایتم دسته با موفقیت انجام شد.",
      doYouWantDeleteTypeItem: "ایا از حذف ایتم دسته مطمعن هستید؟",
      typeItemAddSuccess: "ایتم دسته با موفقیت ثبت شد.",
    },
    productItem: {
      productItemDeleteSuccess: "حذف ایتم دسته با موفقیت انجام شد.",
      doYouWantDeleteProductItem: "ایا از حذف ایتم دسته مطمعن هستید؟",
      productItemAddSuccess: "ایتم دسته با موفقیت ثبت شد.",
    },
  },
  titlePages:{
    color:{
      colorMain:"مدیریت رنگ فروشگاه بزرگ کاکتوس.",
    },
    typeItem:{
      typeItemMain:"مدیریت ایتم دسته فروشگاه بزرگ کاکتوس.",
    },
    productItem:{
      productItemMain:"مدیریت ایتم فروشگاه بزرگ کاکتوس.",
    },
  }
}
