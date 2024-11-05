import {
  format,
  differenceInHours,
  differenceInSeconds,
  differenceInMinutes,
  isToday,
  isYesterday,
  subWeeks,
  isWithinInterval,
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
    const hoursDifference = differenceInHours(new Date(), date);

    if (hoursDifference < 24) {
      return format(date, "HH:mm a");
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (this.isWithinPastWeek(date, new Date())) {
      return format(date, "EEEE");
    } else {
      return format(date, "d MMMM yyyy");
    }
  }

  public chatSeparatorTransform(value: string) {
    const date = typeof value === "string" ? new Date(value) : value;
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (this.isWithinPastWeek(date, new Date())) {
      return format(date, "EEEE");
    } else {
      return format(date, "d MMMM yyyy");
      // return format(date, "dd/MM/yyyy");
    }
  }

  public dayMonthYear(value: string) {
    const date = typeof value === "string" ? new Date(value) : value;
    return format(date, "d MMMM yyyy");
  }

  // public timeFormat(value: string) {
  //   const date = typeof value === "string" ? new Date(value) : value;
  //   return format(date, "HH:mm a");
  // }

  public timeFormat(value: string) {
    const date = typeof value === "string" ? new Date(value) : value;
    return format(date, "hh:mm a"); // Change to "hh:mm a" for 12-hour format
  }

  private timeDifference(date: Date) {
    const currentDate = new Date();
    const secondsDifference = differenceInSeconds(currentDate, date);
    const minutesDifference = differenceInMinutes(currentDate, date);
    const hoursDifference = differenceInHours(currentDate, date);

    if (secondsDifference < 60) {
      return `${secondsDifference} seconds ago`;
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minutes ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hours ago`;
    } else if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (this.isWithinPastWeek(date, currentDate)) {
      return format(date, "EEEE");
    } else {
      return format(date, "MMM d, yyyy");
    }
  }

  private isWithinPastWeek(date: Date, today: Date) {
    const weekAgo = subWeeks(today, 1);
    return isWithinInterval(date, { start: weekAgo, end: today });
  }
}

export const timeAgo = new TimeAgo();
