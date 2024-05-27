import Navbar from "./navbar";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

async function fetchDataByNim(nim) {
    const q = query(collection(db, "mahasiswa"), where("nim", "==", nim));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function DataMahasiswa() {
    const router = useRouter();
    const { id } = router.query; // The NIM from the URL
    const [dataMahasiswa, setDataMahasiswa] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const data = await fetchDataByNim(id);
                setDataMahasiswa(data);
            }
        }
        fetchData();
    }, [id]);

    if (!dataMahasiswa.length) {
        return <p>Loading...</p>;
    }

    // Assuming all other details like name, faculty, etc. are same for each document with the same NIM
    const { nama_lengkap, nim, fakultas, jurusan } = dataMahasiswa[0];

    return (
        <>
            <div className="home">
                <Navbar />
                <div className="halLog">
                    <div className="dataSiswa">
                        <h2 className="text-center mb-3">MAHASISWA</h2>
                        <hr />
                        <h5>IDENTITAS</h5>
                        <section className="d-flex detailMhs flex-column">
                            <section className="d-flex mb-2">
                                <span style={{ width: '30%' }} className="d-flex align-items-center">
                                    <p>Nama Lengkap</p>
                                </span>
                                <span style={{ width: '70%' }}>
                                    <b>{nama_lengkap || ''}</b>
                                </span>
                            </section>
                            <section className="d-flex mb-2">
                                <span style={{ width: '30%' }} className="d-flex align-items-center">
                                    <p>Nomor Induk Mahasiswa</p>
                                </span>
                                <span style={{ width: '70%' }}>
                                    <b>{nim || ''}</b>
                                </span>
                            </section>
                            <section className="d-flex mb-2">
                                <span style={{ width: '30%' }} className="d-flex align-items-center">
                                    <p>Fakultas</p>
                                </span>
                                <span style={{ width: '70%' }}>
                                    <b>{fakultas || ''}</b>
                                </span>
                            </section>
                            <section className="d-flex mb-2">
                                <span style={{ width: '30%' }} className="d-flex align-items-center">
                                    <p>Jurusan</p>
                                </span>
                                <span style={{ width: '70%' }}>
                                    <b>{jurusan || ''}</b>
                                </span>
                            </section>
                        </section>
                        <hr />
                        <h5 className="text-uppercase mt-5">Daftar Nilai :</h5>
                        {dataMahasiswa.map((item, index) => (
                            <section key={index} className="d-flex ps-4 flex-column mb-4">
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Mata Kuliah</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <p>{item.matkul || ''}</p>
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Jumlah SKS</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <p>{item.sks || ''}</p>
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Nilai</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <p>{item.nilai || ''}</p>
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Jadwal</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <p>{item.jadwal || ''}</p>
                                    </span>
                                </section>
                                <hr style={{width: '50%'}} />
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
