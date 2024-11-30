import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatasetService implements OnModuleInit {
  private dataset: any[] = []; // Array per memorizzare i record come oggetti

  async onModuleInit() {
    // Carica il dataset all'avvio
    this.dataset = await this.loadDataset('./datasets/diabetes.csv'); 
    console.log('Dataset caricato:', this.dataset);
  }

  private async loadDataset(filePath: string): Promise<any[]> {
    const data: any[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser()) // csv-parser legge e converte ogni riga in un oggetto basato sull'intestazione delle colonne
        .on('data', (row) => {
          // Filtra o processa ulteriormente ogni riga se necessario
          data.push(row);
        })
        .on('end', () => resolve(data))
        .on('error', (error) => reject(error));
    });
  }

  getDataset(): any[] {
    return this.dataset; // Ritorna il dataset come array di oggetti
  }

  getFilteredData(filterKey: string, filterValue: string): any[] {
    // Metodo per filtrare i dati in base a una chiave e un valore
    return this.dataset.filter((record) => record[filterKey] === filterValue);
  }
}
