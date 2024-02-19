import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../../config";

export const users: Array<{ id: string; email: string; encryptedPassword: string }> = []

class AuthService {
    async signUp(req: Request, res: Response) {
        const { id, email, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 12);

        users.push({ id, email, encryptedPassword });
        res.json(encryptedPassword);
    }

    async logIn(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = users.find((user) => user.email === email)
        if (!user) return res.status(404).send('사용자를 찾을 수 없습니다.');

        const isVerified = await bcrypt.compare(password, user.encryptedPassword);
        if (!isVerified) return res.status(401).send('비밀번호가 일치하지 않습니다.');

        const accessToken = jwt.sign({ email }, JWT_SECRET_KEY, { subject: email });

        res.json(accessToken);
    }
}

const authService = new AuthService();

export default authService;