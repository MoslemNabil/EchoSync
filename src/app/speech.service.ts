import { Injectable, NgZone, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  recognition: any;
  transcript = signal<string>('');
  isRecording = signal<boolean>(false);

  constructor(private zone: NgZone) {
    const { webkitSpeechRecognition }: any = window as any;
    if (webkitSpeechRecognition) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript;
          }
        }
        if (currentTranscript) {
          this.zone.run(() => {
            this.transcript.update(prev => prev + ' ' + currentTranscript);
          });
        }
      };

      this.recognition.onend = () => {
        this.zone.run(() => {
          this.isRecording.set(false);
        });
      };
    }
  }

  start() {
    if (this.recognition) {
      this.isRecording.set(true);
      this.recognition.start();
    }
  }

  stop() {
    if (this.recognition) {
      this.recognition.stop();
      this.isRecording.set(false);
    }
  }

  clear() {
    this.transcript.set('');
  }
}
