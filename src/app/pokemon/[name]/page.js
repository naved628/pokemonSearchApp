import axios from "axios";
import Link from "next/link";

async function getPokemonDetails(name) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response?.data;
}

const PokemonDetails = async ({ params }) => {
  const pokemon = await getPokemonDetails(params?.name);

  return (
    <div className="container mx-auto p-4 bg-white rounded-md shadow-lg">
      <h1 className="text-3xl font-bold capitalize mb-4">{pokemon?.name}</h1>
      <div className="mb-4">
        <span className="font-semibold">Type:</span>{" "}
        {pokemon?.types.map((type) => type?.type?.name).join(", ")}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Height:</span> {pokemon?.height}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Weight:</span> {pokemon?.weight}
      </div>
      <div className="mt-4">
        <Link href="/">
          <h2 className="text-blue-500 hover:underline">Home</h2>
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="capitalize">{pokemon?.name}</span>
      </div>
    </div>
  );
};

export default PokemonDetails;
