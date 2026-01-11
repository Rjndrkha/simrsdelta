<!DOCTYPE html>
<html>

<head>
    <title>Resi Pembayaran Obat</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
        }

        .info {
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 8px;
            border: 1px solid #ddd;
            text-align: left;
        }

        .total {
            text-align: right;
            font-weight: bold;
            font-size: 14px;
            margin-top: 10px;
        }

        .footer {
            margin-top: 30px;
            text-align: right;
        }
    </style>
</head>

<body>
    <div class="header">
        <h2>RS DELTA SURYA</h2>
        <p>Jl. Pahlawan No. 9, Sidoarjo - Telp: (031) 8962531</p>
    </div>

    <div class="info">
        <p><strong>No. Resep:</strong> {{ $prescription->id }}</p>
        <p><strong>Pasien:</strong> {{ $prescription->examination->patient->name }}</p>
        <p><strong>Dokter:</strong> {{ $prescription->examination->doctor->name }}</p>
        <p><strong>Tanggal:</strong> {{ $prescription->created_at->format('d/m/Y H:i') }}</p>
    </div>

    <table>
        <thead>
            <tr style="background: #f4f4f4;">
                <th>Nama Obat</th>
                <th>Qty</th>
                <th>Harga Satuan</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($prescription->items as $item)
            <tr>
                <td>{{ $item->medicine_name }}<br><small><i>{{ $item->instruction }}</i></small></td>
                <td>{{ $item->quantity }}</td>
                <td>Rp {{ number_format($item->unit_price, 0, ',', '.') }}</td>
                <td>Rp {{ number_format($item->unit_price * $item->quantity, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total">
        TOTAL BAYAR: Rp {{ number_format($prescription->total_price, 0, ',', '.') }}
    </div>

    <div class="footer">
        <p>Apoteker,</p>
        <br><br>
        <p><strong>{{ $prescription->pharmacist->name ?? 'Staf Apotek' }}</strong></p>
    </div>
</body>

</html>
