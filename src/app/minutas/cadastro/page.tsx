import MinutaForm from "@/components/cadastro-minuta";

export default function CadastroMinutasPage() {
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className='bg-white p-4 rounded-md shadow-md w-full max-w-lg'>
                <h2 className="font-bold mb-6">Minuta</h2>
                <MinutaForm />
            </div>
        </div>
    );
}