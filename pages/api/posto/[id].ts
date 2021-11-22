// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query["id"] as string;

  const {token} = req.headers
  try {
  
    const { data } = await axios.get(
      `https://warker-api.herokuapp.com/api/cidade/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.status(200).json(JSON.stringify(data.postos));
  } catch (error) {
    res.status(400).json(error);
  }
}
