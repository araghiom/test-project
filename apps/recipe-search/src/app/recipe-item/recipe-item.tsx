import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { Recipe } from '../../models'
import { Fragment } from 'react'

export interface RecipeItemProps {
  recipe: Recipe
  loading: boolean
}

export function RecipeItem(props: RecipeItemProps) {
  const { recipe, loading } = props

  return (
    <Card sx={{ minHeight: 500, maxHeight: 500, overflow: 'auto' }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar aria-label="recipe" sx={{ bgcolor: '#063B40' }}>
              {recipe.label[0]}
            </Avatar>
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={20}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            recipe.label
          )
        }
        subheader={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="30%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            recipe.source
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          sx={{ height: 0, pt: 25 }}
          image={recipe.image}
          title={recipe.label}
        />
      )}
      <CardContent sx={{ minHeight: 150, maxHeight: 150, overflow: 'auto' }}>
        {loading ? (
          <Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </Fragment>
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            {recipe.ingredientLines.map((i) => `${i};`)}
          </Typography>
        )}
      </CardContent>
      {!loading && (
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  )
}

export default RecipeItem
