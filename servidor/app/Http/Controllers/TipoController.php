<?php

namespace App\Http\Controllers;

use App\Models\Tipo;
use Illuminate\Http\Request;

class TipoController extends Controller
{
    public function index()
    {
        $lista=Tipo::get();
        return response()->json($lista,200);
        
    }
    public function listar($id){
        $lista=Tipo::where('id_producto',$id)->get();
        return response()->json($lista);
    }
    public function store(Request $request)
    {
        $id_producto=$request['id_producto'];
        Tipo::create($request->all());
        return $this->listar($id_producto);
    }
    
    public function show($id)
    {
        return response()->json(Tipo::find($id));
    }
    public function update(Request $request, $id)
    {
        $tipo=Tipo::find($id);
        if (!$tipo) 
            return response()->json("Esta Categoria no existe",400);
        $tipo->update($request->all());
        return $this->listar($request->input('id_producto'));
    }
    public function eliminar ($id,$id_p)
    {
        Tipo::find($id)->delete();
        return $this->listar($id_p);
    }
    
    // public function delete($id)
    public function destroy($id)
    {
        $lista = Tipo::find($id);
        // return response()->json($lista);
        $valor=$lista->id_producto;
        $lista->delete();
        return $this->listar($valor);
    }   
}
