import {
  format,
  getISOWeek,
  isSameDay,
  subDays,
  differenceInHours,
  differenceInSeconds,
  differenceInMinutes,
} from "date-fns";

class TimeAgo {
  public transform(value: string) {
    const date = typeof value === "string" ? new Date(value) : value;
    return this.timeDifference(date);
  }

  public monthAndYear(value: string | undefined) {
    if (value) {
      const date = typeof value === "string" ? new Date(value) : value;
      return format(date, "MMMM yyyy");
    }
  }

  public chatMessageTransform(value: string) {
    const date = typeof value === "string" ? new Date(value) : value;
    const yesterday = subDays(new Date(), 1);
    const hoursDifference = differenceInHours(new Date(), date);

    if (hoursDifference < 12) {
      return format(date, "HH:mm a");
    } else if (isSameDay(date, new Date())) {
      return "Today";
    } else if (isSameDay(date, yesterday)) {
      return "Yesterday";
    } else if (
      getISOWeek(new Date()) === getISOWeek(date) ||
      getISOWeek(new Date()) - getISOWeek(date) === 1
    ) {
      return format(date, "EEEE");
    } else {
      return format(date, "d MMMM yyyy");
    }
  }

  public dayMonthYear(value: string) {
    const date = typeof value === "string" ? new Date(value) : value;
    return format(date, "d MMMM yyyy");
  }

  public timeFormat(value: string) {
    const date = typeof value === "string" ? new Date(value) : value;
    return format(date, "HH:mm a");
  }

  private timeDifference(date: Date) {
    const currentDate = new Date();
    const secondsDifference = differenceInSeconds(currentDate, date);
    const minutesDifference = differenceInMinutes(currentDate, date);
    const hoursDifference = differenceInHours(currentDate, date);
    const yesterday = subDays(new Date(), 1);

    if (secondsDifference < 60) {
      return `${secondsDifference} seconds ago`;
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minutes ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hours ago`;
    } else if (isSameDay(date, new Date())) {
      return "Today";
    } else if (isSameDay(date, yesterday)) {
      return "Yesterday";
    } else if (
      getISOWeek(new Date()) === getISOWeek(date) ||
      getISOWeek(new Date()) - getISOWeek(date) === 1
    ) {
      return format(date, "EEEE");
    } else {
      return format(date, "MMM d, yyyy");
    }
  }
}

export const timeAgo = new TimeAgo();
