export class TextUtil {
  public static isUUID(text: string): boolean {
    return new RegExp(
      '\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b',
    ).test(text);
  }
  
  public static isAlphanumeric(str: string): boolean {
    return /^[A-Za-z0-9\s]*$/.test(str);
  }

  public static isAlphanumericNoSpaces(str: string): boolean {
    return /^[A-Za-z0-9]*$/.test(str);
  }

}
