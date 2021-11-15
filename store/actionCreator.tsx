import * as articleAction from "./action"
import { ArticleInterface, ArticleAction, ArticleState, ArticleDispatchType }  from "../actionTypes"
  
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

// Dispatcher function
export const simulateHttpRequest = (action: ArticleAction) => {
  return (dispatch: ArticleDispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}