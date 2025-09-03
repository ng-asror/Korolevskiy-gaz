import { Injectable } from '@angular/core';
import { ITgUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Telegram {
  private tg = (window as any).Telegram.WebApp;

  async getTgUser(): Promise<ITgUser> {
    return await this.tg.initDataUnsafe;
  }
  async getUserLocalId(): Promise<string> {
    const id = await this.getCloudStorage('tg_id');
    return id;
  }

  init(headerColor: string): void {
    this.tg.ready();
    this.tg.setHeaderColor(headerColor);
    this.tg.expand();
    this.tg.enableClosingConfirmation();
  }

  hapticFeedback(type: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void {
    this.tg.HapticFeedback.impactOccurred(type);
  }

  // This method sets a custom keyboard for Telegram Web App.
  async setCloudItem(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tg.CloudStorage.setItem(
        key,
        value,
        (error: any, success: boolean) => {
          if (error) {
            reject(error);
          } else if (success) {
            resolve();
          }
        }
      );
    });
  }

  // This method retrieves an item from Telegram's cloud storage.
  async getCloudStorage(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.tg.CloudStorage.getItem(key, (error: any, value: string) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  // This method removes an item from Telegram's cloud storage.
  async removeCloudItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tg.CloudStorage.removeItem(key, (error: any, success: boolean) => {
        if (error) {
          reject(error);
        } else if (success) {
          resolve();
        }
      });
    });
  }
  showAlert(message: string): void {
    this.tg.showAlert(message);
  }
}
