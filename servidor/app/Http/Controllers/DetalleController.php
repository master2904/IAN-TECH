<?php
namespace App\Http\Controllers;
use App\Models\Detalle;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use stdClass;

class DetalleController extends Controller
{
    public function index()
    {
        $lista=Detalle::get();
        return response()->json($lista,200);
        
    }
    public function store(Request $request)
    {
        Detalle::create($request->all());
        return $this->index();
    }
    
    public function show($id)
    {
        return response()->json(Detalle::find($id));
    }
    public function update(Request $request, $id)
    {
        $problema=Detalle::find($id);
        if (!$problema) 
            return response()->json("Este producto no existe",400);
        $problema->update($request->all());
        return $this->index();
    }
    public function eliminar ($id,$id_p)
    {
        Detalle::find($id)->delete();
        return $this->index();
    }
    
    public function destroy($id)
    {
        $lista = Detalle::find($id);
        $lista->delete();
        return $this->index();
    }
    
}
