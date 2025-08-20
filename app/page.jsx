import Image from "next/image";

export default function Home() {
  return (
    <div className=" w-full h-auto flex flex-col bg-blue-50 ">
        <div className="w-full bg-gradient-to-t from-lime-300 via-slate-50 to-white">
          <Image className="mx-auto mt-5" src={"/swaraj_744XT.png"} width={615} height={473} alt="Tractor"></Image>
          <Image className="mx-auto" src={"/joshkaraaz.png"} width={200} height={200} alt="Mera Swaraj"></Image>
        </div>
        <Image className="w-full" src={"/About_us.jpg"} width={1440} height={621} alt="Abount us"></Image>
    </div>
  );
}
