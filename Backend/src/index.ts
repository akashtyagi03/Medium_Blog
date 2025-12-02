import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import z from 'zod';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { authmiddleware } from './middleware';

const prisma = new PrismaClient();
const app = express();


// take username , password , check for zod schema
// take password hash it using bcrypt
// put data into data base using prisma
// return jwt token
// handle errors properly
// use express json middleware
app.use(express.json());
app.use(cors());

app.post('/signup', async (req: Request, res: Response) => {
    try {
        const zodSchema = z.object({
            email: z.email("Please enter a valid email address").trim(),
            password: z
                .string()
                .min(4, "Password must be at least 8 characters long")
                .max(32, "Password can't be longer than 32 characters")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
        });
        const parsedData = zodSchema.safeParse(req.body);
        if (!parsedData.success) {
            console.log("error is", parsedData.error)
            return res.json({
                message: "Invalid data"
            })
        }
        try {
            const { email, password } = req.body;
            const hasedpassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hasedpassword,
                },
            });
            const token = jwt.sign({userId:user.id}, process.env.JWT_SECRET as string)
            return res.json({
                message: "User created successfully",
                user,
                token
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req: Request, res: Response) => {
    try {
        const zodSchema = z.object({
            email: z.email("Please enter a valid email address").trim(),
            password: z
                .string()
                .min(4, "Password must be at least 8 characters long")
                .max(32, "Password can't be longer than 32 characters")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
        });
        const parsedData = zodSchema.safeParse(req.body);
        if (!parsedData.success) {
            console.log("error is", parsedData.error)
            return res.json({
                message: "Invalid data"
            })
        }
        try {
            const { email, password } = req.body;
            const hasedpassword = await bcrypt.hash(password, 10);

            type usertype = {
                id: number,
                email: string,
                password: string
            } | null;

            const user: usertype = await prisma.user.findFirst({
                where: {email},
                select: {id: true, email: true, password: true}
            });
            if (!user) {
                return res.status(400).json({message: "Invalid credentials"});
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({message: "Invalid credentials"});
            }

            const token = jwt.sign({userId:user.id}, process.env.JWT_SECRET as string)
            return res.json({
                message: "User created successfully",
                user,
                token
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}); 

app.post('/blog', authmiddleware, async (req: Request, res: Response) => {
    try {
        const { title, content, userId } = req.body;
        console.log(userId)
        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                author: {
                    connect: { id: userId }
                }
            },
        });
        return res.json({
            message: "Blog created successfully",
            blog,
        });
    } catch (error) {
        console.error("error is ", error);
        return res.status(500).send('Internal Server Error');
    }
});

app.put('/blog/:id', authmiddleware,  async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const blog = await prisma.blog.update({
            where: { id: Number(id) },
            data: {
                title,
                content,
            },
        });
        return res.json({
            message: "Blog updated successfully",
            blog,
        });
    } catch (error) {
        console.error("error is ", error);
        return res.status(500).send('Internal Server Error');
    }
});

app.get('/blogs/:id', async (req: Request, res: Response) => {  
    try {
        const { id } = req.params;
        const blogs = await prisma.blog.findMany({
            where: { authorId: Number(id) },
        });
        return res.json({
            message: "Blogs fetched successfully",
            blogs,
        });
    } catch (error) {
        console.error("error is ", error);
        return res.status(500).send('Internal Server Error');
    }
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on' +" "+ process.env.PORT);
})