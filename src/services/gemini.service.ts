import { Injectable } from '@nestjs/common';
import { GoogleAIFileManager  } from '@google/generative-ai/server';
import { GoogleGenerativeAI  } from '@google/generative-ai';
import { basename } from 'node:path';

@Injectable()
export class GeminiService {
  async readValueFromImage(imagePath: string, customerCode: string, measureDate: string) {
    const fileName = basename(imagePath);

    const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const uploadResponse = await fileManager.uploadFile(fileName, {
      mimeType: 'image/png',
      displayName: `${customerCode}-${measureDate}`,
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri
        }
      },
      { text: 'Get the value of this bill.' },
    ]);

    const response = result.response.text();

    return Number(response.replace(/[^0-9\.-]+/g,''));
  }
}
