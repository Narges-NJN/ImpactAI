import * as fs from 'fs';

export function selectButtons(): string[][] {
  // Leggi i pulsanti dal file JSON
  const data = fs.readFileSync('./buttons.json', 'utf-8');
  const buttons = JSON.parse(data).buttons;

  // Mescola i pulsanti
  const shuffled = buttons.sort(() => Math.random() - 0.5);

  // Seleziona i primi 4 pulsanti
  const selected = shuffled.slice(0, 4);

  // Organizza i pulsanti in righe (2 pulsanti per riga)
  const rows = [];
  for (let i = 0; i < selected.length; i += 2) {
    rows.push(selected.slice(i, i + 2));
  }

  return rows;
}
