"use client";

import { useFormState } from "react-dom";
import { loginUser } from "@/app/actions";

const initialState = {
  error: '',
}


export default function Login() {

  const [state, formAction] = useFormState(loginUser, initialState)

  return (
    <main className="h-screen">
      <div className="flex justify-center items-center h-screen">
        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <input type="text" name="password" className="border p-2 rounded" />
            <button type="submit" className="bg-blue-400 text-white p-2 rounded ml-2">Login</button>
          </div>
          {state?.error && <p className="bg-red-500 p-4 text-white rounded shadow">{state.error}</p>}
        </form>
      </div>
    </main>
  );
}
