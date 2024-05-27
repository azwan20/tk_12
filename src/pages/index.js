import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../public/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

async function fetchDataLoginFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "login"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "mahasiswa"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

export default function Home() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [dataLogin, setDataLogin] = useState([]);
  const [dataMhs, setDataMhs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const loginData = await fetchDataLoginFromFirestore();
      const mhsData = await fetchDataFromFirestore();
      setDataLogin(loginData);
      setDataMhs(mhsData);
    }
    fetchData();
  }, []);

  const handleLogin = () => {
    const mahasiswa = dataMhs.find(mhs => mhs.nim === emailInput);
    const userLogin = dataLogin.find(login => login.role === 'mahasiswa' && login.password === passwordInput);
    const adminLogin = dataLogin.find(login => login.role === 'dosen' && login.password === passwordInput);

    if (mahasiswa && userLogin) {
      localStorage.setItem("nim", emailInput); // Store NIM in local storage
      alert("Login berhasil");
      router.push(`/mahasiswa/${emailInput}`); 
    } else if (emailInput === "admin@gmail.com" && adminLogin) {
      alert("Halo admin!");
      router.push('/dosen/');
    } else if (emailInput === "" || passwordInput === "") {
      alert("Harap mengisi email dan password");
    } else {
      alert("Email atau Password Salah!!!");
    }
  };

  return (
    <>
      <div className="home">
        <div className="halLog" style={{ background: 'linear-gradient(to bottom right, #a8e063, #56ab2f)', height: '100%' }}>
          <h1 className="text-uppercase mb-5 text-white">Nilai Mahasiswa</h1>
          <div className="login d-flex">
            <h1>Login</h1>
            <section>
              <span>
                <p>nim</p>
                <input type="email" onChange={(e) => setEmailInput(e.target.value)} />
              </span>
              <span>
                <p>password</p>
                <input type="password" onChange={(e) => setPasswordInput(e.target.value)} />
              </span>
            </section>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}
