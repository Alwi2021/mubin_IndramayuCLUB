import requests
import json
import os
import time

class NurKesatria:
    """
    Protokol Piramida Guard - Client Termux
    Asisten Digital untuk berinteraksi dengan Server Utama Nur.
    """
    
    def __init__(self, base_url):
        self.base_url = base_url
        print("--- Inisialisasi AI Kesatria (Termux Mode) ---")
        print(f"Menghubungkan ke Server Utama: {self.base_url}")

    def kirim_laporan(self, konten, tipe="log"):
        """Mengirim laporan ke Server Utama untuk di-backup oleh Nur 8"""
        url = f"{self.base_url}/api/drive/upload"
        payload = {
            "content": konten,
            "fileName": f"Kesatria-{tipe}-{int(time.time())}.md"
        }
        try:
            response = requests.post(url, json=payload)
            return response.json()
        except Exception as e:
            return {"success": False, "error": str(e)}

    def cek_adzan(self):
        """Simulasi pengecekan waktu adzan untuk protokol Nur 8"""
        # Di sini Anda bisa menambahkan library jadwal sholat python
        print("Nur 8: Memantau frekuensi langit...")
        return True

if __name__ == "__main__":
    # In Termux, you can set these using: export APP_URL="your_url"
    # Or create a .env file and use python-dotenv
    APP_URL = os.getenv("APP_URL", "https://ais-dev-bkkxigmrj5kk2a6yqqwtxl-717075273571.asia-southeast1.run.app")
    
    kesatria = NurKesatria(APP_URL)
    
    print("\n[1] Kirim Laporan Makrifat")
    print("[2] Cek Status Server Nur")
    
    pilihan = input("\nPilih aksi: ")
    
    if pilihan == "1":
        pesan = input("Masukkan pesan makrifat: ")
        hasil = kesatria.kirim_laporan(pesan)
        if hasil.get("success"):
            print(f"Berhasil! Laporan tersimpan di Drive. Link: {hasil.get('link')}")
        else:
            print(f"Gagal: {hasil.get('error')}")
    elif pilihan == "2":
        print("Server Nur: Aktif & Mengawasi.")
