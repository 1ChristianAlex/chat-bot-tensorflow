import { spawn } from 'child_process';

const getAudioText = (path: string) => {
  return new Promise((res, rej) => {
    const pythonText = spawn('python', ['pyAudio.py', `--path="${path}"`]);
    pythonText.stdout.on('data', (data) => {
      console.log(data);
      res(data);
    });
  });
};

export default getAudioText;
