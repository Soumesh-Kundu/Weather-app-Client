export default function Loader() {
  return (
    <div className="grid w-full h-full place-items-center">
      <div className="flex flex-col items-center gap-3">
        <l-metronome size={40} speed={1.6} color={"white"}></l-metronome>
        <p>retriving latest weather updates <l-bouncy size={15} speed={1.6} color="white"></l-bouncy></p>
      </div>
    </div>
  );
}
