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
export type ArticleAction = {
    type: string
    article: ArticleInterface
}


// dispatch function of article action
export type DispatchType = (args: ArticleAction) => ArticleAction