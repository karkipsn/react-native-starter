import * as articleAction from "./action"
import { ArticleInterface, ArticleAction, ArticleState, DispatchType }  from "../actionTypes"

// Dispatcher function
export const simulateHttpRequest = (action: ArticleAction) => {
    return (dispatch: DispatchType) => {
      setTimeout(() => {
        dispatch(action)
      }, 500)
    }
}
  
  // Action creator for Creating
export const addArticle = (article: ArticleInterface) => {
    const action: ArticleAction = {
    type: articleAction.REMOVE_ARTICLE,
      article,
    }
    return simulateHttpRequest(action)
}
  
//Action creator for delete
export const removeArticle = (article: ArticleInterface) => {
    const action: ArticleAction = {
        type: articleAction.REMOVE_ARTICLE,
        article,
    }
    return simulateHttpRequest(action)
}