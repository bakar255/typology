import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
dotenv.config();

app.use(cors({
    origin: "http://localhost:3000",
    methods:["GET","POST"],
    credentials: true,
}));


app.post("/login", async (req, res) => {

        try {
        
        const {email, password}  = req.body;
        console.log(req.body)

        const user = await prisma.user.findUnique({
        where: {email},    
        });

        if(!user) {
          return  res.status(400).json({message: "Email non reconnu"});
        } 

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({message: "Mot de passe incorrect"})
        }

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        console.log(user.id)

        res.json({
            message: "Login réussi",
            token,
        })

        } catch (err) {
            console.error(err);
            console.log("Erreur Serveur")
        } 
    });


app.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            return res.status(400).json({message: "Email déjà utilisé"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },

        });

        res.json({message: "Utilisateur crée", userId: user.id});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Erreur Serveur"})
    }
});

app.get("/user", async (req, res) => {

    try {

         // Récupère le token du header Authorization
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message:"Token missing"})
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({message:"Token missing"})
        }

        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

           // decoded contient { userId: id_de_l_utilisateur }
        const userId = decoded.userId;

        
        const user = await prisma.user.findUnique({
            where: {id: userId}
        });

        if(!user) {
            return res.status(500).json({message: "Cannot fetch user's data"})
        }

        res.json({
            id: userId,
            name: user.name,
            email: user.email,
        })  
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error server" })
    }
})




app.listen(3001, () => {
    console.log("Server is running...")
})