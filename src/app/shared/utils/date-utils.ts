export class DateUtils {

  static toDateInput(value: string | Date | undefined | null): string | null {
    if (!value) return null;

    const d = new Date(value);
    if (isNaN(d.getTime())) return null; 

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0'); 
    const dd = String(d.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  }

  static fromDateInput(value: string | null | undefined): Date | null {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

}