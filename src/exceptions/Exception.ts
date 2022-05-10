export class Exception extends Error {
  public errorType: string;
  public errorInnerCode: string;
  public errorHttpCode: number;
  public errorCode: string;
}
