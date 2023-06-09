export const environment = {
  production: false,
  backendUrlAdmin: 'http://localhost:9001/Api/Admin',
  backendUrlUser: 'http://localhost:9001/Api/User',
  backendUrlPicture: 'http://localhost:9001',
  hubUrl:"http://localhost:9001/hubs",
  keyBasketLocalStorage: "customerBasketId",
  keyUserToken: "userToken",
  storeId: "storeId",
  productId: "productId",
  productIdForProductPictureMain: "productIdForProductPictureMain",
  typeIdForProductItemMain:"typeIdForProductItemMain",
  productPictureForProductItemMain:"productPictureForProductItemMain",
  productIdForProductItemMain:"productIdForProductItemMain",
  chatHubUrl:"http://localhost:9001/hubs/chat",
  typeId: "typeId",
  productPicture:"productPicture",
  typeItemName:"typeItemName",
  storage:{
    otherUserPhoneNumberForChat:"otherUserPhoneNumberForChat",
    groupName:"groupName",
    myPhoneNumber:"myPhoneNumber",
  },
  productSetting:{
    thumbnail:1,
    sliderStart:2,
    sliderEnd:10,
  },
  messages: {
    common:{
      messageEmpty:"پیام شما خالی است ",
      enterSuccessful:"ورود با موفقیت انجام شد.",
      failedConnectionChatHub:"ارتباط برای چت برقرار نشد",
      doYouWantToCancelSendThisPicture:"ایا میخاهید فرستادن این عکس را کنسل کنید؟",
      doYouWantToDeleteGroup:"ایا میخاهید این گروه را حذف کنید؟",
      groupDeleteSuccess:"گروه با موفقیت حذف شد",
    },
    color: {
      colorDeleteSuccess: "حذف رنگ با موفقیت انجام شد.",
      doYouWantDeleteColor: "ایا از حذف رنگ مطمعن هستید؟"
    },
    off:  {
      offDeleteSuccess: "حذف تخفیف با موفقیت انجام شد.",
      offDoYouWantDelete: "ایا از حذف تخفیف مطمعن هستید؟",
      offDoYouWantToCancel:"ایا از کنسل تخفیف  مطمعن هستید؟",
      offProductDeleteSuccess:"تخفیف محصول باموفقیت حذف شد."
    },
    type: {
      typeDeleteSuccess: "حذف دسته با موفقیت انجام شد.",
      typeDoYouWantDelete: "ایا از حذف دسته مطمعن هستید؟",
      typeAddSuccess: "دسته با موفقیت ثبت شد.",
    },
    typeItem: {
      typeItemDeleteSuccess: "حذف ایتم دسته با موفقیت انجام شد.",
      typeItemDoYouWantDelete: "ایا از حذف ایتم دسته مطمعن هستید؟",
      typeItemAddSuccess: "ایتم دسته با موفقیت ثبت شد.",
    },
    productItem: {
      productItemDeleteSuccess: "حذف ایتم دسته با موفقیت انجام شد.",
      productItemDoYouWantDelete: "ایا از حذف ایتم دسته مطمعن هستید؟",
      productItemAddSuccess: "ایتم دسته با موفقیت ثبت شد.",
    },
    productPicture: {
      productPictureDeleteSuccess: "حذف عکس محصول با موفقیت انجام شد.",
      productPictureDoYouWantDelete: "ایا از حذف عکس محصول مطمعن هستید؟",
      productPictureAddSuccess: "عکس محصول با موفقیت ثبت شد.",
      productPictureEditSuccess: "عکس محصول با موفقیت اپدیت شد.",
    },
    typePicture: {
      typePictureDeleteSuccess: "حذف عکس دسته با موفقیت انجام شد.",
      typePictureEditSuccess: "اپدیت عکس دسته با موفقیت انجام شد.",
      typeItemDoYouWantDelete: "ایا از حذف عکس دسته مطمعن هستید؟",
      typePictureAddSuccess: "عکس دسته با موفقیت ثبت شد.",
    },
    store: {
      storePictureDeleteSuccess: "حذف عکس مغازه با موفقیت انجام شد.",
      storePictureEditSuccess: "اپدیت عکس مغازه با موفقیت انجام شد.",
      storeItemDoYouWantDelete: "ایا از حذف عکس مغازه مطمعن هستید؟",
      storePictureAddSuccess: "عکس مغازه با موفقیت ثبت شد.",
    },
    product: {
      productDeleteSuccess: "حذف عکس محصول با موفقیت انجام شد.",
      productEditSuccess: "اپدیت عکس محصول با موفقیت انجام شد.",
      productDoYouWantDelete: "ایا از حذف عکس محصول مطمعن هستید؟",
      productAddSuccess: "عکس محصول با موفقیت ثبت شد.",
    },
    user:{
      userPictureAddSuccess:"عکس باموفقیت اپلود شد.",
    }
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
