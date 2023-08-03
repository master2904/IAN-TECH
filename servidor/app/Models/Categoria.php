<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'titulo',
        'descripcion',
    ];
    public function concurso(){
        return $this->belongsTo(Concurso::class);
    }
}
