<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use App\Models\User;
use App\Models\Equipo;
use App\Models\Cliente;
use App\Models\Product;
use Illuminate\Http\Request;

class VentaController extends Controller
{
    public function index()
    {
        $lista=Venta::get();
        return response()->json($lista,200);
        
    }
    public function listar_cliente($id_cliente){
        $lista=Venta::where('id_cliente',$id_cliente)->get();
        return response()->json($lista);
    }
    public function store(Request $request)
    {
        Venta::create($request->all());
        return $this->index();
    }
    
    public function show($id)
    {
        return response()->json(Venta::find($id));
    }
    public function update(Request $request, $id)
    {
        $problema=Venta::find($id);
        if (!$problema) 
            return response()->json("Este producto no existe",400);
        $problema->update($request->all());
        return $this->listar($request->input('id_product'));
    }
    public function eliminar ($id,$id_p)
    {
        Venta::find($id)->delete();
        return $this->listar($id_p);
    }
    
    public function delete($id)
    {
        $lista = Venta::find($id);
        $valor=$lista->id_prodcut;
        $lista->delete();
        return $this->listar($valor);
    }    
    public function fecha($request){
        $listado=Venta::where('fecha',$request)->get();
        $i=0;
        $historial=[];
        $transacciones=[];
        while(isset($listado[$i])){
            $ans=$listado[$i];
            $listado[$i]->id_usuario=User::find($ans->id_usuario)->username;
            $listado[$i]->id_cliente=Cliente::find($ans->id_cliente)->nombre;
            $historial[$i]=Equipo::where('id_venta',$ans->id)->get();
            $c=0;
            while(isset($historial[$i][$c])){
                $res=$historial[$i][$c];
                $historial[$i][$c]->id_producto=Product::find($res->id_producto)->detalle;
                // return response()->json(array($res));
                $c=$c+1;
            }            
            $i=$i+1;
        }
        return response()->json(array($listado,$historial));
    }
}
