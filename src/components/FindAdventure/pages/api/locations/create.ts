import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const { location: locationData } = req.body;
    const location = await prisma.locations.create({
      data: {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      },
    });

    res.status(201);
    res.json({ location });
  } catch (e) {
    console.error(e);

    res.status(500);
    res.json({ error: "Sorry unable to save location to database" });
  } finally {
    await prisma.$disconnect();
  }
}