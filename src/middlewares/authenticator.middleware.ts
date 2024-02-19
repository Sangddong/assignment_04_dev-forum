import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../config";
import { users } from "../contexts/auth/auth.service";

const freePassRoutes = ["/auth/sign-up", "/auth/log-in"];

export default function authenticator(req: Request, res: Response, next: NextFunction) {
    if (freePassRoutes.includes(req.url)) return next();

    //accessToken 가져오기
    const accessToken = req.headers.authorization?.split("Bearer ")[1];

    //인증토큰이 없으면 401 반환
    if (!accessToken) return res.sendStatus(401);

    //인증토큰 유효 확인
    try {
        const { sub: email } = jwt.verify(accessToken, JWT_SECRET_KEY);
        const user = users.find((user) => user.email === email);
        if (!user) return res.sendStatus(404);  //사용자가 없다면 404 반환

        req.user = user;
    } catch {
        return res.status(401);
    }

    next();
}