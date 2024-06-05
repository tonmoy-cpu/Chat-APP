import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";

dotenv.config();
const router = express.Router();

router.post("/text", async(req,res) => {
    try {
        const { text,activeChatId } =  req.body;
        // console.log(" ~ router.post ~ req.body:", req.body);
        const response = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": text},],
            model:"gpt-3.5-turbo" ,
            prompt: text,
            temperature: 0.7,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        console.log(response.usage);

        await axios.post(
            ` https://api.chatengine.io/chats/${activeChatId}/messages/`,
            { text: response.choices[0].message.content },
            
            {
                headers: {
                              "Project-ID": process.env.PROJECT_ID,
                              "User-Name": process.env.BOT_USER_NAME,
                              "User-Secret": process.env.BOT_USER_SECRET,
            }
        }
        );
      

        res.status(200).json({ text: response.choices[0].message.content })
  
    } 
    catch (error) {
        console.error("error:",error);
        res.status(500).json({ error: error.message })
    }
});
router.post("/assist", async(req,res) => {
    try {
        const { text } =  req.body;
        const response = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": `Finish my thought: ${text}`},],
            model:"gpt-3.5-turbo" ,
            prompt: `Finish my thought: ${text}`,
            temperature: 0.7,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).json({ text: response.choices[0].message.content })
  
    } catch (error) {
        console.error("error:",error);
        res.status(500).json({ error: error.message })
    }
})
export default router;