<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('codigo');
            $table->string('detalle');
            $table->string('marca');
            $table->string('imagen');
            $table->float('precio_compra');
            $table->float('precio_venta');
            $table->integer('cantidad');
            $table->integer('id_detalle');
            $table->integer('relacion');
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
