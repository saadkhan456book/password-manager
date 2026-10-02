import { useState, useEffect } from "react";

function Manager() {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);

  const [passwordarray, setPasswordarray] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/passwords")
      .then((Response) => Response.json())
      .then((data) => {
        setPasswordarray(data);
      });
  }, []);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      if (editId) {
        // UPDATE
        await fetch(`http://localhost:3000/api/passwords/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            site: form.site,
            username: form.username,
            password: form.password,
          }),
        });
        setEditId(null);
      } else {
        // NEW PASSWORD
        await fetch("http://localhost:3000/api/passwords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
      }
      // MongoDB se fresh data lao
      const response = await fetch("http://localhost:3000/api/passwords");
      const data = await response.json();
      setPasswordarray(data);
      setForm({
        site: "",
        username: "",
        password: "",
      });
      setMessage("Saved Successfully");
    } else {
      setMessage("All Field Must Have 3 Characters");
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const deletepassword = async (index) => {
    const id = passwordarray[index]._id;
    await fetch(`http://localhost:3000/api/passwords/${id}`, {
      method: "DELETE",
    });
    const newarray = passwordarray.filter((item, i) => i !== index);
    setPasswordarray(newarray);
  };

  const editpassword = (index) => {
    setEditId(passwordarray[index]._id);
    setForm(passwordarray[index]);
  };

  return (
    <main className="min-h-screen bg-green-50 p-4">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500"> Manager/&gt;</span>
        </h1>

        <p className="text-center text-green-900 text-lg">
          Your own Password Manager
        </p>

        <div className="flex flex-col gap-6 mt-10">
          <input
            name="site"
            value={form.site}
            onChange={handleChange}
            type="text"
            placeholder="Enter website URL"
            className="border border-green-500 rounded-full px-4 py-2 w-full"
          />

          <div className="flex gap-6">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter Username"
              className="border border-green-500 rounded-full px-4 py-2 w-full"
            />

            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter Password"
              className="border border-green-500 rounded-full px-4 py-2 w-full"
            />
          </div>

          <button
            onClick={savePassword}
            className="bg-green-400 hover:bg-green-300 rounded-full
             px-8 py-2 w-fit mx-auto border border-green-900"
          >
            Save
          </button>
          {message && <p className="text-center font-medium">{message}</p>}
        </div>

        <section className="mt-10">
          <h2 className="font-bold text-2xl py-4">Your details</h2>

          {passwordarray.length === 0 && <p>No details to show</p>}

          {passwordarray.length !== 0 && (
            <table className="w-full">
              <thead>
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {passwordarray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center py-2">
                        {item.site}

                        <button
                          onClick={() => copyText(item.site)}
                          className="ml-2 border px-2 py-1 rounded"
                        >
                          Copy
                        </button>
                      </td>

                      <td className="text-center py-2">
                        {item.username}

                        <button
                          onClick={() => copyText(item.username)}
                          className="ml-2 border px-2 py-1 rounded"
                        >
                          Copy
                        </button>
                      </td>

                      <td className="text-center py-2">
                        {"*".repeat(item.password.length)}

                        <button
                          onClick={() => copyText(item.password)}
                          className="ml-2 border px-2 py-1 rounded"
                        >
                          Copy
                        </button>
                      </td>

                      <td className="text-center py-2">
                        <button
                          onClick={() => editpassword(index)}
                          className="border px-2 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deletepassword(index)}
                          className="border px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </main>
  );
}

export default Manager;
