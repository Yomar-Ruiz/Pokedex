type PokemonCardProps = {
    name: string, 
    id: number,
    image: string,
    types: string[]
}

function getTypeColor(type: string) {
  if (type === "grass") {
    return "bg-green-500";
  }

  if (type === "fire") {
    return "bg-red-500";
  }

  if (type === "water") {
    return "bg-blue-500";
  }

  if (type === "electric") {
    return "bg-yellow-400";
  }
  if (type === "poison"){
    return "bg-purple-400"
  }
  if (type === "psychic"){
    return "bg-purple-900"
  }
  if (type === "rock"){
    return "bg-olive-950"
  }
  if (type ==="ground"){
    return "bg-yellow-950"
  }
  if (type === "steel"){
    return "bg-gray-900"
  }
  if (type === "ice"){
    return "bg-blue-300"
  }
  if (type === "flying"){
    return "bg-mist-500"
  }
  if (type === "bug"){
    return "bg-green-300"
  }
  if (type === "fairy"){
    return "bg-pink-300"
  }
  if (type === "fighting"){
    return "bg-red-700"
  }
  if(type === "dragon"){
    return "bg-gradient-to-r from-blue-500 to-red-500"
  }

  return "bg-gray-400";
}

export default function PokemonCard({name, id, image, types}: PokemonCardProps){
    return(
        <article className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <img
                 src={image}
                 alt={name}
                 className="h-56 w-56 object-contain transition duration-300 group-hover:scale-200"
                  />
                 </div>
            <p className="text-sm text-gray-500">
                #{id.toString().padStart(3, "0")}
                </p>
            <h2 className="text-center text-2xl font-bold capitalize text-gray-900">
               {name}
             </h2>
            <div className="mt-3 flex justify-center gap-2">

  {types.map((type) => (
    <span
  key={type}
  className={`${getTypeColor(type)} rounded-full px-3 py-1 text-sm font-medium capitalize text-white`}
>
  {type}
</span>
  ))}
</div>

        </article>
    )
}