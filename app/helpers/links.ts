export function getRealId(id: string) {
  const id_splited = id.split("-");
  const id_real = id_splited[id_splited.length - 1];
  return id_real;
}
