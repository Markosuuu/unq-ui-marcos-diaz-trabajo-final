export type ApiResponse = {
  exists: boolean;
};

export type ResultadoValidacion = {
  valido: boolean;
  error?: string;
  palabra?: string;
};

export interface LeaderBoardItem {
  nombre: string;
  puntaje: number;
}
