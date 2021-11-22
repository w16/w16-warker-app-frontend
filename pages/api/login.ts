// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  try {
    const result = await axios.post(
      "https://warker-api.herokuapp.com/api/login",
      {
        email:email,
        password:password,
      }
    );
   
    return res.status(200).json(result.data);
  } catch (error) {

    return res.status(400).send(error);
  }
}
