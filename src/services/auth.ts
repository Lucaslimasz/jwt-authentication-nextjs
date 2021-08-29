import { v4 as uuid } from "uuid";

interface signInRequestData {
  email: string;
  password: string;
}

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: signInRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: "Lucas Lima",
      email: "id.lucas@outlook.com.br",
      avatar_url: "https://github.com/lucaslimasz.png",
    },
  };
}

export async function recoverUserInformation() {
  await delay();

  return {
    user: {
      name: "Lucas Lima",
      email: "id.lucas@outlook.com.br",
      avatar_url: "https://github.com/lucaslimasz.png",
    },
  };
}
