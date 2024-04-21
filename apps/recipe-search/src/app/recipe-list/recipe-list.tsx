import { Autocomplete, Button, Grid, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import fetch from 'cross-fetch'
import { Hits, Recipe } from '../../models'
import RecipeItem from '../recipe-item/recipe-item'
import { environment } from '../../environments/environment'

/* eslint-disable-next-line */
export interface RecipeListProps {}

export function RecipeList(props: RecipeListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [navigateLink, setNavigateLink] =
    useState<{ next?: string; self?: string; back?: string }>()
  const [loading, setLoading] = useState<boolean>(false)

  // first call api
  useEffect(() => {
    fetchRecipes(`${environment?.api_baseUrl}&q=kale`)
  }, [])

  // fetch function
  const fetchRecipes = async (url: string) => {
    setLoading(true)
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Network response was not ok')
      const data: Hits = await response.json()
      setRecipes(data.hits?.map((h) => h.recipe))
      setNavigateLink((prev) => ({
        next: data?._links?.next?.href,
        self: url,
        back: prev?.self,
      }))
    } catch (error) {
      console.error('Failed to fetch recipes:', error)
    }
    setLoading(false)
  }

  // navigation function
  const navigatePage = (navigateTo: 'back' | 'next') => {
    const url = navigateTo === 'next' ? navigateLink?.next : navigateLink?.back
    if (url) {
      fetchRecipes(url)
    }
  }
  return (
    <>
      {/* <Autocomplete
        multiple
        id="tags-filled"
        options={recipes?.map((option) => option.)}
        defaultValue={[top100Films[13].title]}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="freeSolo"
            placeholder="Favorites"
          />
        )}
      /> */}
      <Grid container spacing={4}>
        {recipes?.map((r) => (
          <Grid item sm={3} key={r.uri}>
            <RecipeItem recipe={r} loading={loading} />
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" justifyContent="space-between" margin="15px">
        <Button
          onClick={() => navigatePage?.('back')}
          size="large"
          disabled={navigateLink?.back?.length ? false : true}
        >
          back
        </Button>

        <Button onClick={() => navigatePage?.('next')} size="large">
          next
        </Button>
      </Stack>
    </>
  )
}

export default RecipeList
