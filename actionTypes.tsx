
/// It was for the purpose Redux implementation without using the redux toolkit. 
/// But with redux toolkit Actions and reducers were handled in the makeSLice function or the slice component.

export interface ArticleInterface {
    id: number,
    title: string, 
    body: string
}

// State object of article
export type ArticleState = {
    articles: ArticleInterface[]
}

// action creator of article 
// action type and payload for the dispatch action
export type ArticleAction = {
    type: string
    article: ArticleInterface
}

// dispatch function of article action
export type ArticleDispatchType = (args: ArticleAction) => ArticleAction