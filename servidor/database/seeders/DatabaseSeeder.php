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
			'imagen'=>'202392143029.jpeg',
			'celular'=>'123123',
			'password' => Hash::make('grover123456')
		));
		Detalle::create(array(
			'descripcion'=>'Mano de Obra',
        	'tipo'=>'0',
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
		Detalle::create(array(
			'descripcion'=>'Gravador',
        	'tipo'=>'10',
		));
		Detalle::create(array(
			'descripcion'=>'Disco Duro',
        	'tipo'=>'11',
		));
		Detalle::create(array(
			'descripcion'=>'Balum Video',
        	'tipo'=>'12',
		));
		Detalle::create(array(
			'descripcion'=>'Plug Energia',
        	'tipo'=>'13',
		));
		Detalle::create(array(
			'descripcion'=>'Fuente',
        	'tipo'=>'14',
		));
		Detalle::create(array(
			'descripcion'=>'Cajas',
        	'tipo'=>'15',
		));
		Detalle::create(array(
			'descripcion'=>'Cable de Red',
        	'tipo'=>'16',
		));
		Detalle::create(array(
			'descripcion'=>'Monitor',
        	'tipo'=>'17',
		));
		Product::create(array(
			'codigo'=>'000',
			'detalle'=>'Mano de Obra',
			'marca'=>'',
			'precio_compra'=>'0',
			'precio_tienda'=>'20',
			'precio_final'=>'20',
			'cantidad'=>'1',
			'imagen'=>'',
			'id_detalle'=>'0',
			'relacion'=>'0'
		));
    }
}
