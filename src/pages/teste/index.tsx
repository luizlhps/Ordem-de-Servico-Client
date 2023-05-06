import { ButtonLinks } from "@/components/SideMenu/Utils/ButtonLinks";
import { useDebouse } from "@/hook";
import React, { useCallback, useEffect, useState } from "react";

export interface IRegiao {
  id: number;
  sigla: string;
  nome: string;
}
export interface IEstado {
  id: number;
  sigla: string;
  nome: string;
  regiao?: IRegiao;
}

const Estados = () => {
  const { debouse } = useDebouse(5000);
  const [estados, setEstados] = useState<IEstado[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<number | undefined>();

  const selectAPi = () => {
    const api = fetch("https://brasilapi.com.br/api/ibge/uf/v1").then((response) =>
      response.json().then((data) => {
        return data;
      })
    );
    return api;
  };

  const handleClick = useCallback(() => {
    debouse(() => {
      try {
        selectAPi().then((data: IEstado[]) => {
          setEstados(data);
        });
      } catch (error) {
        console.error("Houve um Error:", error);
      }
    });
  }, []);

  const HandleSelectOnchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadoSelecionado(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (estadoSelecionado !== undefined) {
      const estado = estados.find((e) => e.id === estadoSelecionado);
      alert(`Estado selecionado: ${estado?.nome}`);
    }
  };

  console.log(estados);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={estadoSelecionado}
          onClick={handleClick}
          onChange={HandleSelectOnchange}
        >
          <option value={undefined}>Selecione um estado</option>

          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.nome}
            </option>
          ))}
        </select>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Estados;
