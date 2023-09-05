<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Categoria;

class Equipo extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_venta',
        'id_producto',
        'cantidad',
        'precio',
        'total',
    ];   
}
