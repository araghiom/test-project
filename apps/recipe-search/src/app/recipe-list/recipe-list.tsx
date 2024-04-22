import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import fetch from 'cross-fetch'
import { GroupFilterOption, Hits, Recipe } from '../../models'
import RecipeItem from '../recipe-item/recipe-item'
import { environment } from '../../environments/environment'
import Autocomplete from '@mui/material/Autocomplete'
import useDebounce from '../../utils/hook/useDebounce'
import SearchIcon from '@mui/icons-material/Search'
import { initialGroupFilter } from '../../constant/recipe.constant'

export function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [search, setSearch] = useState<string>()
  const [newValue, setNewValue] = useState<string>()
  const [navigateLink, setNavigateLink] =
    useState<{ next?: string; self?: string; back?: string }>()
  const [loading, setLoading] = useState<boolean>(false)

  // debounce hook
  const keyWord = useDebounce(search)

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
  // handle press enter for search q
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearch(newValue)
    }
  }

  function groupFiltersByGroup(
    filterOptions: GroupFilterOption[]
  ): Record<string, string[]> {
    return filterOptions.reduce((acc, { group, filter }) => {
      acc[group] = acc[group] || []
      acc[group].push(filter.title)
      return acc
    }, {} as Record<string, string[]>)
  }

  /// fetch by filters
  const handleChangeFilters = (value: (string | GroupFilterOption)[]): void => {
    const filterOptions = value.filter(
      (item): item is GroupFilterOption => typeof item !== 'string'
    )
    const filters = groupFiltersByGroup(filterOptions)
    const queryParams = Object.entries(filters)
      .map(([key, titles]) =>
        titles
          .map(
            (title) => `${encodeURIComponent(key)}=${encodeURIComponent(title)}`
          )
          .join('&')
      )
      .join('&')

    const keyWordPart =
      (keyWord?.length ?? 0) > 0
        ? `&q=${encodeURIComponent(keyWord ?? '')}`
        : ''
    const queryParamsPart =
      (queryParams?.length ?? 0) > 0 ? `&${queryParams}` : ''
    const url = `${environment.api_baseUrl}${queryParamsPart}${
      keyWordPart ? keyWordPart : ''
    }`

    if (queryParams || keyWordPart) {
      fetchRecipes(url)
    } else {
      fetchRecipes(`${environment?.api_baseUrl}`)
    }
  }

  return (
    <>
      <Stack marginBottom="30px">
        <Autocomplete
          id="tags-filled"
          freeSolo
          multiple
          onChange={(e, value) => handleChangeFilters(value)}
          options={initialGroupFilter?.map((item) => item)}
          groupBy={(option) => option.group}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                variant="filled"
                label="Search Recipes"
                placeholder="Favorites"
                onKeyDown={handleKeyPress}
                onChange={(e) => setNewValue(e?.target?.value)}
              />
            )
          }}
          renderGroup={(params) => (
            <li key={params.key}>
              <Typography
                variant="h6"
                gutterBottom
                color="GrayText"
                sx={{ padding: '5px' }}
              >
                {params.group}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {params?.children}
              </Typography>
            </li>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              if (typeof option === 'string') {
                return (
                  <Chip
                    {...getTagProps({ index })}
                    icon={<SearchIcon />}
                    label={option}
                  />
                )
              }
              return (
                <Chip
                  {...getTagProps({ index })}
                  icon={option?.filter?.icon}
                  label={option?.filter?.title}
                />
              )
            })
          }
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option
            }
            return option?.filter?.title
          }}
          noOptionsText={
            <div>
              <Typography variant="h6" gutterBottom>
                'search your favorite food.'
              </Typography>
            </div>
          }
        />
      </Stack>
      <Grid container spacing={4}>
        {recipes?.length ? (
          recipes?.map((r) => (
            <Grid item sm={3} key={r.uri}>
              <RecipeItem recipe={r} loading={loading} />
            </Grid>
          ))
        ) : (
          <Grid
            container
            justifyContent={'center'}
            alignItems={'center'}
            height={500}
          >
            <Typography variant="h2" gutterBottom>
              Please Select filter
            </Typography>
          </Grid>
        )}
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
