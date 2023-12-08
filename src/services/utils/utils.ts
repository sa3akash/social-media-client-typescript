export class Utils {
  static getAvaterName(fname: string, lname: string): string {
    const firstLetter = fname.charAt(0).toUpperCase();
    const lastLetter = lname.charAt(0).toUpperCase();
    return firstLetter + lastLetter;
  }
}
