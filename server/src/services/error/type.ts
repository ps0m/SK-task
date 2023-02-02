export type checkBodyType = (body: object, keys: string[]) => string | null;
export type createErrorType = (
  statusCode: number,
  message: string
) => { statusCode: number; message: string };
