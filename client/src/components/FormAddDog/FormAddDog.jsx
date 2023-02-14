import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../../actions";
import style from "../FormAddDog/FormAddDog.module.css";

const validate = (form) => {
    let errors = {};
    if(!form.name) {
        errors.name = "El nombre es obligatorio, no debe contener números"
    }
    if(!form.min_height || !form.max_height) {
        errors.height = "Se requiere altura"
    }
    if(!form.min_weight || !form.max_weight) {
        errors.weight = "Se requiere peso"
    }
    if(!form.life_span) {
        errors.life_span = "Se requiere vida útil, escriba solo números separados por un guión (-)"
    }
    return errors
}

export default function FormAddDog() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);

    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
    });

    const [form, setForm] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
        temperaments: [],
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    useEffect(()=>{
        if (form.name.length > 0 && form.min_height.length > 0  && form.max_height.length > 0 && form.min_weight.length > 0 && form.max_weight.length > 0) setButton(false)
        else setButton(true)
    }, [form, setButton]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDog(form));
        alert("El nuevo perro fue agregado exitosamente");
        setForm({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperaments: []
        });
        history.push('/home');
    }
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value //el valor del atributo modificado del estado en el form se actualizara con lo escrito en dicho campo
        });
        setErrors(validate({
            ...form,
            [e.target.name] : e.target.value //
        }))
    }
    
    const handleSelect = (e) => {
        setForm({
            ...form,
            temperaments: [...form.temperaments, e.target.value] //guarda en el arreglo todo lo que guarda en el select
        })
    }

    const handleDelete = (el) => {
        setForm({
            ...form,
            temperaments: form.temperaments.filter(temp => temp !== el) //agarra y devuelve el estado nuevo sin el elemnto clickeado
        })
    }

    return(
        <div className={style.main_wrapper}>
            <div className={style.container}>
                <Link to="/home">
                    <button className={style.button_to_home}>Volver</button>
                </Link>
                <form action="" id="form" onSubmit={handleSubmit} className={`${style.form}`}>
                    <div className={style.name_container}>
                        <input className={style.input_name} type="text" value={form.name} name="name" onChange={(e) => handleChange(e)} placeholder="Nombre..."/>
                    </div>
                    <div className={style.error_form}>{errors.name && <p>{errors.name}</p>}</div> {/*mesaje de error de nombre*/}

                    <div className={style.height_container}>
                        <div className={style.min_height}>
                            <input type="text" value={form.min_height} name="min_height" placeholder="Min altura..." onChange={(e) => handleChange(e)}/>
                        </div>
                        
                        <div className={style.max_height}>
                            <input type="text" value={form.max_height} name="max_height" placeholder="Max altura..." onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className={style.error_form}>{errors.height && <p>{errors.height}</p>}</div>{/* espacio para agregar error */}{/* espacio para agregar error */}

                    <div className={style.weight_container}>
                        <div className={style.min_weight}>
                            <input type="text" value={form.min_weight} name="min_weight" placeholder="Min peso..." onChange={(e) => handleChange(e)}/>
                        </div>

                        <div className={style.max_weight}>
                            <input type="text" value={form.max_weight} name="max_weight" placeholder="Max peso..." onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className={style.error_form}>{errors.weight && <p>{errors.weight}</p>}</div>{/* espacio para agregar error */}

                    <div className="life-span-container">
                        <input type="text" autoComplete="off" name="life_span" value={form.life_span} placeholder="esperanza de vida: 10 - 12" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className={style.error_form}>{errors.life_span && <p>{errors.life_span}</p>}</div>{/* espacio para agregar error */}

                    <div className="image-container">
                        <input type="text" autoComplete="off" value={form.image} name="image" placeholder="Imagen URL..." onChange={(e) => handleChange(e)}/>
                    </div>

                    <div className={""}>
                        <h3>Selecciona Temperamentos</h3>
                    </div>

                    <div className={""}>
                        <select className={style.select_temperaments} onChange={handleSelect}>
                            <option disabled selected>Temperamentos</option>
                            {temperaments.map(d => (                    
                                <option value={d.name} key={d.name+Math.random()} className={style.option_temperament}>{d.name}</option> //key de elementos de temperamentos, eliminar el repetido reserved
                            ))}
                        </select>
                    </div>

                    <div className={style.container_button_add_dog}>
                        <button className={style.button_add_dog} disabled={button} type="submit" form="form">Crear Perro</button>
                    </div>
                </form>

            

                <div className="">
                    <div className="">
                        <h2>Temperamentos añadidos</h2>
                    </div>

                    <div className={style.container_temperaments}>
                        {form.temperaments.map(el => 
                        <div className={style.element_temperament} key={el} onClick={() => handleDelete(el)}>
                            <p>{`${el}`}</p>
                        </div>    
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}