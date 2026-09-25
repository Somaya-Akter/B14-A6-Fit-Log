# FitLog - Workout Library

FitLog is a responsive workout library and daily workout planning application built with Next.js. Users can browse workouts, view detailed exercise information, create a daily workout plan, save workouts for later, and track workout totals.

## Live Features

- Browse 12 workouts from the FitLog API
- View complete workout details with instructions and specifications
- Add workouts to Today's Plan
- Save workouts for later
- Live Plan and Saved counters in the navbar
- Track total exercises, workout minutes, and calories
- Mark planned workouts as done
- Remove workouts from Plan or Saved list
- Sort workouts by Duration, Calories, or Rating
- Workout data persists using localStorage
- Responsive design for desktop, tablet, and mobile
- Custom 404 page
- Toast notifications for workout actions

## Technologies Used

- Next.js
- React
- JavaScript
- Tailwind CSS
- Lucide React
- React Toastify
- FitLog REST API
- LocalStorage

## API

All workouts:

`https://api.abcz.workers.dev/api/fitlog`

Single workout:

`https://api.abcz.workers.dev/api/fitlog/:id`

## Main Pages

- `/` - Workout Library
- `/workouts/[id]` - Workout Details
- `/my-plan` - Today's Plan and Saved Workouts

## Key Features

1. Dynamic workout library fetched from API
2. Dynamic workout details pages
3. Today's Plan with a maximum of five workouts
4. Saved workouts with persistent localStorage data
5. Live workout metrics for exercises, minutes, and calories
6. Sorting by duration, calories, and rating
7. Toast feedback for add, save, remove, and completed actions
8. Responsive dark fitness-themed user interface

## Project Name

FitLog - Workout Library