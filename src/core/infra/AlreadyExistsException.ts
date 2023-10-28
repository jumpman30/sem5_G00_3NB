export default class AlreadyExistsException extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'AlreadyExistsException';
    }
  }