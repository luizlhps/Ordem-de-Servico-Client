export const normalizePhoneNumber = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[^\d]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};
export const normalizeTelPhoneNumber = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[^\d]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};
export const TransformForbackEndPhoneNumber = (value: string | undefined) => {
  if (!value) return "";
  const str = value.replace(/[()\s-]/g, "");
  let novaStr = str.split("").slice(0, -1).join("");
  if (str.split("").length >= 12) return novaStr;
  if (str.split("").length <= 11) return str;
};

export const cpfOrCnpj = (value: string | undefined) => {
  if (!value) return "";

  const cpfOrCnpjLength = value.replace(/[^\d]/g, "").length;

  if (cpfOrCnpjLength <= 11) {
    return value
      .replace(/[^\d]/g, "")
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  } else if (cpfOrCnpjLength >= 12 && cpfOrCnpjLength <= 14) {
    return value
      .replace(/[^\d]/g, "")
      .slice(0, 14) // Limita a 14 caracteres
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  }
};

export const TransformForbackEndCpf = (value: string | undefined) => {
  if (!value) return "";
  const str = value.replace(/[^\d]/g, "");
  return str;
};

export const numbersOnly = (value: string | undefined) => {
  if (!value) return "";

  return value.replace(/[^\d]/g, "").replace(/(\d{8})(\d+?)/, "$1");
};
