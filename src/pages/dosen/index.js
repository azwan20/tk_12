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

export default function DataSiswa() {
    const router = useRouter();
    const [dataMahasiswa, setDataMahasiswa] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            setDataMahasiswa(data);
        }
        fetchData();
    }, []);

    const selectedItem = dataMahasiswa.find(item => item.id === selectedId);

    const handleNamaChange = (event) => {
        const selectedId = event.target.value;
        setSelectedId(selectedId);
        const selectedItem = dataMahasiswa.find(item => item.id === selectedId);
        setFormData(selectedItem || {});
    };

    const handleEditClick = () => {
        setIsEditMode(true);
        alert("Edit bisa dilakukan, Silakan mengisi kolom yang ingin di Edit");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        if (formData.id) {
            const docRef = doc(db, "mahasiswa", formData.id);
            await updateDoc(docRef, formData);
            setIsEditMode(false);
            const updatedData = await fetchDataFromFirestore();
            setDataMahasiswa(updatedData);
        }
        alert("Data berhasil di Update");
    };

    const handleDeleteClick = async () => {
        if (formData.id) {
            const docRef = doc(db, "mahasiswa", formData.id);
            await deleteDoc(docRef);
            setIsEditMode(false);
            const updatedData = await fetchDataFromFirestore();
            setDataMahasiswa(updatedData);
            setSelectedId('');
            setFormData({});
            alert("Data berhasil di Hapus");
        }
    };

    const handleBatal = () => {
        setIsEditMode(false);
    }

    const handleDetailTransaksi = (id) => {
        router.push(`/print/${id}`);
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        margin: '4px 0',
        boxSizing: 'border-box',
        ...(!isEditMode ? {
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '0',
            padding: '0',
            fontWeight: '700',
            fontsize: '18px',
        } : {
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
        })
    };

    return (
        <>
            <div className="home">
                <Navbar />
                <div className="halLog">
                    <div className="dataSiswa">
                        <h2 className="text-center mb-3">HALAMAN DOSEN</h2>
                        <section className="navbar align-items-center">
                            <select
                                style={{ width: '20%', margin: 'auto', border: '3px solid #A1DD70' }}
                                value={selectedId}
                                onChange={handleNamaChange}
                                className="px-1"
                            >
                                <option value="">Pilih Nama</option>
                                {dataMahasiswa.map((item) => (
                                    <option key={item.id} value={item.id}>{item.nama_lengkap}</option>
                                ))}
                            </select>
                        </section>
                        <hr />
                        {selectedItem ? (
                            <section className="d-flex flex-column">
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Nama Lengkap</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <input
                                            type="text"
                                            name="nama_lengkap"
                                            value={formData.nama_lengkap || ''}
                                            onChange={handleInputChange}
                                            readOnly={!isEditMode}
                                            style={inputStyle}
                                        />
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Nomor Induk Mahasiswa</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <input
                                            type="text"
                                            name="nim"
                                            value={formData.nim || ''}
                                            onChange={handleInputChange}
                                            readOnly={!isEditMode}
                                            style={inputStyle}
                                        />
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Fakultas</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <input
                                            type="text"
                                            name="fakultas"
                                            value={formData.fakultas || ''}
                                            onChange={handleInputChange}
                                            readOnly={!isEditMode}
                                            style={inputStyle}
                                        />
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Jurusan</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <select type="text"
                                            name="jurusan"
                                            value={formData.jurusan || ''}
                                            onChange={handleInputChange}
                                            readOnly={!isEditMode}
                                            style={inputStyle}>
                                            <option>Pilih</option>
                                            <option value="Teknik Informatika">Teknik Informatika</option>
                                            <option value="Sistem Informasi">Sistem Informasi</option>
                                        </select>
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Mata Kuliah</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <input
                                            type="text"
                                            name="matkul"
                                            value={formData.matkul || ''}
                                            onChange={handleInputChange}
                                            readOnly={!isEditMode}
                                            style={inputStyle}
                                        />
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Jumlah SKS</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <input
                                            type="text"
                                            name="sks"
                                            value={formData.sks || ''}
                                            onChange={handleInputChange}
                                            readOnly={!isEditMode}
                                            style={inputStyle}
                                        />
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Nilai</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <input
                                            type="text"
                                            name="nilai"
                                            value={formData.nilai || ''}
                                            onChange={handleInputChange}
                                            readOnly={!isEditMode}
                                            style={inputStyle}
                                        />
                                    </span>
                                </section>
                                <section className="d-flex mb-2">
                                    <span style={{ width: '30%' }} className="d-flex align-items-center">
                                        <p>Jadwal</p>
                                    </span>
                                    <span style={{ width: '70%' }}>
                                        <input
                                            type="date"
                                            name="jadwal"
                                            value={formData.jadwal || ''}
                                            onChange={handleInputChange}
                                            readOnly={!isEditMode}
                                            style={inputStyle}
                                        />
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
                    <div className="d-flex edit">
                        {isEditMode && (
                            <span className="text-end d-flex">
                                <button className="bg-warning" onClick={handleBatal}><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.75 3.75H6.25C5.58696 3.75 4.95107 4.01339 4.48223 4.48223C4.01339 4.95107 3.75 5.58696 3.75 6.25V23.75C3.75 24.413 4.01339 25.0489 4.48223 25.5178C4.95107 25.9866 5.58696 26.25 6.25 26.25H23.75C24.413 26.25 25.0489 25.9866 25.5178 25.5178C25.9866 25.0489 26.25 24.413 26.25 23.75V6.25C26.25 5.58696 25.9866 4.95107 25.5178 4.48223C25.0489 4.01339 24.413 3.75 23.75 3.75ZM19.5 21.25L15 16.75L10.5 21.25L8.75 19.5L13.25 15L8.75 10.5L10.5 8.75L15 13.25L19.5 8.75L21.25 10.5L16.75 15L21.25 19.5L19.5 21.25Z" fill="white" />
                                </svg>
                                </button>
                                <button className="mx-2 bg-success" onClick={handleSaveClick}><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25.3125 4.6875H4.6875C4.19022 4.6875 3.71331 4.88504 3.36167 5.23667C3.01004 5.58831 2.8125 6.06522 2.8125 6.5625V23.4375C2.8125 23.9348 3.01004 24.4117 3.36167 24.7633C3.71331 25.115 4.19022 25.3125 4.6875 25.3125H25.3125C25.8098 25.3125 26.2867 25.115 26.6383 24.7633C26.99 24.4117 27.1875 23.9348 27.1875 23.4375V6.5625C27.1875 6.06522 26.99 5.58831 26.6383 5.23667C26.2867 4.88504 25.8098 4.6875 25.3125 4.6875ZM24.1008 10.0383L12.8508 21.2883C12.7637 21.3754 12.6603 21.4446 12.5465 21.4918C12.4327 21.539 12.3107 21.5632 12.1875 21.5632C12.0643 21.5632 11.9423 21.539 11.8285 21.4918C11.7147 21.4446 11.6113 21.3754 11.5242 21.2883L6.83672 16.6008C6.66081 16.4249 6.56198 16.1863 6.56198 15.9375C6.56198 15.6887 6.66081 15.4501 6.83672 15.2742C7.01263 15.0983 7.25122 14.9995 7.5 14.9995C7.74878 14.9995 7.98737 15.0983 8.16328 15.2742L12.1875 19.2996L22.7742 8.71172C22.9501 8.53581 23.1887 8.43698 23.4375 8.43698C23.6863 8.43698 23.9249 8.53581 24.1008 8.71172C24.2767 8.88763 24.3755 9.12622 24.3755 9.375C24.3755 9.62378 24.2767 9.86237 24.1008 10.0383Z" fill="white" />
                                </svg>
                                </button>
                            </span>
                        )}
                        <button className="bg-danger" onClick={handleDeleteClick}><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.75 26.25C8.0625 26.25 7.47417 26.0054 6.985 25.5163C6.49583 25.0271 6.25083 24.4383 6.25 23.75V7.5H5V5H11.25V3.75H18.75V5H25V7.5H23.75V23.75C23.75 24.4375 23.5054 25.0263 23.0163 25.5163C22.5271 26.0063 21.9383 26.2508 21.25 26.25H8.75ZM11.25 21.25H13.75V10H11.25V21.25ZM16.25 21.25H18.75V10H16.25V21.25Z" fill="white" />
                        </svg>
                        </button>
                        <button className=" d-flex ms-2 align-items-center justify-content-center" onClick={handleEditClick}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4H11C11.2652 4 11.5196 3.89464 11.7071 3.70711C11.8946 3.51957 12 3.26522 12 3C12 2.73478 11.8946 2.48043 11.7071 2.29289C11.5196 2.10536 11.2652 2 11 2H5C4.20435 2 3.44129 2.31607 2.87868 2.87868C2.31607 3.44129 2 4.20435 2 5V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12ZM6 12.76V17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18H11.24C11.3716 18.0008 11.5021 17.9755 11.6239 17.9258C11.7457 17.876 11.8566 17.8027 11.95 17.71L18.87 10.78L21.71 8C21.8037 7.90704 21.8781 7.79644 21.9289 7.67458C21.9797 7.55272 22.0058 7.42201 22.0058 7.29C22.0058 7.15799 21.9797 7.02728 21.9289 6.90542C21.8781 6.78356 21.8037 6.67296 21.71 6.58L17.47 2.29C17.377 2.19627 17.2664 2.12188 17.1446 2.07111C17.0227 2.02034 16.892 1.9942 16.76 1.9942C16.628 1.9942 16.4973 2.02034 16.3754 2.07111C16.2536 2.12188 16.143 2.19627 16.05 2.29L13.23 5.12L6.29 12.05C6.19732 12.1434 6.12399 12.2543 6.07423 12.3761C6.02446 12.4979 5.99924 12.6284 6 12.76ZM16.76 4.41L19.59 7.24L18.17 8.66L15.34 5.83L16.76 4.41ZM8 13.17L13.93 7.24L16.76 10.07L10.83 16H8V13.17Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
