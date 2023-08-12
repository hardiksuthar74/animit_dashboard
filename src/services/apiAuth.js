import supabase, { supabaseUrl } from "./supabase";

const url = "http://127.0.0.1:5000";

export async function signup({ name, email, password, confirmPassword }) {
  const response = await fetch(`${url}/users`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await response.json();

  if (data.status === "fail") {
    throw new Error(data.message);
  }
  return data;
}

export async function login({ email, password }) {
  const response = await fetch(`${url}/users/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = await response.json();

  if (data.status === "fail") {
    throw new Error(data.message);
  } else {
    localStorage.setItem("authToken", data.token);
    return data;
  }
}

export async function getCurrentUser() {
  const authToken = localStorage.getItem("authToken");

  const response = await fetch(`${url}/users/getMe`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.status === "fail") {
    throw new Error(data.message);
  } else {
    return data;
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
