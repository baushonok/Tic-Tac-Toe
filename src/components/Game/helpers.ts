export function isLastStep(step: number, amountOfRows: number, amountOfColumns: number): boolean {
  return step === getBoardSize(amountOfRows, amountOfColumns) - 1;
}

function getBoardSize(amountOfRows: number, amountOfColumns: number): number {
  return amountOfRows * amountOfColumns;
}
