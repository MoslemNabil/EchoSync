import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SpeechService } from '../speech.service';

export interface VoiceData {
  timestamp: string;
  text: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: '../app.css', // Reuse styles
})
export class HomeComponent {
  protected readonly title = signal('EchoSync');
  public speech = inject(SpeechService);
  private http = inject(HttpClient);
  public saveStatus = signal<string>('');
  public cleanedData = signal<VoiceData[]>([]);

  startRecording() {
    this.speech.start();
  }

  stopRecording() {
    this.speech.stop();
  }

  saveData() {
    const text = this.speech.transcript().trim();
    if (!text) return;

    this.saveStatus.set('Saving...');
    this.http.post('http://localhost:3000/api/voice-data', { text }).subscribe({
      next: () => {
        this.saveStatus.set('Data saved successfully!');
        this.speech.clear();
        setTimeout(() => this.saveStatus.set(''), 3000);
      },
      error: (err) => {
        console.error(err);
        this.saveStatus.set('Failed to save data.');
      }
    });
  }

  loadCleanedData() {
    this.http.get<VoiceData[]>('http://localhost:3000/api/cleaned-data').subscribe({
      next: (data) => {
        this.cleanedData.set(data);
      },
      error: (err) => {
        console.error(err);
        alert('Could not find cleaned_data.csv. Did you run the python script?');
      }
    });
  }
}
