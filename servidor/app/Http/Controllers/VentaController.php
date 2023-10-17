<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use App\Models\User;
use App\Models\Equipo;
use App\Models\Cliente;
use App\Models\Product;
use Facade\FlareClient\Http\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use stdClass;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

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
    // public function factura($id){
    //     // $ans=DB::select('select from equipos e,ventas v,');
    // }
    public function r_meses($g){
        // $a=Venta::whereYear('fecha', $g);
        $x=[];
        for($i=1;$i<13;$i++){
            // $v=Venta::whereYear('fecha', $g)->whereMonth('fecha',$i)->get();
            $consulta=DB::select('SELECT concat(d.descripcion," ",p.detalle) as nombre, count(d.id) as valor from ventas v,equipos e, detalles d, products p WHERE d.id=p.id_detalle and e.id_producto=p.id and e.id_venta=v.id and month(v.fecha)=:mes GROUP by d.id,p.detalle,d.descripcion',['mes'=> $i]);
            // $consulta=DB::select('SELECT c.nombre as "colegio",c.color,e.nombre,count(de.id_equipo) as valor from colegios c, equipos e, detalles de,categorias ca where c.codigo=e.id_colegio and e.id_categoria=ca.id and ca.id_concurso=:id and e.id=de.id_equipo GROUP BY e.id,c.nombre,c.color,e.nombre',['id'=>$id]);

            array_push($x,$consulta);
        }
        return response()->json($x);
    }

    public function store(Request $request)
    {
        // return response()->json($request);
        $venta=$request->datos;
        $historiales=$request->productos; 
        $r = new Request(array(
            'id' =>$venta['id'],
            'id_cliente'=>$venta['id_cliente'],
            'id_usuario'=>$venta['id_usuario'],
            'fecha'=>$venta['fecha'],
            'monto'=>$venta['monto'],
            'total'=>$venta['total'],
        ));
        $r=Venta::create($r->all());
        foreach($historiales as $his){
            // if($his->id_producto==0){
            if($his['id_producto']==0){
                $rt=Product::find($his['id_producto']);
                $rt->precio_final=$his['precio'];
                $rt->precio_tienda=$his['precio'];
                $rt->save();        
                // return response()->json($r);
            }
            else{
                $rt=Product::find($his['id_producto']);
                $rt->cantidad=$rt->cantidad-$his['cantidad'];
                $rt->save();
            }
            $ans = new Request(array(
                'id' =>'0', 
                'id_venta' =>$r->id, 
                'id_producto' =>$his['id_producto'], 
                'cantidad' =>$his['cantidad'], 
                'precio' =>$his['precio'], 
                'total' =>$his['total']
            ));
            Equipo::create($ans->all());
            // return response()->json($ans);
        }
        $listado=Venta::where('id',$r->id)->get();
        $historial=[];
            $ans=$listado[0];
            $listado[0]->id_usuario=User::find($ans->id_usuario)->username;
            $listado[0]->nit=Cliente::find($ans->id_cliente)->nit;
            $listado[0]->nombre=Cliente::find($ans->id_cliente)->nombre;
            // $listado[0]->total_venta=Equipo::where('id_venta',$ans->id)->sum('sub_total_venta');
            // $listado[0]->total_compra=Equipo::where('id_venta',$ans->id)->sum('sub_total_compra');
            $historial[0]=Equipo::where('id_venta',$ans->id)->get();
            $historial=$historial[0];
            $c=0;
            while(isset($historial[$c])){
                $res=$historial[$c];
                $consulta=DB::select('SELECT concat(d.descripcion," ",p.detalle) as descripcion FROM products p,detalles d WHERE d.id=p.id_detalle and p.id=:id',['id'=> $res->id_producto]);
                $historial[$c]->id_producto=$consulta[0]->descripcion;
                $c=$c+1;
            }                    
            return response()->json(array($listado[0],$historial));
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
