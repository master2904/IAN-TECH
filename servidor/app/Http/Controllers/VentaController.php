<?php

namespace App\Http\Controllers;

use App\Models\Venta;
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
}
