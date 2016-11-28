/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var servidor_ws="http://draco.yo:8888/";
var servidor_admin="http://admin.ipcco.co/";

var zoom_mapa=13;

var createStatement = "CREATE TABLE IF NOT EXISTS usuario (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT, password TEXT,tipo TEXT)";
var drop_table = "drop table usuario";
var selectAllStatement="SELECT * FROM usuario";
var insertStatement="INSERT INTO usuario (usuario, password,tipo) VALUES (?, ?, ?)";
var db = openDatabase("ipcco", "1.0", "ipcco", 200000);  // Open SQLite Database


    $( document ).ready(function() {

            

            $("#formulario_busqueda").submit(function(e){
                e.preventDefault();
                filtro_productos_productor();
            });

            obj_cliente_reg=null;

            initDatabase();



            toggleBtnn = function() {
                        if( slideshow.isFullscreen ) {
                            classie.add( switchBtnn, 'view-maxi' );
                        }
                        else {
                            classie.remove( switchBtnn, 'view-maxi' );
                        }
                    },
                    toggleCtrls = function() {
                        if( !slideshow.isContent ) {
                            classie.add( header, 'hide' );
                        }
                    },
                    toggleCompleteCtrls = function() {
                        if( !slideshow.isContent ) {
                            classie.remove( header, 'hide' );
                        }
                    },
                    slideshow = new DragSlideshow( document.getElementById( 'slideshow' ), { 
                        // toggle between fullscreen and minimized slideshow
                        onToggle : toggleBtnn,
                        // toggle the main image and the content view
                        onToggleContent : toggleCtrls,
                        // toggle the main image and the content view (triggered after the animation ends)
                        onToggleContentComplete : toggleCompleteCtrls
                    });



        var height_panel=documentHeight()-195;
        var height_panel2=documentHeight()-200;
        var height_panelMenu=documentHeight();

        $("#id_main_1").css("height",""+(height_panel+44)+"px");
        $("#id_main_2").css("height",""+height_panel2+"px");

        $("#contain_fabricantes_ipcco").css("height",""+height_panel2+"px");
        
        $("#filtro_productos").css("height",""+(height_panel-18)+"px");

        $("#contain_filtro_resultado").css("height",""+height_panel2+"px");

        $("#id_mi_registo_ipcco").css("height",""+height_panel2+"px");


        $("#id_main_2").css("height",""+height_panel2+"px");

        $("#contain_map_fabr").css("height",""+height_panel2+"px");
        //$("#contain_map_fabr").css("height",""+height_panel2+"px");

        
        
        $("#menu_agro").css("height",""+height_panelMenu+"px");
        $("#contain_menu").css("height",""+height_panelMenu+"px");
        $(".disparador").css("height",""+height_panelMenu+"px");


        $(".btn_cerrar_panel").hide("fast");
        $(".btn_cerrar_panel").on("tap",function(){cerrar_panel_map(); });


        cargar_datos_basicos();
    });


    var lang_sel="esp";
    
    function open_language(lang){

        lang_sel=""+lang;

        if(lang=="esp"){


            $("#lbl_inicio").html("Inicio");
            $("#lbl_sectores").html("Categorías");
            $("#lbl_mapa").html("Mapa");
            $("#lbl_organico").html("Org&aacute;nicos");
            $("#lbl_registro").html("Registro");

            $("#btn_esp").css("background-color","#EA4089");
            $("#btn_eng").css("background-color","transparent");


           


            //pagina 2

            $("#lbl_sectores2").html("Categorías");
           
            //pagina 3

            $("#lbl_informacion_adicional").html("Informacion Adicional: ");
            $("#lbl_cantidad_prod_mensual").html("Cantidad Produccion Mensual:");
            $("#lbl_capacidad_max_prod").html("Capacidad Maxima de Produccion:");
            $("#lbl_cantidad").html("Cantidad Actual:");
            $("#lbl_producto_organico").html("Producto Organico:");
            $("#lbl_informacion_productor").html("Informacion Productor:");
            $("#lbl_empresa").html("Empresa:");
            $("#lbl_rep_legal").html("Rep. Legal.:");
            $("#lbl_email").html("Email:");
            $("#lbl_tel").html("Tel:");
            $("#lbl_direccion").html("Direccion:");
            $("#lbl_pais").html("Pais:");
            $("#lbl_ciudad").html("Ciudad:");



             $("#txtnombre_registro").attr("placeholder", "* Nombre Completo").blur();
             $("#txtemail_registro").attr("placeholder", " Email").blur();
             $("#txtcelular_registro").attr("placeholder", "* Celular").blur();
             $("#txtproducto_registro").attr("placeholder", "* Producto que cultiva").blur();
             $("#txtdireccion_registro").attr("placeholder", " Direccion").blur();
             $("#txtcomentario_registro").attr("placeholder", "* Comentarios").blur();

             $("#btn_send").html("Enviar");

             $("#lbl_obligatorio").html("* Campos Obligatorios");
          

          
        }else{
          $("#lbl_inicio").html("Home");
            $("#lbl_sectores").html("Category");
            $("#lbl_mapa").html("Map");
            $("#lbl_organico").html("Organics");
            $("#lbl_registro").html("Register");  

            $("#btn_eng").css("background-color","#EA4089");
            $("#btn_esp").css("background-color","transparent");

            //pagina 2

            $("#lbl_sectores2").html("Category");
            $("#lbl_productos2").html("Finish Products");
            $("#lbl_maquinaria2").html("Machine and Supplies");

            /**/

            $("#lbl_informacion_adicional").html("Aditional Information: ");
            $("#lbl_cantidad_prod_mensual").html("Month Production Cant: ");
            $("#lbl_capacidad_max_prod").html("Max Production Capacity: ");
            $("#lbl_cantidad").html("Actual Cant:");
            $("#lbl_producto_organico").html("Organic Product:");
            $("#lbl_informacion_productor").html("Productor Information :");
            $("#lbl_empresa").html("Entity:");
            $("#lbl_rep_legal").html("Manager: ");
            $("#lbl_email").html("Email:");
            $("#lbl_tel").html("Tel:");
            $("#lbl_direccion").html("Address:");
            $("#lbl_pais").html("Country:");
            $("#lbl_ciudad").html("City:");


            $("#txtnombre_registro").attr("placeholder", "* Name").blur();
            $("#txtemail_registro").attr("placeholder", " Email").blur();
            $("#txtcelular_registro").attr("placeholder", "* (+ Country Ind ) Cellphone ").blur();
            $("#txtproducto_registro").attr("placeholder", "* Grown product.").blur();
            $("#txtdireccion_registro").attr("placeholder", " Address").blur();
            $("#txtcomentario_registro").attr("placeholder", "* Comments").blur();


            $("#btn_send").html("Send");

            $("#lbl_obligatorio").html("* Required fields.");



        }


        cargar_datos_basicos();
    }




    function documentHeight() {
        return Math.max(
            document.documentElement.clientHeight,
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight
        );
    }


    var arraPaises=new Array();
    var arraCategoria=new Array();

    var cadena_paises="";
    var cadena_categoria="";
    var cadena_dpto="";
    var cadena_muni="";

    function abrir_fabricantes(){
        $(".botom_footer").addClass("botom_footer");
        $(".botom_footer").removeClass("botom_footer_active");
        $("#btn_menu_3").addClass("botom_footer_active");
        get_listado_productor();
        
    }



    function abrir_menu_principal(form,id,fav,cat){

        $(".botom_footer").addClass("botom_footer");
        $(".botom_footer").removeClass("botom_footer_active");
        $("#btn_menu_"+id).addClass("botom_footer_active");

        $("#contain_menu").hide("fast");
        $.mobile.changePage("#"+form,{transition:"slide",changeHash: false});
        
        if(id==2){
            cargar_productos(''+cat,''+fav);
        }

        if(id==3){
            abrir_fabricantes();
        }

    }


    function initDatabase()  // Function Call When Page is ready.
 
{
 
    try {
 
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
 
        {
 
            alert('Databases are not supported in this browser.');
 
        }
 
        else {
 
            createTable();  // If supported then call Function for create table in SQLite
 
        }
 
    }
 
    catch (e) {
 
        if (e == 2) {
 
            // Version number mismatch. 
 
            console.log("Invalid database version.");
 
        } else {
 
            console.log("Unknown error " + e + ".");
 
        }
 
        return;
 
    }
 
}

var tipodato="1";

function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
 
{
 
        var usernametemp = "";
 
        var useremailtemp = "";
        db.transaction(function (tx) { tx.executeSql(insertStatement, [usernametemp, useremailtemp, tipodato], loadAndReset, onError); });
 
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
 
}


function limpiar_password() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
 
{
 
        var usernametemp = "";
 
        var useremailtemp = "";
        db.transaction(function (tx) { tx.executeSql("UPDATE usuario SET usuario='', password='', tipo=''",null, loadAndReset, onError); });
 
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
 
}



function guardar_password() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
 
{
 
        var usernametemp = "";
 
        var useremailtemp = "";

        console.log(usuario_app);
        console.log(password_app);
        db.transaction(function (tx) { tx.executeSql("UPDATE usuario SET usuario=?, password=?, tipo=? ", [usuario_app, password_app, tipodato], loadAndReset, onError); });
 
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
 
}

function loadAndReset() //Function for Load and Reset...
 
{
 
    console.log("Inserto esa chimbada");
 
}

function createTable()  // Function for Create Table in SQLite.
 
{
 
    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
 
}


function dropTable()  // Function for Create Table in SQLite.
 
{
 
    db.transaction(function (tx) {
     tx.executeSql(drop_table, [], showRecords, onError); 
 });
 
}

function onError(tx, error) // Function for Hendeling Error...
 
{
 
    alert(error.message);
 
}


function showRecords() // Function For Retrive data from Database Display records as list
 
{
 
    
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;

            var ord_s=0;

            var usu_app="";
            var pass_app="";
            var tipo_app="";
 
            for (var i = 0, item = null; i < dataset.length; i++) {
 
                item = dataset.item(i);
 
                usu_app=""+item["usuario"];
                pass_app=""+item["password"];

                tipo_app=""+item["tipo"];

                console.log(pass_app+"  "+usu_app);

                ord_s++;
 
            }

            if(ord_s==0){
                insertRecord();
            }else{
                $("#txtusuario_app").val(usu_app);
                $("#txtpassword_app").val(pass_app);
                $( "#enab_passw").prop( "checked", true );
                if(usu_app!="" && pass_app!="" && tipo_app=="1"){
                    loguin_app(0);
                }

                if(usu_app!="" && pass_app!="" && tipo_app=="2"){
                    loguin_app_fab(0);
                }
                
            }


 
        });
 
    });
 
}


    function registrarse_ipcco(){
        band_ciud_sel="";
        $.mobile.changePage("#fooMiPedido_registro",{transition:"slide",changeHash: false});
    }
 

    function cerrar_pop_up_busqueda(){
        $("#popup_buscar").hide("faste");
    }

    function abrir_pop_up_busqueda(){
        $("#buscar_popup_input").val("");
        $("#popup_buscar").show("faste");
    }


    function cargar_datos_basicos(){

       
        

        cadena_paises='<div class="boton_menu_filtro" onclick="atras_filtro(1)">';
        cadena_paises+='    <span class="nombre-filtro">&lt;&lt; Cancelar</span>';
        cadena_paises+='</div>';

        cadena_categoria='<div class="boton_menu_filtro" onclick="atras_filtro(1)">';
        cadena_categoria+=' <span class="nombre-filtro">&lt;&lt; Cancelar</span>';
        cadena_categoria+='</div>';


        cadena_dpto='<div class="boton_menu_filtro" onclick="atras_filtro(1)">';
        cadena_dpto+='  <span class="nombre-filtro">&lt;&lt; Cancelar</span>';
        cadena_dpto+='</div>';


        

        var cadena_cat_1="";
        var cadena_cat_2="";
        var cadena_cat_3="";


           
        var request = $.ajax({
            url: servidor_ws+"get_data.php",
            type: "POST",
            data: {tipo:"basicos_app",lang:lang_sel}
        });

        arraPaises=new Array();

        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){
                var objdata=obj.datos;
                

                for(var i=0;i<objdata.length;i++){



                        cadena_cat_1+='<div style="width:100%; float:left; height:auto;     margin-bottom: -4px; cursor:pointer; background-size:contain; " onclick="cargar_subcategorias('+objdata[i].IdCategoria+')">';

                        cadena_cat_1+='     <img src="'+servidor_ws+'images/categorias/'+objdata[i].bannerCategoria+'" style="width:100%;" >';

                       /* if(i%2){

                            cadena_cat_1+='    <div style="width:50%; height:130px; float:left; background-image:url('+servidor_ws+'categorias/'+objdata[i].imagenApp+'); background-size:cover; background-position: left center;">';
                            cadena_cat_1+='    </div>';
                            cadena_cat_1+='    <div style="width:50%; height:130px; float:left;">';
                            cadena_cat_1+='        <div style="width:100%; height:130px; text-align:center;     padding-top: 44px; font-size:15px;">';
                            cadena_cat_1+='           <strong style=" letter-spacing: 2px;">'+objdata[i].nombreCategoria+'</strong><br />';
                            cadena_cat_1+='            <span>245 Items</span>';
                            cadena_cat_1+='        </div>';
                            cadena_cat_1+='     </div>';
                           

                        }else{

                            cadena_cat_1+='    <div style="width:50%; height:130px; float:left;">';
                            cadena_cat_1+='        <div style="width:100%; height:130px; text-align:center;     padding-top: 44px; font-size:15px;">';
                            cadena_cat_1+='           <strong style=" letter-spacing: 2px;">'+objdata[i].nombreCategoria+'</strong><br />';
                            cadena_cat_1+='            <span>245 Items</span>';
                            cadena_cat_1+='        </div>';
                            cadena_cat_1+='     </div>';

                            cadena_cat_1+='    <div style="width:50%; height:130px; float:left; background-image:url('+servidor_ws+'categorias/'+objdata[i].imagenApp+'); background-size:cover; background-position: left center;">';
                            cadena_cat_1+='    </div>';


                        }
                        */

                        cadena_cat_1+='</div>';
                        
                }

                var objdata_pais=obj.datos_pais;

                var cadena_pais='<option value="">Paises</option>';

                for(var i=0;i<objdata_pais.length;i++){
                   cadena_pais+='<option value="'+objdata_pais[i].IdPais+'">'+objdata_pais[i].nombre+'</option>';
                }

                //cambio_boton(2,0);

                $("#cmb_paises_reg").html(cadena_pais);


                $("#tip_sectores_1").html(cadena_cat_1);
                

                $("#load_in").hide("fast");



                //

              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });
        
    }

    var idcarrito_pedido="";
    function abrir_eliminar_item(idcarrito){
        idcarrito_pedido=idcarrito;
        $("#modal_eliminar_item").show("fast");
    }

    function eliminar_item(){
        
        var request = $.ajax({
            url: servidor_ws+"set_pedidos.php",
            type: "POST",
            data: {
                    tipo:"eliminar_pedidos",
                    idcarrito:""+idcarrito_pedido
                }
        });

       
        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){
                $("#modal_eliminar_item").hide("fast");
                $("#contain_item_"+idcarrito_pedido).hide("fast");

              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });

        
    }



    function cerrar_pop_del(){
        $("#modal_eliminar_item").hide("fast");
    }



     function cargar_subcategorias(idcategoria){

        var cadena_cat_1="";

        var request = $.ajax({
            url: servidor_ws+"get_subcategorias.php",
            type: "POST",
            data: {categoria:""+idcategoria}
        });

        arraPaises=new Array();

        $.mobile.changePage("#foo3",{transition:"slide",changeHash: false});

        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var id_sub=0;
            var cadena_combo="";
              if( obj.status == "ok"){
                var objdata=obj.datos;
                
                if(objdata.length>0){
                    id_sub=objdata[0].IdSubcategoria;

                    $("#sub_Cat").html(objdata[0].nombreSubcategoria);
                }
                 cadena_cat_1+='<option value="">Subcategorias</option>';
                for(var i=0;i<objdata.length;i++){
                    cadena_cat_1+='<option value="'+objdata[i].IdSubcategoria+'">'+objdata[i].nombreSubcategoria+'</option>';
                }

              }else{
                alert(""+obj.mensaje);
              }

              $("#cmbsubcategoria").html(cadena_cat_1);

              $("#cmbsubcategoria").val(id_sub);

              $('#cmbsubcategoria').selectmenu('refresh');
             

              cargar_productos($("#cmbsubcategoria").val(),'');

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });

    }
    var band_ciud_sel="";

    function abrir_mi_cuenta(){

        $(".botom_footer").addClass("botom_footer");
        $(".botom_footer").removeClass("botom_footer_active");
        $("#btn_menu_5").addClass("botom_footer_active");

        if(obj_cliente_reg==null){
            $.mobile.changePage("#fooMiPedido_login",{transition:"slide",changeHash: false});

            return;
        }


        $(".botom_footer").addClass("botom_footer");
        $(".botom_footer").removeClass("botom_footer_active");
        $("#btn_menu_5").addClass("botom_footer_active");

        $.mobile.changePage("#fooMiPedido_registro",{transition:"slide",changeHash: false});


        $("#txtnombres_reg").val(""+obj_cliente_reg[0].nombreClientes);
        $("#txtapellidos_reg").val(""+obj_cliente_reg[0].apellidoClientes);
        $("#txtemail_reg").val(""+obj_cliente_reg[0].emailClientes);
        $("#txttelefono_reg").val(""+obj_cliente_reg[0].telefonoClientes);


        band_ciud_sel="SI";

        

        $("#cmb_paises_reg").val(obj_cliente_reg[0].IdPais);
        $('#cmb_paises_reg').selectmenu('refresh');

        traer_departamento();


        $("#txttdireccion_reg").val(""+obj_cliente_reg[0].direccionClientes);



    }


    var id_subcat_sel="";

    var arra_productos=new Array();

    function cargar_productos(idsubcategoria,favorito){

        id_subcat_sel=""+idsubcategoria;
        var cadena_cat_1="";
         

        var request = $.ajax({
            url: servidor_ws+"get_productos.php",
            type: "POST",
            data: {
                    subcategoria:""+idsubcategoria,
                    idcliente:""+id_usuario_reg,
                    favorito:""+favorito
                }
        });

        arraPaises=new Array();

        

        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
               var cadena_combo="";
               if( obj.status == "ok"){
                    var objdata=obj.datos;

                    arra_productos=new Array();
                    
                    for(var i=0;i<objdata.length;i++){

                        arra_productos.push(objdata[i]);

                        var icono_heart="";

                        if(""+objdata[i].favorito=="1"){
                            icono_heart="#ef6ae2;";
                        }else{
                            icono_heart="#ccc;";
                        }


                        cadena_cat_1+='<div style="width:45%; height:auto; float:left;  padding:2%; margin-bottom:0px;  position:relative; ">';
                        cadena_cat_1+='   <div class="contain_producto_sel" style="width:100%; height:200px; float:left; background-color:#fff;     box-shadow: rgb(114, 114, 114) 1px 1px 3px 0px; " id="contain_producto_sel_'+objdata[i].IdProducto+'">';

                        cadena_cat_1+='       <div style="width:100%; height:30px;">';

                        if(objdata[i].detalProducto!="" && ""+objdata[i].detalProducto!="null" && ""+objdata[i].detalProducto!="0"){
                            cadena_cat_1+='       <span style="position: absolute; font-size: 11px; top: 13px; left: 13px; color:#e72c78;">Disp. X Und'+objdata[i].detalProducto+'</span>';
                        }

                        if(objdata[i].mayorProducto!="" && ""+objdata[i].mayorProducto!="null" && ""+objdata[i].mayorProducto!="0"){
                             cadena_cat_1+='       <span style="position: absolute; font-size: 11px; top: 27px; left: 13px; color:#145ea9;">Venta X Mayor</span>';
                        }
                        
                       

                        cadena_cat_1+='             <button id="btn_favorito_'+objdata[i].IdProducto+'" onclick="set_favoritos('+objdata[i].IdProducto+','+objdata[i].favorito+')" style="float:right; margin-right:5px; text-shadow: 1px 1px #7b7b7b;   width: 40px; height: 40px; font-size: 23px; background-position:center;  background-repeat:no-repeat; background-position:center; background-size:24px; background-color:transparent; border:none;  ">';
                        cadena_cat_1+='                 <span class="icon-favorite" style="color:'+icono_heart+'"></span>';
                        cadena_cat_1+='             </button>';
                        cadena_cat_1+='       </div>';

                        cadena_cat_1+='<div style="width:100%; height:120px; float:left; background-image:url('+servidor_ws+'images/products/'+objdata[i].foto+'); background-size:cover; background-position:center; position:relative;">';
                        cadena_cat_1+='<div style="width:65%; height:120px; position:absolute;" onclick="abrir_detalle_sel_descuento('+objdata[i].IdProducto+')">';
                        cadena_cat_1+='</div>';
                        
                        cadena_cat_1+='</div>';
                        cadena_cat_1+='<span  style="font-size: 14px; font-weight: 100; margin-left: 10px; float: left; width:100%;">'+objdata[i].nombreProducto+'</span>';
                        cadena_cat_1+='<span  style="font-size: 12px; font-weight: bold; margin-left: 10px; float: left; width:100%;">$'+objdata[i].precio_descuento+' - $'+objdata[i].precio_formato+' <small style="font-weight: 100;font-size: 10px;">/par </small> </span>';
                        cadena_cat_1+='</div>';
                        cadena_cat_1+='</div>';
                    }

                $("#filtro_productos").html(cadena_cat_1);

              }else{
                alert(""+obj.mensaje);
              }

             

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });

    }

    var id_prod_sel="";
    function abrir_detalle_sel_descuento(idprod){
        /*$(".contain_producto_sel").css("height","200px");
        $("#contain_producto_sel_"+idprod).css("height","300px");
        */

        $("#popup_detail_pagos").show("fast");
        $("#dispo_unidad").hide();
        $("#dispo_ventas").hide();

        id_prod_sel=""+idprod;


        var arr_descuentos=new Object();

        for(var i=0;i<arra_productos.length;i++){
            if(parseInt(arra_productos[i].IdProducto)==parseInt(idprod)){
                arr_descuentos=arra_productos[i].descuento;
                $("#pop_nombre_prod").html(""+arra_productos[i].nombreProducto);



                /*
                
                
                */

                if(""+arra_productos[i].detalProducto=="1"){
                    $("#dispo_unidad").show();
                }

                if(""+arra_productos[i].mayorProducto=="1"){
                    $("#dispo_ventas").show();
                }

            }
        }

        var cadena_descuento="";

        for(var i=0;i<arr_descuentos.length;i++){

            var cantidades_pares="";
            if(arr_descuentos[i].cantidadFinalDescuento!=null){
                cantidades_pares=arr_descuentos[i].cantidadDescuento+" - "+arr_descuentos[i].cantidadFinalDescuento+" Pares";
            }else{
                cantidades_pares="> "+arr_descuentos[i].cantidadDescuento+" Pares";
            }


            cadena_descuento+='<tr style="border:1px solid #e72c78;">';
            cadena_descuento+='  <td style="border:1px solid #e72c78;">'+cantidades_pares+'</td>';
            cadena_descuento+='  <td style="border:1px solid #e72c78;">'+arr_descuentos[i].valor_descuento+'</td>';
            cadena_descuento+="</tr>";
        }

        $("#cuerpo_tabla").html(cadena_descuento);
    


    }

    function boton_cerrar_pop_prd(){
        $("#popup_detail_pagos").hide("fast");
    }

    function abrir_detail_prod_pop(){
        abrir_detalle_prod(id_prod_sel);
        boton_cerrar_pop_prd();
    }



    function set_favoritos(prod,estado){

        if(id_usuario_reg==""){
            alert("Debes estar registrado para agregar este producto como favorito");
            return;
        }

        var request = $.ajax({
            url: servidor_ws+"set_pedidos.php",
            type: "POST",
            data: {
                    tipo:"favorito",
                    idcliente:""+id_usuario_reg,
                    idproducto:""+prod,
                    estadoactual:""+estado

                }
        });

       
        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){
                
                cargar_productos(id_subcat_sel,'');
                
              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });
    }


     function filtro_productos_productor(){


        var nom_filtro=$("#buscar_popup_input").val();

        var cadena_cat_1="";

        var request = $.ajax({
            url: servidor_ws+"get_filtro_principal.php",
            type: "POST",
            data: {filtro:""+nom_filtro}
        });

        arraPaises=new Array();

        

        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
               var cadena_combo="";

               $("#popup_buscar").hide("fast");

               if( obj.status == "ok"){


                    var objdata=obj.datos;
                    
                    for(var i=0;i<objdata.length;i++){
                        var color_sel="";
                        var tip_s=0;
                        var cadena_imagen="";

                        if(objdata[i].tabla=="Fabricante"){
                            color_sel="#e5f8ff";
                            tip_s=1;
                            cadena_imagen=""+servidor_ws+'/images/fabricantes/'+objdata[i].imagen;
                        }else{
                             color_sel="#f0ffe5";
                             tip_s=0;
                             cadena_imagen=""+servidor_ws+'images/products/'+objdata[i].imagen;
                        }

                        cadena_cat_1+='<div onclick="abrir_generic_ficha('+objdata[i].codigo+','+tip_s+')" style="position:relative;text-align:left;background-color:#ffffff; margin-left:4px; width:93%; margin-top:5px; height:auto; float:left;  padding:2%; margin-bottom:0px; border:solid 1px #ccc; border-radius:9px;">';

                        cadena_cat_1+='  <div style="background-image:url(assets/img/icon_right.png);     width: 15px; height: 24px; right:15px; position:absolute; top:50%; margin-top:-12px; "></div> ';                    
                        cadena_cat_1+='  <div style="width:40%; height:80px; float:left; background-image:url('+cadena_imagen+'); background-repeat:no-repeat; background-size:cover; background-position:center;  " >';
                        cadena_cat_1+='  </div>';


                        cadena_cat_1+='  <div style="width:50%; height:80px; float:left; margin-left:5px; " >';

                        cadena_cat_1+='    <div style="font-size:18px; width:100%; text-shadow:none; margin-top:10px;">'+objdata[i].nombre+'</div>';
                        cadena_cat_1+='    <div style="font-size:13px; width:100%; text-shadow:none;">'+objdata[i].tabla+'</div>';

                        cadena_cat_1+='  </div>';

                        
                        cadena_cat_1+='</div>';
                    }

                $("#contain_filtro_resultado").html(cadena_cat_1);

                 $.mobile.changePage("#fooResultadoBusqueda",{transition:"slide",changeHash: false});



              }else{
                alert(""+obj.mensaje);
              }

             

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });

    }


    function abrir_generic_ficha(idcodigo,tipocodigo){
        if(tipocodigo==1){
            get_productor(idcodigo);
        }else{
            abrir_detalle_prod(idcodigo);
        }
    }


    function abir_mi_pedido(){

        $(".botom_footer").addClass("botom_footer");
        $(".botom_footer").removeClass("botom_footer_active");
        $("#btn_menu_4").addClass("botom_footer_active");

        if(id_usuario_reg!=""){

            
            $.mobile.changePage("#foo_mis_pedidos",{transition:"slide",changeHash: false});
            get_carrito();
            /*
            $.mobile.changePage("#fooMiPedido_mi_pedido",{transition:"slide",changeHash: false});
            get_pedido();
            */
        }else{
            $.mobile.changePage("#fooMiPedido_login",{transition:"slide",changeHash: false});
        }
        
    }


    function abrir_login_fabricante(){
        window.open(servidor_admin+"login","_parent", 'location=yes');
        
        //var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes'); 
    }


    function get_carrito(){


        arrapedidoItem=new Array();
        arraConfigEnvio=new Array();

        if(id_usuario_reg==""){
            $.mobile.changePage("#fooMiPedido_login",{transition:"slide",changeHash: false});
            return;
        }
        
        

       
        var idcliente=""+id_usuario_reg;
        
      
        var request = $.ajax({
            url: servidor_ws+"set_pedidos.php",
            type: "POST",
            data: {
                    tipo:"get_carrito",
                    idcliente:""+idcliente
                }
        });

       
        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){
                
                var objectdat=new Object();
                objectdat=obj.datos;


                var objenvios=new Object();
                objenvios=obj.config_envios;

                var cadena_listado_pedi="";
                for(var i=0;i<objectdat.length;i++){
                    cadena_listado_pedi+='<div onclick="get_pedido('+objectdat[i].IdCarrito+','+objectdat[i].estadoCarrito+')" class="item_pedido">';
                    
                    cadena_listado_pedi+='  <div style="background-image:url(assets/img/icon_right.png);     width: 15px; height: 24px; right:15px; position:absolute; top:50%; margin-top:-12px; "></div> ';                    


                    cadena_listado_pedi+='  <div style="margin-left:10px;">';
                    cadena_listado_pedi+='      <div style="width:100%; float:left;  ">';
                    cadena_listado_pedi+='          <strong> Pedido No. '+objectdat[i].IdCarrito+'</strong>';
                    cadena_listado_pedi+='      </div>';

                    cadena_listado_pedi+='      <div style="width:100%; float:left;  ">';
                    cadena_listado_pedi+='          <strong>Fecha: </strong>'+objectdat[i].fechaCarrito+'';
                    cadena_listado_pedi+='      </div>';

                    cadena_listado_pedi+='      <div style="width:100%; float:left;  ">';
                    cadena_listado_pedi+='          <strong>Total Pedido: </strong> $'+addCommas(objectdat[i].totalCarrito)+'';
                    cadena_listado_pedi+='      </div>';


                    var estado_pedi="";

                    if(""+objectdat[i].estadoCarrito=="1"){
                        estado_pedi="<span style='color:#1f6286'>Nuevo</span>";
                    }

                    if(""+objectdat[i].estadoCarrito=="2"){
                        estado_pedi="<span>Enviado</span>";
                    }

                    if(""+objectdat[i].estadoCarrito=="3"){
                        estado_pedi="<span style='color:#702d8e'>Pagado</span>";
                    }

                    if(""+objectdat[i].estadoCarrito=="4"){
                        estado_pedi="<span style='color:#1f6286'>Entregado</span>";
                    }

                    cadena_listado_pedi+='      <div style="width:100%; float:left;  ">';
                    cadena_listado_pedi+='          <strong>Estado Pedido: </strong> '+estado_pedi+'';
                    cadena_listado_pedi+='      </div>';

                    cadena_listado_pedi+='  </div>';
                    cadena_listado_pedi+='</div>';
                }

                $("#mis_pedidos").html(cadena_listado_pedi);

              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });
    }


    var usuario_app="";
    var password_app="";
    var id_usuario_reg="";
    var id_usuario_fab_reg="";

    var obj_cliente_reg=new Object();

    function loguin_app(tip){
        var cadena_cat_1="";

        /*
        $usuario_usu=$_REQUEST["usuario_usu"];
    $password_usu=$_REQUEST["password_usu"];
        */



        usuario_app=""+$("#txtusuario_app").val();
        password_app=""+$("#txtpassword_app").val();

        var chk="";

        if($("#enab_passw").is(":checked")){
            chk="SI";
        }

        var request = $.ajax({
            url: servidor_ws+"login_app.php",
            type: "POST",
            data: {
                usuario_usu:""+usuario_app,
                password_usu:""+password_app
            }
        });

        arraPaises=new Array();

        

        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){


                var objdata=obj.datos;

                obj_cliente_reg=objdata;

                

                id_usuario_reg=""+objdata[0].IdClientes;



                if(chk==""){
                    limpiar_password();
                }else{
                    guardar_password();
                }


                if(tip==1){
                    abir_mi_pedido();
                }


                $("#txtnombres_reg").val();
                $("#txtapellidos_reg").val();
                $("#txtemail_reg").val();
                var  telefono=""+$("#txttelefono_reg").val();
                var  ciudad=""+$("#cmb_ciudad_reg").val();
                var  direccion=""+$("#txttdireccion_reg").val();
              

                var  repassword=""+$("#txtpassword_reg").val();
                var  password=""+$("#txtreppassword_reg").val();

                

              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });

    }

    function loguin_app_fab(tip){
        var cadena_cat_1="";

        /*
        $usuario_usu=$_REQUEST["usuario_usu"];
    $password_usu=$_REQUEST["password_usu"];
        */

        usuario_app=""+$("#txtusuario_f_app").val();
        password_app=""+$("#txtpassword_f_app").val();

        var chk="";

        if($("#enab_f_passw").is(":checked")){
            chk="SI";
        }


        /*
    
                 
           
          
        */

        var request = $.ajax({
          url: servidor_admin+"login3/"+usuario_app+"/"+password_app+"/1",
          type: "GET"
        });

        arraPaises=new Array();

        

        request.done(function(obj) {        
            
            var cadena_combo="";
              if( obj.status == "ok"){
                var objdata=obj.datos;

                if(chk==""){
                    limpiar_password();
                }else{
                    guardar_password();
                }


                if(tip==1){
                    window.open(servidor_admin+"backoffice","_parent"); 
                }


                $("#txtnombres_reg").val();
                $("#txtapellidos_reg").val();
                $("#txtemail_reg").val();
                var  telefono=""+$("#txttelefono_reg").val();
                var  ciudad=""+$("#cmb_ciudad_reg").val();
                var  direccion=""+$("#txttdireccion_reg").val();
              

                var  repassword=""+$("#txtpassword_reg").val();
                var  password=""+$("#txtreppassword_reg").val();

                

              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });

    }




    function cerrar_sesion(){

        $("#modal_cerrar_sesion").show();

       
    }

      function cerrar_pop_cerrar(){
        $("#modal_cerrar_sesion").hide("fast");
    }


     function cerrar_sesion_si(){

        $("#modal_cerrar_sesion").hide();

        obj_cliente_reg=null;

        limpiar_password();
       id_usuario_reg="";
        usuario_app="";
        password_app="";
        $("#txtusuario_app").val("");
        $("#txtpassword_app").val("");
         $.mobile.changePage("#fooMiPedido_login",{transition:"slide",changeHash: false});
    }


    function abrir_mapa_fabricante(){
        //mapa_fabricante


        $.mobile.changePage("#foo_productores_mapa",{transition:"slide",changeHash: false});


        var latitud_f=0;
        var longitud_f=0;

        

        for(var i=0;i<objectFabricantes.length;i++){
            latitud_f=parseFloat(objectFabricantes[i].latitudFabricante);
            longitud_f=parseFloat(objectFabricantes[i].longitudFabricante);

            

        }


        var mapProp = {

            center:new google.maps.LatLng(latitud_f,longitud_f),
            zoom:13,
            mapTypeId:google.maps.MapTypeId.ROADMAP
          };

          var map=new google.maps.Map(document.getElementById("mapa_fabricante"),mapProp);
          
        for(var i=0;i<objectFabricantes.length;i++){
            latitud_f=parseFloat(objectFabricantes[i].latitudFabricante);
            longitud_f=parseFloat(objectFabricantes[i].longitudFabricante);

            var image_marker="assets/img/marker.png";

            var myLatLng = new google.maps.LatLng( parseFloat(latitud_f),parseFloat(longitud_f));
            var beachMarker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon:image_marker
                
                
            });

            beachMarker.IdFabricante=""+objectFabricantes[i].IdFabricante;
            beachMarker.logoFabricante=""+objectFabricantes[i].logoFabricante;
            beachMarker.razonsocialFabricante=""+objectFabricantes[i].razonsocialFabricante;
            beachMarker.direccionFabricante=""+objectFabricantes[i].direccionFabricante;
            beachMarker.telefonosFabricante=""+objectFabricantes[i].telefonosFabricante;
            beachMarker.emailFabricante=""+objectFabricantes[i].emailFabricante;


            beachMarker.addListener('click', function(e) {
                /*sucursal_sel_mapa=""+this.id_Sucursal;    
                get_sucursales(this.id_Sucursal); 
                */


                open_pop_fabricante(this.logoFabricante,''+this.razonsocialFabricante,''+this.direccionFabricante,''+this.telefonosFabricante,''+this.emailFabricante,''+this.IdFabricante);

                console.log("Se ha seleccionado "+this.IdFabricante);      
            });


        }

          

        



    }

    function open_pop_fabricante(logoempresa,nombreempresa,direccionempresa,telefonoempresa,emailempresa,idempresa){

        var cadena_fab=' <div style="width:40%; background-color:#fff; background-image:url('+servidor_ws+'images/fabricantes/'+logoempresa+');  background-repeat:no-repeat; height:157px; float:left; border-radius:9px; margin-left:5px; margin-top:5px; background-position:center; background-size:contain;">';
        cadena_fab+='</div>';

        cadena_fab+='<div style="width:55%; height:157px; margin-left:5px; margin-top:5px; float:left;">';

        cadena_fab+='<div style="width: 100%; float: left; color: #fff;  text-align: left;  padding-top:5px; padding-left: 3px; text-shadow: none; font-size: 17px; font-weight:bold;" id="mapa_nombre_fabricante">';
        cadena_fab+=''+nombreempresa;
        cadena_fab+='</div>';
        cadena_fab+='<div style="width: 100%; float: left; color: #fff;  text-align: left;  padding-top:5px; padding-left: 3px; text-shadow: none; font-size: 13px; font-weight:300;" id="mapa_dir_fabricante">';
        cadena_fab+='<strong>DIR:</strong> '+direccionempresa;
        cadena_fab+='</div>';
        cadena_fab+='<div style="width: 100%; float: left; color: #fff;  text-align: left;  padding-top:5px; padding-left: 3px; text-shadow: none; font-size: 13px; font-weight:300;" id="mapa_tel_fabricante">';
        cadena_fab+='<strong>TEL:</strong> '+telefonoempresa;
        cadena_fab+='</div>';
        cadena_fab+='<div style="width: 100%; float: left; color: #fff;  text-align: left;  padding-top:5px; padding-left: 3px; text-shadow: none; font-size: 13px; font-weight:300;" id="mapa_nombre_fabricante">';
        cadena_fab+='<strong>EMAIL:</strong> '+emailempresa;
        cadena_fab+='</div>';
        cadena_fab+='<div style="width: 100%; float: left; color: #fff;  text-align: left;  padding-top:2px; padding-left: 3px; text-shadow: none; font-size: 13px; font-weight:300;" id="mapa_boton_fabricante">';
        cadena_fab+='<button onclick="get_productor('+idempresa+')" style="width: 95%; height: 30px; background-color: rgb(56, 121, 140); color: #fff; text-shadow: none; padding-top: 5px; border: 1px solid #fff; border-radius: 16px;">Ir al Sitio</button>';
        cadena_fab+='</div>';
        cadena_fab+='  </div>';


        $("#info_fabricante_mapa").html(cadena_fab);

      
    }

    function abrir_detalle_prod(id_prod){
        var cadena_cat_1="";

        var request = $.ajax({
            url: servidor_ws+"get_productos.php",
            type: "POST",
            data: {codigoproducto:""+id_prod}
        });

        arraPaises=new Array();

        

        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){
                var objdata=obj.datos;
                var objgaleria=obj.galeria;
                var objcolor=obj.colores;
                var objtallas=obj.tallas;

                abrir_producto_detail(objdata,objgaleria,objcolor,objtallas);

              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });

    }



    function abrirdatospais(){
        $("#list_data").html(cadena_paises);
        $("#list_data").show("fast");
        $("#base_filtro").hide("fast");
    }


    function abrircategorias(){
        $("#list_data").html(cadena_categoria);
        $("#list_data").show("fast");
        $("#base_filtro").hide("fast");
    }


    var IdProducto_sel="";
    var valorproducto_agregar="";
    var arra_descuentos_prod=new Object();
   
    function abrir_producto_detail(obj_producto,obj_galeria,obj_colors,obj_tallas){

        
        $("#nombreProducto").html(""+obj_producto[0].nombreProducto);
        $("#precioDescuento").html(" "+obj_producto[0].precio_descuento);
        $("#precioProducto").html(" "+obj_producto[0].precio_formato);

        arra_descuentos_prod=obj_producto[0].descuento;


        IdProducto_sel=""+obj_producto[0].IdProducto;

        $("#descripcionProducto").html(" "+obj_producto[0].descripcionProducto);

        var cadena_galeria='<ul id="singleGallery_'+obj_producto[0].IdProducto+'" style="width:100%; height:auto; float:left;">';
        for(var i=0;i<obj_galeria.length;i++){
            cadena_galeria+='<li><img src="'+servidor_ws+'/images/products/'+obj_galeria[i].pathGaleri+'" alt="" /></li>';

        }
        cadena_galeria+='</ul>';

        $("#galeriaProducto").html(cadena_galeria);

        var cadenaColor='<option id="">Colores</option>';
        for(var i=0;i<obj_colors.length;i++){
            cadenaColor+='<option value="'+obj_colors[i].IdColorProducto+'">'+obj_colors[i].nombreColor+'</option>';
        }

        $("#cmb_colores").html(cadenaColor);


        //tallas

        var cadenaTallas='<option id="">Tallas</option>';
        for(var i=0;i<obj_tallas.length;i++){
            cadenaTallas+='<option value="'+obj_tallas[i].IdProductoTallas+'">'+obj_tallas[i].tallaProducto+'</option>';
        }

        $("#cmb_tallas").html(cadenaTallas);

        $.mobile.changePage("#fooProducto",{transition:"slide",changeHash: false});


        /* fa.razonsocialFabricante,
                  fa.descripcionFabricante, 
                  fa.logoFabricante, 
                  CONCAT_WS(' ',fa.nombreFabricante, fa.apellidoFabricante) AS nombreFabricante,
                  fa.nitFabricante,
                  fa.direccionFabricante, 
                  fa.telefonosFabricante, 
                  fa.emailFabricante,
                  fa.latitudFabricante,
                  fa.longitudFabricante*/


        $("#logo_fabricante").html('<img style="width:100%;" src="'+servidor_ws+'/images/fabricantes/'+obj_producto[0].logoFabricante+'">');

        $("#razon_social_fab").html(""+obj_producto[0].razonsocialFabricante);
        $("#presentante_fab").html(""+obj_producto[0].nombreFabricante);
        $("#nit_fab").html(""+obj_producto[0].nitFabricante);
        $("#direccion_fab").html(""+obj_producto[0].direccionFabricante);
        $("#ciudad_fab").html(""+obj_producto[0].nombreCiudad);
        $("#tel_fab").html(""+obj_producto[0].telefonosFabricante);
        $("#email_fab").html(""+obj_producto[0].emailFabricante);

        var longitudSucursalX=parseFloat(obj_producto[0].longitudFabricante);
        var latitudSucursalX=parseFloat(obj_producto[0].latitudFabricante);
        




        $('#singleGallery_'+obj_producto[0].IdProducto+'').slick({
            infinite: true,
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
        });


        

        console.log(longitudSucursalX+" "+latitudSucursalX);

        var mapProp = {

            center:new google.maps.LatLng(latitudSucursalX,longitudSucursalX),
            zoom:17,
            mapTypeId:google.maps.MapTypeId.ROADMAP
          };
          var map=new google.maps.Map(document.getElementById("mapa_producto"),mapProp);

          

          var myLatLng = new google.maps.LatLng( parseFloat(latitudSucursalX),parseFloat(longitudSucursalX));
                var beachMarker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    
                    
                });

    }


    function producto_favorito(){
       

        var request = $.ajax({
            url: servidor_ws+"set_pedidos.php",
            type: "POST",
            data: {
                    tipo:"favorito",
                    codigoproducto:""+IdProducto_sel
                }
        });

        arraPaises=new Array();

        

        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){

              }else{
                alert(""+obj.mensaje);
              }

            });     

            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });
    }



    function get_valor_descuento(cantid){
       var i=0;
      var cantidad_actual=parseInt(cantid);
      var cant=arra_descuentos_prod.length;
      
      var tipo_descuento_oper=0;

       for(;i<cant;i++){
          var cantidad_descuento=parseFloat(arra_descuentos_prod[i].cantidadDescuento)*1;
          var cantidad_descuento_final=parseFloat(arra_descuentos_prod[i].cantidadFinalDescuento)*1;
          var tipo_descuento=parseFloat(arra_descuentos_prod[i].tipoDescuento)*1;
          var valor_descuento=parseFloat(arra_descuentos_prod[i].valorDescuento)*1;



          

          if(cantidad_descuento_final>0){
            if(cantidad_actual>=cantidad_descuento && cantidad_actual<=cantidad_descuento_final){

              valor_porcentaje_descuento=valor_descuento;
              if(tipo_descuento==1){
                tipo_descuento_oper=1;
                
              }else{
                tipo_descuento_oper=2;
              }

            }
          }else{

             if(cantidad_actual>=cantidad_descuento){
              valor_porcentaje_descuento=valor_descuento;
               if(tipo_descuento==1){
                  
                  tipo_descuento_oper=1;
                }else{
                  tipo_descuento_oper=2;
                }
             }
          }
       } 
      return valor_porcentaje_descuento;

    }


    //AGREGAR PEDIDO


    function agrregar_pedido(){
        /*
        $idproducto=@$_REQUEST["idproducto"];
        $idtallaproducto=@$_REQUEST["idtallaproducto"]; 
        $idcolorproducto=@$_REQUEST["idcolorproducto"];
        $cantidad=@$_REQUEST["cantidad"];
        $idcliente=@$_REQUEST["idcliente"];
        $valorproducto=@$_REQUEST["valorproducto"];
        */


        if(id_usuario_reg==""){
            $.mobile.changePage("#fooMiPedido_login",{transition:"slide",changeHash: false});
            return;
        }
        
        

        var tallaProducto=""+$("#cmb_tallas").val();
        var colorProducto=""+$("#cmb_colores").val();
        var cantidad=""+$("#cantidad_producto").val();
        var idcliente=""+id_usuario_reg;
        var valorproducto=""+get_valor_descuento(cantidad);


        if(tallaProducto==""){
            alert("Debes seleccionar una talla");
            return;
        }

        if(colorProducto==""){
            alert("Debe seleccionar un color");
            return;
        }
        


      
        var request = $.ajax({
            url: servidor_ws+"set_pedidos.php",
            type: "POST",
            data: {
                    tipo:"nuevo",
                    idproducto:""+IdProducto_sel,
                    idtallaproducto:""+tallaProducto,
                    idcolorproducto:""+colorProducto,
                    cantidad:""+cantidad,
                    idcliente:""+idcliente,
                    valorproducto:""+valorproducto

                }
        });

       
        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){
                
                alert(""+obj.mensaje);
                $.mobile.changePage("#fooMiPedido_mi_pedido",{transition:"slide",changeHash: false});

              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });
    }


    function actualizar_carrito_compra(){
        actualizar_carrito(2);

    }

    var arrapedidoItem=new Array();
    var arraConfigEnvio=new Array();



     function get_pedido(idcarrito,est_ped_sel){

        $("#btn_compra_pedido").prop( "disabled", false );
        $("#btn_actualizar_carrito").prop( "disabled", false );

        if(est_ped_sel=="1"){
            $("#btn_compra_pedido").html("Comprar");
        }

        if(est_ped_sel=="2"){
            $("#btn_compra_pedido").html("Pagar");
        }

        if(est_ped_sel=="3"){
            
            $("#btn_compra_pedido").prop( "disabled", true );
            $("#btn_actualizar_carrito").prop( "disabled", true );
        }

        idcarrito_sel=idcarrito;


        arrapedidoItem=new Array();
        arraConfigEnvio=new Array();


        var request = $.ajax({
            url: servidor_ws+"set_pedidos.php",
            type: "POST",
            data: {
                    tipo:"traer_pedidos",
                    idcarrito:""+idcarrito
                }
        });

       
        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){
                
                var objectdat=new Object();
                objectdat=obj.datos;


                var objenvios=new Object();
                objenvios=obj.config_envios;

                var cadena_listado_pedi="";


                for(var i=0;i<objenvios.length;i++){
                    var obj_item=new Object();
                    obj_item=objenvios[i];
                    arraConfigEnvio.push(obj_item);

                }

                for(var i=0;i<objectdat.length;i++){


                    var cantidadPedido=parseFloat(objectdat[i].cantidadPedido);
                    var valorprod=0;
                    var totalProd=0;
                    var tallaProd=""+objectdat[i].tallaProducto;
                    var colorProd=""+objectdat[i].nombreColor; 


                    valorprod=objectdat[i].valorProducto;
                   

                    totalProd=valorprod*cantidadPedido;


                     var obj_item=new Object();
                    obj_item=objectdat[i];
                    obj_item.valorprod=valorprod;

                    arrapedidoItem.push(obj_item);


                    var cantidad_prod_estado="";
                    var boton_eliminar_item="";
                    var porcent_ancho="";


                    if(""+objectdat[i].estadoPedido=="2"){
                        cantidad_prod_estado+='          <div style="width:20px; height:20px; float:left; "> ';
                        cantidad_prod_estado+='              <span style="margin-left: 7px;"></span>';
                        cantidad_prod_estado+='          </div>';
                        cantidad_prod_estado+='          <div style="width:auto; height:20px; float:left; margin-left:5px; font-size:11px; margin-right:5px; margin-top: 5px;" id="cant_item_ped_'+i+'" > ';
                        cantidad_prod_estado+='              '+cantidadPedido;
                        cantidad_prod_estado+='          </div>';
                        cantidad_prod_estado+='          <div style="width:20px; height:20px; float:left;"> ';
                        cantidad_prod_estado+='              <span style="margin-left: 5px;"></span>';
                        cantidad_prod_estado+='          </div>';

                        porcent_ancho="69%";

                    }


                     if(""+objectdat[i].estadoPedido=="1"){
                        cantidad_prod_estado+='          <div style="width:20px; height:20px; float:left; border:1px solid #ccc; border-radius:50%; " onclick="cambiar_cantidad('+i+',0)"> ';
                        cantidad_prod_estado+='              <span style="margin-left: 7px;">-</span>';
                        cantidad_prod_estado+='          </div>';
                        cantidad_prod_estado+='          <div style="width:auto; height:20px; float:left; margin-left:5px; font-size:11px; margin-right:5px; margin-top: 5px;" id="cant_item_ped_'+i+'" > ';
                        cantidad_prod_estado+='              '+cantidadPedido;
                        cantidad_prod_estado+='          </div>';
                        cantidad_prod_estado+='          <div style="width:20px; height:20px; float:left; border:1px solid #ccc; border-radius:50%; " onclick="cambiar_cantidad('+i+',1)"> ';
                        cantidad_prod_estado+='              <span style="margin-left: 5px;">+</span>';
                        cantidad_prod_estado+='          </div>';


                        boton_eliminar_item+='   <div style="width:14%; float:right; height:90px; background-color:#eb3378; background-image:url(assets/img/icon_delete.png); background-size: 20px; background-repeat: no-repeat; background-position: center;" onclick="abrir_eliminar_item('+objectdat[i].idcarrito_pedido+')">';
                        boton_eliminar_item+='   </div>';

                        porcent_ancho="55%";
                    }
                   

                    cadena_listado_pedi+='<center id="contain_item_'+objectdat[i].idcarrito_pedido+'">';
                    cadena_listado_pedi+='   <div style="width:95%; height:auto; margin-bottom:8px; background-color:#fff;float:left; margin-left: 9px; box-shadow: rgb(114, 114, 114) 1px 1px 3px 0px;">';
                    cadena_listado_pedi+='     <div style="width:30%; height:90px; float:left; background-image:url('+servidor_ws+'/images/products/'+objectdat[i].foto+'); background-position:center; background-size:contain; background-repeat:no-repeat;  ">';
                    cadena_listado_pedi+='   </div>';
                    cadena_listado_pedi+='   <div style="width:'+porcent_ancho+'; float:left; height:90px; text-align:left; text-shadow: none; ">';
                    cadena_listado_pedi+='       <span style="width:100%; margin-top:10px;     font-weight: bold; float:left;">'+objectdat[i].nombreProducto+'</span>';
                    cadena_listado_pedi+='       <span style="width:100%; float:left; color:#eb3378;     font-weight: 100; font-size: 12px; "><strong>Valor: </strong>$<span id="valor_prord_item_'+i+'">'+addCommas(valorprod)+'</span></span>';
                    cadena_listado_pedi+='       <span style="width:100%; float:left; color:#eb3378;     font-weight: 100; font-size: 12px; "><strong>Color: </strong>'+colorProd+'  <strong>Talla: </strong>'+tallaProd+'   </span>';
                    cadena_listado_pedi+='       <div style="width:40%; float:left; margin-top:5px;">';

                    cadena_listado_pedi+=cantidad_prod_estado;


                    cadena_listado_pedi+='        </div>';


                    cadena_listado_pedi+='    <div style="width:60%; float:left; margin-top:5px;    text-align: center; color:#fff; background-color:#5aafc3; ">';
                    cadena_listado_pedi+='    <span style="font-size: 11px;"><strong>TOTAL:</strong> $<span id="tot_prod_'+i+'">'+addCommas(totalProd)+'</span></span>';
                    cadena_listado_pedi+='    </div>';
                    cadena_listado_pedi+='   </div>';

                    cadena_listado_pedi+=boton_eliminar_item;


                    
                    cadena_listado_pedi+='  </div>';
                    cadena_listado_pedi+='</center>';


                    cambiar_cantidad(i,2);
    

                }

                $.mobile.changePage("#fooMiPedido_mi_pedido",{transition:"slide",changeHash: false});

                $("#mi_pedido").html(cadena_listado_pedi);

                calcular_totales();

              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });
    }


     function get_valor_descuento_item(cantid,ardesc){
       var i=0;
      var cantidad_actual=parseInt(cantid);
      var cant=ardesc.length;
      
      var tipo_descuento_oper=0;

       for(;i<cant;i++){
          var cantidad_descuento=parseFloat(ardesc[i].cantidadDescuento)*1;
          var cantidad_descuento_final=parseFloat(ardesc[i].cantidadFinalDescuento)*1;
          var tipo_descuento=parseFloat(ardesc[i].tipoDescuento)*1;
          var valor_descuento=parseFloat(ardesc[i].valorDescuento)*1;

          if(cantidad_descuento_final>0){
            if(cantidad_actual>=cantidad_descuento && cantidad_actual<=cantidad_descuento_final){

              valor_porcentaje_descuento=valor_descuento;
              if(tipo_descuento==1){
                tipo_descuento_oper=1;
                
              }else{
                tipo_descuento_oper=2;
              }

            }
          }else{

             if(cantidad_actual>=cantidad_descuento){
              valor_porcentaje_descuento=valor_descuento;
               if(tipo_descuento==1){
                  
                  tipo_descuento_oper=1;
                }else{
                  tipo_descuento_oper=2;
                }
             }
          }
       } 
      return valor_porcentaje_descuento;

    }


    function cambiar_cantidad(id_item,tip){
        console.log("ide "+id_item);
        var cant_act=parseFloat(arrapedidoItem[id_item].cantidadPedido);
        var descu=new Object();
        descu=arrapedidoItem[id_item].descuentos;
        
       
        var val_tot=0;

        if(tip==1){
            cant_act++;
             var val_prod=parseFloat(get_valor_descuento_item(cant_act,descu));
            val_tot=val_prod*cant_act;

            $("#cant_item_ped_"+id_item).html(cant_act);
            $("#tot_prod_"+id_item).html(addCommas(val_tot));
            $("#valor_prord_item_"+id_item).html(""+addCommas(val_prod));

            arrapedidoItem[id_item].valorProducto=val_prod;
        }

        if(tip==0){

            cant_act--;
            var val_prod=parseFloat(get_valor_descuento_item(cant_act,descu));
            val_tot=val_prod*cant_act;
            $("#cant_item_ped_"+id_item).html(cant_act);
            $("#tot_prod_"+id_item).html(addCommas(val_tot));
            $("#valor_prord_item_"+id_item).html(""+addCommas(val_prod));

            arrapedidoItem[id_item].valorProducto=val_prod;

        }

        if(tip==2){
            var val_prod=parseFloat(get_valor_descuento_item(cant_act,descu));

            val_tot=val_prod*cant_act;
            $("#cant_item_ped_"+id_item).html(cant_act);
            $("#tot_prod_"+id_item).html(addCommas(val_tot));
            $("#valor_prord_item_"+id_item).html(""+addCommas(val_prod));

            arrapedidoItem[id_item].valorProducto=val_prod;

        }

        arrapedidoItem[id_item].cantidadPedido=cant_act;

        var peso_o_cant=0;

        if(arrapedidoItem[id_item].tipoEnvio=="1"){

            peso_o_cant=parseFloat(arrapedidoItem[id_item].pesoProducto)*parseFloat(cant_act);

        }else{

            peso_o_cant=cant_act;

        }


        arrapedidoItem[id_item].valor_envio=get_costo_envio(arrapedidoItem[id_item].tipoEnvio,peso_o_cant,arrapedidoItem[id_item].IdFabricante);

        arrapedidoItem[id_item].total_prod=val_tot;

        calcular_totales();

    }

    function back_cat(){
        abrir_menu_principal('foo2',2,'','');
    }

    function get_costo_envio(tipo,peso,fab){
        var val_costo_envio=0;
        for(var i=0;i<arraConfigEnvio.length;i++){

            if(parseFloat(fab)==parseFloat(arraConfigEnvio[i].IdFabricante)){
                
                if(parseInt(arraConfigEnvio[i].tipoConfig)==tipo){

                    if(""+arraConfigEnvio[i].Rango1!="" && ""+arraConfigEnvio[i].Rango2!=""){

                        if(peso>=parseFloat(arraConfigEnvio[i].Rango1) && peso<=parseFloat(arraConfigEnvio[i].Rango2)){
                            val_costo_envio=parseFloat(arraConfigEnvio[i].Valor);
                        }

                    }          

                   

                    if(""+arraConfigEnvio[i].Rango1!="" && ""+arraConfigEnvio[i].Rango2=="null"){
                        if(peso>=parseFloat(arraConfigEnvio[i].Rango1)){
                            val_costo_envio=parseFloat(arraConfigEnvio[i].Valor);
                        }

                    }
                }
            }
        }
        return val_costo_envio;
    }

    function calcular_totales(){
        var subtotal=0;
        var costo_envio=0;
        var valor_total=0;

        for(var i=0;i<arrapedidoItem.length;i++){
            subtotal+=parseFloat(arrapedidoItem[i].total_prod);
            costo_envio+=parseFloat(arrapedidoItem[i].valor_envio);
        }

        valor_total=subtotal+costo_envio;


        $("#tot_subtotal").html("$"+addCommas(subtotal));
        $("#tot_envio").html("$"+addCommas(costo_envio));
        $("#tot_toal").html("$"+addCommas(valor_total));

    }


    function addCommas(nStr)
    {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }


    var idcarrito_sel="";

    function actualizar_carrito(ti){

        console.log("entra "+ti);

        var cadena_carrito="";

        //objectdat[i].idcarrito_pedido

        for(var i=0;i<arrapedidoItem.length;i++){
            cadena_carrito+=""+arrapedidoItem[i].idcarrito_pedido+"::"+arrapedidoItem[i].cantidadPedido+"::"+arrapedidoItem[i].valorProducto+",";
        }

        cadena_carrito=cadena_carrito.slice(0, -1);

        console.log(cadena_carrito);
        
        var request = $.ajax({
            url: servidor_ws+"set_pedidos.php",
            type: "POST",
            data: {
                    tipo:"actualizar_pedidos",
                    cadena_carrito:""+cadena_carrito,
                    idcarrito:idcarrito_sel,
                    estado:ti
                }
        });

       
        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){
                
                abir_mi_pedido();
              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });

    }




    //listado FABRICANTE

    //DETALLE FABRICANTE

    var objectFabricantes=new Object();

    function get_listado_productor(){
         var cadena_cat_1="";

        var request = $.ajax({
            url: servidor_ws+"get_fabricante.php",
            type: "POST",
            data: {
                    idfabricante:""
                }
        });

        arraPaises=new Array();

        objectFabricantes=new Object();

        

        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){
                var objdata=obj.datos;

                objectFabricantes=objdata;
                


                for(var i=0;i<objdata.length;i++){


                    var color_fondo="";

                    if(i%2){
                        color_fondo="#fff";
                    }else{
                        color_fondo="#fff";
                    }

                    

                    cadena_cat_1+='<div onclick="get_productor('+objdata[i].IdFabricante+')" style="width: 93%; margin-left: 4px; border-radius: 9px; margin-top: 5px; height: auto; float: left; padding: 2%; margin-bottom: 0px; border: 1px solid #ccc;">';
                    cadena_cat_1+='<div style="width:100%; height:160px; float:left; background-color:'+color_fondo+'; border-radius: 7px; ">';
                    cadena_cat_1+='<div  style="width:40%; height:160px;  background-color:#fff; float:left; background-repeat:no-repeat; background-image:url('+servidor_ws+'images/fabricantes/'+objdata[i].logoFabricante+'); background-size:contain; background-position:center;">';
                    cadena_cat_1+='</div>';
                    cadena_cat_1+='<div style="width:52%; height:160px; padding-left:0px;  padding-top:30px; float:left; text-align:center;">';
                    cadena_cat_1+='<div style="width: 100%; float: left; color: #797979;  text-align: left;  padding-left: 15px; text-shadow: none; font-size: 20px; font-weight:bold;">';
                    cadena_cat_1+=''+objdata[i].razonsocialFabricante;
                    cadena_cat_1+='</div>';
                    cadena_cat_1+='<div style="width: 100%; float: left; color: #797979;   margin-top:5px; text-align: left;  padding-left: 15px; text-shadow: none; font-size: 13px;">';
                    cadena_cat_1+=''+objdata[i].direccionFabricante;
                    cadena_cat_1+='</div>';
                    cadena_cat_1+='<div style="width: 100%; float: left; color: #797979;  margin-top:5px;  text-align: left;  padding-left: 15px; text-shadow: none; font-size: 13px;">';
                    cadena_cat_1+='Tel: '+objdata[i].direccionFabricante;;
                    cadena_cat_1+='</div>';
                    cadena_cat_1+='<div style="width: 100%; float: left; color: #797979;  margin-top:5px;  text-align: left;  padding-left: 15px; text-shadow: none; font-size: 13px;">';
                    cadena_cat_1+='Email: '+''+objdata[i].emailFabricante;;
                    cadena_cat_1+='</div>';
                    cadena_cat_1+='</div>';
                    cadena_cat_1+='</div>';
                    cadena_cat_1+='</div>';
                    
                       
                }

                $("#contain_fabricantes_ipcco").html(cadena_cat_1);
                $.mobile.changePage("#foo_productores",{transition:"slide",changeHash: false});

                
              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });
    }


    //DETALLE FABRICANTE

    function get_productor(id_fab){
         var cadena_cat_1="";

        var request = $.ajax({
            url: servidor_ws+"get_fabricante.php",
            type: "POST",
            data: {
                    idfabricante:""+id_fab
                }
        });

        arraPaises=new Array();

        

        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
              if( obj.status == "ok"){
                var objdata=obj.datos;
                var objdatosproductos=obj.productos;

                $("#princ_logo_fabricante").html('<img style="width:100%;" src="'+servidor_ws+'/images/fabricantes/'+objdata[0].logoFabricante+'">');
                $("#princ_razon_social_fab").html(""+objdata[0].razonsocialFabricante);
                $("#princ_presentante_fab").html(""+objdata[0].nombreFabricante);
                $("#princ_nit_fab").html(""+objdata[0].nitFabricante);
                $("#princ_direccion_fab").html(""+objdata[0].direccionFabricante);
                $("#princ_ciudad_fab").html(""+objdata[0].nombreCiudad);
                $("#princ_tel_fab").html(""+objdata[0].telefonosFabricante);
                $("#princ_email_fab").html(""+objdata[0].emailFabricante);

                var longitudSucursalX=parseFloat(objdata[0].longitudFabricante);
                var latitudSucursalX=parseFloat(objdata[0].latitudFabricante);


                 $.mobile.changePage("#fooFabricante",{transition:"slide",changeHash: false});


                var mapProp = {

                    center:new google.maps.LatLng(latitudSucursalX,longitudSucursalX),
                    zoom:17,
                    mapTypeId:google.maps.MapTypeId.ROADMAP
                  };
                var map=new google.maps.Map(document.getElementById("princ_mapa_productor"),mapProp);

          

                var myLatLng = new google.maps.LatLng( parseFloat(latitudSucursalX),parseFloat(longitudSucursalX));
                var beachMarker = new google.maps.Marker({
                        position: myLatLng,
                        map: map
                    });


                 for(var i=0;i<objdatosproductos.length;i++){
                        cadena_cat_1+='<div style="width:45%; height:auto; float:left;  padding:2%; margin-bottom:0px; ">';
                        cadena_cat_1+='   <div style="width:100%; height:160px; float:left; background-color:#fff; box-shadow: rgb(114, 114, 114) 1px 1px 3px 0px; ">';
                        cadena_cat_1+='<div style="width:100%; height:120px; float:left; background-color:green; background-image:url('+servidor_ws+'images/products/'+objdatosproductos[i].foto+'); background-size:cover; background-position:center; position:relative;">';
                        cadena_cat_1+='<div style="width:65%; height:120px; position:absolute;" onclick="abrir_detalle_prod('+objdatosproductos[i].IdProducto+')">';
                        cadena_cat_1+='</div>';
                        cadena_cat_1+='</div>';
                        cadena_cat_1+='<span  style="font-size: 14px; font-weight: 100; margin-left: 10px; float: left; width:100%;">'+objdatosproductos[i].nombreProducto+'</span>';
                        cadena_cat_1+='<span  style="font-size: 14px; font-weight: bold; margin-left: 10px; float: left; width:100%;">$'+objdatosproductos[i].precio_formato+'</span>';
                        cadena_cat_1+='</div>';
                        cadena_cat_1+='</div>';
                    }

                $("#filtro_productos_precio").html(cadena_cat_1);

                
              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });
    }


    function abrirdepto(){
        
        if(cod_pais_filtro==""){
            return;
        }

        $("#list_data").html(cadena_dpto);
        $("#list_data").show("fast");
        $("#base_filtro").hide("fast");
    }

    function abrirmunicipio(){
        if(cod_depto_filtro==""){
            return;
        }

        $("#list_data").html(cadena_muni);
        $("#list_data").show("fast");
        $("#base_filtro").hide("fast");
    }

    

    function atras_filtro(ti){
        $("#list_data").hide("fast");
        $("#base_filtro").show("fast");
        $("#list_data").html("");
    }

    var cod_pais_filtro="";
    var cod_depto_filtro="";
    var cod_cat_filtro="";
    var cod_mun_filtro="";
    var cod_sector_filtro="";
    var cod_organico="NO";

    function sel_item_filtro(cod,tip){
        $( "#btn_me_"+cod).prop( "checked", true );


        $("#name_filt_"+tip).css("color","#C30");

        if(tip==1){
            cod_pais_filtro=cod;
            get_departamentos_by_pais(cod_pais_filtro);
        }

        if(tip==2){
            cod_cat_filtro=""+cod;          
        }

        if(tip==3){
            cod_depto_filtro=cod;
            get_ciudades_by_depto(cod_depto_filtro);
        }

        if(tip==4){
            cod_mun_filtro=cod;
        }

        atras_filtro(1);

    }




    function seleccionar_check_organico(){
        
        if(cod_organico=="NO"){
            $("#name_filt_5").css("color","#C30");
            $("#chkorganico").show("fast");
            cod_organico="SI";
        }else{
            $("#chkorganico").hide("fast");
            $("#name_filt_5").css("color","#ccc");
            cod_organico="NO";
        }
        
    }





        function cambio_boton(id_botom,ti){
            $(".botom_footer").addClass("botom_footer");
            $(".botom_footer").removeClass("botom_footer_active");
            $("#btn_menu_"+id_botom).addClass("botom_footer_active");

            

            if(id_botom==3){
                if(ti==0){
                    filtrar_datos(1,1);
                }else{
                    abrir_mapa();
                }           
            }

            $.mobile.changePage("#foo"+id_botom,{transition:"slide",changeHash: false});
        }

        var bandera_filtro="";
        function abrir_filtro(){
            
            if(bandera_filtro==""){
                $("#contain_menu").show("fast");
                bandera_filtro="SI";
            }else{
                $("#contain_menu").hide("fast");
                bandera_filtro="";
            }
        }



        function get_departamentos_by_pais(idpais){

             var request = $.ajax({
              url: servidor_ws+"php/agro_market.php",
              type: "POST",
              data: {tipo:"departamentos", pais:idpais}
               });

             console.log(servidor_ws+"php/agro_market.php");


                request.done(function(msg) {                       
                  var obj = jQuery.parseJSON(msg);  
                  var cadena_combo="";
                  if( obj.status == "ok"){
                    var objdata=obj.datos;
                    var cadena_entidad="";                

                   
                    for(var i=0;i<objdata.length;i++){      

                        cadena_dpto+='<div class="boton_menu_filtro" onclick="sel_item_filtro('+objdata[i].codigo+',3)">';
                        cadena_dpto+='  <span class="nombre-filtro">'+objdata[i].nombre+'</span>';
                        cadena_dpto+='  <span class="nombre-selfilter"><input type="radio" name="rdbpais"  id="btn_me_'+objdata[i].codigo+'" onclick="sel_item_filtro('+objdata[i].codigo+',3)" ></span>';
                        cadena_dpto+='</div>';

                    }

                    /*$("#cmb_departamento").html(""+cadena_combo);

                    var dpto=$("#cmb_departamento").val();

                    get_municipio(dpto);*/
                    
                  }else{
                    alert(""+obj.mensaje);
                  }

                });     

                 //respuesta si falla
                request.fail(function(jqXHR, textStatus) {
                  alert( "Error de servidor  " + textStatus );
                });
        }




        function get_ciudades_by_depto(iddepto){


            cadena_muni='<div class="boton_menu_filtro" onclick="atras_filtro(1)">';
            cadena_muni+='  <span class="nombre-filtro">&lt;&lt; Cancelar</span>';
            cadena_muni+='</div>';

             var request = $.ajax({
              url: servidor_ws+"php/agro_market.php",
              type: "POST",
             data: {tipo:"municipios", departamento:iddepto}
               });


                request.done(function(msg) {                       
                  var obj = jQuery.parseJSON(msg);  
                  var cadena_combo="";
                  if( obj.status == "ok"){
                    var objdata=obj.datos;
                    var cadena_entidad="";                


                   
                    for(var i=0;i<objdata.length;i++){      

                        cadena_muni+='<div class="boton_menu_filtro" onclick="sel_item_filtro('+objdata[i].codigo+',4)">';
                        cadena_muni+='  <span class="nombre-filtro">'+objdata[i].nombre+'</span>';
                        cadena_muni+='  <span class="nombre-selfilter"><input type="radio" name="rdbpais"  id="btn_me_'+objdata[i].codigo+'" onclick="sel_item_filtro('+objdata[i].codigo+',3)" ></span>';
                        cadena_muni+='</div>';                  
                                  
                    }

                    /*$("#cmb_departamento").html(""+cadena_combo);

                    var dpto=$("#cmb_departamento").val();

                    get_municipio(dpto);*/
                    
                  }else{
                    alert(""+obj.mensaje);
                  }

                });     

                 //respuesta si falla
                request.fail(function(jqXHR, textStatus) {
                  alert( "Error de servidor  " + textStatus );
                });
        }



        function sector_filtro(cod){
            cod_sector_filtro=""+cod;
            filtrar_datos(1,0);
        }

        var arra_sucursales=new Array();
        var dato_prod_filtrado=new Object();

        var longitudSucursal=0;
        var latitudSucursal=0;
        var band_busqueda=0;


         
        function buscar(ti){
            band_busqueda=ti; 
            filtrar_datos(4,0);
        }
              
    
        var organicoFilter="";
        function filtrar_datos(tip,res){


            var tipo_producto="";
            var departamento="";
            var municipio="";
            var nombre="";
            var pais="";

            

            if(cod_organico=="SI"){
                organicoFilter="1";
            }



            

            if(tip==1){
                tipo_producto=""+cod_sector_filtro;
                departamento="";
                municipio="";
                nombre="";
                pais="";
                organicoFilter="";
            }else{
                tipo_producto=""+cod_cat_filtro;
                departamento=""+cod_depto_filtro;
                municipio=""+cod_mun_filtro;
                nombre="";
                pais=""+cod_pais_filtro;
                organicoFilter=""+organicoFilter;

                if($("#searchagro").val()!=""){
                    tipo_producto="";
                    departamento="";
                    municipio="";
                    nombre=$("#searchagro").val();
                    pais="";
                }
            }

            if(tip==3){
                tipo_producto="";
                departamento="";
                municipio="";
                nombre="";
                pais="";
                organicoFilter="1";
            }

            if(tip==4){
                tipo_producto="";
                departamento="";
                municipio="";
                

                

                nombre=""+$("#searchagro"+band_busqueda).val();

                pais="";
                organicoFilter="";
            }



            arra_sucursales=new Array();

             var request = $.ajax({

                url: servidor_ws+"php/agro_market.php",
                type: "POST",
                data:{
                    tipo:"filtro",
                    nombre:""+nombre,
                    tipo_producto:""+tipo_producto,                
                    departamento:""+departamento,
                    municipio:""+municipio,
                    pais:pais,
                    producto_organico:organicoFilter,          
                    tipo_result:"json"
                }

              });        

              request.done(function(msg) { 


                 var obj = jQuery.parseJSON(msg);  
                

                if( obj.status == "ok"){   

                    if(tip==0 && res==0){
                        abrir_filtro();
                    }
                  
                  var i=0;          
                 dato_prod_filtrado=obj.datos;
                  var cadena_listado="";
                  
                   for(i=0;i<dato_prod_filtrado.length;i++){


                      if(""+dato_prod_filtrado[i].tabla=="producto"){
                        var det_prod_org="";
                        if(dato_prod_filtrado[i].organicoProducto==1){
                           det_prod_org="Producto Orgánico";
                        }

                        var foto1="foto_logo.png";

                        if(dato_prod_filtrado[i].fotoPrincipal!=""){
                          foto1=""+dato_prod_filtrado[i].fotoPrincipal;
                        }


                        longitudSucursal=parseFloat(dato_prod_filtrado[i].longitudSucursal);
                        latitudSucursal=parseFloat(dato_prod_filtrado[i].latitudSucursal);


                      }else{
                        arra_sucursales.push(dato_prod_filtrado[i]);
                      }          
                   }



                   //
                  if(res==1){
                    cambio_boton(3,1);
                  }else{
                    

                    if(tip==3){
                        $(".botom_footer").addClass("botom_footer");
                        $(".botom_footer").removeClass("botom_footer_active");
                        $("#btn_menu_4").addClass("botom_footer_active");
                    }else{
                        $(".botom_footer").addClass("botom_footer");
                        $(".botom_footer").removeClass("botom_footer_active");
                        $("#btn_menu_3").addClass("botom_footer_active");
                    
                    }

                    $.mobile.changePage("#foo3",{transition:"slide",changeHash: false});
                  
                    abrir_mapa();



                  }

                      
                }else{
                  alert(""+obj.mensaje);
                }

              });
               
              request.fail(function(jqXHR, textStatus) {
                   alert("Error de servidor  " + textStatus );         
              });

              cod_sector_filtro="";

        }



  var myVar="";


  function abrir_mapa(){

    if(myVar!=""){
        clearInterval(myVar);
    }

    myVar=setInterval(function(){ 
      cargar_mapa();
    }, 1000);
  }


   var sucursal_sel_mapa="";

   function cargar_mapa(cat){

        clearInterval(myVar);
        $(".btn_cerrar_panel").hide("fast");
              
         var mapProp = {

            center:new google.maps.LatLng(longitudSucursal, latitudSucursal),
            zoom:zoom_mapa,
            mapTypeId:google.maps.MapTypeId.ROADMAP
          };
          var map=new google.maps.Map(document.getElementById("id_main_2"),mapProp);

         

            
            for(var i=0;i<arra_sucursales.length;i++){
                var imagen="";

                if(cat!=undefined){

                    if(cat==4){
                        if(arra_sucursales[i].organicoProducto!=1){
                            continue;
                        }
                    }else{

                        if(cat!=arra_sucursales[i].categoriaProducto){
                            continue;
                        }
                    }
                }
                

                if(arra_sucursales[i].organicoProducto==1){
                    imagen="assets/img/localizador_1.png";
                }else{
                    if(arra_sucursales[i].categoriaProducto==1){
                        imagen="assets/img/localizador_4.png";
                    }
                    if(arra_sucursales[i].categoriaProducto==2){
                        imagen="assets/img/localizador_2.png";
                    }

                    if(arra_sucursales[i].categoriaProducto==3){
                        imagen="assets/img/localizador_3.png";
                    }
                }

                if(organicoFilter=="1"){
                    imagen="assets/img/localizador_1.png";
                }

                var myLatLng = new google.maps.LatLng(parseFloat(arra_sucursales[i].longitudSucursal), parseFloat(arra_sucursales[i].latitudSucursal));
                var beachMarker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: imagen,
                    
                    title: 'Empresa: '+arra_sucursales[i].razonSocialEmpresa
                });

                beachMarker.id_Sucursal=""+arra_sucursales[i].id_Sucursal;

                beachMarker.addListener('click', function(e) {
                   sucursal_sel_mapa=""+this.id_Sucursal;    
                    get_sucursales(this.id_Sucursal);               
                });

            }

            var cadena_mapa='<div style="width:234px; padding:10px; height:300px; overflow-y:auto; display:none; position:absolute; right: 10px; top:10px; background-color:rgba(33, 33, 33, 0.75); z-index:10;     border-radius: 9px;" id="can_prods_mapa">';
             
            
           // cadena_mapa+='<script></script>';
            cadena_mapa+='</div>';
            var cadena_filtro_sector="";

            cadena_filtro_sector+='<div style="width:234px; height:40px; position:absolute; right: 0px; top:0px; background-color:rgba(33, 33, 33, 0.75); z-index:9;" id="panel_filt">';

            cadena_filtro_sector+='    <div onclick="cargar_mapa(4)" style="width:24%; height:40px; border-right:solid 1px #ddd; float:left; background-image:url(assets/img/localizador_1.png); background-size:27px; background-repeat:no-repeat; background-position:center;">';
            cadena_filtro_sector+='    </div>';

            cadena_filtro_sector+='    <div onclick="cargar_mapa(2)" style="width:24%; height:40px; border-right:solid 1px #ddd; float:left; background-image:url(assets/img/localizador_2.png); background-size:27px; background-repeat:no-repeat; background-position:center;">';
            cadena_filtro_sector+='    </div>';

            cadena_filtro_sector+='    <div  onclick="cargar_mapa(3)" style="width:24%; height:40px; border-right:solid 1px #ddd; float:left; background-image:url(assets/img/localizador_3.png); background-size:27px; background-repeat:no-repeat; background-position:center;">';
            cadena_filtro_sector+='    </div>';

            cadena_filtro_sector+='    <div onclick="cargar_mapa(1)" style="width:24%;  height:40px; border-right:solid 1px #ddd; float:left; background-image:url(assets/img/localizador_4.png); background-size:27px; background-repeat:no-repeat; background-position:center;">';
            cadena_filtro_sector+='    </div>';

            cadena_filtro_sector+='</div>';


             $("#id_main_2").append(cadena_mapa);
             
             $("#id_main_2").append(cadena_filtro_sector);
            

    }

   
    


    function get_sucursales(suc){
        var cadena_suc_prod="";
        

        var logo_empresa="";
        var nombre_empresa="";
        var direccion_empresa="";
        var telfonos_empresa="";


        for(var i=0;i<dato_prod_filtrado.length;i++){

            if(""+dato_prod_filtrado[i].tabla=="producto"){

                if(dato_prod_filtrado[i].sucursal==suc){

                    logo_empresa=""+dato_prod_filtrado[i].logoEmpresa;

                    nombre_empresa=""+dato_prod_filtrado[i].razonSocialEmpresa;
                    direccion_empresa=""+dato_prod_filtrado[i].direccionSucursal;
                    telfonos_empresa=""+dato_prod_filtrado[i].telefonoSucursal;


                    
                  
                    cadena_suc_prod+='<div class="item_maps" style="border-bottom:solid 1px #DDD; width:100%; float:left; position:relative;"  onclick="get_oferta_agro('+dato_prod_filtrado[i].id_Producto+')"  >';
                    cadena_suc_prod+='<div style="width:40px; padding:2px; background-color:green; right:5px; top:15px; color:#fff; position:absolute;text-shadow:none; font-weight: lighter;font-family:verdana; text-align:center; font-size:13px; border-radius:3px; cursor:pointer; " onclick="get_oferta_agro('+dato_prod_filtrado[i].id_Producto+')">Ir a</div>';
                    cadena_suc_prod+='  <div style="width:40px; height:40px; float:left; margin-right:5px; margin-left:5px;    margin-top: 3px; border-radius:3px; background-image:url('+servidor_ws+'img/productos/'+dato_prod_filtrado[i].fotoPrincipal+'); background-size:cover;">';
                    cadena_suc_prod+='  </div>';

                    cadena_suc_prod+='  <div style="width:150px; height:auto; float:left; color:#fff; padding:5px 0px; text-shadow:none; font-weight: lighter;font-family:verdana;">';
                    cadena_suc_prod+='     '+dato_prod_filtrado[i].nombreProducto+' <br />';
                    cadena_suc_prod+='     <span style="font-size:12px; text-shadow:none;  font-family:verdana; font-weight: lighter;">'+dato_prod_filtrado[i].nombreTipoProducto+'</span><br />';
                    cadena_suc_prod+='  </div>';



                    cadena_suc_prod+='</div>';
                    
                }
            }
        }

        var cadena_suc_prod2="";
        cadena_suc_prod2+='<div style="width:100%; float:left; padding:0px; background-color:#fff;  border-radius:9px; text-align:center;">';       
        cadena_suc_prod2+='<img src="'+servidor_ws+'img/'+logo_empresa+'" style="width:60%;">';
        cadena_suc_prod2+='<p style="text-shadow:none; font-size:11px;">';
        cadena_suc_prod2+=""+nombre_empresa+"<br />";
        cadena_suc_prod2+=""+direccion_empresa+"<br />";
        cadena_suc_prod2+=""+telfonos_empresa+"<br />";
        cadena_suc_prod2+="</p>";

        

        cadena_suc_prod2+='</div>';

        $("#can_prods_mapa").html(cadena_suc_prod2+''+cadena_suc_prod);
        $("#can_prods_mapa").show("fast");
        $(".btn_cerrar_panel").show("fast");
        $("#panel_filt").hide();

    }



    function cerrar_panel_map(){

        $("#can_prods_mapa").hide("fast");
        $(".btn_cerrar_panel").hide("fast");
        cerrar_panel_esp();
        
    }




var myVar3="";


  function cerrar_panel_esp(){

    if(myVar3!=""){
        clearInterval(myVar3);
    }

    myVar3=setInterval(function(){ 
      mostrar_panel_especial();
    }, 1000);
  }


 

   function mostrar_panel_especial(){
        $("#panel_filt").show("slow");
        clearInterval(myVar3);  
    }



  var myVar2="";


  function abrir_mapa2(){

    if(myVar2!=""){
        clearInterval(myVar2);
    }

    myVar2=setInterval(function(){ 
      cargar_mapa2();
    }, 1000);
  }


   var sucursal_sel_mapa="";

   function cargar_mapa2(){

        clearInterval(myVar2);



              
        var mapProp = {

            center:new google.maps.LatLng(long_empresa,lat_empresa),
            zoom:zoom_mapa,
            mapTypeId:google.maps.MapTypeId.ROADMAP
          };
        var map=new google.maps.Map(document.getElementById("mapa_2"),mapProp);

        var imagen="assets/img/marca_map.png";



        var myLatLng = new google.maps.LatLng(long_empresa,lat_empresa);
        var beachMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: imagen
        });

    }



    var lat_empresa=0;
    var long_empresa=0;
    var detal_facebook="";
    var detal_skype="";
    var detal_telefono="";


    function get_oferta_agro(idproducto){

         var request = $.ajax({
          url: servidor_ws+"php/agro_market.php",
          type: "POST",
          data: {tipo:"get_oferta", codigo_producto:idproducto}
           });


            request.done(function(msg) {                       
              var obj = jQuery.parseJSON(msg);  
              var cadena_combo="";
              if( obj.status == "ok"){
                

                $("#detal_titulo").html(""+obj.titulopagina);
                $("#detal_subtitulo").html(""+obj.subtitulo);
                $("#detal_subtitulo").html(""+obj.subtitulo);

                $("#imagen_producto").css("background-image","url("+obj.url_img+")");

                $("#detal_ciudad").html(""+obj.ciudad);
                $("#detal_empresa").html(""+obj.nombreempresa);
                $("#detal_replegal").html(""+obj.nombreusuario);
                $("#detal_email").html(""+obj.email_usuario);
                $("#detal_telefono").html(""+obj.telefono_usuario);
                $("#detal_direccion").html(""+obj.direccion);
                $("#detal_pais").html(""+obj.pais);

                $("#cant_prod_mensual").html(""+obj.cantprodmensual);
                $("#cant_max_prod").html(""+obj.cantactual);
                $("#cant_actual").html(""+obj.cantactual);
                $("#detal_organico").html(""+obj.organico);

                detal_facebook=""+obj.facebook;
                detal_skype="skype:"+obj.skype+"?chat";
                detal_telefono="tel:"+obj.telefono_usuario;

                $("#detal_logo").html('<img src="'+obj.logo_empresa+'" style="width:100%;">');

                if(""+obj.organico=="SI"){
                    $("#es_organico").show();
                }else{
                    $("#es_organico").hide();
                }


                $("#detail_descripcion").html(obj.descripcion);

                var cadena_galeria="";

                var obj_galeria=obj.galeria;



                for(var i=0;i<obj_galeria.length;i++){
                    cadena_galeria+='<div class="gal_item" onclick="abrir_galeria(&#39;'+obj_galeria[i].pathFoto+'&#39;)">';
                    cadena_galeria+='  <div class="gal_item_inter" style="background-image:url('+obj_galeria[i].pathFoto+')">';
                    cadena_galeria+='  </div>';
                    cadena_galeria+='</div>';
                    
                }
                $("#contain_galeria").html(cadena_galeria);

                lat_empresa=parseFloat(obj.latitud);
                long_empresa=parseFloat(obj.logitud);

                $.mobile.changePage("#foo6",{transition:"slide",changeHash: false});

                cargar_mapa2();

                
              }else{
                alert(""+obj.mensaje);
              }

            });     

             //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert( "Error de servidor  " + textStatus );
            });
    }





    function traer_departamento(){
        
        var idpais=$("#cmb_paises_reg").val();

        var request = $.ajax({
            url: servidor_ws+"get_data.php",
            type: "POST",
            data: {tipo:"departamentos",pais:""+idpais}
        });


        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
            if( obj.status == "ok"){
                var objdata=obj.datos;

                var cadena_depto="";
                for(var i=0;i<objdata.length;i++){
                   cadena_depto+='<option value="'+objdata[i].IdDepartamento+'">'+objdata[i].nombreDepartamento+'</option>';
                }

                $("#cmb_dpto_reg").html(cadena_depto);
                if(band_ciud_sel=="SI"){
                    $("#cmb_dpto_reg").val(obj_cliente_reg[0].IdDepartamento);
                }
                $('#cmb_dpto_reg').selectmenu('refresh');

                traer_ciudad();

            }else{
                alert(""+obj.mensaje);
            }

        });     

            
        request.fail(function(jqXHR, textStatus) {
          alert( "Error de servidor  " + textStatus );
        });

    }



    function traer_ciudad(){
        
        var depto=$("#cmb_dpto_reg").val();

        var request = $.ajax({
            url: servidor_ws+"get_data.php",
            type: "POST",
            data: {tipo:"ciudad",depto:""+depto}
        });


        request.done(function(obj) {                       
          //  var obj = jQuery.parseJSON(msg);  
            var cadena_combo="";
            if( obj.status == "ok"){
                var objdata=obj.datos;

                var cadena_ciudad="";
                for(var i=0;i<objdata.length;i++){
                   cadena_ciudad+='<option value="'+objdata[i].IdCiudad+'">'+objdata[i].nombreCiudad+'</option>';
                }



                $("#cmb_ciudad_reg").html(cadena_ciudad);

                if(band_ciud_sel=="SI"){
                    $("#cmb_ciudad_reg").val(obj_cliente_reg[0].IdCiudad);
                }
                $('#cmb_ciudad_reg').selectmenu('refresh');

            }else{
                alert(""+obj.mensaje);
            }

        });     

            
        request.fail(function(jqXHR, textStatus) {
          alert( "Error de servidor  " + textStatus );
        });

    }


    function guardar_clientes_reg(){

      

        var nombres=""+$("#txtnombres_reg").val();
        var  apellidos=""+$("#txtapellidos_reg").val();
        var  email=""+$("#txtemail_reg").val();
        var  telefono=""+$("#txttelefono_reg").val();
        var  ciudad=""+$("#cmb_ciudad_reg").val();
        var  direccion=""+$("#txttdireccion_reg").val();
      

        var  repassword=""+$("#txtpassword_reg").val();
        var  password=""+$("#txtreppassword_reg").val();



        if(nombres==""){
          alert("EL nombre es un campo obligatorio");
          return;
        }

        if(apellidos==""){
          alert("El apellidos es un campo obligatorio");
          return;
        }

        if(email==""){
          alert("El email es un campo obligatorio");
          return;
        }


        if(telefono==""){
          alert("El telefono es un campo obligatorio");
          return;
        }

        if(ciudad==""){
          alert("El ciudad es un campo obligatorio");
          return;
        }


        var id_cliente_d="";
        if(obj_cliente_reg==null){
            if(repassword==""){
                alert("El password es un campo obligatorio");
                return;
            }
        }else{
            id_cliente_d=""+id_usuario_reg;
        }

        


        if(repassword!=password){
          alert("Los password no coinciden");
          return;
        }


         var request = $.ajax({
              url: servidor_ws+"guardar_cliente_app.php",
              type: "POST",
              data:{
                  nombres:nombres,
                  apellidos:apellidos,
                  email:email,
                  ciudad:ciudad,
                  password:password,
                  telefono:telefono,
                  direccion:direccion,
                  idcliente:""+id_cliente_d
                 
                  
                }
           });

            request.done(function(obj) { 
           
            if( obj.status == "ok"){  

                alert(""+obj.mensaje);
                

              }else{
                alert(""+obj.mensaje);
              }
            });

           //respuesta si falla
            request.fail(function(jqXHR, textStatus) {
              alert("Error de servidor. "+textStatus);
            });

  }





    function atras_detalle(){
        $.mobile.changePage("#foo3",{transition:"slide",changeHash: false});
    }

    function abrir_galeria(pathgal){
        $("#imagen_producto").css("background-image","url("+pathgal+")");
    }


    function abrir_facebook(){
        window.open(""+detal_facebook,"_parent");
    }

    function abrir_telefono(){
        window.open(""+detal_telefono,"_parent");
    }

    function abrir_skype(){
        window.open(""+detal_skype,"_parent");
    }


    /*
        cantactual: "20.00"
        cantprodmensual: "80.00"
        ciudad: "BUCARAMANGA - Santander"
        descripcion: "Descripcion de Palma"
        direccion: "Cra 33 No. 56 - 21"
        email_usuario: "sucursal2@hotmail.com"
        facebook: "https://www.facebook.com/angel.f.lizcano?fref=ts"
        latitud: "-73.111020"
        logitud: "7.113010"
        logo_empresa: "http://draco.yo:8888/agro/img/logo1.png"
        municipio: "bucaramanga"
        nombreempresa: "Agraria San Ant"
        nombreusuario: "Angel F. Lizcano"
        organico: "NO"
        pais: "Colombia"
        skype: "angel.lizcano.maat.col"
        status: "ok"
        subtitulo: "Verduras"
        telefono_usuario: "6830109"
        titulopagina: "Palma"
        url_img: "http://draco.yo:8888/agro/img/productos/palma1.jpg"


    */





    function enviar_mensaje(){

            /*
            <div style="width:100%; height:100%; float:none; margin-left:auto; margin-right:auto;">
                    <input type="text" placeholder="* Nombre Completo" id="txtnombre_registro" style="widt:80%; margin-left:10%;" >
                </div>

                <div style="width:100%; height:100%; float:none; margin-left:auto; margin-right:auto;">
                    <input type="email" placeholder="Email" id="txtemail_registro" style="widt:80%; margin-left:10%;" >
                </div>

                <div style="width:100%; height:100%; float:none; margin-left:auto; margin-right:auto;">
                    <input type="text" placeholder="* Celular" id="txtcelular_registro" style="widt:80%; margin-left:10%;" >
                </div>

                <div style="width:100%; height:100%; float:none; margin-left:auto; margin-right:auto;">
                    <input type="text" placeholder="* Producto que cultiva" id="txtproducto_registro" style="widt:80%; margin-left:10%;" >
                </div>

                <div style="width:100%; height:100%; float:none; margin-left:auto; margin-right:auto;">
                    <input type="text" placeholder="Direccion" id="txtdireccion_registro" style="widt:80%; margin-left:10%;" >
                </div>

                <textarea style="width:100%; height:100px;" placeholder="Comentarios" id="txtcomentario_registro" rows="10"></textarea>
            */

            var nombre=""; 
            var email="";
            var celular="";
            var producto="";
            var direccion="";
            var comentario="";



            nombre=""+$("#txtnombre_registro").val();
            email=""+$("#txtemail_registro").val();
            celular=""+$("#txtcelular_registro").val();
            producto=""+$("#txtproducto_registro").val();
            direccion=""+$("#txtdireccion_registro").val();
            comentario=""+$("#txtcomentario_registro").val();



            if(nombre.trim()==""){
                alert("El campo nombre es requerido");
                return;
            }

            if(celular.trim()==""){
                alert("El campo celular es requerido");
                return;
            }


            if(producto.trim()==""){
                alert("El campo producto es requerido");
                return;
            }


            if(comentario.trim()==""){
                alert("El campo comentario es requerido");
                return;
            }




             var request = $.ajax({
              url: servidor_ws+"php/agro_market.php",
              type: "POST",
              data: {tipo:"enviar_mensaje", 
                    nombre:nombre,
                    email:email,
                    celular:celular,
                    producto:producto,
                    direccion:direccion,
                    comentario:comentario
                }
               });


                request.done(function(msg) {                       
                  var obj = jQuery.parseJSON(msg);  
                  var cadena_combo="";
                  if( obj.status == "ok"){
                    
                    $("#txtnombre_registro").val("");
                    $("#txtemail_registro").val("");
                    $("#txtcelular_registro").val("");
                    $("#txtproducto_registro").val("");
                    $("#txtdireccion_registro").val("");
                    $("#txtcomentario_registro").val("");

                    alert("El mensaje fue enviado con &eacute;xito");

                  }else{
                    alert(""+obj.mensaje);
                  }

                });     

                 //respuesta si falla
                request.fail(function(jqXHR, textStatus) {
                  alert( "Error de servidor  " + textStatus );
                });
        }




