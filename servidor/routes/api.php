<?php

use App\Http\Controllers\LaboratorioController;
use App\Http\Controllers\MaquinaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ColegioController;
use App\Http\Controllers\ConcursoController;
use App\Http\Controllers\DetalleController;
use App\Http\Controllers\ProblemaController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\EquipoController;
use App\Http\Controllers\TipoController;
<<<<<<< HEAD
use App\Http\Controllers\VentaController;
=======

>>>>>>> main
Route::apiResource('/cliente', 'App\Http\Controllers\ClienteController');
Route::apiResource('/detalle', 'App\Http\Controllers\DetalleController');
Route::apiResource('/producto', 'App\Http\Controllers\ProductController');
Route::apiResource('/proveedor', 'App\Http\Controllers\VendorController');
Route::apiResource('/usuario', 'App\Http\Controllers\UsuarioController');
Route::apiResource('/venta', 'App\Http\Controllers\VentaController');
Route::apiResource('/tipo', 'App\Http\Controllers\TipoController');
Route::Resource('/concurso', 'App\Http\Controllers\ConcursoController');
Route::Resource('/categoria', 'App\Http\Controllers\CategoriaController');
Route::apiResource('/maquina', 'App\Http\Controllers\MaquinaController');
Route::apiResource('/problema', 'App\Http\Controllers\ProblemaController');
Route::get('/producto/lista/{id}', [ProductController::class,'listado']);
Route::get('/producto/pc/{id}', [ProductController::class,'pc']);
Route::get('/producto/otros/{id}', [ProductController::class,'otros']);
Route::get('/tipo/lista/{id}', [TipoController::class,'listar']);
Route::post('/detalle/delete', [DetalleController::class,'delete']);
Route::get('/equipo/buscar/{id}',[EquipoController::class,'buscar']);
Route::put('/equipo/rango/{id}',[EquipoController::class,'rango']);
Route::get('/venta/fecha/{fecha}',[VentaController::class,'fecha']);
Route::delete('/problema/eliminar/{id}/{n}',[ProblemaController::class,'eliminar']);
Route::delete('/equipo/eliminar/{id}/{n}',[EquipoController::class,'eliminar']);
Route::get('/categoria/buscar/{id}',[CategoriaController::class,'buscar']);
Route::get('/categoria/maxima/{id}',[CategoriaController::class,'buscar']);
Route::get('/maquina/buscar/{id}',[MaquinaController::class,'buscar']);
Route::post('/maquina/conjunto/',[MaquinaController::class,'gen erar']);
Route::post('/maquina/baja',[MaquinaController::class,'baja']);
Route::post('/maquina/rango',[MaquinaController::class,'rango']);
Route::delete('/maquina/alta/{id}',[MaquinaController::class,'alta']);
Route::get('/maquina/listado/{id}/{idl}',[MaquinaController::class,'inhabilitados']);
// Route::post('/laboratorio/imagen', [LaboratorioController::class,'subirarchivo']);
Route::get('/colegio/lista',[ColegioController::class,'esto']);
Route::get('/colegio/rcategoria/{id}',[ColegioController::class,'rep_categoria']);
Route::get('/colegio/equipos/{id}',[ColegioController::class,'rep_equipos']);
Route::get('/colegio/rconcurso/{id}',[ColegioController::class,'rep_concurso']);
Route::get('/colegio/ganadores/{id}',[ColegioController::class,'rep_ganadores']);
Route::get('/concurso/activo/{id}',[ConcursoController::class,'activo']);
Route::get('/equipo/concurso/{id}', [EquipoController::class,'listar_concurso']);
Route::get('/equipo/script/{id}', [EquipoController::class,'listar_script']);
Route::get('/equipo/categoria/{id}', [EquipoController::class,'listar_concurso_categorias']);
Route::get('/equipo/score/{id}', [EquipoController::class,'score']);
Route::put('/equipo/finalizar/{id}', [EquipoController::class,'finalizar']);
Route::get('/equipo/colegio/{id}', [EquipoController::class,'colegio']);
Route::post('/equipo/lista', [EquipoController::class,'importar']);
Route::post('/laboratorio/imagen', [LaboratorioController::class,'imageUpload']);
Route::post('/usuario/imagen', [UsuarioController::class,'imageUpload']);
Route::post('/producto/imagen', [ProductController::class,'imageUpload']);
Route::get('/producto/detalle/{id}', [ProductController::class,'listado']);

Route::get('/usuario/descargar/{master}',[UsuarioController::class,'image']);
Route::post('/login', [UsuarioController::class,'authenticate']);
// Route::get("usuario/imagen/{nombre}",[UsuarioController::class,'descargar']);
Route::get("usuario/imagen/{imagen}",[UsuarioController::class,'image']);
Route::get("producto/imagen/{imagen}",[ProductController::class,'image']);
Route::get("laboratorio/imagen/{imagen}",[LaboratorioController::class,'image']);
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::post('user','App\Http\Controllers\UsuarioController@getAuthenticatedUser');
});
Route::group(['middleware' => ['cors']], function () {
});