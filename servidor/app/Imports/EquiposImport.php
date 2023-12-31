<?php

namespace App\Imports;

use App\Models\Equipo;
use App\Models\Product;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Support\Collection;

class EquiposImport implements ToModel, WithHeadingRow, WithValidation, WithBatchInserts,WithChunkReading, ToCollection
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Equipo([
            'nombre'=> $row['nombre'],
            'id_colegio'=> $row['colegio'],
            'cuenta'=> $row['cuenta'],
            'clave'=> $row['clave'],
            'id_categoria'=> $row['categoria'],
            'posicion'=> $row['posicion']
        ]);
    }
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $detail = Product::find($row['id']);
            $detail->field_to_update = $row['value_from_excel'];
            $detail->save();
        }
    }
    public function rules():array
    {
        return [
            'nombre'=> 'required',
            'colegio'=> 'required',
            'categoria'=> 'required'
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
