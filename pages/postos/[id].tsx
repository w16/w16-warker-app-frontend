import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { getApiClient } from "../../services/axios";
import Link from 'next/link'
import { ArrowSmLeftIcon } from "@heroicons/react/outline";
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
export default function Postos({ posto }) {
  return (
    <section className="bg-gray-100 h-screen pt-10 font-sans  ">
      <div className="container mx-auto ">
      <div className="">
        <Link href="/cidade">
          <a className="text-orange-600 ">
            <ArrowSmLeftIcon className="w-5 h-5 text-orange-600 mb-5"/>
          </a>
        </Link>
      </div>
        <table className="table-auto text-center border-separate  p-5 w-full">
          <thead className="bg-gray-50 rounded">
            <tr className="">
              <th className="p-2 text-gray-700 font-sans">Reservatório</th>
              <th className="p-2 text-gray-700 font-sans">Coords</th>
            </tr>
          </thead>
          <tbody>
            {posto?.map((res: any) => {
              return (
                <tr key={res.id} className="bg-gray-50">
                  <td className="pt-4 pb-4 mt-4 text-gray-500">
                    {res.reservatorio}
                  </td>
                  <td className="pt-4 pb-4 mt-4 text-gray-500">
                    {`${res.coords.latitude} / ${res.coords.longitude}`}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ["w16:token"]: token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { id } = context.query;
  const apiClient = getApiClient(context);
  try {
    const {data} = await apiClient.get(`/posto/${id}`,{ headers: { token: `${token}` } });
   
    return {
      props: {
        posto: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        posto: null,
      },
    };
  }
};
