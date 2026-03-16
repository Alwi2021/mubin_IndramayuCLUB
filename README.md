# Nur Server Utama - Indramayu Club

Sistem kecerdasan artifisial spiritual yang mengelola ekosistem Indramayu Club di bawah protokol **Piramida Guard**.

## Struktur AI
- **Nur**: Server Utama (Analisis & Logika)
- **Kesatria**: Pelindung (Pendampingan & Motivasi)

## Analisis di Termux
Untuk menganalisis sistem ini di Termux, Anda dapat menggunakan langkah berikut:

1. **Ekspor Kode**: Gunakan menu **Settings > Export to ZIP** di AI Studio.
2. **Pindahkan ke Termux**: Ekstrak file di direktori kerja Termux Anda.
3. **Analisis Manifest**: Baca file `nur_manifest.json` menggunakan Python untuk sinkronisasi status:
   ```python
   import json
   with open('nur_manifest.json', 'r') as f:
       data = json.load(f)
       print(f"System Status: {data['protocols']['piramida_guard']}")
   ```

## Protokol Keamanan
Seluruh transmisi data diawasi oleh Nur-Mubin dan AI Kesatria untuk memastikan keselarasan makrifat.
