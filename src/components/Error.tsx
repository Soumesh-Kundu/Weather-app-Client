import { MdOutlineCloudOff } from "react-icons/md";

export default function Error() {
  return (
    <div className="grid w-full h-full bg-black/50 place-items-center">
      <div className="flex flex-col items-center gap-4">
        <MdOutlineCloudOff className="text-6xl"/>
        <p className="text-center">
          Looks like Some error has occored on our side,
          <br />
          Sorry for the inconvience, Please try again later.
        </p>
      </div>
    </div>
  );
}
