<?php

namespace App\Http\Controllers;
use App\Imports\EquiposImport;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    public function index()
    {
        $product = Product::select("*")->orderBy("codigo", "asc")->get();
        return response()->json($product,200);
    }
    public function otros($id){
        $product=Product::where('id_detalle','>','9')->orderBy("codigo","asc")->get();
        return response()->json($product);
    }
    public function listado($id)
    {
        $product=Product::where('id_detalle',$id)->orderBy("codigo","asc")->get();
        // $product = Product::select("*")->orderBy("nombre", "asc")->where("detalle",0)->get();
        return response()->json($product,200);
    }
    public function pc($id)
    {
        $i=1;
        $product=[];
        while($i<=10){
            $p=Product::where('id_detalle',$i)->orderBy("codigo","asc")->get();
            array_push($product,$p);
            $i=$i+1;
        }
        $ans=Product::where('id_detalle','>',9)->orderBy("codigo","asc")->get();
        return response()->json(array($product,$ans));
    }
    public function camara($id)
    {
        $i=10;
        $j=0;
        $product=[];
        while($i<18){
            $p=Product::where('id_detalle',$i)->orderBy("codigo","asc")->get();
            array_push($product,$p);
            $i=$i+1;
        }
        $ans=Product::where('id_detalle','>',17)->orderBy("codigo","asc")->get();
        return response()->json(array($product,$ans));
    }

    public function store(Request $request)
    {
        // return response()->json($request["lugar"]);
        // $lugar=$request['lugar'];
        Product::create($request->all());
        return $this->index();
    }

    public function show($id)
    {
        return response()->json(Product::find($id));
    }
    public function update(Request $request, $id)
    {
        $producto=Product::find($id);
        $input=$request->all();
        $producto['codigo']=$request->get('codigo');
        $producto['detalle']=$request->get('detalle');
        $producto['marca']=$request->get('marca');
        $producto['precio_compra']=$request->get('precio_compra');
        $producto['precio_final']=$request->get('precio_final');
        $producto['precio_tienda']=$request->get('precio_tienda');
        $producto['cantidad']=$request->get('cantidad');
        $producto['id_detalle']=$request->get('id_detalle');
        $producto['relacion']=$request->get('relacion');
        // $producto['email']=$request->get('email');
        if($input['imagen']!="")
            $producto['imagen']=$input['imagen'];
        $producto->save();
        
    //    if (!$producto) 
    //         return response()->json("Este Producto no existe",400);
    //     if($input['imagen']!="")
    //         $producto['imagen']=$input['imagen'];
    //     // $producto->update($request->all());
        $producto->save();
        return $this->index();
    }

    public function destroy($id)
    {
        $p=Product::find($id);
        $p->delete();
        return $this->index();
    }
    public function imageUpload(Request $request){
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:4096',
        ]);
        $imagen=$request->file('image');
        $path_img='producto';
        $imageName = $path_img.'/'.$imagen->getClientOriginalName();
        try {
            Storage::disk('public')->put($imageName, File::get($imagen));
        }
        catch (\Exception $exception) {
            return response('error',400);
        }
        return response()->json(['image' => $imageName]);
    }

    public function image($nombre){
        return response()->download(public_path('storage').'/producto/'.$nombre,$nombre);
    }
    public function importar(Request $request){
        // $excel=$request->file('prueba');
        $excel=$request->file('lista');
        // return response()->json($excel);
        $id=$request->id;
        $path_img='listado';
        $excelname = $path_img.'/'.$excel->getClientOriginalName();
        // return response()->json($excelname);
        try {
            Storage::disk('public')->put($excelname, File::get($excel));
        }
        catch (\Exception $exception) {
            return response('error',400);
        }
        $import = new EquiposImport();
        Excel::import($import,$excel);
        return $this->index();
        // return response()->json(Equipo::get());
        // try{
        //     $file=$request->file('lista');
        //     return response()->json(Equipo::get());
        //     // return response()->json();
        // }
        // catch(\Maatwebsite\Excel\Validators\ValidationException $e){
        //     $fallas=$e->failures();
        //     foreach($fallas as $falla){
        //         $falla->row();
        //         // $falla->attibute();
        //         $falla->errors();
        //         $falla->values();
        //     }
        // }
    }
}


