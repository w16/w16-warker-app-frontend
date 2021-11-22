import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../services/api";
import { SearchIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
interface IPosto {
  id: string;
  reservatorio: number;
}
interface IPostos {
  id: number;
  cidade: string;
  cords: {
    longitude: string;
    latitude: string;
  };
  postos: IPosto[];
}
export default function Postos() {
  const [postos, setPostos] = useState<IPostos[]>([]);
  const { register, handleSubmit } = useForm();
  function handleSearch(data) {
    const results = postos.filter(
      (posto) =>
        posto.cidade.toUpperCase().indexOf(data.search.toUpperCase()) !== -1
    );

    if (data.search == "") {
      getCidades();
      console.log("oi");
    }
    setPostos(results);
  }
  async function getCidades() {
    try {
      const { data } = await api.get(
        "https://warker-api.herokuapp.com/api/cidade"
      );

      setPostos(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCidades();
  }, []);

  return (
    <section className="bg-gray-100 h-screen pt-10 font-sans  ">
      <div className="container mx-auto ">
        <form
          onSubmit={handleSubmit(handleSearch)}
          className="flex items-center justify-center  mb-5"
        >
          <input
            type="search"
            name="search"
            className="w-full bg-gray-200 p-2 rounded  "
            placeholder="Digite a cidade"
            {...register("search")}
          />
          <button
            type="submit"
            className="bg-yellow-600 rounded ml-2 p-2 hover:scale-50 transition duration-200 ease"
          >
            <SearchIcon className="w-5  h-5 text-white" />
          </button>
        </form>
        <table className="table-auto text-center border-separate  p-5 w-full">
          <thead className="bg-gray-50 rounded">
            <tr className="">
              <th className="p-2 text-gray-700 font-sans">Cidade</th>
              <th className="p-2 text-gray-700 font-sans">Postos</th>
              <th className="p-2 text-gray-700 font-sans">
                Latidude/Longitude
              </th>
              <th className="p-2 text-gray-700 font-sans">Info</th>
            </tr>
          </thead>
          <tbody>
            {postos?.map((res: any) => {
              return (
                <tr key={res.id} className="bg-gray-50">
                  <td className="pt-4 pb-4 mt-4 text-gray-500">{res.cidade}</td>
                  <td className="pt-4 pb-4 mt-4 text-gray-500">
                    {res.postos.length}
                  </td>
                  <td className="pt-4 pb-4 mt-4 text-gray-500">
                    {`${res.coords.latitude} / ${res.coords.longitude}`}
                  </td>
                  <td className="pt-4 pb-4 mt-4 text-gray-500">
                    <Link href={`/postos/${res.id}`}>
                      <a className=" rounded text-center block p-2  hover:scale-50 transition duration-200 ease">
                        <SearchIcon className="w-5 h-5 text-center mx-auto  text-black" />
                      </a>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["w16:token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
