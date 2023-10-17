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
            $table->string('imagen')->nullable();
            $table->float('precio_compra');
            $table->float('precio_tienda');
            $table->float('precio_final');
            $table->integer('cantidad');
            $table->integer('id_detalle')->nullable();
            $table->integer('relacion')->nullable();
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
