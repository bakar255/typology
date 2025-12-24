import { useState } from "react"

  const  data = [
     {id: 1, name: 'Cosmétique'},
     {id: 2, name: 'Maquillages'},
     {id: 3, name: 'Parfums'},
     {id: 4, name: 'Bodycare'},
     {id: 5, name: 'Skincare'},
    ]


// Component ProductList located in the homepage

export default function ProductList()  {

    const [itemImage, setItemImage ] = useState([]);


    return(
        <div>

            <div className="flex justify-center space-x-4 space-y-9 flex-col py-10 mt-10 mb-10">
                
                <p className="heading text-center text-4xl">Une selection d'objets de qualité </p>
                <p className="heading text-center text-3xl">Choisis pour vous !</p>

                <div className="flex justify-center items-center space-x-5">
                    {data.map((item) => (
                    <button key={item.id} className="w-40 h-14 cursor-pointer text-black font-bold bg-white border border-black py-2.5 px-6">
                        {item.name}
                    </button>
                ))}
                </div>

                   <div>

                   </div>
                
            </div>
 
        </div>
    )
}
