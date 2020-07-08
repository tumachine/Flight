const days = [
  'пн',
  'вт',
  'ср',
  'чт',
  'пт',
  'сб',
  'вс',
]

const months = [
  'янвяря',
  'февряля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

const addZeroToSingleDigit = (num: number) => {
  if (num < 10) {
    return '0' + num;
  }
  return num.toString();
}

export const getTravelMinutes = (date: Date): string => {
  return addZeroToSingleDigit(date.getMinutes());
}

export const getTravelHours = (date: Date): string => {
  return addZeroToSingleDigit(date.getHours());
}

export const getTravelTime = (date: Date): string => {
  const minutes = addZeroToSingleDigit(date.getMinutes());
  const hours = addZeroToSingleDigit(date.getHours());
  return `${hours}:${minutes}`;
}

export const getTravelDate = (date: Date): string => {
  const day = addZeroToSingleDigit(date.getDate());
  const month = months[date.getMonth()];
  const dayOfWeek = days[date.getDay()]
  return `${day} ${month} ${dayOfWeek}`
}

