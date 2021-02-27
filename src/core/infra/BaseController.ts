import { Request, Response } from 'express';

export default abstract class BaseController {
  // or even private
  protected req: Request;

  protected res: Response;

  protected abstract executeImplementation(): Promise<void | any>;

  public execute(req: Request, res: Response): void {
    this.req = req;
    this.res = res;

    this.executeImplementation();
  }

  public static jsonResponse(res: Response, code: number, message: string): Response {
    return res.status(code).json({ message });
  }

  public ok<T>(res: Response, dto?: T): Response {
    if (dto) {
      return res.status(200).json(dto);
    }
    return res.sendStatus(200);
  }

  public fail(error: Error | string): Response {
    console.error(error);

    return this.res.status(500).json({
      message: 'Não foi possível realizar a requisição',
    });
  }

  public created(res: Response): Response {
    return res.sendStatus(201);
  }

  public clientError(message?: string): Response {
    return BaseController.jsonResponse(this.res, 400, message || 'Unauthorized');
  }

  public unauthorized(message?: string): Response {
    return BaseController.jsonResponse(this.res, 401, message || 'Unauthorized');
  }

  public paymentRequired(message?: string): Response {
    return BaseController.jsonResponse(this.res, 402, message || 'Payment required');
  }

  public forbidden(message?: string): Response {
    return BaseController.jsonResponse(this.res, 403, message || 'Forbidden');
  }

  public notFound(message?: string): Response {
    return BaseController.jsonResponse(this.res, 404, message || 'Not found');
  }

  public conflict(message?: string): Response {
    return BaseController.jsonResponse(this.res, 409, message || 'Conflict');
  }
}
