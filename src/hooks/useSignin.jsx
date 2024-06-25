export const isBlank = (user) => {
  return Object.keys(user).some((key) => !user[key]);
}

export const initialUser = {
  email: "",
  password: "",
};

export const signinLists = [
  {
    name: "email",
    label: "Email",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];