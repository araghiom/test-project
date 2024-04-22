import FlagIcon from '@mui/icons-material/Flag'
import BoltIcon from '@mui/icons-material/Bolt'
import { GroupFilterOption } from '../models'

export const initialGroupFilter: GroupFilterOption[] = [
  {
    filter: {
      id: 1,
      title: 'breakfast',
      group: 'dishType',
      icon: <FlagIcon />,
    },
    group: 'mealType',
  },
  {
    filter: { id: 2, title: 'lunch', group: 'meal type', icon: <FlagIcon /> },
    group: 'mealType',
  },
  {
    filter: {
      id: 3,
      title: 'lunch/dinner',
      group: 'meal type',
      icon: <FlagIcon />,
    },
    group: 'mealType',
  },

  {
    filter: {
      id: 4,
      title: 'breakfast',
      group: 'cuisineType',
      icon: <BoltIcon />,
    },
    group: 'diet',
  },
  {
    filter: {
      id: 5,
      title: 'brunch',
      group: 'cuisineType',
      icon: <BoltIcon />,
    },
    group: 'diet',
  },
  {
    filter: {
      id: 6,
      title: 'teatime',
      group: 'cuisineType',
      icon: <BoltIcon />,
    },
    group: 'diet',
  },
]
