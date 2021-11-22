import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
function Form() {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  async function handleSignIn(data) {
   
    try {
      await signIn(data);
      toast.success("Usuário autenticado")
    } catch (error) {
      toast.error("Dados incorretos")
    }
    
  }
  return (
    <div className="bg-white p-5 mt-5 h-full w-1/2 mx-auto pb-10 pt-10 rounded ">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        method="post"
        className="flex  flex-col justify-around items-center w-full"
      >
        <div className="input-group flex flex-col w-full ">
          <label htmlFor="email" className="text-xs mb-3 text-gray-400">
            E-mail
          </label>
          <input
         
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 mb-5 focus:ring-2  focus:ring-yellow-600 rounded"
            {...register("email")}
          />
        </div>
        <div className="input-group flex flex-col w-full mx-auto ">
          <label htmlFor="senha" className="text-xs mb-3 text-gray-400">
            Senha
          </label>
          <input
            type="password"
            name="senha"
            id="senha"
            className="bg-gray-50 mb-5 focus:ring-2  focus:ring-yellow-600 rounded"
            {...register("password")}
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-600 w-44 h-8 rounded transition duration-500 transform hover:scale-75 text-white uppercase text-xs font-bold lg:w-full"
        >
          Estou com sede
        </button>
      </form>
    </div>
  );
}

export default Form;
