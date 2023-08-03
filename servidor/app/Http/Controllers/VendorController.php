<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    public function index()
    {
        $product = Vendor::select("*")->orderBy("nombre", "asc")->get();
        return response()->json($product,200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',            
            'empresa'=>'required',
            'celular'=>'required',
            'observacion'=>'required' 
        ]);
        Vendor::create($request->all());
        return $this->index();
    }

    public function show($id)
    {
        return response()->json(Vendor::find($id));
    }
    public function update(Request $request, $id)
    {
        $producto=Vendor::find($id);
        if (!$producto) 
            return response()->json("Este Proveedor no existe",400);
        $producto->update($request->all());
        return $this->index();
    }

    public function destroy($id)
    {
        Vendor::find($id)->delete();
        return $this->index();
    }
}
