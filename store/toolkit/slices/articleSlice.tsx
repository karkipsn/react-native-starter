import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticleInterface} from "../../../actionTypes"


/**
 * Initial value of articles 
 * */ 
const articles = [
    {
      id: 1,
      title: "post 1",
      body:
        "Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi",
    },
    {
      id: 2,
      title: "post 2",
      body:
        "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
    },

    {
        id: 3,
        title: "post 3",
        body:
          "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
      },

      {
        id: 4,
        title: "post 4",
        body:
          "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
      },
  ]

// slice with reducrer and actions implemented
// export reducer from here and actions from here

// creating slice
export const articleSlice = createSlice({
    name: 'articles',
    initialState: articles,
    reducers: {
        ADD_ARTICLES: (state, action: PayloadAction<ArticleInterface>) => {

            const newArticle: ArticleInterface = {
                id: Math.random(), 
                title: action.payload.title,
                body: action.payload.body,
              }
              console.log("New Article",newArticle);
              state = state.concat(newArticle)

            console.log("Article",state);
        },

        REMOVE_ARTICLES: (state, action: PayloadAction<ArticleInterface>) => {
            state.filter(
                article => article.id !== action.payload.id
              )
        }
    }
});

// exporting actions
export const {ADD_ARTICLES, REMOVE_ARTICLES } = articleSlice.actions;

//exporting reducer
export const articleReducer = articleSlice.reducer;

