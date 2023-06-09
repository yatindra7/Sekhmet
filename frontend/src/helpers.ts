/* eslint-disable @typescript-eslint/ban-types */

import toast from 'react-hot-toast';

export const debounce = (callback: Function, wait = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function debouncer(this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), wait);
  };
};

export const getDurationString = (duration: number | undefined) => {
  if (duration === undefined) return '';

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours === 0) return `${minutes}Mins`;
  return `${hours}Hrs ${minutes}Mins`;
};

export const getDateTimeLocalStringFromISOString = (dateTime: string | undefined) => {
  if (dateTime === undefined) return '';

  const dateTimeObj = new Date(dateTime);

  const dateTimeLocalString = new Date(dateTimeObj.getTime() - dateTimeObj.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -1);

  return dateTimeLocalString;
};

export const getDateTimeStringFromISOString = (date: string | undefined) => {
  if (date === undefined) return '';

  const dateTimeObj = new Date(date);

  const dateString = dateTimeObj.toLocaleString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const timeString = dateTimeObj.toLocaleTimeString('en-us', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${dateString} ${timeString}`;
};

export const getDateStringFromISOString = (date: string | undefined) => {
  if (date === undefined) return '';

  const dateTimeObj = new Date(date);

  const dateString = dateTimeObj.toLocaleString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return dateString;
};

export const getDateString = (dateTime: Date | undefined) => {
  const dateTimeLocalString =
    dateTime === undefined ? new Date() : new Date(dateTime.getTime() - dateTime.getTimezoneOffset() * 60000);

  return dateTimeLocalString.toISOString().split('T')[0];
};

export const handleAxiosError = (error: any) => {
  console.log(error); // eslint-disable-line no-console
  if (error?.response?.data?.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error('Server error. Please try again.');
  }
};

export const getFormData = (object: any) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
