<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Concurso;
use App\Models\Colegio;
use App\Models\Detalle;
use App\Models\Problema;
use App\Models\Product;
use App\Models\User;
use App\Models\Tipo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //\App\Models\User::factory(10)->create();
        DB::table('users')->delete();
		User::create(array(
			'rol' => 1,
			'nombre' => 'Joel',
			'apellido' => 'Gonzales Aguilar',
			'username' => 'master',
			'imagen'=>'20233721535.jpg',
			'celular'=>'76154702',
			'password' => Hash::make('master123456')
		));
		User::create(array(
			'rol' => 1,
			'nombre' => 'Grover',
			'apellido' => 'Chambi Gamata',
			'username' => 'grover',
			'imagen'=>'202337215252.jpg',
			'celular'=>'123123',
			'password' => Hash::make('grover123456')
		));
		Detalle::create(array(
			'descripcion'=>'Procesador',
        	'tipo'=>'1',
		));
		Detalle::create(array(
			'descripcion'=>'Placa',
        	'tipo'=>'2',
		));
		Detalle::create(array(
			'descripcion'=>'Memoria RAM',
        	'tipo'=>'3',
		));
		Detalle::create(array(
			'descripcion'=>'Targeta de Video',
        	'tipo'=>'4',
		));
		Detalle::create(array(
			'descripcion'=>'Disco Duro HHD',
        	'tipo'=>'5',
		));
		Detalle::create(array(
			'descripcion'=>'Disco Solido SSD',
        	'tipo'=>'6',
		));
		Detalle::create(array(
			'descripcion'=>'Case',
        	'tipo'=>'7',
		));
		Detalle::create(array(
			'descripcion'=>'Monitor',
        	'tipo'=>'8',
		));
		Detalle::create(array(
			'descripcion'=>'Fuente de Energia',
        	'tipo'=>'9',
		));
		
		Product::create(array(
			'codigo'=>'001',
			'detalle'=>'core i5 11va',
			'marca'=>'Intel',
			'precio_compra'=>'800',
			'precio_venta'=>'900',
			'cantidad'=>'5',
			'id_detalle'=>'1'
		));
		Product::create(array(
			'codigo'=>'002',
			'detalle'=>'Ryzen 5',
			'marca'=>'AMD',
			'precio_compra'=>'700',
			'precio_venta'=>'750',
			'cantidad'=>'5',
			'id_detalle'=>'1'
		));		
    }
}
