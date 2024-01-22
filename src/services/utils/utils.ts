export class Utils {
  static getAvaterName(fname: string, lname: string): string {
    const firstLetter = fname?.charAt(0)?.toUpperCase();
    const lastLetter = lname?.charAt(0)?.toUpperCase();
    return firstLetter + lastLetter;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static uniqueArray(data: any[]) {
    return Array.from(new Set(data.map((obj) => obj._id))).map((id) => {
      return data.find((obj) => obj._id === id);
    });
  }
}
