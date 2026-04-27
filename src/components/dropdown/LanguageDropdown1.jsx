"use client";
import { speaks } from "@/data/listing";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LanguageDropdown1() {
  const [getSpeak, setSpeak] = useState([]);

  const setSpeakState = listingStore((state) => state.setSpeak);
  const getSpeakState = listingStore((state) => state.getSpeak);

  const speakHandler = (data) => {
    if (!getSpeak.includes(data)) {
      return setSpeak([...getSpeak, data]);
    }
    const deleted = getSpeak.filter((item) => item !== data);
    setSpeak(deleted);
  };

  const speakSubmitHandler = () => {
    setSpeakState([]);
    getSpeak.forEach((item) => {
      setSpeakState(item);
    });
  };

  useEffect(() => {
    setSpeak(getSpeakState);
  }, [getSpeakState]);

  return (
    <>
      <div className="px-5 pb-6 space-y-2">
        {speaks.map((item, i) => (
          <label
            key={i}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <Checkbox
              checked={getSpeak.includes(item.value)}
              onCheckedChange={() => speakHandler(item.value)}
            />
            {item.title}
          </label>
        ))}
      </div>
      <Button onClick={speakSubmitHandler}>
        Apply
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </>
  );
}
