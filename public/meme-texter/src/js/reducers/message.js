import K from "../constants/"

const initialSate = {
  to: "",
  text: "",
  name: "",
  tag: "trump",
  variousImages: [],
  selectedPreviewItem: {
    imageId: "",
    generatorId: ""
  },
  instanceImageUrl: "",
  showNotification: false,
  showErrorNotification: false,
  errorMessage: ""
}
const message = (state=initialSate, action) => {
  switch(action.type){

    case K.UPDATE_MESSAGE:
      return Object.assign({}, state, action.attributes)

    case K.UPDATE_VARIOUS_IMAGES:
      return Object.assign({}, state, {
          variousImages: action.variousImages
        }
      );

    case K.UPDATE_INSTANCE_IMAGE_URL:
      return Object.assign({}, state, {
          instanceImageUrl: action.instanceImageUrl
        }
      );

    case K.UPDATE_SELECTED_PREVIEW_ITEM:
      return Object.assign({}, state, {
          selectedPreviewItem: {
            imageId: action.imageId,
            generatorId: action.generatorId
          }
        }
      );

    case K.SHOW_NOTIFICATION:
      return Object.assign({}, state, {showNotification: true})

    case K.HIDE_NOTIFICATION:
      return Object.assign({}, state, {showNotification: false})

    case K.SHOW_ERROR_NOTIFICATION:
      return Object.assign({}, state, {showErrorNotification: true, errorMessage: action.message})

    case K.HIDE_ERROR_NOTIFICATION:
      return Object.assign({}, state, {showErrorNotification: false, errorMessage: null})

    default:
      return state
  }
}
export default message
