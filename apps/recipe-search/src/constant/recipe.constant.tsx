import FlagIcon from '@mui/icons-material/Flag'
import BoltIcon from '@mui/icons-material/Bolt'
import { GroupFilterOption } from '../models'

export const initialGroupFilter: GroupFilterOption[] = [
  // Meal Types
  {
    filter: {
      id: 1,
      title: 'breakfast',
      group: 'mealType',
      icon: <FlagIcon />,
    },
    group: 'mealType',
  },
  {
    filter: {
      id: 2,
      title: 'brunch',
      group: 'mealType',
      icon: <FlagIcon />,
    },
    group: 'mealType',
  },
  {
    filter: {
      id: 3,
      title: 'lunch/dinner',
      group: 'mealType',
      icon: <FlagIcon />,
    },
    group: 'mealType',
  },
  {
    filter: {
      id: 4,
      title: 'snack',
      group: 'mealType',
      icon: <FlagIcon />,
    },
    group: 'mealType',
  },
  {
    filter: {
      id: 5,
      title: 'teatime',
      group: 'mealType',
      icon: <FlagIcon />,
    },
    group: 'mealType',
  },
  // Cuisine Types
  {
    filter: {
      id: 6,
      title: 'american',
      group: 'cuisineType',
      icon: <BoltIcon />,
    },
    group: 'cuisineType',
  },
  {
    filter: {
      id: 7,
      title: 'asian',
      group: 'cuisineType',
      icon: <BoltIcon />,
    },
    group: 'cuisineType',
  },
  {
    filter: {
      id: 8,
      title: 'british',
      group: 'cuisineType',
      icon: <BoltIcon />,
    },
    group: 'cuisineType',
  },
  // ... Add additional cuisine types in the same manner
  // Dish Types
  {
    filter: {
      id: 9,
      title: 'alcohol cocktail',
      group: 'dishType',
      icon: <BoltIcon />,
    },
    group: 'dishType',
  },
  {
    filter: {
      id: 10,
      title: 'biscuits and cookies',
      group: 'dishType',
      icon: <BoltIcon />,
    },
    group: 'dishType',
  },
  // ... Add additional dish types in the same manner
]
