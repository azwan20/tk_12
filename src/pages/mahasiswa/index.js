import Navbar from "./navbar";
import { db } from "../../../public/firebaseConfig";
import { getDocs, collection, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "mahasiswa"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}

export default function DataMahasiswa({ currentUserId }) {
    const router = useRouter();
    const [dataMahasiswa, setDataMahasiswa] = useState([]);
    const [selectedNama, setSelectedNama] = useState('');
    const [formData, setFormData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            setDataMahasiswa(data);
        }
        fetchData();
    }, []);

    // Filter data mahasiswa berdasarkan userId
    const filteredData = dataMahasiswa.filter(mahasiswa => mahasiswa.id === currentUserId);

    const selectedItem = filteredData.length > 0 ? filteredData.find(item => item.nama_lengkap === selectedNama) : null;

    const handleNamaChange = (event) => {
        const selectedName = event.target.value;
        setSelectedNama(selectedName);
        const selectedItem = filteredData.find(item => item.nama_lengkap === selectedName);
        setFormData(selectedItem || {});
    };

    console.log("damhs", dataMahasiswa.map((item) => item.nama_lengkap));
    // console.log("damhs", filteredData.map((item) => item.nama_lengkap));

    console.log(currentUserId);



    return (
        <>
            <div className="home">
                <Navbar />
                <div className="halLog">
                    <div className="dataSiswa">
                        <h2 className="text-center mb-3">MAHASISWA</h2>
                        <section className="navbar align-items-center">
                            <select
                                style={{ width: '20%', margin: 'auto', border: '3px solid #A1DD70' }}
                                value={selectedNama}
                                onChange={handleNamaChange}
                                className="px-1"
                            >
                                <option value="">Pilih Nama</option>
                                {dataMahasiswa.map((item, index) => (
                                    <option key={index} value={item.nama_lengkap}>{item.nama_lengkap}</option>
                                ))}
                            </select>

                        </section>
                        <hr />
                        {filteredData ? (
                            <section className="d-flex flex-column">
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Nama Lengkap</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <b>{dataMahasiswa.nama_lengkap || ''}</b>
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Nomor Induk Mahasiswa</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <b>{formData.nim || ''}</b>
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Fakultas</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <b>{formData.fakultas || ''}</b>
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Jurusan</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <b>{formData.jurusan || ''}</b>
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Mata Kuliah</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <b>{formData.matkul || ''}</b>
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Jumlah SKS</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <b>{formData.sks || ''}</b>
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Nilai</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <b>{formData.nilai || ''}</b>
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Jadwal</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <b>{formData.jadwal || ''}</b>
                                    </span>
                                </section>
                            </section>
                        ) : (
                            <div className="text-center">
                                <h5>Mahasiswa yang terdaftar : <b>{dataMahasiswa.length}</b></h5>
                                <p>Pilih nama untuk melihat detailnya</p>
                            </div>
                        )}
                        <hr />
                    </div>
                </div>
            </div>
        </>
    );
}
