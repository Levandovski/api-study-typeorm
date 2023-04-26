import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-errors";
import { UserRepository } from "../microservices/user/userRepository";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) throw new UnauthorizedError("Não autorizado");

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

  const user = await UserRepository.findOneBy({ id });

  if (!user) throw new UnauthorizedError("Não autorizado");

  const { password: _, ...loggedUser } = user;

  request.user = loggedUser;

  next();
};
