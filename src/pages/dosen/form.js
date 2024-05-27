import Navbar from "./navbar";
import { db } from "../../../public/firebaseConfig";
import { getDocs, getDoc, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

async function addDataToFirebase(nama_lengkap, nim, fakultas, jurusan, matkul, sks, jadwal, nilai, kelas, kodeKelas
) {
    try {
        const docRefSurat = await addDoc(collection(db, "mahasiswa"), {
            nama_lengkap: nama_lengkap,
            nim: nim,
            fakultas: fakultas,
            jurusan: jurusan,
            matkul: matkul,
            sks: sks,
            jadwal: jadwal,
            nilai: nilai,
        })
        console.log("Document input document ID : ", docRefSurat.id);
        return true;

    } catch (error) {
        console.error("error input document", error);
        return false;
    }
}


export default function Form() {
    //identitas
    const [nama_lengkap, setNama_lengkap] = useState("");
    const [nim, setnim] = useState("");
    const [fakultas, setfakultas] = useState("Ilmu Komputer");
    const [jurusan, setjurusan] = useState("");
    const [matkul, setmatkul] = useState("");
    const [sks, setsks] = useState("");
    const [jadwal, setjadwal] = useState("");
    const [nilai, setnilai] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const added = await addDataToFirebase(nama_lengkap, nim, fakultas, jurusan, matkul, sks, jadwal, nilai,
        );
        if (added) {
            setNama_lengkap("");
            setnim("");
            setfakultas("Ilmu Komputer");
            setjurusan("");
            setmatkul("");
            setsks("");
            setjadwal("");
            setnilai("");

            alert("Data berhasil di upload");
            location.reload();
        } else {
            alert("Data tidak berhasil di upload");
        }
    }

    return (
        <>
            <div className="home">
                <Navbar />
                <div className="halLog">
                    <div className="formulir">
                        <h1 className="text-center mb-5 mt-3 pb-3">Data Mahasiswa Baru</h1>
                        <form onSubmit={handleSubmit} method="post" action="">
                            <div className="d-flex justify-content-between">
                                <span>
                                    <section>
                                        <h3>IDENTITAS MAHASISWA</h3>
                                        <hr />
                                        <p>Nama Lengkap</p>
                                        <input type="text" onChange={(e) => setNama_lengkap(e.target.value)} />
                                        <p>Nomor Induk Mahasiswa</p>
                                        <input type="text" onChange={(e) => setnim(e.target.value)} />
                                        <p>Fakultas</p>
                                        <input type="text" value={"Ilmu Komputer"} onChange={(e) => setfakultas("Ilmu Komputer")} readOnly />
                                        <p>Jurusan</p>
                                        <select onChange={(e) => setjurusan(e.target.value)}>
                                            <option>Pilih</option>
                                            <option value="Teknik Informatika">Teknik Informatika</option>
                                            <option value="Sistem Informasi">Sistem Informasi</option>
                                        </select>
                                    </section>
                                    <section>
                                        <h3>NILAI</h3>
                                        <hr />
                                        <p>Nomor Induk Mahasiswa</p>
                                        <input type="text" value={nim} />
                                        <p>Nilai</p>
                                        <input type="text" onChange={(e) => setnilai(e.target.value)} />
                                    </section>
                                </span>
                                <span>
                                    <section>
                                        <h3>MATAKULIAH</h3>
                                        <hr />
                                        <p>Nama Mata Kuliah</p>
                                        <input type="text" onChange={(e) => setmatkul(e.target.value)} />
                                        <p>Jumlah SKS</p>
                                        <input type="number" onChange={(e) => setsks(e.target.value)} />
                                    </section>
                                    <section>
                                        <h3>KELAS</h3>
                                        <hr />
                                        <p>Nomor Induk Mahasiswa</p>
                                        <input type="number" value={nim} />
                                        <p>Jadwal</p>
                                        <input type="date" onChange={(e) => setjadwal(e.target.value)} />
                                    </section>
                                </span>
                            </div>
                            <div className="d-flex justify-content-around">
                                <button className="bg-danger">Batal</button>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
