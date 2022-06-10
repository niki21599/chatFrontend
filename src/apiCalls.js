let token = "2ab5580c215c6cabe52e8358f4b402f2af1d3646";

// Login
export async function login(username, password) {
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  let response = await fetch("http://127.0.0.1:8000/login/", {
    method: "POST",
    body: formData,
  });
  let result = await response.json();
  console.log("Response", result);
  return result;
}

//Register
export async function register(
  username,
  password,
  password_repeat,
  email,
  first_name,
  last_name
) {
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("password_repeat", password_repeat);
  formData.append("email", email);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);

  let response = await fetch("http://127.0.0.1:8000/register/", {
    method: "POST",
    body: formData,
  });
  let result = await response.json();
  console.log("Response", result);
  return result;
}

export async function getChats() {
  let token = "Token " + localStorage.getItem("token");
  let response = await fetch("http://127.0.0.1:8000/chat/get", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  let result = await response.json();
  console.log("Response", result);
  return result;
}

export async function getMessages(chat_id) {
  let token = "Token " + localStorage.getItem("token");
  let response = await fetch(
    "http://127.0.0.1:8000/message/get?chat_id=" + chat_id,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
  let result = await response.json();
  console.log("Response", result);
  return result;
}

export async function postChat(user_id) {
  let token = "Token " + localStorage.getItem("token");
  let formData = new FormData();
  formData.append("user_id", user_id);

  let response = await fetch("http://127.0.0.1:8000/chat/add", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });
  let result = await response.json();
  console.log("Response", result);
  return result;
}

export async function postMessage(chat_id, message) {
  let token = "Token " + localStorage.getItem("token");
  let formData = new FormData();
  formData.append("chat_id", chat_id);
  formData.append("text", message);

  let response = await fetch("http://127.0.0.1:8000/message/add", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });
  let result = await response.json();
  console.log("Response", result);
  return result;
}

export async function getUsersWithoutChat() {
  let token = "Token " + localStorage.getItem("token");
  let response = await fetch("http://127.0.0.1:8000/users/add", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  let result = await response.json();
  console.log("Response", result);
  return result;
}

export async function getUserDetail(user_ids) {
  let token = "Token " + localStorage.getItem("token");
  let response = await fetch(
    "http://127.0.0.1:8000/users/get?user_ids=" + user_ids,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
  let result = await response.json();
  console.log("Response", result);
  return result;
}

export async function getLastMessages(chat_ids) {
  let token = "Token " + localStorage.getItem("token");
  let response = await fetch(
    "http://127.0.0.1:8000/message/get/last?chat_ids=" + chat_ids,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );
  let result = await response.json();
  console.log("Response", result);
  return result;
}

export async function getUserId() {
  let token = "Token " + localStorage.getItem("token");
  let response = await fetch("http://127.0.0.1:8000/user_id/get", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  let result = await response.json();
  console.log("Response", result);
  return result;
}
