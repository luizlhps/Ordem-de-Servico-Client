const getSeachCep = async (cep: string | number) => {
  const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error("CEP não encontrado ou ocorreu um erro na busca");
  }
  return data;
};

export const CepSearch = {
  getSeachCep,
};
