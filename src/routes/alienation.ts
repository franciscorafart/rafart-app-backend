import { Router } from "express";
import { retrieveFileUrlS3 } from "../helpers/s3";

const router = Router();

// Send file links from s3 to front end
router.post("/get_files", async (_, res) => {
  const files = [
    ["Synth", "synth.mp3", "synth", 0],
    ["Stick", "stick.mp3", "stick", 0],
    ["Drums", "drums.mp3", "drums", 0],
    ["Vox", "vox.mp3", "vox", 0],
    ["Guitars", "guitar.mp3", "guitar", 0],
  ];

  const response = [];
  let video_url;
  try {
    for (const file of files) {
      const instrumentName = file[0];
      const filename = String(file[1]);
      const instrumentKey = file[2];
      const start = file[3];
      const url = await retrieveFileUrlS3(filename, 86400);

      response.push({
        key: instrumentKey,
        name: instrumentName,
        url: url,
        start: start,
      });
    }
    video_url = await retrieveFileUrlS3(
      "AlienationDanceExperienceShort.mp4",
      86400
    );
  } catch (e) {
    res.status(400).send(`There was an error on S3: ${e}`);
    return;
  }

  res.json({ instruments: response, video: video_url });
});

export default router;
