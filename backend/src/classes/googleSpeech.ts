import { v1p1beta1, v1 } from '@google-cloud/speech';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { google } from '@google-cloud/speech/build/protos/protos';

export default class Transcription {
  private googleSpeech: v1p1beta1.SpeechClient;

  constructor() {
    this.googleSpeech = new v1p1beta1.SpeechClient();
  }

  public async audioText(baseData: string) {
    try {
      //   const uint8View = new Uint8Array(arrayBuffer);
      console.log('google func');

      const readeble = readFileSync(resolve(baseData));
      const bytes = readeble.toString('base64');

      const audio = {
        content: bytes,
      };

      const encoding = 'LINEAR16';
      const sampleRateHertz = 48000;

      const config = {
        encoding,
        sampleRateHertz,
        languageCode: 'en-US',
        maxAlternatives: 5,
      };

      const request = {
        audio: audio,
        config: config,
      } as google.cloud.speech.v1.IRecognizeRequest;

      const [response] = await this.googleSpeech.recognize(request);

      const transcription = response.results
        .map((result) => result.alternatives[0].transcript)
        .join('/n');

      console.log(`Transcription: ${transcription}`);
      return transcription;
    } catch (error) {
      console.log(error);
    }
  }
}
