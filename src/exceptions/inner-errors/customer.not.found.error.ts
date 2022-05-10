import { ErrorCodesEnum } from '@shopaffix/errors';

export class CustomerNotFoundError extends Error {
  public errorType: string;
  public errorInnerCode: string;
  public errorHttpCode: number;
  public errorCode: string;
  public constructor() {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.errorType = 'inner';
    this.errorHttpCode = 400;
    this.errorInnerCode = '';
    this.errorCode = ErrorCodesEnum.ERROR_CUSTOMER_NOT_FOUND;
  }
}
