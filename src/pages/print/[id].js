import { useRouter } from "next/router";
import Link from "next/link";
import { db } from "../../../public/firebaseConfig";
import React, { useEffect, useState } from "react";
import { getDocs, getDoc, collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

async function fetchData_ModelTransaksi(id) {
    const docRef = doc(db, "data_siswa", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        const data = { id: docSnapshot.id, ...docSnapshot.data() };
        return [data];
    } else {
        // Handle case where the document doesn't exist
        return [];
    }
}

export default function Template() {
    const router = useRouter();
    const { id } = router.query;
    const [dataSurat, SetDataSurat] = useState([]);
    const [dataSuratMasuk, SetDataSuratMasuk] = useState([]);
    const [dataSuratKeluar, SetDataSuratKeluar] = useState([]);


    console.log("id", id);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const data = await fetchData_ModelTransaksi(id);
                SetDataSurat(data);
            }
        }
        fetchData();
    }, [id]);

    const currentDate = new Date();

    const formatDate = (inputDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(inputDate).toLocaleDateString('id-ID', options);
    };

    console.log("data", dataSurat);

    return (
        <>
            {dataSurat.map((value) => (
                <div className="template" key={value}>
                    <button className="print-button" onClick={() => window.print()}>Cetak</button>
                    <div className="header">
                        <h4>PENERIMAAN PESERTA DIDIK BARU(PPDB)</h4>
                        <h4><strong>TK Tunas Talenta Tanjung Tobaku</strong></h4>
                        <div style={{ marginBottom: '2px' }} className="hr2" />
                        <div className="hr1" />
                    </div>
                    <div className="">
                        <div>
                            <div>
                                <h5>IDENTITAS</h5>
                                <section className="d-flex flex-direction-coloumn" style={{ paddingLeft: '30px' }}>
                                    <span>
                                        <p>1. Nama Lengkap</p>
                                        <p>2. Jenis Kelamin</p>
                                        <p>4. NIK</p>
                                        <p>5. Tempat Lahir</p>
                                        <p>6. Tanggal Lahir</p>
                                        <p>7. Agama</p>
                                        <p>8. Kewarganegaraan</p>
                                        <p>9. Alamat Lengkap</p>
                                        <p>10. Tinggal Bersama</p>
                                        <p>11. Anak Ke</p>
                                        <p>12. Usia</p>
                                        <p>13. No HP</p>
                                    </span>
                                    <span style={{ paddingLeft: '120px' }}>
                                        <p>: {value.nama_lengkap} </p>
                                        <p>: {value.jenis_kelamin} </p>
                                        <p>: {value.nik} </p>
                                        <p>: {value.tempat_lahir}</p>
                                        <p>: {value.tanggal_lahir}</p>
                                        <p>: {value.agama}</p>
                                        <p>: {value.kewarganegaraan}</p>
                                        <p>: {value.alamat} </p>
                                        <p>: {value.tinggalBersama} </p>
                                        <p>: {value.anakKe} </p>
                                        <p>: {value.usia} </p>
                                        <p>: {value.no_hp} </p>
                                    </span>
                                </section>
                                <h5>ORANG TUA</h5>
                                <section className="d-flex flex-direction-coloumn" style={{ paddingLeft: '30px' }}>
                                    <span>
                                        <b>Ayah</b>
                                        <p>Nama Ayah</p>
                                        <p>NIK</p>
                                        <p>Tahun Lahir</p>
                                        <p>Pendidikan</p>
                                        <p>Pekerjaan</p>
                                        <b>Ibu</b>
                                        <p>Nama Ibu</p>
                                        <p>NIK</p>
                                        <p>Tahun Lahir</p>
                                        <p>Pendidikan</p>
                                        <p>Pekerjaan</p>
                                    </span>
                                    <span style={{ paddingLeft: '120px' }}>
                                        <b className="invisible">Ayah</b>
                                        <p>: {value.nama_ayah} </p>
                                        <p>: {value.nik_ayah} </p>
                                        <p>: {value.tahun_lahir} </p>
                                        <p>: {value.pendidikan}</p>
                                        <p>: {value.pekerjaan}</p>
                                        <b className="invisible">Ibu</b>
                                        <p>: {value.nama_ibu} </p>
                                        <p>: {value.nik_ibu} </p>
                                        <p>: {value.tahun_lahir_ibu} </p>
                                        <p>: {value.pendidikan_ibu}</p>
                                        <p>: {value.pekerjaan_ibu}</p>
                                    </span>
                                </section>
                                <h5>PERIODIK</h5>
                                <section className="d-flex flex-direction-coloumn" style={{ paddingLeft: '30px' }}>
                                    <span>
                                        <p>Tinggi Badan</p>
                                        <p>Berat Badan</p>
                                        <p>Jarak Tempuh</p>
                                        <p>Jumlah Saudara</p>
                                    </span>
                                    <span style={{ paddingLeft: '120px' }}>
                                        <p>: {value.tb} </p>
                                        <p>: {value.bb} </p>
                                        <p>: {value.jarak_tempuh} </p>
                                        <p>: {value.saudara}</p>
                                    </span>
                                </section>
                                <h5>REGISTER</h5>
                                <section className="d-flex flex-direction-coloumn" style={{ paddingLeft: '30px' }}>
                                    <span>
                                        <p>Jenis Pendaftaran</p>
                                        <p>Tanggal Masuk Sekolah</p>
                                        <p>NO Induk Siswa</p>
                                        <p>Masuk Rombel</p>
                                    </span>
                                    <span style={{ paddingLeft: '120px' }}>
                                        <p>: {value.jenis_pendaftaran} </p>
                                        <p>: {value.tanggal_masuk} </p>
                                        <p>: {value.nis} </p>
                                        <p>: {value.rombel} </p>
                                        <div className="d-flex footer">
                            <section>
                                <p>Orang Tua Siswa</p>
                                <p>.................</p>
                            </section>
                            <section>
                                <p>Orang Tua Siswa</p>
                                <p>.................</p>
                            </section>
                        </div>
                                    </span>
                                </section>
                            </div>
                        </div>
                        {/* <div className="d-flex footer">
                            <section>
                                <p>Orang Tua Siswa</p>
                                <p>.................</p>
                            </section>
                            <section>
                                <p>Orang Tua Siswa</p>
                                <p>.................</p>
                            </section>
                        </div> */}
                    </div>
                </div>
            ))}
        </>
    )
}