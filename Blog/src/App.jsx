import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";

function App() {
  console.log();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Hello from app</h1>
    </>
  );
}

export default App;
