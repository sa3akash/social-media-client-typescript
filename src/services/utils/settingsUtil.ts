export class SettingsUtils {
  static generateYearsArray(): number[] {
    const currentYear = new Date().getFullYear();
    const yearsArray: number[] = [];

    for (let i = currentYear; i >= currentYear - 100; i--) {
      yearsArray.push(i);
    }
    return yearsArray;
  }


  static updateMonthsList(): number[] {
    const monthsList: number[] = [];
    for (let i = 1; i <= 12; i++) {
        monthsList.push(i);
    }
    return monthsList;
  }

  static getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }

  static updateDaysList(selectedMonth: number, selectedYear: number): number[] {
    const daysInMonth = SettingsUtils.getDaysInMonth(selectedYear, selectedMonth);
    const daysList: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
        daysList.push(i);
    }
    return daysList;
  }
}
