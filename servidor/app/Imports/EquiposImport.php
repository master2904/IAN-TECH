<?php

namespace App\Imports;

// use App\Models\Equipo;
use App\Models\Product;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Support\Collection;

class EquiposImport implements ToModel, WithHeadingRow, WithValidation, WithBatchInserts,WithChunkReading
// , ToCollection
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    // 'id',
    //     'codigo',
    //     'detalle',
    //     'marca',
    //     'precio_compra',
    //     'precio_final',
    //     'precio_tienda',
    //     'cantidad',
    //     'id_detalle',
    //     'relacion',
    //     'imagen'
    public function model(array $row)
    {
        return new Product([
            'codigo'=> $row['codigo'],
            'detalle'=> $row['etiqueta'],
            'precio_compra'=> $row['compra'],
            'cantidad'=> $row['cantidad'],
            'id_detalle'=> $row['categoria'],
            'relacion'=> $row['relacion'],
            'precio_final'=> $row['final'],
            'precio_tienda'=> $row['tienda'],
            'marca'=> $row['marca'],
            'imagen'=> $row['imagen']
        ]);
    }
    // public function collection(Collection $rows)
    // {
    //     foreach ($rows as $row) {
    //         $detail = Product::find($row['id']);
    //         $detail->field_to_update = $row['value_from_excel'];
    //         $detail->save();
    //     }
    // }
    public function rules():array
    {
        return [
            // 'nombre'=> 'required',
            // 'colegio'=> 'required',
            // 'codigo'=> 'required'
        ];
    }
    public function batchSize(): int
    {
        return 1000;
    }
    public function chunkSize(): int
    {
        return 100;
    }
}
