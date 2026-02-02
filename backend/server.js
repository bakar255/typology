import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.use(express.json());

app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            return res.status(400).json({message: "Email déjà utilisé"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },

        });

        res.json({message: "Utilisateur crée", userId: user.id});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Erreur Serveur"})
    }
});

app.get("/", (req, res) => {
    res.send("Backend is OK");
});

app.listen(3001, () => {
    console.log("Server is running...",)
})