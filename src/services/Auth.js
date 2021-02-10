
//Criando uma função que simula um login repassando as informações no final de 2,5 segundos
export function Login(values) {
  //Passar os paramentros do formulário
  console.log(values)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            nome: 'Marcos',
            email: 'teste@teste.com',
          },
        });
      }, 2500);
    });
  }