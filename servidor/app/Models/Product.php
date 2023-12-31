<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'codigo',
        'detalle',
        'marca',
        'precio_compra',
        'precio_venta',
        'cantidad',
        'id_detalle',
        'relacion',
        'imagen'
    ];  
}
