import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import fetch from 'cross-fetch'
import { Hits, Recipe } from '../models'
import RecipeItem from '../recipe-item/recipe-item'

/* eslint-disable-next-line */
export interface RecipeListProps {}

export function RecipeList(props: RecipeListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>()

  useEffect(() => {
    const getApiResponse = async <T,>(): Promise<T> => {
      const appId = 'bc839848'
      const appKey = '8e38899795058a3b2b2bc4911653b077'
      const q = 'kale salad'

      const api_url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&q=${q}`

      const response = await fetch(api_url)
      const data = (await response.json()) as Promise<T>

      return data
    }
    const fetchRecipes = async () => {
      const response = await getApiResponse<Hits>()
      console.log(response)
      setRecipes(response.hits?.map((h) => h.recipe))
    }
    fetchRecipes()
  }, [])

  return (
    <Grid container spacing={4}>
      {recipes?.map((r) => (
        <Grid item sm={3} key={r.uri}>
          <RecipeItem recipe={r} />
        </Grid>
      ))}
    </Grid>
  )
}

export default RecipeList
