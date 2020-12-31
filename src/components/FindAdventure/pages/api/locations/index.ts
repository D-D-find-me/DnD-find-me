import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const locations = await prisma.locations.findMany();
    res.status(200);
    res.json({ locations });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to fetch locations" });
  } finally {
    await prisma.$disconnect();
  }
}