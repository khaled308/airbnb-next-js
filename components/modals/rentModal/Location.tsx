"use client";
import Heading from "@/components/Heading";
import CountrySelect from "@/components/form/CountrySelect";
import { useMemo } from "react";
import dynamic from "next/dynamic";

interface LocationProps {
  setSelectedLocation: (id: string, value: any) => void;
  location: any;
}

const Location = ({ setSelectedLocation, location }: LocationProps) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("../../Map"), {
        ssr: false,
      }),
    [location]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setSelectedLocation("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    </div>
  );
};

export default Location;
